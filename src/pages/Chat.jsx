import { useCallback, useEffect, useRef, useState } from 'react'
import { Stack, IconButton, Skeleton } from '@mui/material'
import AppLayout from '../components/Layout/AppLayout'
import { DarkGreen, grayColor } from '../constants/Color'
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material'
import { InputBox } from '../components/styles/StyledComponents'
import FileMenu from '../components/dialogs/FileMenu'
import { setIsFileMenu } from '../redux/reducers/misc'
import MessageComponent from '../components/shared/MessageComponent'
import { getSocket } from '../socket'
import { NEW_MESSAGE } from '../constants/events'
import { useChatDetailsQuery, useGetAllMessagesQuery } from '../redux/api/api'
import { useError, useSocketsEvents } from '../Hooks/Hook'
import { useInfiniteScrollTop } from '6pp'
import { useDispatch } from 'react-redux'
import { removeNewMessagesAlert } from '../redux/reducers/chat'



const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null)
  const socket = getSocket()
  const dispatch = useDispatch()

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [page, setPage] = useState(1)
  const [fileMenuAnchor, setIsFileMenuAnchor] = useState(null)

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId })

  const oldMessagesChunk = useGetAllMessagesQuery({ chatId, page })

  const {data: oldMessages, setData: setOldMessages} = useInfiniteScrollTop(
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

  useEffect(()=> {
    dispatch(removeNewMessagesAlert(chatId))
    return ()=>{
      setMessages("")
      setMessages([])
      setOldMessages([])
      setPage(1)
    }
  },[chatId])

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true))
    setIsFileMenuAnchor(e.currentTarget)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (!message.trim()) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message })
    setMessage("")
  }

  const newMessagesHandler = useCallback((data) => {
    if(data.chatId !== chatId) return
    setMessages((prev) => [...prev, data.message])
  }, [chatId])

  const eventHandler = { [NEW_MESSAGE]: newMessagesHandler }

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
            onChange={(e) => setMessage(e.target.value)} />

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