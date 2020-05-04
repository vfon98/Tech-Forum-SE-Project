import {
  primaryColor,
  secondaryColor,
  textColor,
  textSecondaryColor,
  dyan,
  darkGreen,
  orangeColor,
  limitLine,
  lightBlueColor,
} from './main';
import newsStyles from './recentNewsStyles';
import { lightBg } from './main';

const { newsItem, newsTitle, newsBodyText } = newsStyles;
const roomNewsStyles = {
  ...newsStyles,
  newsItem: {
    ...newsItem,
    margin: 0,
    padding: '1em 8px',
    boxSizing: 'border-box',
    '&:hover img:first-child': {
      boxShadow: '0 0 2px 2px rgba(0, 140, 186, 0.2)',
    },
  },
  imgWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  newsImg: {
    // maxHeight: '9rem',
    width: '100%',
    // height: '100%',
  },
  newsTitle: {
    ...newsTitle,
    ...limitLine(2),
    color: ({theme}) => theme === 'light' ? primaryColor : textColor,
    '&:hover': {
      color: dyan,
    },
  },
  newsBodyText: {
    ...newsBodyText,
    ...limitLine(2),
    // color: textSecondaryColor,
    color: ({theme}) => theme === 'light' ? primaryColor : textSecondaryColor,
  },
  newsRoomName: {
    color: 'orange',
    // color: ({theme}) => theme === 'light' ? orangeColor : 'orange',
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  newsAuthorText: {
    fontSize: '0.8rem',
    color: dyan,
    fontWeight: '600',
    margin: 0,
  },
  newsInfoText: {
    fontSize: '0.8rem',
    color: ({theme}) => theme === 'light' ? textSecondaryColor : textColor,
    fontWeight: '700',
    '&:before': {
      content: '"•"',
      margin: '0 0.4em',
      fontSize: '0.6rem',
    },
  },
  roomWrapper: {
    paddingTop: '24px',
    backgroundColor: secondaryColor,
    color: 'inherit'
  },
  cardBg: {
    padding: '1.2rem',
    position: 'relative',
    backgroundColor: ({theme}) => theme === 'light' ? lightBg : primaryColor,
    color: ({theme}) => theme === 'light' ? primaryColor : textColor,
    '& hr:last-child': {
      display: 'none'
    }
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: 'inherit',
    fontSize: '1.4rem',
    fontWeight: '700',
    marginTop: 0,
    marginBottom: '0.2em',
    marginLeft: '8px',
    paddingLeft: '8px',
    borderLeft: `4px solid ${lightBlueColor}`,
  },
  composeBtn: {
    position: 'absolute',
    top: '0.5em',
    right: 0,
    fontSize: '1.1rem',
    color: orangeColor,
    fontWeight: '600',
    marginTop: '0.2em',
    marginRight: '0.8em',
  },
  newsAvatarWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '0.2em',
    color: textColor,
  },
  avatarSm: {
    boxSizing: 'border-box',
    width: '1.5em',
    height: '1.5em',
    marginRight: '6px',
    border: `1px solid lightblue`,
    backgroundColor: darkGreen,
  },
  noMoreWrapper: {
    margin: '0 8px',
  },
  noMoreButton: {
    color: darkGreen,
  },
};

export default roomNewsStyles;
