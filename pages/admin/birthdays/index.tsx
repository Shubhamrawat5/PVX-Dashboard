import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios';

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
];

const URL = 'http://localhost:3000/api/v1/admin/bdays';

export default function DataTable() {
  const [birthdays, setBirthdays] = React.useState([]);
  const getBirthdays = () => {
    axios
      .get(URL)
      .then((res) => {
        console.log({ res: res.data });
        setBirthdays(res.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  React.useEffect(() => {
    getBirthdays();
  }, []);

  return (
    <div style={{ height: 'auto', width: '100%' }}>
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
