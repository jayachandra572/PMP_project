import Cookie from 'js-cookie'

export const ACCESS_TOKEN = 'dG6EABne5a'
export const USER_ID = 'LWnVZPcwXY9puxBqMXG'

export function getCookie(key) {
   return Cookie.get(key)
}

function setCookie(key, value) {
   Cookie.set(key, value, {
      expires: 30,
      path: '/'
   })
}

export function getAccessToken() {
   return getCookie(ACCESS_TOKEN)
}
export function setAccessToken(accessToken) {
   setCookie(ACCESS_TOKEN, accessToken)
}

export function clearUserSession() {
   Cookie.remove(ACCESS_TOKEN, { path: '/' })
}

export function setUserId(userId: string, expiryInDays = 30) {
   setCookie(USER_ID, userId)
}

export function getUserId() {
   return getCookie(USER_ID)
}