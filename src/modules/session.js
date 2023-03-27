const login = function login(user) {
  $cookies.set("userId", user.id)
}

const logout = function logout() {
  $cookies.remove("userId")
  this.$store.reset()
}

const cookieUserId = function cookieUserId(){
  return $cookies.get("userId")
}

export { login, logout, cookieUserId }