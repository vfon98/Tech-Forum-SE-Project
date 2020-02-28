import { primaryColor, highlightColor, textColor, container } from './main';

const navbarStyles = {
    navMenu: {
        position: 'fixed'
    },
    appBar: {
        "background": primaryColor,
        "padding": "0 15%",
        "lineHeight": '5rem',
        "@media (min-width: 768px)" : {
            'padding' : '0 15px'
        },
        "@media (min-width: 1400px)" : {
            'padding' : '0 15%'
        },
    },
    brandHighlight: {
        'color': highlightColor
    }
    ,
    btn: {
        "padding" : '2rem',
        "@media (min-width: 768px)" : {
            'padding' : '1rem'
        },
        "@media (min-width: 1400px)" : {
            'padding' : '2rem'
        },
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
        padding: '0 .5rem',
        "@media (min-width: 768px)" : {
            'width' : '6rem'
        },
        "@media (min-width: 1400px)" : {
            'width' : '10rem'
        },
    }
}

export default navbarStyles;