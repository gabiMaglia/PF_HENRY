import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'Nombre', width: 130 },
  { field: 'price', headerName: 'Precio', width: 80 },
  {
    field: 'warranty',
    headerName: 'Garantía',
    type: 'number',
    width: 100,
  },
  {
    field: 'souldCount',
    headerName: 'Vendidos',
    width: 80,
  },
];

const rows = [
  { id: 1, firstName: 'Monitor Lg', price: 120000, warranty: "6 meses", souldCount: 20 },
  { id: 2, firstName: 'Mother Asus', price: 120000, warranty: "12 meses", souldCount: 8 },
  { id: 3, firstName: 'Teclado Logitech', price: 120000, warranty: "3 meses", souldCount: 25 },
  { id: 4, firstName: 'Mouse HyperX', price: 120000, warranty: "12 meses", souldCount: 46 },
  { id: 5, firstName: 'Gabinete Antec', price: 120000, warranty: "6 meses", souldCount: 12 },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}


