import React, { useState } from 'react';
import Image from 'next/image';
import Dialog from '@/components/molecules/Dialog';
import { Type } from '@/interfaces';

interface TerastalProps {
  src: string;
  onClick: () => void;
  teraSelected: (type: Type) => void;
}

const TerastalTag: React.FC<TerastalProps> = ({ src, onClick, teraSelected }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  return (
    <div style={styles.terastal}>
      <p style={{ margin: '0px' }} className="text-sm sm:text-base md:text-lg mr-4">
        テラスタル:
      </p>
      <div
        onClick={openDialog}
        style={{
          ...styles.button,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="h-4 w-16 sm:h-5 sm:w-20 md:h-6.4 md:w-24"
      >
        <Image
          src={src}
          alt="テラスタルImage"
          layout="responsive"
          width={80}
          height={20}
          objectFit="contain"
          style={styles.image}
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
  image: {},
  button: {
    border: 'none',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  },
};

export default TerastalTag;
