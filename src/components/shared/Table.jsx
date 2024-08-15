import { Paper, Typography, Container } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid";
import { matBlack } from "../../constants/Color"
import { ThemeProvider } from "@mui/material/styles"


// const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'firstName', headerName: 'First name', width: 130 },
//     { field: 'lastName', headerName: 'Last name', width: 130 },
//     {
//         field: 'age',
//         headerName: 'Age',
//         type: 'number',
//         width: 90,
//     },
//     {
//         field: 'fullName',
//         headerName: 'Full name',
//         description: 'This column has a value getter and is not sortable.',
//         sortable: false,
//         width: 160,
//         valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
//     },
// ];


const Table = ({ rows, columns, heading, rowHeight = 52 }) => {

    

    return (
        <Container
            sx={{
                height: "100vh",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: "1rem 4rem",
                    borderRadius: "1rem",
                    margin: "auto",
                    width: "100%",
                    overflow: "hidden",
                    height: "100%",
                    boxShadow: "none",
                }}
            >
                <Typography
                    textAlign={"center"}
                    variant="h4"
                    sx={{
                        margin: "2rem",
                        textTransform: "uppercase",
                    }}
                >
                    {heading}
                </Typography>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowHeight={rowHeight}
                    style={{
                        height: "80%",
                    }}
                    sx={{
                        border: "none",
                        ".table-header": {
                            bgcolor: matBlack,
                            color: "white",
                        },
                    }}
                    
                />
            </Paper>
        </Container>
    );
};

export default Table;