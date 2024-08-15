import { Stack, Avatar, Typography } from '@mui/material'
import { Face as FaceIcon, AlternateEmail as UserNameIcon, CalendarMonth as CalenderIcon } from "@mui/icons-material"
import moment from "moment"
import { transformImage } from '../../lib/features'

const Profile = ({ user }) => {


    return (
        <Stack spacing={"2rem"} direction={"column"} alignItems="center" paddingTop={"1rem"}>
            <Avatar
                src={transformImage(user?.avatar?.url)}
                sx={{
                    width: 180,
                    height: 180,
                    objectFit: "contain",
                    marginBottom: "1rem",
                    border: "5px solid white"
                }} />

            <ProfileCard heading={"Bio"} text={user?.bio} />
            <ProfileCard heading={"Username"} text={user?.username} Icon={<UserNameIcon />} />
            <ProfileCard heading={"name"} text={user?.name} Icon={<FaceIcon />} />
            <ProfileCard heading={"Joined"} text={moment(user?.createdAt).fromNow()} Icon={<CalenderIcon />} />




        </Stack>
    )

}

const ProfileCard = ({ text, Icon, heading }) => (
    <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        color={"white"}
        textAlign={"center"}
    >
        {Icon && Icon}
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