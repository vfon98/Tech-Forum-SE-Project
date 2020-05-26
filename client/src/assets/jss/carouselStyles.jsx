import { textColor } from './main';
import { limitLine } from './main';

const carouselStyles = {
  img: {
    display: 'block',
    maxHeight: '420px',
    overflow: 'hidden',
    objectFit: 'cover',
    objectPosition: 'center',
    width: '100%',
  },
  caption: {
    color: textColor,
    fontFamily: 'Roboto',
    maxWidth: '100%'
  },
  itemHeader: {
    ...limitLine(2),
    fontSize: '1rem'
  },
  itemContent: {
    ...limitLine(3),
    fontSize: '0.9rem'
  }
};

export default carouselStyles;
