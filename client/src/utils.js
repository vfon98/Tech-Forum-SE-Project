

const isUndefined = v => typeof v === "undefined";
const isDefined = v => typeof v !== "undefined";

const checkingTypes = {
    email: "email",
    display_name: "display_name",
    password: "password",
    repass: "repass",
    address: "address"
}



const validateInput = (type, checkingText) => {
    if (type === checkingTypes.display_name) {
        const regexp = /^\w{3,9}$/; 
        const checkingResult = regexp.exec(checkingText);
        if (checkingResult !== null) {
            return {
                isInputValid: true,
                errorMessage: ''
            };
        } else {
            return {
                isInputValid: false,
                errorMessage: 'Display name must be 3-10 characters'
            };
        }
    }
    if (type === checkingTypes.email) {
        const regexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const checkingResult = regexp.exec(checkingText);
        if (checkingResult !== null) {
            return {
                isInputValid: true,
                errorMessage: ''
            };
        } else {
            return {
                isInputValid: false,
                errorMessage: 'Invalid email'
            };
        }
    }
    if (type === checkingTypes.password) {
        const regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; 
        const checkingResult = regexp.exec(checkingText);
        if (checkingResult !== null) {
            return {
                isInputValid: true,
                errorMessage: ''
            };
        } else {
            return {
                isInputValid: false,
                errorMessage: 'Password must be 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter'  
            };
        }
    }
    if (type === checkingTypes.address) {
        
        if (checkingText !== '') {
            return {
                isInputValid: true,
                errorMessage: ''
            };
        } else {
            return {
                isInputValid: false,
                errorMessage: 'Plz fill in your address'  
            };
        }
    }
    
}

export { validateInput, isDefined, isUndefined };