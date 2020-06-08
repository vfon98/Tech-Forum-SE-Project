import { primaryColor, highlightColor, textColor } from './main';

const navbarStyles = {
  navMenu: {
    position: 'fixed',
  },
  topbar: {
    height: 'auto',
    lineHeight: '3rem',
    
  },
  appBar: {
    display: 'flex',
    background: primaryColor,
    padding: '1rem 0',
    // "padding": "0 15%",
    // lineHeight: '5rem',
    '@media (min-width: 768px)': {
      padding: '0 15px',
    },
    '@media (min-width: 1400px)': {
      padding: '0 15%',
    },
  },
  brandHighlight: {
    color: highlightColor,
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 1rem',
    '& span': {
      width: '100%',
      height: '100%',
      // display: 'block',
      '& a': {
        width: '100%',
        height: '100%',
        display: 'block',
        padding: '.2rem .5rem',
        textAlign : 'center'
      },
    },
    // padding: '2rem',
    '@media (min-width: 768px)': {
      // padding: '1rem',
    },
    '@media (min-width: 1400px)': {
      // padding: '2rem',
    },
  },
  link: {
    color: textColor,
    textDecoration: 'none',
  },
  accountBtn: {
    color: textColor,
  },
  displayName: {
    color: textColor,
    textTransform: 'none',
  },
  avatar: {
    marginRight: '0.5em',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Responsive navbar
  '@media (max-width: 600px)': {
    appBar: {
      padding: '0 10px'
    },
    navLogo: {
      order: 1,
      // maxHeight: '4rem',
      display: 'flex',
      alignItems: 'center',
      // justifyContent: 'center',
      paddingLeft: '16px'
    },
    navLink: {
      maxHeight: '2rem',
      order: 3,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
    },
    link: {
      fontSize: '0.8rem',
    },
    navUser: {
      order: 2,
    },
  },
  mContainer :{
    width: '50vw',
    height: '100%',
    background: primaryColor,
    color: textColor
  },
  mlink: {
    width: '100%',
    display: 'block',
    textDecoration: 'none',
    padding: 0,
    '&:active': {
      background: "transparent"
    }
  },
  mbutton: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    padding: '2rem '
  }
};

export default navbarStyles;
