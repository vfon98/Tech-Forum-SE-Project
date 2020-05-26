const itemStyles = {
  icon : {
    display: 'inline-flex',
    verticalAlign: 'middle',
    paddingBottom: '.4rem',
    '@media (max-width: 600px)': {
      fontSize: '0.9rem !important',
    }
  },
  label: {
    fontSize: '1rem',
    fontWeight: '300',
    paddingLeft: ".5rem",
    marginLeft: '.5rem',
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
      paddingLeft: 0,
    }
  },
  valueRow: {
    marginTop: '.25rem',
  },
  value: {
    margin: '0 1rem 1rem 1rem',
    flexGrow: '1',
    width: '100%',
    fontSize: '.9rem',
    minWidth: '6rem',
    display: 'inline-block',
    fontWeight:'bold',
    color: "#455A64"
  },
  displayButton: {
    visibility: 'hidden',
    opacity: '0'
  },
  textField: {
    marginBottom: '1rem', 
    width: '80%',
  },
  buttonWrap: {
    paddingRight: '0'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  row : {
    display: 'flex',
  },
  button: {
    width: '75%',
    border:"1px solid #1976D2",
    marginLeft: '1rem',
    color: "#1976D2",
    textTransform: 'none',
    whiteSpace: 'nowrap',
  }
}
export default itemStyles