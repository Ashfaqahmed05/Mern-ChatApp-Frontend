import {
  Add as AddIcon,
  Group as GroupIcon, Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon
} from "@mui/icons-material";
import { AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import { Suspense, lazy, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { DarkGreen } from '../../constants/Color';
import { userNotExists } from '../../redux/reducers/auth';
import { server } from "../../constants/config";
import { setIsMobile, setIsNotification, setIsSearch } from "../../redux/reducers/misc";
import { resetNotificationCount } from "../../redux/reducers/chat";

const SearchDialog = lazy(() => import("../specifics/Search"))
const Notification = lazy(() => import("../specifics/Notification"))
const Group = lazy(() => import("../specifics/NewGroup"))

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color='inherit' size='large' onClick={onClick}>
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  )
}

const Header = () => {
  const { isNotification, isSearch } = useSelector((state) => state.misc)
  const { NotificationCount } = useSelector((state) => state.chat)


  const [isGroup, setIsGroup] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleDrawer = () => {
    dispatch(setIsMobile(true))
  };

  const handleOpenSearch = () => {
    dispatch(setIsSearch(true))
  };

  const openNewGroup = () => {
    setIsGroup(!isGroup);
  };

  const navigatToGroup = () => {
    navigate("/group");
  };

  const openNotification = () => {
    dispatch(setIsNotification(true))
    dispatch(resetNotificationCount())
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      })
      dispatch(userNotExists())
      toast.success(data.message)

    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    }
  };

  return (
    <Box sx={{ flexGrow: 1, height: "4rem" }}>
      <AppBar position="static" sx={{ bgcolor: DarkGreen }}>
        <Toolbar>
          <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
            ChatApp!
          </Typography>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton color="inherit" onClick={handleDrawer}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Box flexGrow={1} />
          <IconBtn title={"Search"} icon={<SearchIcon />} onClick={handleOpenSearch} />
          <IconBtn title={"New Group"} icon={<AddIcon />} onClick={openNewGroup} />
          <IconBtn title={"Manage Groups"} icon={<GroupIcon />} onClick={navigatToGroup} />
          <IconBtn title={"Notifications"} value={NotificationCount} icon={<NotificationsIcon />} onClick={openNotification} />
          <IconBtn title={"Logout"} icon={<LogoutIcon />} onClick={handleLogout} />
        </Toolbar>
      </AppBar>
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <Notification />
        </Suspense>
      )}
      {isGroup && (
        <Suspense fallback={<Backdrop open />}>
          <Group />
        </Suspense>
      )}
    </Box>
  );
};

export default Header;