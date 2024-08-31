import AdminLayout from "../../components/Layout/AdminLayout"
import Table from "../../components/shared/Table"
import { useEffect, useState } from "react"
import { fileFormat, transformImage } from "../../lib/features"
import moment from "moment"
import { Avatar, Box, Stack } from "@mui/material"
import { dashboardData } from "../../constants/SampleData"
import RenderAttachment from "../../components/shared/RenderAttachment"
import { server } from "../../constants/config"
import { useFetchData } from "6pp"
import { useError } from "../../Hooks/Hook"

const columns = [{
  field: "id",
  headerName: "ID",
  headerClassName: "table-header",
  width: 200,
},
{
  field: "attachments",
  headerName: "Attachments",
  headerClassName: "table-header",
  width: 200,
  renderCell: (params) => {

    const { attachments } = params.row;
    return attachments?.length > 0 ? attachments.map((i, index) => {
      const url = i.url;
      const file = fileFormat(url);

      return (
        <Box key={index}>
          <a href={url}
            download
            target="_blank"
            style={{
              color: "black"
            }}>
            {RenderAttachment(file, url)}
          </a>
        </Box>
      )
    }) : "No Attachment";

  },
},
{
  field: "content",
  headerName: "Content",
  headerClassName: "table-header",
  width: 400,
  renderCell: (params) => {
    return params.row.content ? (
      <Box>
        <span>{params.row.content}</span>
      </Box>
    ) : (
      <span>No Message</span>
    );
  }
},
{
  field: "sender",
  headerName: "Send By",
  headerClassName: "table-header",
  width: 200,
  renderCell: (params) => (
    <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
      <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
      <span>{params.row.sender.name}</span>
    </Stack>
  ),
},
{
  field: "chat",
  headerName: "Chat",
  headerClassName: "table-header",
  width: 220,
},
{
  field: "groupChat",
  headerName: "Group Chat",
  headerClassName: "table-header",
  width: 100,
},
{
  field: "createdAt",
  headerName: "Time",
  headerClassName: "table-header",
  width: 230,
},
]



const MessageManagement = () => {
  const { loading, data, error } = useFetchData(`${server}/api/v1/admin/messages`, "dashboard-messages")

  useError([
    {
      isError: error,
      error: error,
    },

  ])
  const [rows, setRows] = useState([])
  console.log(data);
  

  useEffect(() => {
    if (data) {
      setRows(
        data.messages.map((i) => ({
          ...i,
          id: i._id,
          sender: {
            name: i.sender.name,
            avatar: transformImage(i.sender.avatar, 50)
          },
          createdAt: moment(i.createdAt).format("MMM DO YYYY, h:mm:ss a")
        }))
      )
    }
  }, [data])
  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"}/>
      ) : (
        <Table heading={"All Messages"} columns={columns} rows={rows} rowHeight={200} />
      )}

    </AdminLayout>
  )
}

export default MessageManagement