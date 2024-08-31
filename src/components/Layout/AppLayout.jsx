import { Drawer, Grid, Hidden, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useError, useSocketsEvents } from "../../Hooks/Hook";
import { useMyChatsQuery } from "../../redux/api/api";
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from "../../redux/reducers/misc";
import Title from "../shared/Title";
import ChatList from "../specifics/ChatList";
import Profile from "../specifics/Profile";
import Header from "./Header";
import { getSocket } from "../../socket";
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from "../../constants/events";
import { useCallback, useEffect, useRef, useState } from "react";
import { increamentNotification, setNewMessagesAlert } from "../../redux/reducers/chat";
import { getOrSaveFromLoclStorage } from "../../lib/features";
import DeleteChatMenu from "../dialogs/DeleteChatMenu";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    const { isMobile } = useSelector((state) => state.misc)
    const { user } = useSelector((state) => state.auth)
    const { newMessagesAlert } = useSelector((state) => state.chat)

    const [onlineUsers, setOnlineUsers] = useState([])

    const socket = getSocket()
    const params = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const chatId = params.id;
    const deleteMenuAnchor = useRef(null);


    const handleDeleteChat = (e, ChatId, groupChat) => {
      e.preventDefault()
      dispatch(setIsDeleteMenu(true))
      dispatch(setSelectedDeleteChat({ chatId, groupChat }))
      deleteMenuAnchor.current = e.currentTarget
    }

    const newMessagesAlertListner = useCallback((data) => {
      if (data.chatId === chatId) return
      dispatch(setNewMessagesAlert(data))
    }, [chatId])

    const newRequestListner = useCallback(() => {
      dispatch(increamentNotification())
    }, [dispatch])

    const refetchListner = useCallback(() => {
      refetch()
      navigate("/")
    }, [refetch, navigate])

    const onlineUsersListner = useCallback((data) => {
      setOnlineUsers(data)
    }, [])

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessagesAlertListner,
      [NEW_REQUEST]: newRequestListner,
      [REFETCH_CHATS]: refetchListner,
      [ONLINE_USERS]: onlineUsersListner,
    }
    useError([{ isError, error }])

    useEffect(() => {
      getOrSaveFromLoclStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert })
    }, [newMessagesAlert])

    useSocketsEvents(socket, eventHandlers)

    const handleMobileClose = () => dispatch(setIsMobile(false))

    return (
      <div>
        <Title />
        <Header />
        <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor.current} />
        {isLoading ? <Skeleton /> :
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList w="70vw"
              chats={data?.transformedChats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert} />
            onlineUsers={onlineUsers}
          </Drawer>
        }

        <Grid container height={"calc(100vh - 4rem)"} sx={{overflow: "hidden"}}>
          <Grid item
            sm={4} md={3}
            sx={{ display: { xs: "none", sm: "block" } }}
            height={"100%"}
            bgcolor={"#ebeeef"}
          >
            {isLoading ? <Skeleton /> :
              <ChatList chats={data?.transformedChats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
                onlineUsers={onlineUsers} />}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>
          <Grid item md={4} lg={3} sx={{
            display: { xs: "none", md: "block" },
            padding: "2rem",
            overflow: "auto"
          }} height={"100%"} bgcolor={"#131212"}>
            <Profile user={user} />
          </Grid>
        </Grid>
      </div>

    );
  };
};

export default AppLayout