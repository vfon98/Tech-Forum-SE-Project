import { primaryColor, highlightColor, textColor } from "./main";

const footerStyles = {
  background: {
    background: primaryColor,
    marginTop: '1rem',
    height: '10rem',
    lineHeight: '10rem',
    borderTop: '1px solid ' + highlightColor,
    "& p" : {
      color: textColor,
      padding: 0,
      margin: 0,
      display: 'block',
      textAlign: 'center'
    }
  }

}

export default footerStyles;