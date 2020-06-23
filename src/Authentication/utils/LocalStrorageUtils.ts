const userDetailsKey:string = 'userDetails'

export const setUserDetails = (userDetails:object):void=> {
   localStorage.setItem(userDetailsKey, JSON.stringify(userDetails))
}

export const getUserDetails = ():object => {
   return {}
}

export const removeUserDetails = ():void => {
   localStorage.removeItem(userDetailsKey)
}

export const clearStrorage = ():void=> {
   localStorage.clear()
}
