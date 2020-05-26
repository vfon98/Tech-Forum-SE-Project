const itemStyles = {
  icon: {
    display: 'inline-flex',
    verticalAlign: 'middle',
    paddingBottom: '.4rem'
  },
  label: {
    fontSize: '1rem',
    fontWeight: '300',
    marginLeft: '1rem',
    '@media (max-width: 600px)': {
      fontSize: '0.9rem',
      marginLeft: '0.5rem'
    }
  },
  value: {
    margin: '0 1rem',
    fontSize: '.9rem',
    minWidth: '6rem',
    display: 'inline-block',
    color: "#455A64",
    padding: ".2rem 0",
    fontWeight: 'bold'
  },
  hideButton: {
    visibility: 'hidden',
    opacity: '0'
  },
  showButton: {
    visibility: 'visible',
    opacity: '1'
  },
  inputField: {
    display: 'flex',
    flexWrap: 'wrapped',
    justifyContent: 'space-between'
  },
  textField: {
    marginBottom: '0',
    marginLeft: "1rem",
    width: '100%',
    display: 'flex'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  row: {
    display: 'flex',
    flexWrap: 'wrapped',
  },
  addNewButton: {
    width: '75%',
    border: "1px solid #1976D2",
    marginLeft: '1rem',
    color: "#1976D2",
    textTransform: 'none',
    whiteSpace: 'nowrap'
  },
  link: {
    textDecoration: 'none',
    color: "#333",
    margin: '0 1rem',
    fontSize: '1rem',
    minWidth: '6rem',
    display: 'inline-block'

  },
  button: {
    width: '75%',
    border: " 1px solid #1976D2",
    marginLeft: '1rem',
    marginBottom: '1rem',
    color: "#1976D2",
    textTransform: 'none'
  }
}
export default itemStyles