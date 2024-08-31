import {
  Add as AddIcon, Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon
} from "@mui/icons-material";
import { Box, Button, CircularProgress, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { matBlack } from '../constants/Color';
import AvatarCard from '../components/shared/AvatarCard';
import { Link } from "../components/styles/StyledComponents";

import AddMemberDialog from '../components/dialogs/AddMemberDialog';
import ConfirmDeleteDialog from '../components/dialogs/ConfirmDeleteDialog';
import UserItem from '../components/shared/UserItem';
import {  useChatDetailsQuery, useDeleteChatMutation,  useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from "../redux/api/api";
import { useAsyncMutation, useError } from "../Hooks/Hook";
import { LayoutLoader } from "../components/Layout/Loaders";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../redux/reducers/misc";


const Group = () => {
  const chatId = useSearchParams()[0].get("group")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isAddMember } = useSelector((state) => state.misc)

  const myGroups = useMyGroupsQuery("")

  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  )

  const [updateGroup, isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation)
  const [removeGroupMember, isLoadingRemoveGroupMember] = useAsyncMutation(useRemoveGroupMemberMutation)
  const [deleteGroupChat, isLoadingDeleteGroupChat] = useAsyncMutation(useDeleteChatMutation)



  const [isMobile, setIsMobile] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const [groupName, setGroupName] = useState()
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState()
  const [confirmDeleteDialog, setConfirmDeleteDailog] = useState(false)
  const [members, setMembers] = useState([])

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },]

  useError(errors)

  useEffect(() => {
    const groupData = groupDetails.data
    if (groupData) {
      setGroupName(groupData.chat.name)
      setGroupNameUpdatedValue(groupData.chat.name)
      setMembers(groupData.chat.members)

      return () => {
        setGroupName("")
        setGroupNameUpdatedValue("")
        setMembers([])
        setIsEdit(false)
      }
    }
  }, [groupDetails.data])
  const navigateBack = () => {
    navigate("/")
  }


  const handleMobile = () => {
    setIsMobile((prev) => !prev)
  }

  const handleMobileClose = () => setIsMobile(false)

  const updateGroupName = () => {
    setIsEdit(false)
    updateGroup("Updating Group Name", { chatId, name: groupNameUpdatedValue })
  }

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDailog(true)
  }

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDailog(false)
  }

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true))
  }
  const removeMemberHandler = (userId) => {
    removeGroupMember("Removing Members...", { chatId, userId })
  }

  const deleteHandler = () => {
    deleteGroupChat("Deleting Group...", chatId)
    closeConfirmDeleteHandler()
    navigate("/group")
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
          <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}>
            <DoneIcon />
          </IconButton>
        </> : <>
          <Typography variant='h4'>{groupName}</Typography>
          <IconButton
            disabled={isLoadingGroupName}
            onClick={() => { setIsEdit(true) }}>
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


  return myGroups.isLoading ? <LayoutLoader /> : (
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
        <GroupList myGroups={myGroups?.data?.groups} chatId={chatId} />
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
            {isLoadingRemoveGroupMember ? <CircularProgress /> : members.map((i) => (
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
      {isAddMember && (<AddMemberDialog chatId={chatId}/>)}

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
        <GroupList width={"50vw"} myGroups={myGroups?.data?.groups} chatId={chatId} />
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