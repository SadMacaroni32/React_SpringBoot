import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography
} from "@mui/material";

interface UsernamePopupProps {
  onSubmit: (username: string) => void;
  onClose: () => void;
}

const UsernamePopup: React.FC<UsernamePopupProps> = ({ onSubmit, onClose }) => {
  const [username, setUsername] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);

  // Extract userId from URL
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("username");
    setUserId(id);
  }, []);

  const handleSubmit = () => {
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Enter Username</DialogTitle>
      <DialogContent>
        {userId && (
          <Typography variant="subtitle1" style={{ marginBottom: "10px" }}>
            User ID: {userId} {/* Displaying the userId */}
          </Typography>
        )}
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          type="text"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={!username.trim()}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UsernamePopup;
