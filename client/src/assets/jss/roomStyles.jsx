import {
  container,
  primaryColor,
  secondaryColor,
  textColor,
  title,
} from './main';
import bgUniverse from '../img/bg-universe.jpg';

const lightColor = 'rgba(255,255,255,.9)';
const feedColor = '#1D1D1D';
const textSecondaryColor = '#8F8F8F';
const defaultAvatarBg = '#00a152';

const roomStyles = {
  container: {
    ...container,
    backgroundColor: primaryColor,
    color: textColor,
    fontSize: '0.9rem',
  },
  border: {
    border: '1px dotted #fff',
  },
  text: {
    color: textColor,
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
    fontSize: '0.8rem',
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
  },
  btnLink: {
    textTransform: 'none',
    color: textColor,
    fontSize: '0.9rem',
  },
  btnNewPost: {
    textTransform: 'none',
    marginBottom: '1em',
    width: '100%',
    backgroundColor: '#f57c00',
    borderRadius: '9999px',
    color: textColor,
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
  //
  commentInput: {
    marginLeft: '8px',
    color: textColor,
  },
  // Comment
  commentContainer: {
    width: "100%",
    padding: "0.4em 15px",
    boxSizing: "border-box",
    backgroundColor: primaryColor,
    color: textColor,
    '&:last-child': {
      paddingBottom: '0.6em'
    }
  },
  comment: {
    backgroundColor: feedColor,
    padding: '0.5em 1em',
    marginLeft: '6px',
    borderRadius: '0 12px 12px 12px',
  },
  commentContent: {
    fontSize: '0.86em',
    // marginBottom: '0.2em',
    margin: '0.4em 0',
  },
  // User panel
  thumbnailBg: {
    backgroundColor: feedColor,
    height: '4em',
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
    fontSize: '0.9rem'
  },
  userBox_link: {
    textTransform: 'none',
    padding: '1em',
    color: '#f57c00',
  },
  avatarXl: {
    width: '5em',
    height: '5em',
    backgroundColor: defaultAvatarBg,
    border: `4px solid ${secondaryColor}`,
  },
};

export default roomStyles;
