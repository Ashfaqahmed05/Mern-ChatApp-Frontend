import { Dialog, Stack, List, ListItem, ListItemText, DialogTitle, TextField, InputAdornment } from '@mui/material'
import { useInputValidation } from '6pp'
import { Search as SearchIcon} from "@mui/icons-material"
import UserItem from '../shared/UserItem'
import { useState } from 'react'
import { SampleUsers } from '../constants/SampleData'

const Search = () => {

  const search = useInputValidation()

  let isLoadingSendFriendRequest = false;

  const [users, setUsers] = useState(SampleUsers)
  const addFriendHandler = (id) => {
    console.log(id)
  }


  return (
    <Dialog open>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>
          Find People 
        </DialogTitle>
        <TextField 
        lable="" 
        value={search.value} 
        onchange={search.changeHandler} 
        variant='outlined'
        size='small'
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
            <SearchIcon />
            </InputAdornment>
          )
        }}
        />
        <List>

          {users.map((user) =>(
            <UserItem user={user} key={user._id} handler={addFriendHandler}
            handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))
          }
        </List>

      </Stack>
    </Dialog>
  )
}

export default Search