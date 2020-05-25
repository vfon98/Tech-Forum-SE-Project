import { container } from "./main";

const discussionViewStyles = {
  container: {
    ...container
  },
  background: {
    background: "#fff",
    padding: '5rem 0',
    '@media (max-width: 600px)': {
      padding: '2rem 0'
    }
  }

}

export default discussionViewStyles;