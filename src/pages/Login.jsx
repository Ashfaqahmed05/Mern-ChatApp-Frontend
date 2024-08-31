import { useFileHandler, useInputValidation } from "6pp"
import { CameraAlt as CameraAltIcon } from "@mui/icons-material"
import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { VisuallyHiddenInput } from "../components/styles/StyledComponents"
import { server } from "../constants/config"
import { userExists } from "../redux/reducers/auth"
import { usernameValidator } from "../utils/validators"


const Login = () => {

    const [isLogin, setIsLogin] = useState(true)
    const [isLoading, setIsloading] = useState(false)

    const toggleLogin = () => setIsLogin((prev) => !prev)

    const dispatch = useDispatch()

    const name = useInputValidation("")
    const bio = useInputValidation("")
    const username = useInputValidation("", usernameValidator)
    const password = useInputValidation("")

    const avatar = useFileHandler("single", 2)

    const handleSignin = async (e) => {
        e.preventDefault()
        setIsloading(true)
        const toastId = toast.loading("Logging In...")

        const config = {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            }
        };
        try {
            const {data} = await axios.post(`${server}/api/v1/user/login`, {
                username: username.value,
                password: password.value,
            },
                config
            )
            dispatch(userExists(data.user))

            toast.success(data.message, {
                id: toastId
            })
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong", {
                id: toastId
            })
        } finally {
            setIsloading(false)
        }

    }

    const handleSignup = async (e) => {
        e.preventDefault()
        setIsloading(true)
        const toastId = toast.loading("Signing Up...")

        const formData = new FormData();
        formData.append("avatar", avatar.file);
        formData.append("name", name.value);
        formData.append("bio", bio.value);
        formData.append("username", username.value);
        formData.append("password", password.value);

        const config = {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data"
            },
        };
        try {
            const { data } = await axios.post(`${server}/api/v1/user/new`, formData, config)
            dispatch(userExists(data.user))
            toast.success(data.message, {
                id: toastId
            })
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong", {
                id: toastId
            })
        } finally {
            setIsloading(false)
        }


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
                                onChange={username.changeHandler} />


                            <TextField required fullWidth
                                label="Password"
                                type="password"
                                margin="normal"
                                variant="outlined"
                                value={password.value}
                                onChange={password.changeHandler} />
                            <Button sx={{ marginBottom: "5px" }} variant="contained" fullWidth color="primary" disabled={isLoading} type="submit">Login</Button>
                        </form>
                        <Typography>OR</Typography>
                        <Button fullWidth varient="text" disabled={isLoading} onClick={toggleLogin}>Sign Up Instead</Button>
                    </>
                ) : (
                    <>
                        <Typography variant="h5">Sign Up</Typography>
                        <form onSubmit={handleSignup}>
                            <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                                <Avatar
                                    sx={{ width: "10rem", height: "10rem", objectFit: "contain" }}
                                    src={avatar.preview}
                                />
                                <IconButton sx={{
                                    position: "absolute",
                                    bottom: "0",
                                    right: "0",
                                    color: "white",
                                    bgcolor: "rgba(0,0,0,0.5)",
                                    ":hover": {
                                        bgcolor: "rgba(0,0,0,0.7)"
                                    }
                                }} component="label">
                                    <CameraAltIcon />
                                    <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
                                </IconButton>
                            </Stack>
                            {
                                avatar.error && (<Typography m={"1rem auto"} width={"fit-content"} display={"block"} color='red' variant="caption">{avatar.error}</Typography>)
                            }

                            <TextField required fullWidth
                                label="Name"
                                margin="normal"
                                variant="outlined"
                                value={name.value}
                                onChange={name.changeHandler} />


                            <TextField required fullWidth
                                label="Bio"
                                type="text"
                                margin="normal"
                                variant="outlined"
                                value={bio.value}
                                onChange={bio.changeHandler} />

                            <TextField required fullWidth
                                label="Username"
                                margin="normal"
                                variant="outlined"
                                value={username.value}
                                onChange={username.changeHandler} />
                            {
                                username.error && (<Typography color='red' variant="caption">{username.error}</Typography>)
                            }

                            <TextField required fullWidth
                                label="Password"
                                type="password"
                                margin="normal"
                                variant="outlined"
                                value={password.value}
                                onChange={password.changeHandler} />

                            <Button sx={{ marginBottom: "5px" }} variant="contained" fullWidth color="primary" disabled={isLoading} type="submit">Sign Up</Button>
                        </form>
                        <Typography>OR</Typography>
                        <Button fullWidth varient="text" disabled={isLoading} onClick={toggleLogin}>Login Instead</Button>
                    </>
                )}

            </Paper>

        </Container>
    )
}

export default Login