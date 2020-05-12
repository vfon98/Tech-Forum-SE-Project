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
  },
  itemHeader: {
    ...limitLine(2),
    fontSize: '16px'
  },
  itemContent: {
    ...limitLine(3),
    fontSize: '14px'
  }
};

export default carouselStyles;
