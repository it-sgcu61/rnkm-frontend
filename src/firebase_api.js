import axios from 'axios'
var localStorage = require('localStorage')
var proxy = ''; // for Cross Origin Request
var host = 'https://5xhgfqhpgik599bg2d9v.tk'

// LOGIN - required to do user's personal things
async function login(username, password) {
  let token = localStorage.getItem("token")
  let user = localStorage.getItem("username")
  if (token && user) {
    console.log('[success] already login')
    return {
      token,
      "oldHouse": localStorage.getItem("oldHouse"),
      "currentHouse": localStorage.getItem("currentHouse"),
      "fullname": localStorage.getItem("fullname"),
      "expireTime":localStorage.getItem('expireTime'),
    }
  }
  if (!username || !password) {
    alert('please fill input')
    return
  }
  return await axios.post(
    proxy + host + '/login', {
      id: username,
      tel: password
    }).then((res) => {
      console.log('[info] token is ', res)
      if(res.data.success){
        res = res.data.data
        localStorage.setItem('token', res.token);
        localStorage.setItem('oldHouse', res.oldHouse);
        localStorage.setItem('currentHouse', res.currentHouse);
        localStorage.setItem('expireTime', res.expireTime);
        localStorage.setItem('fullname', res.fullname);
        localStorage.setItem('username', username);
        return res
      }else{
        alert(res.data.message)
        return {}
      }
  }).catch(()=>({}))
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
  }).catch(()=>({}))
}

// confirm house and sent to DTNl
function confirmHouse(user, token) {
  return axios.post(
    proxy + host + '/confirmHouse', {
      id: user,
      token: token
    }).then((res) => {
    return res.data//.success
    // res.success === true --> OK
    // else  not locked you house
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

