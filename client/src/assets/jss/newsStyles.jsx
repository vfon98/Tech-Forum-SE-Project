import { primaryColor, secondaryColor, textColor, lightBlueColor } from './main';

const newsStyles = {
  pageWrapper: {
    backgroundColor: secondaryColor,
    padding: '2em 0',
    minHeight: '1000px'
  },
  bannerWrapper: {
    padding: '1.2rem',
    backgroundColor: primaryColor,
    color: textColor,
  },
  bannerTitle: {
    marginLeft: '6px',
    marginBottom: '8px',
    paddingLeft: '8px',
    fontSize: '1.4rem',
    fontWeight: '500',
    borderLeft: `4px solid ${lightBlueColor}`
  }
};

export default newsStyles;
