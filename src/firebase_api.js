function getCookie(w) {
  let cName = "";
  let pCOOKIES = document.cookie.split('; ') || new Array();
  for (let bb = 0; bb < pCOOKIES.length; bb++) {
    let NmeVal = pCOOKIES[bb].split('=');
    if (NmeVal[0] == w) {
      cName = unescape(NmeVal[1]);
    }
  }
  return cName;
}

// function setCookie(name, value, expires, path) {
//   let cookieStr = name + "=" + value + "; ";
//   if (expires) {
//     expires = setExpiration(expires);
//     cookieStr += "expires=" + expires + "; ";
//   }
//   if (path) {
//     cookieStr += "path=" + path + "; ";
//   }
//   if (secure) {
//     cookieStr += "secure; ";
//   }
//   document.cookie = cookieStr;
// }

// $(document).ready(function () {

import axios from 'axios'
var proxy = 'https://cryptic-headland-94862.herokuapp.com/'; // for Cross Origin Request


// LOGIN - required to do user's personal things
async function login(username, password) {
  let token = getCookie('token');
  let user = getCookie('username');
  if (token && user){
    console.log('[success] already login')
    return token
  }
  return await axios.post(
    proxy + 'https://us-central1-rnkm2018-house-ad25ge.cloudfunctions.net/login', {
      username: username,
      password: password
    }).then((res) => {
    res = res.data
    console.log('[info] token is ' + res.token)
    document.cookie = `token=${escape(res.token)}; expires:${res.expire} ;path=/`;
    document.cookie = `username=${username}; expires:${res.expire}; path=/`;
    return res.token
  })
}
// movePerson between house
function movePerson(user, token, house) {
  return axios.post(
    proxy + 'https://us-central1-rnkm2018-house-ad25ge.cloudfunctions.net/movePerson', {
      house: house, // house name to move to
      username: user, // username (tel number)
      token: token, // token (from login, expires after 5 mins, I can remove the timeout)
    }).then((res) => {
    return res
    // manage response here
    // some examples
    // res1 = {
    //   "success": false,
    //   "message": "full house"
    // } // house full
    // res2 = {
    //   "success": false,
    //   "message": "invalid house"
    // } // trying to specify invalid house
    // res3 = {
    //   "success": false,
    //   "message": "wrong credentials"
    // } // token expired or wrong token/username
    // res4 = {
    //   "success": true,
    //   "message": "OK"
    // } // OK
  })
}

// confirm house and sent to DTNl
function confirmHouse(user, token) {
  return axios.post(
    proxy + 'https://us-central1-rnkm2018-house-ad25ge.cloudfunctions.net/confirmHouse', {
      username: user,
      token: token
    }).then((res) => {
    return res
    // res.success === true --> OK
    // else  not locked you house
  })
}

// get user's info from DTNL & firebase
async function getPersonInfo(user, token) {
  return await axios.post(
    proxy + 'https://us-central1-rnkm2018-house-ad25ge.cloudfunctions.net/getPersonInfo', {
      username: user,
      token: token
    }).then((res) => {
      console.log('[success] get personal data')
      res = res.data
      return res.data
    // res1 = {
    //   "success": false,
    //   "message": "wrong credentials"
    // }
    // res2 = {
    //   "success": true,
    //   "message": "OK",
    //   "data": {
    //     "_id": "5b45d9ad22607ae04bdf2459",
    //     "dynamic/RCU_required": "no",
    //     "dynamic/congenital_disease": "091-919-1011",
    //     "dynamic/disorders": "-",
    //     "hidden/groupID": "JJGZ1DG8GEEYXBB1CD",
    //     "hidden/imageURL": "https://firebasestorage.googleapis.com/v0/b/rnkm-cu102.appspot.com/o/image%2Ff9u2e3qm343ed.jpeg?alt=media&token=a908c30d-36e8-4d4f-a887-14e64d07e935",
    //     "house": "baanjo",
    //     "is_confirmed": 0
    //   } // last two field (house, is_confirmed is data from firebase, house = realtime house (the latest data))
    //   // final house = house in DTNL; not updated until firebase submits to DTNL
  })

}

// LOGOUT - just invalidate token
function logout(user, token) {
  return axios.post(
    proxy + 'https://us-central1-rnkm2018-house-ad25ge.cloudfunctions.net/logout', {
      username: user,
      token: token
    }).then(res => res.message)
}


export {
  login,
  logout,
  getPersonInfo,
  confirmHouse,
  movePerson,
}
