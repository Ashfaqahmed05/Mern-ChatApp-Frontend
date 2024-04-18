import { useInputValidation } from '6pp';
import { Button, Dialog, DialogTitle, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { SampleUsers } from '../constants/SampleData';
import UserItem from '../shared/UserItem';
const NewGroup = () => {
  const groupName = useInputValidation()
  const [members, setMembers] = useState(SampleUsers)
  const [selectedMembers, setSelectedMembers]  = useState([])


  const selectMemberHandler = (id) => {
      setSelectedMembers((prev) => (prev.includes(id))
      ? prev.filter((currentElement)=> currentElement !== id) : [...prev, id])
  }
  console.log(selectedMembers)

  const submitHandler = () => { }

  const closeHandler = ()=> { }


  return (
    <Dialog open onClose={closeHandler}>
     <Stack p={{xs: "1rem", sm: "3rem"}} width={"25rem"} spacing={"2rem"} >
       <DialogTitle variant='h4' textAlign={"center"}>New Group</DialogTitle>
       <TextField 
       label="Group Name"
       value={groupName.value} 
       onChange={groupName.changeHandler}/>

<Typography variant="body1">Members</Typography>
        <Stack>
        {members.map((user) =>(
            <UserItem user={user} key={user._id} 
            handler={selectMemberHandler} 
            isAdded={selectedMembers.includes(user._id)}
            />
          ))
          }
        </Stack>

        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button 
          variant='outlined' 
          color='error'>
            Cancel
            </Button>
          <Button variant='contained' onClick={submitHandler}>Creat</Button>

        </Stack>
 
     </Stack>
    </Dialog>
   );
}

export default NewGroup