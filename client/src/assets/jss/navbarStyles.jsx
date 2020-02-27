import { primaryColor, highlightColor, textColor, container } from './main';

const navbarStyles = {
    navMenu: {
        position: 'fixed'
    },
    appBar: {
        "background": primaryColor,
        "padding": "0 15%",
        "lineHeight": '5rem'
    },
    brandHighlight: {
        'color': highlightColor
    }
    ,
    btn: {
        "padding" : '2rem'
    },
    link: {
        "color": textColor,
        "textDecoration": 'none'
    },
    accountBtn : {
        "color" : textColor,
    },
    searchBox : {
        width: '10rem',
        height:' 2rem',
        background: 'transparent',
        borderRadius: '1rem',
        border: '1px solid #fff',
        alignSelf: 'center',
        outline: 'none',
        color: textColor,
        fontSize: '.8rem',
        padding: '0 .5rem'
    }
}

export default navbarStyles;