import { useInputValidation } from '6pp';
import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { SampleUsers } from '../../constants/SampleData';
import UserItem from '../shared/UserItem';
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/api/api';
import { useAsyncMutation, useError } from '../../Hooks/Hook';
import { useDispatch } from 'react-redux';
import { setIsNewGroup } from '../../redux/reducers/misc';
import toast from 'react-hot-toast';
const NewGroup = () => {
  const groupName = useInputValidation()
  const dispatch = useDispatch()

  const { isError, isLoading, error, data } = useAvailableFriendsQuery()
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation)

  const [selectedMembers, setSelectedMembers] = useState([])

  const errors = [{
    isError,
    error
  }]

  useError(errors)

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) => (prev.includes(id))
      ? prev.filter((currentElement) => currentElement !== id) : [...prev, id])
  }

  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required")

    if (selectedMembers.length < 2) return toast.error("Please Select Atleast 3 Members")

      newGroup("Group creating..",{name: groupName.value, members: selectedMembers})
    closeHandler()
  }


  const closeHandler = () => {
    dispatch(setIsNewGroup(false))
  }

  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"} >
        <DialogTitle variant='h4' textAlign={"center"}>New Group</DialogTitle>
        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler} />

        <Typography variant="body1">Members</Typography>
        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((user) => (
              <UserItem user={user} key={user._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(user._id)}
              />
            )))
          }
        </Stack>

        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button  variant='outlined' color='error' onClick={closeHandler}>
            Cancel
          </Button>
          <Button variant='contained' onClick={submitHandler} disabled={isLoadingNewGroup}>Creat</Button>

        </Stack>

      </Stack>
    </Dialog>
  );
}

export default NewGroup