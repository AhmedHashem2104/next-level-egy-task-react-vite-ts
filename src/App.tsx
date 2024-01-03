/* eslint-disable @typescript-eslint/no-explicit-any */
import DataTable from "./components/DataGrid";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Button, Checkbox } from "@mui/material";
import TransitionsModal from "./components/Modal";

const App = () => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<number | null>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [items, setItems] = useState<any>([]);

  const handleCheckboxChange = (id: number) => {
    setItems((prev: any) =>
      prev.map((item: any) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "task", headerName: "Task", width: 250 },
    {
      field: "checked",
      headerName: "Completed",
      width: 170,
      renderCell: (params: GridRenderCellParams) => (
        <div>
          <Checkbox
            checked={params.row?.checked || ""}
            value={params.row.checked}
            onChange={() => handleCheckboxChange(params.row.id)}
          />
          {params.row.checked ? `Completed` : `Not Completed`}
        </div>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 70,
      renderCell: (params: GridRenderCellParams) => (
        <EditIcon
          color="primary"
          style={{
            cursor: `pointer`,
          }}
          onClick={() => {
            setItem(params.row);
            handleOpen();
          }}
        />
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 70,
      renderCell: (params: GridRenderCellParams) => (
        <DeleteIcon
          color="error"
          style={{
            cursor: `pointer`,
          }}
          onClick={() =>
            setItems((prev: any) =>
              prev.filter((v: any) => v.id !== params.row.id)
            )
          }
        />
      ),
    },
  ];

  return (
    <div
      style={{
        display: `flex`,
        flexDirection: `column`,
        width: `100%`,
        alignItems: `center`,
        marginTop: 30,
      }}
    >
      <div
        style={{
          width: `80%`,
        }}
      >
        <Button
          color="primary"
          variant="contained"
          style={{
            marginBottom: 30,
          }}
          onClick={() => {
            setItem(null);
            handleOpen();
          }}
        >
          Add Task
        </Button>

        <DataTable rows={items} columns={columns} />
      </div>
      <TransitionsModal
        item={item}
        setItem={setItem}
        items={items}
        setItems={setItems}
        open={open}
        handleClose={handleClose}
      />
    </div>
  );
};

export default App;
