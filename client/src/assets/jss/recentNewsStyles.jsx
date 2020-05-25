import { primaryColor, secondaryColor, container, title, textColor, dyan } from "./main";
import { darkGreen } from './main';

const recentNewsStyles = {
  background: {
    background: primaryColor
  },
  container: {
    ...container,
  },
  title: {
    ...title
  },
  titleDark: {
    ...title,
    color: primaryColor,
    margin: '1rem'
  },
  img: {
    display: 'block',
    height: 'auto',
    maxHeight: '5rem',
    width: '7rem',
    overflow: 'hidden',
    objectFit: 'cover',
    objectPosition: 'center',
    borderRadius: '1rem'
  },
  newsImg: {
    display: 'block',
    height: 'auto',
    maxHeight: '9rem',
    width: '12rem',
    overflow: 'hidden',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  cardBg: {
    background: 'rgba(255,255,255,.9)',
    margin: '1rem',
    marginBottom: '3rem',
    // padding: '1rem',
    position: 'relative',
    overflow: 'visible',
    '@media (max-width: 600px)': {
      margin: '8px 0'
    }
  },
  linkText: {
    color: textColor,
    textDecoration: 'none',
    display: 'block',
    // marginLeft: '2rem',
    textAlign: 'right'
  },
  btn: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start'

  },
  newsItem: {
    display: 'block',
    width: '100%',
    margin: '1rem 0'
  },
  newsItemTitle: {
    color: primaryColor,
    textDecoration: 'none',
    textAlign: 'left',
    textTransform: 'none',
    margin: 0
  },
  newsTitle: {
    fontSize: '1rem',
    margin: '0'
  },
  newsBodyText: {
    color: secondaryColor,
    fontSize: '.8rem',
    margin: 0
  },
  newsAuthorText: {
    color: dyan,
    fontWeight: 'black',
    margin: '.5rem',
  },
  readMoreBtn: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 50%)',
    padding: '0.6em 2em',
    whiteSpace: 'nowrap'
  }
}

export default recentNewsStyles;