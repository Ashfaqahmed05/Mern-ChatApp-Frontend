import { Stack, Avatar, Typography} from '@mui/material'
import {Face as FaceIcon, AlternateEmail as UserNameIcon, CalendarMonth as CalenderIcon } from "@mui/icons-material"
import moment from "moment"

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems="center" paddingTop={"1rem"}>
        <Avatar 
        sx={{
            width: 180,
            height: 180,
            objectFit: "contain",
            marginBottom: "1rem",
            border: "5px solid white" 
        }}/>

        <ProfileCard heading={"Bio"} text={"Dummy Text"} />
        <ProfileCard heading={"Username"} text={"Ashu13"} Icon={<UserNameIcon />}/>
        <ProfileCard heading={"name"} text={"Ashfaq"} Icon={<FaceIcon />}/>
        <ProfileCard heading={"Joined"} text={moment("2024-04-06T00:00:00").fromNow()} Icon={<CalenderIcon />}/>




    </Stack>
  )

}

const ProfileCard = ({ text, Icon, heading}) => (
<Stack
direction={"row"}
alignItems={"center"}
spacing={"1rem"}
color={"white"}
textAlign={"center"}
>
    {Icon && Icon }
    <Stack>
        <Typography variant="body1" color={"gray"}>
            {text}
        </Typography>
        <Typography 
        variant="caption" color={"gray"}>
            {heading}
        </Typography>
    </Stack>
</Stack>)

export default Profile