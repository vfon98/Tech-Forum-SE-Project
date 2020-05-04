import {
  primaryColor,
  secondaryColor,
  textColor,
  lightBlueColor,
} from './main';

const newsStyles = {
  pageWrapper: {
    backgroundColor: secondaryColor,
    padding: '2em 0',
    minHeight: '1000px',
  },
  bannerWrapper: {
    padding: '1.2rem',
    backgroundColor: primaryColor,
    color: textColor,
  },
  trendingNewsWrapper: {
    padding: '1.2rem 0.2rem 0.2rem',
    position: 'sticky',
    top: '0.6em',
    backgroundColor: primaryColor,
    color: textColor,
  },
  bannerTitle: {
    marginLeft: '6px',
    marginBottom: '8px',
    paddingLeft: '8px',
    fontSize: '1.4rem',
    fontWeight: '700',
    borderLeft: `4px solid ${lightBlueColor}`,
  },
  cardTitle: {
    color: textColor,
    fontSize: '1.4rem',
    fontWeight: '700',
    marginTop: 0,
    marginBottom: '0.2em',
    marginLeft: '8px',
    paddingLeft: '8px',
    borderLeft: `4px solid ${lightBlueColor}`,
  },
};

export default newsStyles;
