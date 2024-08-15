import {
  Add as AddIcon, Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon
} from "@mui/icons-material";
import { Box, Button, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { matBlack } from '../constants/Color';
import AvatarCard from '../components/shared/AvatarCard';
import { Link } from "../components/styles/StyledComponents";

import { SampleUsers, sampleChats } from "../constants/SampleData";
import AddMemberDialog from '../components/dialogs/AddMemberDialog';
import ConfirmDeleteDialog from '../components/dialogs/ConfirmDeleteDialog';
import UserItem from '../components/shared/UserItem';

const isAddMember = false;

const Group = () => {
  const chatId = useSearchParams()[0].get("group")
  const navigate = useNavigate()

  const [isMobile, setIsMobile] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const [groupName, setGroupName] = useState()
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState()
  const [confirmDeleteDialog, setConfirmDeleteDailog] = useState(false)


  const navigateBack = () => {
    navigate("/")
  }


  const handleMobile = () => {
    setIsMobile((prev) => !prev)
  }

  const handleMobileClose = () => setIsMobile(false)

  const updateGroupName = () => {
    setGroupName(groupNameUpdatedValue.trim())
    setIsEdit(false)
    console.log("update group name");
  }

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDailog(true)
  }

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDailog(false)
  }

  const openAddMemberHandler = () => {

  }

  const deleteHandler = () => {
    console.log("delete group");
  }

  const removeMemberHandler = (id) => {
    console.log(id, "remove member");
  }


  const IconBtns = <>
    <Box sx={{
      display: {
        xs: "block",
        sm: "none",
        position: "fixed",
        right: "1rem",
        top: "1rem"
      }
    }}>
      <IconButton onClick={handleMobile}>
        <MenuIcon />
      </IconButton>
    </Box>
    <Tooltip title="back">
      <IconButton sx={{
        position: "absolute",
        top: "2rem",
        left: "2rem",
        bgcolor: matBlack,
        color: "white",
        ":hover": { bgcolor: "#303030" }
      }}
        onClick={navigateBack}>
        <KeyboardBackspaceIcon />
      </IconButton>
    </Tooltip>
  </>

  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name${chatId}`)
      setGroupNameUpdatedValue("group Name")
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false)
    }

  }, [chatId])

  const GroupName = <>
    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={"1rem"} padding={"3rem"}>
      {
        isEdit ? <>
          <TextField value={groupNameUpdatedValue} onChange={(e) => setGroupNameUpdatedValue(e.target.value)} />
          <IconButton onClick={updateGroupName}>
            <DoneIcon />
          </IconButton>
        </> : <>
          <Typography variant='h4'>{groupName}</Typography>
          <IconButton onClick={() => { setIsEdit(true) }}>
            <EditIcon />
          </IconButton>
        </>
      }
    </Stack>
  </>

  const ButtonGroup = (
    <Stack
      direction={{
        sm: "row",
        xs: "column-reverse",
      }}
      spacing={"1rem"}
      p={{
        xs: "0",
        sm: "1rem",
        md: "1rem 4rem",
      }}
    >
      <Button
        size='large'
        color='error'
        variant={"outlined"}
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}
      >
        DELETE GROUP
      </Button>
      <Button
        size='large'
        variant='contained'
        startIcon={<AddIcon />}
        onClick={openAddMemberHandler}
      >
        ADD MEMBER
      </Button>

    </Stack>
  )


  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block"
          }
        }}
        sm={4}
        bgcolor={"bisque"}
      >
        <GroupList myGroups={sampleChats} chatId={chatId} />
      </Grid>

      <Grid item xs={12} sm={8} sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        padding: "1rem 3rem"

      }}>
        {IconBtns}
        {groupName && <>

          {GroupName}

          <Typography
            margin={"2rem"}
            alignSelf={"flex-start"}
            variant='body1'
          >
            Members
          </Typography>

          <Stack
            maxWidth={"45rem"}
            width={"100%"}
            boxSizing={"border-box"}
            padding={{
              sm: "1rem",
              xs: "0",
              md: "1rem 4rem"
            }}
            spacing={"2rem"}
            height={"50vh"}
            overflow={"auto"}
          >
            {/* Members */}
            {SampleUsers.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                isAdded
                styling={{
                  boxShadow: "0 0 0.5rem 0.5rem rgba(0,0,0,0.2)",
                  padding: "1rem 2rem",
                  borderRadius: "1rem",
                }}
                handler={removeMemberHandler}
              />
            ))}


          </Stack>

          {ButtonGroup}

        </>}
      </Grid>
      {isAddMember && (<AddMemberDialog />)}

      {confirmDeleteDialog && (
        <ConfirmDeleteDialog
          open={confirmDeleteDialog}
          handleClose={closeConfirmDeleteHandler}
          deleteHandle={deleteHandler} />
      )}

      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          }
        }}
        open={isMobile}
        onClose={handleMobileClose}>
        <GroupList width={"50vw"} myGroups={sampleChats} chatId={chatId} />
      </Drawer>
    </Grid>


  )
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => (


  <Stack 
  width={w}
  sx={{
    height: "100vh"
  }}
  overflow={"auto"}
  >
    {myGroups.length > 0 ? (
      myGroups.map((group) => <GroupListItem group={group} chatId={chatId} key={group._id} />)
    ) : (
      <Typography textAlign={"center"} padding={"1rem"}>No groups yet.</Typography>
    )}
  </Stack>
)

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group

  const handleClick = (e) => {
    if (chatId === _id) {
      e.preventDefault();
    }
  };

  return <Link to={`?group=${_id}`} onClick={handleClick}>
    <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
      <AvatarCard avatar={avatar} />
      <Typography>{name}</Typography>
    </Stack>
  </Link>
})

export default Group