import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from '@mui/material'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsFileMenu, setUploadLoader } from '../../redux/reducers/misc'
import { AudioFile as AudioFileIcon, Image as ImageIcon, UploadFile as UploadFileIcon, VideoFile as VideoFileIcon } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { useSendAttachmentMutation } from '../../redux/api/api'

const FileMenu = ({ anchorEl, chatId }) => {
  const { isFileMenu } = useSelector((state) => state.misc)
  const imageRef = useRef(null)
  const audioRef = useRef(null)
  const videoRef = useRef(null)
  const fileRef = useRef(null)

  const [sendAttachements] = useSendAttachmentMutation()

  const dispatch = useDispatch()

  const selectRef = (ref) => {
    ref.current?.click()
  }

  const fileChangeHandler = async (e, key) => {
    const files = Array.from(e.target.files)

    if(files.length <= 0) return;

    if(files.length > 5) 
      return toast.error(`You can only send 5 ${key} at a time`);

    dispatch(setUploadLoader(true))

    const toastId = toast.loading(`Sending ${key}...`)
    closeFileMenu()

    try {
      const myForm = new FormData()
      myForm.append("chatId", chatId )
      files.forEach((file) => myForm.append("files", file))

      const res = await sendAttachements(myForm) 
      if(res.data) toast.success(`${key} sent successfully`, {
        id: toastId })
        else toast.error(`Failed to send ${key}`, {
          id: toastId
        })
      
    } catch (error) {
      toast.error(error, {id: toastId})
    } finally{
      dispatch(setUploadLoader(false))
    }


  }

  const closeFileMenu = () => dispatch(setIsFileMenu(false))

  return (
    <Menu anchorEl={anchorEl} open={isFileMenu} onClose={closeFileMenu}>
      <div style={{
        width: "10rem",
      }}>
        <MenuList>
          <MenuItem onClick={() => selectRef(imageRef)}>
            <Tooltip title={"image"}>
              <ImageIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>
              Image
            </ListItemText>
            <input type="file" multiple accept='image/png, image/jpeg, image/gif'
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Images")}
              ref={imageRef} />
          </MenuItem>



          <MenuItem onClick={() => selectRef(audioRef)}>
            <Tooltip title={"audio"}>
              <AudioFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>
              Audio
            </ListItemText>
            <input type="file" multiple accept='audio/mpeg, audio/wav, audio/ogg'
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Audios")}
              ref={audioRef} />
          </MenuItem>



          <MenuItem onClick={() => selectRef(videoRef)}>
            <Tooltip title={"video"}>
              <VideoFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>
              Video
            </ListItemText>
            <input type="file" multiple accept='video/mp4, video/webm, video/ogg'
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Videos")}
              ref={videoRef} />
          </MenuItem>

          <MenuItem onClick={() => selectRef(fileRef)}>
            <Tooltip title={"file"}>
              <UploadFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>
              Upload File
            </ListItemText>
            <input type="file" multiple accept='*'
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Files")}
              ref={fileRef} />
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  )
}

export default FileMenu