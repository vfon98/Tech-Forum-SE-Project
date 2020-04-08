import {
  primaryColor,
  secondaryColor,
  textColor,
  textSecondaryColor,
  dyan,
  darkGreen,
  orangeColor,
  limitLine,
  lightBlueColor
} from './main';
import newsStyles from './recentNewsStyles';

const { newsItem, newsTitle, newsBodyText } = newsStyles;
const roomNewsStyles = {
  ...newsStyles,
  newsItem: {
    ...newsItem,
    margin: 0,
    padding: '1em 8px',
    boxSizing: 'border-box',
    '&:hover img:first-child': {
      boxShadow: '0 0 2px 2px rgba(0, 140, 186, 0.2)'
    }
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
    color: textColor,
    '&:hover': {
      color: dyan,
    },
  },
  newsBodyText: {
    ...newsBodyText,
    ...limitLine(2),
    color: textSecondaryColor,
  },
  newsRoomName: {
    color: 'orange',
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  newsAuthorText: {
    fontSize: '0.8rem',
    color: dyan,
    fontWeight: '600',
    margin: 0,
  },
  roomWrapper: {
    backgroundColor: secondaryColor,
    paddingTop: '24px',
  },
  cardBg: {
    padding: '1.2rem',
    backgroundColor: primaryColor,
    color: textColor,
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardTitle: {
    color : textColor,
    fontSize: '1.4rem',
    fontWeight: "700",
    marginTop: 0,
    marginBottom: '0.2em',
    marginLeft: '8px',
    paddingLeft: '8px',
    borderLeft: `4px solid ${lightBlueColor}`
  },
  cardTag: {
    fontSize: '1.1rem',
    color: orangeColor,
    fontWeight: '600',
    marginTop: '0.2em',
    marginRight: '0.8em',
  },
  newsAvatarWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '0.4em',
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
  newsInfoText: {
    fontSize: '0.8rem',
    fontWeight: '700',
    '&:before': {
      content: '"•"',
      margin: '0 0.4em',
      fontSize: '0.6rem',
    },
  },
};

export default roomNewsStyles;
