import { useState } from "react"
import { Container, Paper, TextField, Typography, Button, Stack, Avatar, IconButton } from "@mui/material"
import {CameraAlt as CameraAltIcon } from "@mui/icons-material"
import { VisuallyHiddenInput } from "../components/styles/StyledComponents"
import {  useInputValidation, useFileHandler} from "6pp"
import { usernameValidator } from "../utils/validators"


const Login = () => {

    const [isLogin, setIsLogin] = useState(true)

    const toggleLogin = () => setIsLogin((prev) => !prev)

    const name = useInputValidation("")
    const contact = useInputValidation("")
    const username = useInputValidation("", usernameValidator)
    const password = useInputValidation("")

    const avatar = useFileHandler("single", 2)

    const handleSignin = (e) => {
            e.preventDefault()
    }

const handleSignup = (e) => {
            e.preventDefault()

    }
    


    return (
        <Container component={"main"} maxWidth="sx" sx={
            { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Paper elevation={3} sx={{ padding: 4, display: "flex", flexDirection: "column", alignItems: "center", width: "400px" }}>
                {isLogin ? (
                    <>
                        <Typography variant="h5">Login</Typography>
                        <form onSubmit={handleSignin}>
                            <TextField required fullWidth
                                label="Username"
                                margin="normal"
                                variant="outlined" 
                                value={username.value}
                                onChange={username.changeHandler}/>
                                

                            <TextField required fullWidth
                                label="Password"
                                type="password"
                                margin="normal"
                                variant="outlined" 
                                value={password.value}
                                onChange={password.changeHandler}/>
                            <Button  sx={{marginBottom:"5px"}} variant="contained" fullWidth color="primary" type="submit">Login</Button>
                        </form>
                        <Typography>OR</Typography>
                        <Button fullWidth varient="text" onClick={toggleLogin}>Sign Up Instead</Button>
                    </>
                ) : (
                    <>
                        <Typography variant="h5">Sign Up</Typography>
                        <form onSubmit={handleSignup}>
                            <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                                <Avatar 
                                sx={{width:"10rem", height:"10rem", objectFit: "contain"}}
                                src={avatar.preview}
                                />
                                 <IconButton  sx={{position: "absolute", 
                                 bottom: "0", 
                                 right: "0", 
                                 color: "white", 
                                 bgcolor: "rgba(0,0,0,0.5)", 
                                 ":hover": {
                                    bgcolor: "rgba(0,0,0,0.7)"
                                 }}} component="label">
                                     <CameraAltIcon /> 
                                     <VisuallyHiddenInput type="file" onChange={avatar.changeHandler}/>
                                 </IconButton> 
                            </Stack>
                            {
                                avatar.error &&  (<Typography m={"1rem auto"} width={"fit-content"} display={"block"}  color='red' variant="caption">{avatar.error}</Typography>)
                            }

                            <TextField required fullWidth
                                label="Name"
                                margin="normal"
                                variant="outlined"
                                value={name.value}
                                onChange={name.changeHandler} />


                            <TextField required fullWidth
                                label="Contact"
                                type="number"
                                margin="normal"
                                variant="outlined"
                                value={contact.value}
                                onChange={contact.changeHandler} />

                            <TextField required fullWidth
                                label="Username"
                                margin="normal"
                                variant="outlined" 
                                value={username.value}
                                onChange={username.changeHandler}/>
                            {
                                username.error &&  (<Typography color='red' variant="caption">{username.error}</Typography>)
                            }

                            <TextField required fullWidth
                                label="Password"
                                type="password"
                                margin="normal"
                                variant="outlined" 
                                value={password.value}
                                onChange={password.changeHandler}/>
                                
                            <Button sx={{marginBottom:"5px"}} variant="contained" fullWidth color="primary" type="submit">Sign Up</Button>
                        </form>
                        <Typography>OR</Typography>
                        <Button fullWidth varient="text" onClick={toggleLogin}>Login Instead</Button>
                    </>
                )}

            </Paper>

        </Container>
    )
}

export default Login