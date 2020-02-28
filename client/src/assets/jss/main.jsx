const primaryColor = "#292E38"
const secondaryColor = "#313947"
const textColor = "rgba(255,255,255,.8)"
const highlightColor = "#DD163B"
const green = "#38A220"
const blue = "#1464D2"
const dyan = "#22A2B1"
const container  = {
    width: "100%",
    padding: "0 15%",
    boxSizing: "border-box",
    "@media (min-width: 768px)" : {
        padding: '0 15px'
    },
    "@media (min-width: 1500px)": {
        padding: "0 15%"
      }
}
const title = {
    color : textColor,
    fontSize: '1.5rem',
    fontWeight: "700"
}

export  {
    primaryColor,
    secondaryColor,
    textColor,
    highlightColor,
    green,
    blue,
    dyan,
    container,
    title
}