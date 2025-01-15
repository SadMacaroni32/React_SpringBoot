import React, { memo, useEffect, useRef } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './MessageBox.css';

interface MessageBoxProps {
  rows: any[];  // Array of row data
  onDelete: (id: string, messageOwner: string) => void;
}

const MessageBox: React.FC<MessageBoxProps> = memo(({ rows, onDelete }) => {
  const gridRef = useRef<HTMLDivElement>(null); // Ref for the DataGrid wrapper

  useEffect(() => {
    if (gridRef.current) {
      const scrollableElement = gridRef.current.querySelector('.MuiDataGrid-virtualScroller');
      if (scrollableElement) {
        scrollableElement.scrollTop = scrollableElement.scrollHeight;
      }
    }
  }, [rows]); // Trigger the effect when rows are updated

  const columns: GridColDef[] = [
    {
      field: 'messageWithDelete',
      headerName: 'Telegram ni JE',
      headerClassName: 'center',
      flex: 1,
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <div className="message-cell">
          <div className="message-text">
            <strong>{params.row.username}:</strong> {params.row.message}
          </div>
          <IconButton
            color="error"
            onClick={() => onDelete(params.row.id, params.row.username)}
            className="delete-icon"
            aria-label={`Delete message from ${params.row.username}`}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
      sortable: false,
    },
  ];

  return (
    <div ref={gridRef} style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        disableColumnResize
        disableRowSelectionOnClick
        hideFooter
        sx={{ overflow: 'hidden' }}
      />
    </div>
  );
});

export default MessageBox;
