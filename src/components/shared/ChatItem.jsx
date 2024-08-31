// ChatItem.jsx
import { Box, Stack, Typography } from "@mui/material"
import { motion } from "framer-motion"
import { memo } from "react"
import { Link } from "../styles/StyledComponents"
import AvatarCard from "./AvatarCard"

const ChatItem = ({
    avatar = [],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChatOpen
}) => {
    return (
        <Link style={{
            padding: "0px"
        }}
            to={`/chat/${_id}`}
            onContextMenu={(e) => handleDeleteChatOpen(e, _id, groupChat)}>
            <motion.div
                initial={{ opacity: 0, y: "-100%" }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{delay: index * 0.2}}
                style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                    padding: "1rem",
                    backgroundColor: sameSender ? "black" : "unset",
                    color: sameSender ? "white" : "unset",
                    position: "relative",
                }}
            >

                {/* Pass the max prop to AvatarCard */}
                <AvatarCard avatar={avatar} max={4} />
                <Stack>
                    <Typography>{name}</Typography>
                    {newMessageAlert && (
                        <Typography>{newMessageAlert.count} New Message</Typography>
                    )}
                </Stack>
                {
                    isOnline && <Box sx={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "green",
                        position: "absolute",
                        right: "1rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                    }} />


                }

            </motion.div>

        </Link>
    )
}

export default memo(ChatItem)
