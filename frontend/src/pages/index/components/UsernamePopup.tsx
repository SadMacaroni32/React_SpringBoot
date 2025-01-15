import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const UserInfoDisplay: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  // Extract username from URL
  useEffect(() => {
    const name = new URLSearchParams(window.location.search).get("username");
    setUsername(name);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {username ? (
        <Typography variant="h4">Welcome, {username}!</Typography>
      ) : (
        <Typography variant="h4">Welcome, Guest!</Typography>
      )}
    </div>
  );
};

export default UserInfoDisplay;
