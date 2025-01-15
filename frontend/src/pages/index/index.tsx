import React, { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import { getDatabase, ref, set, push, onValue, remove } from 'firebase/database';
import { firebaseInit } from '../../firebaseConfig';  // Ensure firebase is initialized

// Lazy load both components
const MessageBox = React.lazy(() => import('./components/Messagebox'));  // Import path correction
const UsernamePopup = React.lazy(() => import('./components/UsernamePopup'));  // Import UsernamePopup

const db = getDatabase(firebaseInit);  // Use `db` for Firebase Database

const MainPage = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [username, setUsername] = useState<string>('');
  const [message, setMessage] = useState<string>('');

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

  const handleUsernameSubmit = (submittedUsername: string) => {
    setUsername(submittedUsername);
  };

  return (
    <div>
      {username === '' && (
        <UsernamePopup onSubmit={handleUsernameSubmit} onClose={() => console.log('Popup closed')} />
      )}
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
