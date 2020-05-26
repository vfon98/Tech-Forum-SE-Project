import { container } from "./main";

const profilePageStyles = {
  container : {
    ...container,
    '@media (max-width: 600px)': {
      padding: 0
    }
  }
}

export default profilePageStyles;