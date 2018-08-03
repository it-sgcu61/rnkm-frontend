import axios from 'axios'
import querystring from 'querystring'
// const API = 'https://35.198.212.105:8080'
const API = 'https://5xhgfqhpgik599bg2d9v.tk'

// 083-012-3518
// 1309902842289
// กนกนพ ตุลยพงศ์รักษ์

function get_regist_form() {
  return require('./others/static_TH_form.wan-jeeng.json').result
}
async function post_regist_form(form) { // form is an object
  console.log(form)
  try {
    return await axios.post(`${API}/register`, querystring.stringify({
      lang: "TH",
      formData: JSON.stringify(form)
    }))
  } catch(err) {
    alert(err)
  }
}

async function register(lang, formData) {
  return await axios.post(`${API}/register`, {
    lang: lang,
    formData: formData
  })
}

async function login(id, tel) {
  return await axios.post(`${API}/login`, {
    id: id,
    tel: tel,
  })
}

async function logout(id, tok) {
  return await axios.post(`${API}/logout`, {
    id: id,
    token: tok,
  })
}

async function getInfo(id, tok) {
  return await axios.post(`${API}/getInfo`, {
    id: id,
    token: tok,
  })
}

async function movePerson(id, tok, house) {
  return await axios.post(`${API}/movePerson`, {
    id: id,
    token: tok,
    house: house
  })
}

async function getHouses() {
  return await axios.get(`${API}/getHouses`)
}

async function confirmHouse(id, tok) {
  return await axios.post(`${API}/confirmHouse`, {
    id: id,
    token: tok
  })
}

export {get_regist_form, post_regist_form};
export {register, login, logout, getInfo, getHouses, movePerson, confirmHouse};

// db.ref('/houses') เอาไว้ listen on baan status ใน firebase
