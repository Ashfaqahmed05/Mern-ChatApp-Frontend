import { useInputValidation } from "6pp"
import { Button, Container, Paper, TextField, Typography } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { adminLogin, getAdmin } from "../../redux/thunks/admin"

const AdminLogin = () => {

  const { isAdmin } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const secretKey = useInputValidation("")

    const submitHandler =(e) =>{
       e.preventDefault()
       dispatch(adminLogin(secretKey.value))
    }

    useEffect(()=> {
      dispatch(getAdmin())
    },[dispatch])

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