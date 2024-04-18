import { useRef } from 'react'
import { Stack, IconButton } from '@mui/material'
import AppLayout from '../components/Layout/AppLayout'
import { DarkGreen, grayColor } from '../components/constants/Color'
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material'
import { InputBox } from '../components/styles/StyledComponents'
import FileMenu from '../components/dialogs/FileMenu'
import { sampleMessage } from '../components/constants/SampleData'
import MessageComponent from '../components/shared/MessageComponent'

const user = {
  _id: "asasas0",
  name: "Ashfaq"
}

const Chat = () => {
  const containerRef = useRef(null)

  return (
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
          sampleMessage.map(i => (
            <MessageComponent key={i._id} message={i} user={user} />
          ))
        }
      </Stack>

      <form style={{
        height: "10%"
      }}  >

        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton 
          sx={{
            position:  "absolute",
            left: "1.5rem",
            rotate: "30deg"
          }}
          
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder='Type message here'/>

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
      <FileMenu />
    </>
  )
}

export default AppLayout()(Chat);