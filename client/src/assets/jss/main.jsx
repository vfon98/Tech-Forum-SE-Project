const primaryColor = "#292E38"
const secondaryColor = "#313947"
const darkColor = "#1D1D1D";
const textColor = "rgba(255,255,255,.8)"
const textSecondaryColor = '#8F8F8F';
const highlightColor = "#DD163B"
const green = "#38A220"
const blue = "#1464D2"
const orangeColor = '#f57c00';
const lightBlueColor = "#2D88FF"
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
    darkColor,
    textColor,
    textSecondaryColor,
    orangeColor,
    highlightColor,
    green,
    blue,
    lightBlueColor,
    dyan,
    container,
    title
}