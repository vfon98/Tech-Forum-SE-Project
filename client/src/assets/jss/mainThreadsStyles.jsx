import { container, primaryColor, secondaryColor, textColor, title } from "./main";

const mainThreadsStyles = {
    container :{
        ...container,
        background: secondaryColor,
    },
    title : {
        ...title,
        color: textColor,

    }
}

export default mainThreadsStyles;