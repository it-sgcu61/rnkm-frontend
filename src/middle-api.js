import Vue from 'vue'
const middleAPI = "https://5xhgfqhpgik599bg2d9v.tk"
const nameTHtoURLdict = {
  "บ้านอะอึ๋ม": "a-aum",
  "บ้านแอ๊บ": "abnormal",
  "บ้านเอช้วน": "achuan",
  "บ้านอากาเป้": "agape",
  "บ้านบูชายัญ": "buchayun",
  "บ้านบึ้ม": "buem",
  "บ้านดอก": "dork",
  "บ้านดุ๊ยดุ่ย": "duidui",
  "บ้านดัง": "dung",
  "บ้านเฟี้ยว": "fyo",
  "บ้านอินเดียน่า": "indiana",
  "บ้านอินดี้": "indy",
  "บ้านจัดสัน": "jadson",
  "บ้านโจ๋": "jo",
  "บ้านโจ๊ะเด๊ะ": "Huesa",
  "บ้านคุณหนู": "khunnoo",
  "บ้านคิดส์": "kids",
  "บ้านโคะ": "koh",
  "บ้านคุ้ม": "koom",
  "บ้านหลายใจ": "laijai",
  "บ้านหมีน้อย": "mheenoi",
  "บ้านไหน": "nhai",
  "บ้านพักตากอากาศ": "pak-tak-agard",
  "บ้านผี": "phee",
  "บ้านพ่อ": "por",
  "บ้านเปรี้ยว": "preaw",
  "บ้านแรง": "rang",
  "บ้านหรอย": "rhoy",
  "บ้านเสี่ยว": "seiyw",
  "บ้านสด": "sod",
  "บ้านโซ้ยตี๋หลีหมวย": "soeitee",
  "บ้านเต็ม": "tem",
  "บ้านหวัง": "wang",
  "บ้านว้อนท์": "wanted",
  "บ้านเวิร์ค": "work",
  "บ้านยิ้ม": "yim",
  "not found": "notFound",
}
// /api/registration/check/:id
// /api/registration/add/:id
async function check_if_user_exist(nationalID) {
  let resp = await Vue.http.get(`${middleAPI}/api/registration/check/${nationalID}`).then(res => res.body, err => err)
  return resp.result == "true"
}

async function mark_that_user_already_registered(nationalID) {
  let resp = await Vue.http.get(`${middleAPI}/api/registration/add/${nationalID}`).then(res => res.body, err => err)
  return resp.result == "success"
}

async function announcement(tel, nationalID) {
  let resp = await Vue.http.get(`${middleAPI}/api/announce/getHouse/${tel}/${nationalID}`).then(res => res.body, err => err)
  return nameTHtoURLdict[resp.result.split("-")[0].trim()]
}
export {check_if_user_exist, mark_that_user_already_registered, announcement};
