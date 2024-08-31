import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAsyncMutation, useError } from '../../Hooks/Hook'
import { useAddGroupMemberMutation, useAvailableFriendsQuery } from '../../redux/api/api'
import { setIsAddMember } from '../../redux/reducers/misc'
import UserItem from '../shared/UserItem'

const AddMemberDialog = ({ chatId }) => {
    const { isAddMember } = useSelector((state) => state.misc)
    const [addGroupMember, isLoadingAddGroupMember] = useAsyncMutation(useAddGroupMemberMutation)
    const {isLoading, data, isError, error} = useAvailableFriendsQuery(chatId)

    const dispatch = useDispatch()

    const [selectedMembers, setSelectedMembers] = useState([])



    const selectMemberHandler = (id) => {
        setSelectedMembers((prev) => (prev.includes(id))
            ? prev.filter((currentElement) => currentElement !== id) : [...prev, id])
    }


    const closeHandler = () => {
        setSelectedMembers([])
        dispatch(setIsAddMember(false))
    }
    const addMemberHandler = () => { 
        addGroupMember("Adding Members...", {members: selectedMembers, chatId})
        closeHandler()
    }
    useError([{isError, error}])

    return (
        <Dialog open={isAddMember} onClose={closeHandler}>
            <Stack p={"2rem"} width={"19rem"} spacing={"2rem"}>
                <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
                <Stack spacing={"1rem"}>
                    {isLoading ? <Skeleton /> : (
                    data?.friends?.length > 0 ? (
                        data?.friends?.map(i => (
                            <UserItem key={i._id} user={i} handler={selectMemberHandler} isAdded={selectedMembers.includes(i._id)} />
                        ))) : (
                        <Typography>No members found</Typography>
                    )
                    )}
                </Stack>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Button color='error' onClick={closeHandler}>CANCEL</Button>
                    <Button onClick={addMemberHandler}
                        variant='contained' disabled={isLoadingAddGroupMember}>Submit Changes </Button>

                </Stack>
            </Stack>
        </Dialog>
    )
}

export default AddMemberDialog