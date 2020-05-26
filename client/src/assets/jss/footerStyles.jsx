import { primaryColor, highlightColor, textColor } from "./main";

const footerStyles = {
  background: {
    background: primaryColor,
    // marginTop: '8px',
    height: '8rem',
    borderTop: '1px solid ' + highlightColor,
    "& p" : {
      color: textColor,
      padding: 0,
      margin: 0,
      display: 'block',
      textAlign: 'center',
      position: 'relative',
      top: '50%'
    }
  }

}

export default footerStyles;