const logIn = function logIn(user) {
  $cookies.set("userId", user.id)
}

const logOut = function logOut() {
  $cookies.remove("userId")
}

const cookieUserId = function cookieUserId(){
  return $cookies.get("userId")
}

const isLoggedIn = function isLoggedIn(){
  return $cookies.get("userId") ? true : false
}

export { logIn, logOut, cookieUserId, isLoggedIn }