console.log('cookie')
const setCookie = function setCookie(name, value, attributes){
  var cookie = name + '=' + value
  for(const property in attributes){
    cookie += '; ' + property + '=' + attributes[property]
  }
  document.cookie = cookie
}

const getCookie = function getCookie(){
  var cookie = document.cookie
  cookie = cookie.split(';')[0].split('=')[1]
  return cookie
}

const removeCookie = function removeCookie(){
  document.cookie = document.cookie.split(';')[0] + '; max-age=0'
}

const isLoggedIn = function isLoggedIn(){
  return getCookie() ? true : false
}

export { setCookie, getCookie, removeCookie, isLoggedIn } 