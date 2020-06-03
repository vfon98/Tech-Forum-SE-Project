import { primaryColor, highlightColor, textColor } from "./main";
import { container } from "./main";

const footerStyles = {
  background: {
    background: primaryColor,
    // marginTop: '8px',
    minHeight: '8rem',
    borderTop: '1px solid ' + highlightColor,
    padding: '2rem 0',
    "& p": {
      color: textColor,
      padding: 0,
      margin: 0,
      display: 'block',
      position: 'relative',
      top: '50%'
    }
  },
  container: {
    ...container,
    width: '100%',
    minHeight: '8rem',
  },
  brand: {
    fontSize: '1.2rem',
    color: textColor,
    paddingTop: '1rem'
  },
  highlight: {
    color: highlightColor
  },
  right: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    textAlign: 'right',
    "& ul": {
      listStyleType: 'none'
    },
  },
  left: {
    fontSize: '.9rem',
    display: 'flex',
    justifyContent: 'flex-start',
    color: textColor,
    '& ul': {
      listStyleType: 'none',
      '& li': {
        padding: '.3rem 0',
        transition: '.2s',
        '&:hover': {
          color: highlightColor
        }
      }
    },
    '& a': {
      color: textColor,
      textDecoration: 'none',
      transition: '.1s',
      '&:hover': {
        color: highlightColor
      }
    }
  },
  contactBtn: {
    background: 'transparent',
    outline: 'none',
    border: 'none',
    color: textColor,
    padding: 0,
    margin: 0,
    fontSize: '.9rem',
    transition: '.2s',
    '&:hover': {
      color: highlightColor,
      cursor: 'pointer'
    }
  },
  right: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection:'row',
    fontSize: '.8rem',
    opacity: '.5',
    '& p' : {
      padding: 0,
      margin: 0,
      height: '0'
    }

  },
  icon: {
    display: 'inline-flex',
    verticalAlign: 'middle',
    paddingRight: '.2rem',
    paddingLeft: '.2rem',
    fontSize: '.8rem',
  }

}

export default footerStyles;