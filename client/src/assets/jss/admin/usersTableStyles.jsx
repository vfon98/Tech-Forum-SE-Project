import { blue, green } from '@material-ui/core/colors';
import { textColor, textSecondaryColor, orangeColor } from '../main';
import { limitLine } from '../main';
import { dyan } from '../main';

const usersTableStyles = {
  tableWrapper: {
    marginLeft: '16px',
    marginRight: '16px'
  },
  table: {
    background: '#27293D',
    color: textColor,
    marginBottom: '2em',
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
    paddingLeft: '16px',
  },
  tableRow: {
    '&:hover': {
      backgroundColor: 'red !important',
      border: '1px solid red',
      marginLeft: '2px',
      color: 'green',
    },
  },
  tableTitle: {
    color: textSecondaryColor,
    fontSize: '14px',
    fontWeight: 500,
  },
  username: {
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    boxSizing: 'border-box',
    // border: `1px solid blue`,
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
    borderBottom: 'none',
  },
  nowrap: {
    whiteSpace: 'nowrap'
  },
  nameCell: {
    paddingRight: 0,
    paddingLeft: 0,
    fontWeight: '600',
  },
  nameLink: {
    color: textColor
  },
  reasonsCell: {
    maxWidth: '16em'
  },
  contentCell: {
    maxWidth: '8em',
    maxHeight: '4rem',
  },
  content: {
    ...limitLine(3),
    fontSize: '14px'
  }
};

export default usersTableStyles;
