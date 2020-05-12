import { textColor, dyan } from "./main";
import { limitLine } from './main';
import { textSecondaryColor } from './main';

const verticalCarouselStyles = {
  img: {
    display: 'inline-block',
    margin: '1.2rem',
    // margin: '1.2rem 1.2rem 0 0',
    overflow: 'hidden',
    objectFit: 'cover',
    objectPosition: 'center',
    height: '7rem',
    width: '7rem',
  },
  caption: {
    color: textColor,
    fontFamily: 'Roboto',
    margin: '0'
  },
  title : {
    fontWeight: 'bold',
    margin: '1rem 0 0 0',
    ...limitLine(2)
  },
  bodyText : {
    fontWeight: 'normal',
    fontSize: '.8rem',
    margin: '0',
    ...limitLine(3)
  },
  authorWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  author: {
    fontWeight: '900',
    color: dyan,
    margin: '.5rem 0',
    fontSize: '.8rem'
  },
  views: {
    fontSize: '0.8rem',
    fontWeight: '500',
    color: textSecondaryColor,
    '&:before': {
      content: '"•"',
      fontSize: '0.7rem',
      margin: '0 0.4em',
    }
  }
}

export default verticalCarouselStyles;