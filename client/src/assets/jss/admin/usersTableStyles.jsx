import { blue, green } from '@material-ui/core/colors';
import { textColor, textSecondaryColor, orangeColor } from '../main';
import { secondaryColor } from '../main';

const usersTableStyles = {
  table: {
    background: '#27293D',
    color: textColor,
    marginBottom: '2em'
  },
  tableWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
    paddingLeft: '16px'
  },
  tableRow: {
    '&:hover': {
      backgroundColor: 'red !important',
      border: '1px solid red',
      marginLeft: '2px',
      color: 'green'
    },
  },
  tableTitle: {
    color: textSecondaryColor,
    fontSize: '14px',
    fontWeight: 500,
  },
  username: {
    fontWeight: 500,
  },
  avatar: {
    boxSizing: 'border-box',
    // border: `2px solid ${secondaryColor}`,
    marginRight: '8px',
    // background: green[500],
  },
  divider: {
    background: '#3D3F51',
  },
  viewIcon: {
    color: blue[400],
  },
  iconButton: {
    padding: '8px',
  },
  searchInput: {
    flex: 1,
    color: textColor,
  },
  emptyRow: {
    color: orangeColor,
    fontSize: '1rem',
    fontWeight: 500,
    textAlign: 'center',
    fontStyle: 'italic',
    borderBottom: 'none'
  }
};

export default usersTableStyles;
