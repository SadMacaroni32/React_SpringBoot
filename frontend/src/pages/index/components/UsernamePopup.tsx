// UsernamePopup.tsx
import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

// Define the props interface
interface UsernamePopupProps {
  onSubmit: (username: string) => void;
  onClose: () => void;
}

const UsernamePopup: React.FC<UsernamePopupProps> = ({ onSubmit, onClose }) => {
  const [username, setUsername] = useState<string>("");

  const handleSubmit = () => {
    if (username) {
      onSubmit(username); // Send the username back to the parent component
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Enter Username</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          type="text"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UsernamePopup;
