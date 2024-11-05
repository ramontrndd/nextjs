import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

interface PositionedSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity: AlertColor;
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

const PositionedSnackbar: React.FC<PositionedSnackbarProps> = ({
  open,
  onClose,
  message,
  severity,
  vertical,
  horizontal,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default PositionedSnackbar;
