import { Container, Paper, TextField, Typography, Button, Stack, Avatar, IconButton } from "@mui/material"
import {  useInputValidation, useFileHandler} from "6pp"
import {Navigate} from "react-router-dom"

const isAdmin = true

const AdminLogin = () => {


    const secretKey = useInputValidation("")

    const submitHandler =(e) =>{
       e.preventDefault()
    }

    if(isAdmin) return <Navigate to="/admin/dashboard" />


  return (
    <Container component={"main"} maxWidth="sx" sx={
        { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Paper elevation={3} sx={{ padding: 4, display: "flex", flexDirection: "column", alignItems: "center", width: "400px" }}>
            
                    <Typography variant="h5">Admin Login</Typography>
                    <form onSubmit={submitHandler}>
                        <TextField required fullWidth
                            label="Secret Key"
                            type="password"
                            margin="normal"
                            variant="outlined" 
                            value={secretKey.value}
                            onChange={secretKey.changeHandler}/>
                        <Button  sx={{marginBottom:"5px"}} variant="contained" fullWidth color="primary" type="submit">Login</Button>
                    </form>

        </Paper>

    </Container>
  )
}

export default AdminLogin