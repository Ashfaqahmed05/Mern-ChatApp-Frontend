import { Suspense, lazy, useState } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Tooltip, Backdrop} from '@mui/material'
import { DarkGreen } from '../constants/Color'
import {
  Menu as MenuIcon, Search as SearchIcon, Add as AddIcon,
  Group as GroupIcon, Logout as LogoutIcon, Notifications as NotificationsIcon
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom";

const SearchDialog = lazy(() => import("../specifics/Search"))
const Notification = lazy(() => import("../specifics/Notification"))
const Group = lazy(() => import("../specifics/NewGroup"))

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color='inherit' size='large' onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  )
}

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [isGroup, setIsGroup] = useState(false);

  const navigate = useNavigate();

  const handleDrawer = () => {
    // Add your custom logic here
  };

  const handleSearchValue = () => {
    setIsSearch(!isSearch);
  };

  const openNewGroup = () => {
    setIsGroup(!isGroup);
  };

  const navigatToGroup = () => {
    navigate("/group");
  };

  const openNotification = () => {
    setIsNotification(!isNotification);
  };

  const handleLogout = () => {
    // Add your custom logic here
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
          <IconBtn title={"Search"} icon={<SearchIcon />} onClick={handleSearchValue} />
          <IconBtn title={"New Group"} icon={<AddIcon />} onClick={openNewGroup} />
          <IconBtn title={"Manage Groups"} icon={<GroupIcon />} onClick={navigatToGroup} />
          <IconBtn title={"Notifications"} icon={<NotificationsIcon />} onClick={openNotification} />
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