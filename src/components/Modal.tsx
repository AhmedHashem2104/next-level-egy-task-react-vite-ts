/* eslint-disable @typescript-eslint/no-explicit-any */
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({
  item,
  setItem,
  items,
  setItems,
  open,
  handleClose,
}: any) {
  const handleSubmit = () => {
    if (item?.id && item?.task) {
      const updatedItems = items.map((existingItem: any) =>
        existingItem.id === item.id ? item : existingItem
      );
      setItems(updatedItems);
    } else {
      // Adding a new task
      setItems((prevItems: any) => [
        ...prevItems,
        { ...item, id: generateUniqueId() },
      ]);
    }

    // Reset the item state
    setItem(null);

    // Close the modal
    handleClose();
  };

  const generateUniqueId = () => {
    // Generate a unique ID (you can use a library like uuid or a custom function)
    // For simplicity, a basic implementation is shown here
    return Date.now().toString();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {!item?.id ? (
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Add Task
              </Typography>
            ) : (
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Edit Task ( {item.task} )
              </Typography>
            )}
            <TextField
              style={{
                width: `100%`,
                outline: `none`,
                marginTop: 30,
              }}
              value={item?.task || ""}
              onChange={(e) =>
                setItem((prev: any) => ({ ...prev, task: e.target.value }))
              }
            />

            <Button
              color="primary"
              variant="contained"
              style={{
                marginTop: 30,
                width: 150,
              }}
              onClick={handleSubmit}
            >
              {item?.id ? `Edit` : `Add`}
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
