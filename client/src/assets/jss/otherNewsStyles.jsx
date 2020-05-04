import { lightBlueColor, blue } from './main';

const otherNewsStyles = {
  slideWrapper: {
    margin: '0 4px',
  },
  slideBg: {
    // Enable if you want dark theme
    // color: textColor,
    // backgroundColor: secondaryColor,
  },
  sectionHeader: {
    fontSize: '1.3rem',
    fontWeight: '500',
    borderLeft: `4px solid ${lightBlueColor}`,
    paddingLeft: '10px',
    margin: '0 0 12px 4px',
  },
  textWrapper: {
    padding: '6px 8px 0',
    minHeight: '3.9rem',
  },
  slideTitle: {
    fontSize: '0.9rem',
    fontWeight: '500',
    textAlign: 'left',
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'hidden',
    lineClamp: '3',
    boxOrient: 'vertical',
  },
  authorWrapper: {
    paddingTop: '4px',
    paddingBottom: '5px'
  },
  avatarSm: {
    width: '1.2em',
    height: '1.2em',
    border: `1px solid ${lightBlueColor}`,
  },
  displayName: {
    fontWeight: '600',
    color: blue,
    fontSize: '0.7rem'
  },
  actionWrapper: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.8rem',
    fontWeight: 500,
    color: '#5f5f5f'
  },
  actionIcon: {
    marginRight: '3px',
  },
};

export default otherNewsStyles;
