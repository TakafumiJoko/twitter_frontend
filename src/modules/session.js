export function login(user_id) {
  $cookies.set("user_id", user_id)
}

export function logout(user_id) {
  $cookies.remove("user_id")
}