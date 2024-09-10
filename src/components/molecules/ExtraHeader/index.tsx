import IconButton from '@/components/atoms/IconButton';
import {
  ChevronCollapse,
  ChevronExpand,
  MiniChevronCollapse,
  MiniChevronExpand,
  BookmarkAddSharp,
  DeleteForeverRounded,
  Detail,
  MiddleDeleteForeverRounded,
  MiddleDetail,
  MiniBookmarkAddSharp,
  MiniDeleteForeverRounded,
  MiniDetail,
} from '@/components/icons/Icons';
import { Tooltip } from '@nextui-org/tooltip';
import { Button } from '@nextui-org/react';
import { useWindowSize } from '@/function/GetWindowSize';

const headerBackground = '#f5f5f5';
const headerBorder = '#ddd';

interface HeaderProps {
  title: string;
  icon: React.ReactNode;
  onIconClick: () => void;
  fold: boolean;
  width: number;
  openDialog: () => void;
  del: () => void;
}

const ExtraHeader: React.FC<HeaderProps> = ({ title, icon, onIconClick, fold, width, openDialog, del }) => {
  return (
    <header style={fold ? { ...styles.foldHeader } : { ...styles.header }} className="w-full p-2 md:p-3">
      <div style={styles.leftContainer} className='w-1/2'>
        {icon}
        <h1 className="text-base font-bold ml-4 sm:text-xl">{title}</h1>
      </div>
      <div style={styles.iconButton} className='w-1/2 flex justify-end'>
        <div className="flex justify-end pt-1">
  <Tooltip showArrow={true} content="詳細" color="warning" className="capitalize bg-gray-10 rounded-lg">
    <Button onClick={openDialog} className="pl-1 py-0 pr-0">
      {width < 640 ? <MiniDetail /> : width < 1280 ? <MiddleDetail /> : <Detail />}
    </Button>
  </Tooltip>
  <div className="w-10">
    <Tooltip showArrow={true} content="消去" color="warning" className="capitalize bg-gray-10 rounded-lg">
      <Button onClick={del} className="pl-1 py-0 pr-0 md:pl-2">
        {width < 640 ? (
          <MiniDeleteForeverRounded />
        ) : width < 1280 ? (
          <MiddleDeleteForeverRounded />
        ) : (
          <DeleteForeverRounded />
        )}
      </Button>
    </Tooltip>
  </div>
</div>

        {fold ? (
          <IconButton
            icon={width < 640 ? <MiniChevronExpand /> : <ChevronExpand />}
            onClick={onIconClick}
            ariaLabel="icon button"
          />
        ) : width <= 640 ? (
          <IconButton icon={<MiniChevronCollapse />} onClick={onIconClick} ariaLabel="icon button" />
        ) : (
          <IconButton icon={<ChevronCollapse />} onClick={onIconClick} ariaLabel="icon button" />
        )}
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: headerBackground,
    borderBottom: `4px solid ${headerBorder}`,
    borderRadius: '15px 15px 0 0',
  },
  foldHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: headerBackground,
    borderBottom: `4px solid ${headerBorder}`,
    borderRadius: '15px 15px 15px 15px',
  },
  leftContainer: {
    alignItems: 'center',
    display: 'flex',
  },
  iconButton: {},
};

export default ExtraHeader;
