import { container, secondaryColor, title, primaryColor, textColor,dyan, highlightColor } from "./main";
import { limitLine } from './main';

const hotTopicStyles = {
  container: {
    ...container
  },
  background: {
    background: secondaryColor
  },
  cardBackground: {
    background: primaryColor
  },
  title: {
    ...title
  }, img: {
    display: 'block',
    height: 'auto',
    maxHeight: '15rem',
    width: '100%',
    overflow: 'hidden',
    objectFit: 'cover',
    objectPosition: 'center center',
  },
  cardTitle : {
    display: 'block',
    textAlign: 'center',
    background: dyan,
    height: '4rem',
    color: textColor,
    fontSize: '1.8rem',
    lineHeight: '4rem',
    padding:'.5rem',
    width: '80%',
    margin: ' auto',
    transform: 'translateY(-50%)',
    borderRadius: '1.5rem',
    boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'
  },
  link: {
    display: 'block',
    color: textColor,
    textDecoration: 'none',
    // padding: ".5rem 1rem",
    margin: ".5rem 1rem",
    transition: 'cubic-bezier(.17,.67,.83,.67)',
    cursor: 'pointer',
    ...limitLine(2),

    '&:hover' : {
      color: highlightColor
    }
  }
}

export default hotTopicStyles;