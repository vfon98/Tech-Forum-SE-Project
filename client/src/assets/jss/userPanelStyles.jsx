import { secondaryColor, textColor } from './main'

const userPanelStyles = {
  list: {
    border: `2px solid ${secondaryColor}`,
    backgroundColor: secondaryColor,
    color: textColor,
    padding: 0
  },
  listItem: {
    color: textColor,
  },
  listPostItem: {
    color: textColor,
    marginRight: '-1.2em'
  }
}

export default userPanelStyles;
