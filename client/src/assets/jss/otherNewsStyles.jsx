import { lightBlueColor, secondaryColor, textColor } from './main';

const otherNewsStyles = {
  slideWrapper: {
    margin: '0 4px',
  },
  slideBg: {
    // backgroundColor: secondaryColor,
    // color: textColor,
  },
  sectionHeader: {
    fontSize: '1.3rem',
    fontWeight: '500',
    borderLeft: `4px solid ${lightBlueColor}`,
    paddingLeft: '10px',
    margin: '0 0 12px 4px'
  },
  textWrapper: {
    padding: '6px 8px 0'
  },
  slideTitle: {
    fontSize: '0.9rem',
    fontWeight: '500',
    textAlign: 'left',
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'hidden',
    lineClamp: '3',
    boxOrient: 'vertical'
  }
}

export default otherNewsStyles;
