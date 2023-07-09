import * as React from 'react';
import { DataGrid, GridAddIcon, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import CreateIcon from '@mui/icons-material/Create';

const URL = 'http://localhost:3000/api/v1/admin/bdays';

export default function DataTable() {
  const [birthdays, setBirthdays] = React.useState([]);
  const router = useRouter();
  const getBirthdays = () => {
    axios
      .get(URL)
      .then((res) => {
        setBirthdays(res.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  React.useEffect(() => {
    getBirthdays();
  }, []);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'username', headerName: 'Username', width: 130 },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'month', headerName: 'Month', width: 130 },
    { field: 'year', headerName: 'Year', width: 130 },
    { field: 'place', headerName: 'Place', width: 130 },
    { field: 'number', headerName: 'Number', width: 130 },
    {
      field: 'dob',
      headerName: 'Date of Birth',
      width: 130,
      sortable: false,
      valueGetter: (params: GridValueGetterParams) => `${params.row.date}/${params.row.month}/${params.row.year}`,
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        const href = `/admin/birthdays/${params.row.number}/edit`;

        const onClick = (e) => {
          e.stopPropagation();
          router.push(
            {
              pathname: href,
              query: { bday: JSON.stringify(params.row) },
            },
            href
          );
        };
        return (
          <Button
            onClick={onClick}
            startIcon={<CreateIcon />}
            variant="contained"
            sx={{ height: 30, fontSize: 12 }}
            color="primary"
          >
            Edit
          </Button>
        );
      },
    },
  ];

  return (
    <div style={{ height: 'auto', width: '100%' }}>
      <Button
        onClick={() => router.push('birthdays/create')}
        variant="contained"
        startIcon={<GridAddIcon />}
        sx={{ marginBottom: 3 }}
      >
        Add Birthday
      </Button>
      <DataGrid
        rows={birthdays}
        columns={columns}
        getRowId={(row) => row.number}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[10, 5]}
        checkboxSelection
      />
    </div>
  );
}
