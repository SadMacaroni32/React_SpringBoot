import React, { useEffect, useState } from 'react';
import { Box, Paper, IconButton } from '@mui/material';
import { getDatabase, ref, set, push, onValue, remove } from 'firebase/database';
import DeleteIcon from '@mui/icons-material/Delete';
import MessageBox from './components/Messagebox';  // Adjust path if necessary
import { firebaseInit } from '../../firebaseConfig';  // Make sure firebase is initialized
import UsernamePopup from './components/UsernamePopup';
const db = getDatabase(firebaseInit);  // Use `db` for Firebase Database

const MainPage = () => {
  const [rows, setRows] = useState<any[]>([]);  // Array of message rows
  const [username, setUsername] = useState<string>('');  // Track current user's username
  const [message, setMessage] = useState<string>('');  // Track current message input

  // Fetch data from Firebase
  useEffect(() => {
    const messagesRef = ref(db, 'messages');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const formattedRows = data
        ? Object.keys(data).map((key) => ({
            id: key,
            username: data[key].username,
            message: data[key].message,
          }))
        : [];
      setRows(formattedRows);
    });
  }, []);

  // Submit message to Firebase
  const handleSubmit = () => {
    if (username && message) {
      const messagesRef = ref(db, 'messages');
      const newMessageRef = push(messagesRef);
      set(newMessageRef, { username, message });
      setMessage(''); // Clear message input
    }
  };

  // Handle delete message - Only allow the owner of the message to delete it
  const handleDelete = (id: string, messageOwner: string) => {
    if (messageOwner === username) {
      const messageRef = ref(db, `messages/${id}`);
      remove(messageRef);
    } else {
      alert('You can only delete your own messages.');
    }
  };

  // Handle username submit
  const handleUsernameSubmit = (submittedUsername: string) => {
    setUsername(submittedUsername);
  };

  return (
    <div>
      {/* Show the Username Popup if username is not set */}
      {username === '' && (
        <UsernamePopup
          onSubmit={handleUsernameSubmit}
          onClose={() => console.log('Popup closed')}
        />
      )}

      {/* Main Page content */}
      <Box sx={{ width: '100%', padding: 2 }}>
        <Paper sx={{ height: 400, width: '100%' }}>
          {/* Use the MessageBox component here */}
          <MessageBox rows={rows} onDelete={handleDelete} />
        </Paper>
      </Box>

      {/* Input for new message */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, padding: 2 }}>
        <input
          type="text"
          placeholder="Enter a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ padding: '8px', width: '60%' }}
        />
        <button onClick={handleSubmit} style={{ padding: '8px 16px' }}>
          Submit
        </button>
      </Box>
    </div>
  );
};

export default MainPage;
