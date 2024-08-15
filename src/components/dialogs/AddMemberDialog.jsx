import { Dialog, DialogTitle, Button, Stack, Typography } from '@mui/material'
import { SampleUsers } from '../../constants/SampleData'
import UserItem from '../shared/UserItem'
import { useState } from 'react'

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {

    const [members, setMembers] = useState(SampleUsers)
    const [selectedMembers, setSelectedMembers] = useState([])


    const selectMemberHandler = (id) => {
        setSelectedMembers((prev) => (prev.includes(id))
            ? prev.filter((currentElement) => currentElement !== id) : [...prev, id])
    }




    const closeHandler = () => {
        setSelectedMembers([])
        setMembers([])
    }
    const addMemberHandler = () => { }

    return (
        <Dialog open onClose={closeHandler}>
            <Stack p={"2rem"} width={"19rem"} spacing={"2rem"}>
                <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
                <Stack spacing={"1rem"}>
                    {members.length > 0 ? (
                        SampleUsers.map(i => (
                            <UserItem key={i._id} user={i} handler={selectMemberHandler} isAdded={selectedMembers.includes(i._id)} />
                        ))) : (
                        <Typography>No members found</Typography>
                    )
                    }
                </Stack>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Button color='error' onClick={closeHandler}>CANCEL</Button>
                    <Button onClick={addMemberHandler}
                        variant='contained' disabled={isLoadingAddMember}>SUbMIT CHANGES</Button>

                </Stack>
            </Stack>
        </Dialog>
    )
}

export default AddMemberDialog