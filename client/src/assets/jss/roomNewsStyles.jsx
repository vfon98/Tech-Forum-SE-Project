import {
  primaryColor,
  secondaryColor,
  textColor,
  textSecondaryColor,
  title,
  dyan,
  darkGreen,
  orangeColor,
} from './main';
import newsStyles from './recentNewsStyles';

const limitLine = numberOfLine => ({
  display: '-webkit-box',
  overflow: 'hidden',
  textOverflow: 'hidden',
  lineClamp: numberOfLine,
  boxOrient: 'vertical',
});

const { newsItem, newsTitle, newsBodyText } = newsStyles;
const roomNewsStyles = {
  ...newsStyles,
  newsItem: {
    ...newsItem,
    margin: 0,
    padding: '1em 8px',
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
    ...title,
    paddingLeft: '6px',
    marginTop: 0,
    marginBottom: '0.4em',
    // marginLeft: '8px',
    // paddingLeft: '8px',
    // borderLeft: `4px solid ${lightBlueColor}`
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
