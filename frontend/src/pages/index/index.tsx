import React, { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import { getDatabase, ref, set, push, onValue, remove } from 'firebase/database';
import { firebaseInit } from '../../firebaseConfig'; // Ensure Firebase is initialized

// Lazy load the MessageBox component
const MessageBox = React.lazy(() => import('./components/Messagebox')); // Correct path to MessageBox

const db = getDatabase(firebaseInit); // Firebase Database instance

const MainPage = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [username, setUsername] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  // Extract username from the URL and set it
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const extractedUsername = queryParams.get('username');
    if (extractedUsername) {
      setUsername(extractedUsername);
    } else {
      alert('Username is missing in the URL query parameters.');
    }
  }, []);

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

  const handleSubmit = () => {
    if (username && message) {
      const messagesRef = ref(db, 'messages');
      const newMessageRef = push(messagesRef);
      set(newMessageRef, { username, message });
      setMessage('');
    }
  };

  const handleDelete = (id: string, messageOwner: string) => {
    if (messageOwner === username) {
      const messageRef = ref(db, `messages/${id}`);
      remove(messageRef);
    } else {
      alert('You can only delete your own messages.');
    }
  };

  return (
    <div>
      <Box sx={{ width: '100%', padding: 2 }}>
        <Paper sx={{ height: 400, width: '100%' }}>
          <MessageBox rows={rows} onDelete={handleDelete} />
        </Paper>
      </Box>
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
