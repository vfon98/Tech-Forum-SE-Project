import { primaryColor, secondaryColor, textColor } from './main';
import roomStyles from './roomStyles';

const {
  avatarLg,
  text,
  secondaryText,
  userName,
  timeText,
  headerIcon,
} = roomStyles;

const newsDetailStyles = {
  // IMPORTED STYLES
  text,
  secondaryText,
  userName,
  timeText,
  headerIcon,
  // END
  secondaryBg: {
    backgroundColor: secondaryColor,
  },
  avatarLg: {
    ...avatarLg,
    border: '2px solid #2E83F2',
  },
  pageWrapper: {
    backgroundColor: secondaryColor,
    padding: '2em 0',
  },
  gridWrapper: {
    '@media (max-width: 600px)': {
      padding: '8px',
      marginTop: '-16px'
    }
  },
  leftWrapper: {
    backgroundColor: primaryColor,
    color: textColor,
    padding: '1.2em',
    marginBottom: '0.6em',
    '@media (max-width: 600px)': {
      padding: '8px'
    }
  },
  rightWrapper: {
    backgroundColor: primaryColor,
    color: textColor,
    paddingLeft: '1.2em',
    paddingBottom: '0.6em',
    marginBottom: '1em',
  },
  // News styles
  newsHeader: {
    fontSize: '1.8rem',
    fontWeight: '700',
    '@media (max-width: 600px)': {
      fontSize: '1.4rem',
    }
  },
  subheaderWrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  newsSubheader: {
    color: textColor,
    display: 'flex',
    whiteSpace: 'nowrap',
    alignItems: 'center',
    marginTop: '0.3em',
    '&:not(:first-child):before': {
      content: '"•"',
      fontSize: '0.7rem',
      margin: '0 0.6em',
    },
  },
  newsThumbnail: {
    width: '100%',
    marginBottom: '1em',
    border: '1px solid #696969',
    borderRadius: '2px',
    '&:hover': {
      boxShadow: '0 0 2px 2px rgba(0, 140, 186, 0.5)',
    },
  },
  newsContent: {
    // border: '2px solid green',
    paddingTop: '1em',
    '& a': {
      color: textColor,
      fontWeight: '450',
    },
    '& img, & iframe': {
      objectFit: 'contain',
      maxWidth: '100%',
      // height: 'auto !important',
      padding: 0,
      display: 'block',
      margin: '0.6em auto',
      textAlign: 'center',
    },
    '& img': {
      borderRadius: '4px',
    },
  },
  btnComments: {
    textTransform: 'none',
  },
  btnCommentsToggle: {
    margin: '0 15px',
    '@media (max-width: 600px)': {
      margin: '0 8px'
    }
  },
  commentBoxWrapper: {
    padding: '8px 0',
    marginTop: '6px',
  },
  '@media (max-width: 600px)': {
    cardHeader: {
      padding: '8px',
    },
    cardContent: {
      padding: '8px'
    }
  }
};

export default newsDetailStyles;
