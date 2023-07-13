import * as React from 'react';
import { DataGrid, GridAddIcon, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import CreateIcon from '@mui/icons-material/Create';
import { DeleteOutline } from '@mui/icons-material';

const URL = 'http://localhost:3000/api/admin/birthdays';

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
      width: 200,
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

        const onDelete = (e) => {
          e.stopPropagation();
          const confirm = window.confirm('Are you sure you want to delete this birthday?');
          if (!confirm) return;
          axios
            .delete(URL + `/${params.row.number}`)
            .then((res) => {
              setBirthdays((prev) => prev.filter((bday) => bday.number !== params.row.number));
            })
            .catch((err) => {
              console.log({ err });
            });
        };

        return (
          <React.Fragment>
            <Button
              onClick={onClick}
              startIcon={<CreateIcon />}
              variant="contained"
              sx={{ fontSize: 12, m: 1 }}
              color="primary"
            >
              Edit
            </Button>
            <Button
              onClick={onDelete}
              startIcon={<DeleteOutline />}
              variant="contained"
              sx={{ fontSize: 12, m: 1 }}
              color="error"
            >
              Delete
            </Button>
          </React.Fragment>
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
      />
    </div>
  );
}
