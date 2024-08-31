// Home.js
import React from "react";
import AppLayout from "../components/Layout/AppLayout";
import { Box, Typography } from "@mui/material";
import { grayColor } from "../constants/Color";

const Home = () => {
  return (
    <Box sx={{
      bgcolor: grayColor,
      height: 'calc(100vh - 4rem)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
       <Typography textAlign={"center"}>
          Select a friend to chat
      </Typography>
    </Box>
  )
};

export default AppLayout()(Home);
