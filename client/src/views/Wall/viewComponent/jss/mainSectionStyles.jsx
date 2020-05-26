import { container } from 'assets/jss/main'
import { orangeColor } from 'assets/jss/main'

const mainSectionStyles = {
  container : {
    ...container,
    background: "#292E38",
    paddingBottom: '0',
  },
  title : {
    color: "#fff",
    margin: "2rem 0"
  },
  noPostsButton: {
    color: 'orange',
    borderColor: 'orange',
    marginBottom: '32px',
    textTransform: 'none',
    '&:hover': {
      color: orangeColor,
    }
  }
}

export default mainSectionStyles