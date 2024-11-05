// src/components/dashboard/Sidebar.tsx
"use client"; // Certifique-se de que é um componente do lado do cliente

import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import Link from 'next/link';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose}>
      <List>
        <ListItem component={Link} href="/home" onClick={onClose}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem   onClick={onClose}>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem   onClick={onClose}>
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
