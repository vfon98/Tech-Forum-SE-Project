import { textColor, dyan } from './main';
import { limitLine } from './main';
import { textSecondaryColor } from './main';

const verticalCarouselStyles = {
  imgWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  img: {
    // display: 'inline-block',
    // margin: '1.2rem',
    overflow: 'hidden',
    objectFit: 'cover',
    objectPosition: 'center',
    height: '7rem',
    width: '100%',
    margin: '1rem 0',
  },
  caption: {
    color: textColor,
    fontFamily: 'Roboto',
    margin: '0',
    textAlign: 'left',
    fontSize: '1rem',
  },
  title: {
    fontWeight: 'bold',
    margin: '1rem 0 0 0',
    ...limitLine(2),
  },
  bodyText: {
    fontWeight: 'normal',
    fontSize: '.8rem',
    margin: '0',
    ...limitLine(3),
  },
  authorWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  author: {
    fontWeight: '900',
    color: dyan,
    margin: '0.4rem 0',
    fontSize: '0.8rem',
  },
  views: {
    fontSize: '0.8rem',
    fontWeight: '500',
    color: textSecondaryColor,
    margin: 0,
    '&:before': {
      content: '"•"',
      fontSize: '0.7rem',
      margin: '0 0.4em',
    },
  },
};

export default verticalCarouselStyles;
