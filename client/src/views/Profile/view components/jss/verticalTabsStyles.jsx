import { container } from '../../../../assets/jss/main'

const verticalTabsStyles = {
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: "transparent",
    textAlign: 'left!important',
    marginTop: '2rem'
  },
  container: {
    ...container,
  },
  appBar: {
    boxShadow: 'none',
    backgroundColor: 'transparent'
  },

  icon : {
    paddingRight: '0.5rem'
  },
  button : {
    textTransform: 'none',
    marginLeft: '.5rem'
  }
}

export default verticalTabsStyles;