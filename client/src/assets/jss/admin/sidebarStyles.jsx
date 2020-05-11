import { textColor } from '../main';
import { dyan } from '../main';

const sidebarStyles = {
  sidebarLink: {
    color: textColor,
    borderRadius: '5px',
    width: '90%',
    margin: '0.8em auto',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
  },
  adminDisplayName: {
    color: textColor,
    fontSize: '1.2rem',
    fontWeight: '600'
  },
  divider: {
    // backgroundColor: textColor,
    marginTop: '8px'
  },
  title: {
    color: textColor,
    textAlign: 'center',
    fontSize: '1.2rem',
    fontWeight: '500',
    padding: '0.6em 0',
  },
  iconLink: {
    color: 'inherit',
    marginRight: '-0.6em',
  },
  activeLink: {
    backgroundColor: dyan,
    '&:hover': {
      backgroundColor: dyan,
    }
  },
};

export default sidebarStyles;
