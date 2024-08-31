import { useInfiniteScrollTop } from '6pp'
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material'
import { IconButton, Skeleton, Stack } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FileMenu from '../components/dialogs/FileMenu'
import AppLayout from '../components/Layout/AppLayout'
import { TypingLoader } from '../components/Layout/Loaders'
import MessageComponent from '../components/shared/MessageComponent'
import { InputBox } from '../components/styles/StyledComponents'
import { DarkGreen, grayColor } from '../constants/Color'
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../constants/events'
import { useError, useSocketsEvents } from '../Hooks/Hook'
import { useChatDetailsQuery, useGetAllMessagesQuery } from '../redux/api/api'
import { removeNewMessagesAlert } from '../redux/reducers/chat'
import { setIsFileMenu } from '../redux/reducers/misc'
import { getSocket } from '../socket'



const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null)
  const socket = getSocket()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [page, setPage] = useState(1)
  const [fileMenuAnchor, setIsFileMenuAnchor] = useState(null)
  const [iamTyping, setIamTyping] = useState(false)
  const [userTyping, setUserTyping] = useState(false)


  const typingTimeOut = useRef(null)
  const bottomRef = useRef(null)

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId })

  const oldMessagesChunk = useGetAllMessagesQuery({ chatId, page })

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk?.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk?.data?.message
  )

  const allMessages = [...oldMessages, ...messages]

  const members = chatDetails?.data?.chat?.members;


  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error }
  ]

  useEffect(() => {
    if (chatDetails.isError) return navigate("/")
  }, [chatDetails.isError])

  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user._id, members })
    dispatch(removeNewMessagesAlert(chatId))
    return () => {
      setMessages("")
      setMessages([])
      setOldMessages([])
      setPage(1)
      socket.emit(CHAT_LEAVED, { userId: user._id, members })
    }
  }, [chatId])

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" })
  }, [messages])



  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true))
    setIsFileMenuAnchor(e.currentTarget)
  }

  const messageOnchangeHandler = (e) => {
    setMessage(e.target.value)

    if (!iamTyping) {
      socket.emit(START_TYPING, { members, chatId })
      setIamTyping(true)
    }
    if (typingTimeOut.current) clearTimeout(typingTimeOut.current)

    typingTimeOut.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId })
      setIamTyping(false)
    }, [2000]);
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (!message.trim()) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message })
    setMessage("")
  }

  const newMessagesHandler = useCallback((data) => {
    if (data.chatId !== chatId) return
    setMessages((prev) => [...prev, data.message])
  }, [chatId])

  const startTypingListner = useCallback((data) => {
    if (data.chatId !== chatId) return
    setUserTyping(true)
  }, [chatId])

  const stopTypingListner = useCallback((data) => {
    if (data.chatId !== chatId) return
    setUserTyping(false)
  }, [chatId])

  const alertHandler = useCallback((data) => {
    if (data.chatId !== chatId) return;
    const messageForAlert = {
      content: data.message,
      _id: uuid(),
      sender: {
        _id: "sfkobmfkdlbm",
        name: "Admin",
      },
      chat: chatId,
      createdAt: new Date().toISOString()
    }
    setMessages((prev) => [...prev, messageForAlert])
  }, [chatId])


  const eventHandler = {
    [ALERT]: alertHandler,
    [NEW_MESSAGE]: newMessagesHandler,
    [START_TYPING]: startTypingListner,
    [STOP_TYPING]: stopTypingListner,

  }

  useSocketsEvents(socket, eventHandler)
  useError(errors)

  return chatDetails.isLoading ? (<Skeleton />) : (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        height={"90%"}
        bgcolor={grayColor}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >

        {
          allMessages.map(i => (
            <MessageComponent key={i._id} message={i} user={user} />
          ))
        }
        {userTyping && <TypingLoader />}

        <div ref={bottomRef} />
      </Stack>

      <form style={{
        height: "10%"
      }} onSubmit={submitHandler} >

        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg"
            }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder='Type message here'
            value={message}
            onChange={messageOnchangeHandler} />

          <IconButton
            type='submit'
            sx={{
              rotate: "-30deg",
              background: DarkGreen,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "#141313",
              }
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} />
    </>
  )
}

export default AppLayout()(Chat);