import { container, primaryColor, secondaryColor, textColor } from "./main";

const mainThreadsStyles = {
    container :{
        ...container,
        background: secondaryColor,
    },
    title : {
        color: textColor,
        fontFamily: 'Roboto',
        fontWeight: '900'
    }
}

export default mainThreadsStyles;