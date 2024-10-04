import IconButton from '@/components/atoms/IconButton';
import { ChevronCollapse, ChevronExpand, MiniChevronCollapse, MiniChevronExpand } from '@/components/icons/Icons';

const headerBackground = '#e6e6fa';
const headerBorder = '#c7c7ff';

interface HeaderProps {
  title: string;
  icon: React.ReactNode;
  onIconClick: () => void;
  fold: boolean;
  width: number;
}

const Header: React.FC<HeaderProps> = ({ title, icon, onIconClick, fold, width }) => {
  if (fold) {
    return (
      <header style={styles.foldHeader} className="w-full p-2 md:p-3">
        <div style={styles.leftContainer}>
          {icon}
          <h1 className="text-base font-bold ml-4 sm:text-xl">{title}</h1>
        </div>
        <div style={styles.iconButton}>
          <IconButton
            icon={width < 640 ? <MiniChevronExpand /> : <ChevronExpand />}
            onClick={onIconClick}
            ariaLabel="icon button"
          />
        </div>
      </header>
    );
  }
  return (
    <header style={styles.header} className="w-full p-2 md:p-3">
      <div style={styles.leftContainer}>
        {icon}
        <h1 className="text-base font-bold ml-4 sm:text-xl">{title}</h1>
      </div>
      <div style={styles.iconButton}>
        {width < 640 ? (
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
    border: `2px solid ${headerBorder}`,
    borderRadius: '15px 15px 0 0',
  },
  foldHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: headerBackground,
    border: `2px solid ${headerBorder}`,
    // borderBottom: '2px solid #c7c7ff',
    borderRadius: '15px 15px 15px 15px',
  },
  leftContainer: {
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
  },
  iconButton: {},
};

export default Header;
