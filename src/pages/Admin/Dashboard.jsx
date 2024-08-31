import { useFetchData } from '6pp'
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Search as SearchIcon
} from '@mui/icons-material'
import { Box, Container, Paper, Skeleton, Stack, Typography } from "@mui/material"
import moment from "moment"
import AdminLayout from '../../components/Layout/AdminLayout'
import { DoughnutChart, LineChart } from '../../components/specifics/Charts'
import { CurveButton, SearchField } from '../../components/styles/StyledComponents'
import { server } from '../../constants/config'
import { useError } from '../../Hooks/Hook'


const Dashboard = () => {
  const { loading, data, error } = useFetchData(`${server}/api/v1/admin/stats`, "dashboard-stats")

  const { stats } = data || {};

  useError([
    {
      isError: error,
      error: error,
    },

  ])

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

  const Widgets = (
    <Stack direction={{
      xs: "column",
      sm: "row"
    }}
      spacing="2rem"
      justifyContent="space-between"
      alignItems={"center"}
      margin={"2rem 0"}>
      <Widget title={"Users"} value={stats?.usersCount} icon={<PersonIcon />} />
      <Widget title={"Chats"} value={stats?.totalChatsCount} icon={<GroupIcon />} />
      <Widget title={"Messages"} value={stats?.messagesCount} icon={<MessageIcon />} />

    </Stack>
  )

  return (
    <AdminLayout>
      {loading ? <Skeleton height={"100vh"}/> : (
        <Container component={"main"}>
          {Appbar}

          <Stack direction={{
            xs: "column",
            lg: "row",
          }}
            sx={{ gap: "2rem" }}
            flexWrap={"wrap"}
            justifyContent={"center"}
            alignItems={{ xs: "center", lg: "stretch" }}>
            <Paper
              elevation={3}
              sx={{
                padding: "2rem 3.5rem",
                borderRadius: "1rem",
                width: "100%",
                maxWidth: "45rem",
              }}
            >
              <Typography margin={"2rem 0"} variant='h4'>Last Messages</Typography>
              <LineChart value={stats?.messagesChart || []} />
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
              }}
            >
              <DoughnutChart
                labels={["Single Chats", "Group Chats"]}
                value={
                  [stats?.totalChatsCount - stats?.groupsCount || 0,
                  stats?.groupsCount || 0]
                } />
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
      )}
    </AdminLayout>
  )
}

const Widget = ({ title, value, icon }) => (

  <Paper
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1rem",
      width: "25rem"
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