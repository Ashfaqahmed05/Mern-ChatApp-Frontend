import { Drawer, Grid, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useError, useSocketsEvents } from "../../Hooks/Hook";
import { useMyChatsQuery } from "../../redux/api/api";
import { setIsMobile } from "../../redux/reducers/misc";
import Title from "../shared/Title";
import ChatList from "../specifics/ChatList";
import Profile from "../specifics/Profile";
import Header from "./Header";
import { getSocket } from "../../socket";
import { NEW_MESSAGE_ALERT, NEW_REQUEST } from "../../constants/events";
import { useCallback, useEffect } from "react";
import { increamentNotification, setNewMessagesAlert } from "../../redux/reducers/chat";
import { getOrSaveFromLoclStorage } from "../../lib/features";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const { isLoading, data, isError, error } = useMyChatsQuery("");

    const { isMobile } = useSelector((state) => state.misc)
    const { user } = useSelector((state) => state.auth)
    const { newMessagesAlert } = useSelector((state) => state.chat)

    const socket = getSocket()

    const params = useParams();
    const chatId = params.id;
    const dispatch = useDispatch();

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault()
      console.log("Delete Chat", _id, groupChat)
    }

    const newMessagesAlertHandler = useCallback((data) => {
      if (data.chatId === chatId) return
      dispatch(setNewMessagesAlert(data))
     },[chatId])
    
    const newRequestHandler = useCallback(() => {
      dispatch(increamentNotification())
     },[dispatch])


    const eventHandlers = { 
      [NEW_MESSAGE_ALERT]: newMessagesAlertHandler,
      [NEW_REQUEST]: newRequestHandler,

     }
     useError([{ isError, error }])

     useEffect(()=> {
       getOrSaveFromLoclStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert})
     },[newMessagesAlert])

    useSocketsEvents(socket, eventHandlers)

    const handleMobileClose = () => dispatch(setIsMobile(false))

    return (
      <div>
        <Title />
        <Header />
        {isLoading ? <Skeleton /> :
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList w="70vw"
              chats={data?.transformedChats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert} />
          </Drawer>
        }

        <Grid container height={"calc(100vh - 4rem)"} >
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
                newMessagesAlert={newMessagesAlert}/>}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"} >
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>
          <Grid item md={4} lg={3} sx={{
            display: { xs: "none", md: "block" },
          }} height={"100%"} bgcolor={"#131212"}>
            <Profile user={user} />
          </Grid>

        </Grid>

        {/* <div>Footer</div> */}
      </div>

    );
  };
};

export default AppLayout