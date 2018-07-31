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
var localStorage = require('localStorage')
var proxy = ''; // for Cross Origin Request
var host = 'https://5xhgfqhpgik599bg2d9v.tk:8080'

// LOGIN - required to do user's personal things
async function login(username, password) {
  let token = localStorage.getItem("token")
  let user = localStorage.getItem("username")
  if (token && user) {
    console.log('[success] already login')
    return token
  }
  return await axios.post(
    proxy + host + '/login', {
      id: username,
      tel: password
    }).then((res) => {
    res = res.data.data
    console.log('[info] token is ' + res.token)
    localStorage.setItem('token', res.token);
    localStorage.setItem('username', username);
    return res.token
  })
}
// movePerson between house
function movePerson(user, token, house) {
  return axios.post(
    proxy + host + '/movePerson', {
      house: house, // house name to move to
      id: user, // username (tel number)
      token: token, // token (from login, expires after 5 mins, I can remove the timeout)
    }).then((res) => {
	res=res.data
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
    proxy + host + '/confirmHouse', {
      id: user,
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
    proxy + host + '/getInfo', {
      id: user,
      token: token
    }).then((res) => {
    console.log('[success] get personal data')
    res = res.data
	if(!res.success)
		return false
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
    proxy + host + '/logout', {
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




// HIDDEN
function register() {
  axios.post(".../register", {
    key: '$2b$10$kuaHw4bVqFboBi4.OE7u.epYivqqR154fwr5OfWmn6Q8kV/oTOS',
    lang: 'EN',
    formData: {
      "head/house1": "บ้านคุณหนู - Khunnoo",
      "head/house2": "บ้านโคะ - KOH",
      "head/house3": "บ้านดอก - Dork",
      "dynamic/nameprefix": "นาย - Mr.",
      "dynamic/fullname": "หกฟ ๆไพพๆ",
      "dynamic/nickname": "ๆำๆ ำๆไำๆไ",
      "dynamic/faculty": "วิทยาศาสตร์ - Faculty of Science",
      "dynamic/nationalID": "1200100123456",
      "dynamic/religion": "-",
      "dynamic/tel": "089-123-6789",
      "dynamic/lineID": "rod",
      "dynamic/facebook": "d412",
      "dynamic/emergency_tel": "089-321-6457",
      "dynamic/emergency_tel_relation": "บิดา",
      "dynamic/RCU_required": "yes",
      "dynamic/congenital_disease": "-",
      "dynamic/regularDrug": "-",
      "dynamic/drugAllergy": "-",
      "dynamic/disorders": "-",
      "dynamic/foodAllergies": "-",
      "hidden/groupID": "1674887",
      "hidden/imageURL": "www.google.com",
      "final-house": "baanjo"
    }
  })
}

