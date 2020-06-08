const userDetailsKey = "userDetails"


export const setUserDetails = (userDetails) =>{
    localStorage.setItem(userDetailsKey,JSON.stringify(userDetails));
}

export const getUserDetails = ()=>{
    return JSON.parse(localStorage.getItem(userDetailsKey));
}

export const removeUserDetails = () =>{
    localStorage.removeItem(userDetailsKey);
}

export const clearStrorage = () =>{
    localStorage.clear();
}