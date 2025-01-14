// MessageBox.tsx remains unchanged
import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './MessageBox.css';  // Import the CSS file

interface MessageBoxProps {
  rows: any[];  // Array of row data
  onDelete: (id: string, messageOwner: string) => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({ rows, onDelete }) => {
  const columns: GridColDef[] = [
    {
      field: 'messageWithDelete',
      headerName: 'Telegram ni JE',
      headerClassName: 'center',
      flex: 1,
      renderCell: (params: any) => (
        <div className="message-cell">
          <div className="message-text">
            <strong>{params.row.username}:</strong> {params.row.message}
          </div>
          <IconButton
            color="error"
            onClick={() => onDelete(params.row.id, params.row.username)}
            className="delete-icon"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
      sortable: false,  // Disable sorting for this column
    },
  ];

  return (
    <div style={{ height: 400, width: '100%', overflow: 'auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        disableColumnResize
        disableRowSelectionOnClick
        hideFooter
        style={{ overflow: 'auto' }}
      />
    </div>
  );
};

export default MessageBox;
