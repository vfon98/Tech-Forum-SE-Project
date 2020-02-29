import { textColor, dyan } from "./main";

const verticalCarouselStyles = {
  img: {
    display: 'inline-block',
    margin: '1.2rem',
    height: 'auto',
    width: '100%',
    overflow: 'hidden',
    objectFit: 'cover',
    objectPosition: 'center',
    height: '7rem',
    width: '7rem'
  },
  caption: {
    color: textColor,
    fontFamily: 'Roboto',
    margin: '0'
  },
  title : {
    fontWeight: 'bold',
    margin: '1rem 0 0 0'
  },
  bodyText : {
    fontWeight: 'normal',
    fontSize: '.8rem',
    margin: '0'
  },
  author: {
    fontWeight: '900',
    color: dyan,
    margin: '.5rem 0',
    fontSize: '.8rem'
  }
}

export default verticalCarouselStyles;