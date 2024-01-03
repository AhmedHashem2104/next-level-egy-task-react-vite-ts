import { DataGrid } from "@mui/x-data-grid";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DataTable({ rows, columns }: any) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
