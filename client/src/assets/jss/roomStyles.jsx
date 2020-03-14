import { container, primaryColor, secondaryColor, textColor } from './main';

const lightColor = 'rgba(255,255,255,.9)';
const feedColor = '#1D1D1D';
const textSecondaryColor = '#8F8F8F';
const defaultAvatarBg = '#00a152';
const orangeColor = '#f57c00';

const roomStyles = {
  container: {
    ...container,
    backgroundColor: primaryColor,
    color: textColor,
    fontSize: '0.9rem',
  },
  roomWrapper: {
    backgroundColor: secondaryColor,
    paddingTop: '24px',
  },
  text: {
    color: textColor,
  },
  // Left section
  leftHeader: {
    color: textColor,
    fontWeight: 500,
    fontSize: '1.2em',
  },
  leftSecondary: {
    fontSize: '0.8em',
    color: defaultAvatarBg,
  },
  listIcon: {
    // background: 'linear-gradient(45deg, #fdd835 30%, #f9a825 90%)',
  },
  active: {
    // Custom here
  },
  postWrapper: {
    marginBottom: '1em',
  },
  // Post header
  secondaryText: {
    color: textSecondaryColor,
    marginLeft: '0.4em',
    fontSize: '0.8rem',
    fontStyle: 'italic',
  },
  timeText: {
    color: textSecondaryColor,
    fontSize: '0.75rem',
  },
  headerIcon: {
    marginLeft: '-1px',
    marginRight: '3px',
    fontSize: '1rem',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  avatarLg: {
    height: '50px',
    width: '50px',
    backgroundColor: defaultAvatarBg,
  },
  // Post content
  postContent: {
    fontSize: '0.9rem',
    marginTop: '0.5em'
  },
  btnLink: {
    textTransform: 'none',
    fontSize: '0.9rem',
  },
  bgPrimary: {
    backgroundColor: primaryColor,
    color: textColor,
  },
  bgSecondary: {
    backgroundColor: secondaryColor,
    color: textColor,
  },
  bgLight: {
    backgroundColor: lightColor,
  },
  bgFeed: {
    backgroundColor: feedColor,
  },
  // Comment Input
  avatarDot: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${primaryColor}`,
    '&::after': {
      position: 'absolute',
      content: '""',
      top: -1,
      left: -1,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: `1px solid #fff`,
      animation: '$ripple 1.2s infinite ease-in-out',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2)',
      // transform: 'scale(1.5)',
      opacity: 0,
    },
  },
  commentInput: {
    marginLeft: '8px',
    color: textColor,
    boxSizing: 'border-box',
  },
  commentInputText: {
    color: textColor,
    fontSize: '1em'
  },
  commentInputIcon: {
    marginRight: '-0.5em'
  },
  // Comment
  commentContainer: {
    width: '100%',
    padding: '0.4em 15px',
    boxSizing: 'border-box',
    backgroundColor: primaryColor,
    color: textColor,
    '&:last-child': {
      paddingBottom: '0.8em',
    },
  },
  comment: {
    position: 'relative',
    backgroundColor: feedColor,
    padding: '0.5em 1em',
    marginLeft: '6px',
    borderRadius: '0 12px 12px 12px',
  },
  commentContent: {
    fontSize: '0.86em',
    // marginBottom: '0.2em',
    margin: '0.4em 0',
    // color: '#33CCDD',
  },
  moreIcon: {
    position: 'absolute',
    right: 0,
    // top: 0,
  },
  commentOwnerIcon: {
    margin: '0 0.15em 0 -0.15em',
  },
  commentAdminIcon: {
    margin: '0 0.15em 0 -0.1em',
  },
  // Right section
  rightWrapper: {
    position: 'sticky',
    top: '0.8em',
  },
  btnNewPost: {
    textTransform: 'none',
    marginBottom: '1em',
    width: '100%',
    backgroundColor: orangeColor,
    borderRadius: '9999px',
    color: textColor,
  },
  thumbnailBg: {
    backgroundColor: feedColor,
    height: '4.5em',
    borderBottom: `4px solid ${secondaryColor}`,
  },
  boxWrapper: {
    padding: 0,
    height: '8em',
  },
  userBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    top: '-3.5em',
    // border: '1px solid red',
  },
  userBox_name: {
    fontWeight: '600',
    fontSize: '1.6rem',
  },
  userBox_text: {
    fontSize: '0.9rem',
  },
  userBox_link: {
    textTransform: 'none',
    padding: '1em',
    color: orangeColor,
  },
  avatarXl: {
    width: '5em',
    height: '5em',
    backgroundColor: defaultAvatarBg,
    border: `4px solid ${secondaryColor}`,
  },
};

export default roomStyles;
