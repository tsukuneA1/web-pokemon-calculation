import React, { useState } from 'react';
import Image from 'next/image';
import Dialog from '@/components/molecules/Dialog';
import { Type } from '@/interfaces';
import TypeImage from '../TypeImage';
import AutoTypeImage from '../AutoTypeImage';

interface TerastalProps {
  type: Type;
  onClick: () => void;
  teraSelected: (type: Type) => void;
}

const TerastalTag: React.FC<TerastalProps> = ({ type, onClick, teraSelected }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  return (
    <div style={styles.terastal}>
      <div
        onClick={openDialog}
        style={{
          ...styles.button,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AutoTypeImage
          type={type}
        />
      </div>
      <Dialog isOpen={isDialogOpen} onClose={closeDialog} radioSelected={(type: Type) => teraSelected(type)} />
    </div>
  );
};

const styles = {
  terastal: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    border: 'none',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  },
};

export default TerastalTag;
