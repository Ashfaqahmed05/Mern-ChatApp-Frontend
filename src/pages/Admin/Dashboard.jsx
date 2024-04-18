import { AdminPanelSettings as AdminPanelSettingsIcon, Search as SearchIcon,
   Notifications as NotificationsIcon, Group as GroupIcon, Person as PersonIcon, 
   Message as MessageIcon} from '@mui/icons-material'
import { Box, Container, Paper, Stack, Typography } from "@mui/material"
import moment from "moment"
import AdminLayout from '../../components/Layout/AdminLayout'
import { CurveButton, SearchField } from '../../components/styles/StyledComponents'
import { DoughnutChart, LineChart } from '../../components/specifics/Charts'




const Dashboard = () => {

  const Appbar = (
    <Paper elevation={3}
      sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon sx={{ fontSize: "3rem" }} />
        <SearchField />
        <CurveButton>
          <SearchIcon sx={{ color: "white" }} />
        </CurveButton>
        <Box flexGrow={1} />
        <Typography
          display={{
            xs: "none",
            lg: "block",
          }}
          textAlign={"center"}
        >{moment().format("dddd MMMM D YYYY")}
        </Typography>
        <NotificationsIcon />
      </Stack>
    </Paper>
  )

  const Widgets= (
    <Stack direction={{
      xs: "column",
      sm: "row"
    }}
    spacing="2rem"
    justifyContent="space-between"
    alignItems={"center"}
    margin={"2rem 0"}>
      <Widget title={"Users"} value={34} icon={<PersonIcon/>}/>
      <Widget title={"Chats"} value={3} icon={<GroupIcon/>} />
      <Widget title={"Messages"} value={634} icon={<MessageIcon/>} />

    </Stack>
  )

  return (
    <AdminLayout>
      <Container component={"main"}>
        {Appbar}

        <Stack direction={"row"} spacing={"2rem"} flexWrap={"wrap"}>
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "45rem",
              height: "25rem"
            }}
          >
            <Typography margin={"2rem 0"} variant='h4'>Last Messages</Typography>
            <LineChart value={[2,57,2,8]}/>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              position: "relative",
              width: "100%",
              maxWidth: "25rem",
              height: "25rem"
            }}
          >
            <DoughnutChart />
            <Stack
            position={"absolute"}
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={"0.5rem"}
            width={"100%"}
            height={"100%"}
            >
              <GroupIcon /> <Typography>Vs</Typography> <PersonIcon />

            </Stack>
          </Paper>
        </Stack>
            {Widgets}
      </Container>
    </AdminLayout>
  )
}

const Widget = ({title, value, icon}) => (

<Paper 
sx={{
  padding: "2rem",
  margin: "2rem 0",
  borderRadius: "1rem",
  width: "28rem"
}}>
  <Stack alignItems={"center"} spacing={"1rem"}>
    <Typography
    sx={{
      color: "rgba(0,0,0,0.7)",
      border: "5px solid rgba(0,0,0,0.9)",
      borderRadius: "50%",
      width: "5rem",
      height: "5rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    >{value}</Typography>
    <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>{icon}</Stack>
    <Typography>{title}</Typography>

  </Stack>
</Paper>
) 

export default Dashboard