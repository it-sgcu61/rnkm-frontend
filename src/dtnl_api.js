
import Vue from 'vue'
import {check_if_user_exist, mark_that_user_already_registered} from './middle-api'
async function get_regist_form(lang) {
  let th_form = 'https://datanaliez.com/api/v1/form/info/9ac55c2b380fa428ffb3313338f50962042fe33a27a7e4a3f845a9fbfe0ee54d'
  let en_form = 'https://datanaliez.com/api/v1/form/info/724a92c1432f95e54618e87bf07911161c9cc192900282e1dca850cf98654fe5'
  let field =  lang == "TH" ?
    await Vue.http.get(th_form).then(res => res.body, err => err) :
    await Vue.http.get(en_form).then(res => res.body, err => err)
  return field.result
}
async function post_regist_form(ar, language){
  console.assert(ar instanceof Array)
  var registeringNationalIDList = []
  if(ar.reduce((acc, obj)=>{const isDuplicate = registeringNationalIDList.includes(obj["dynamic/nationalID"]); registeringNationalIDList.push(obj["dynamic/nationalID"]); return acc||isDuplicate},false)){
    throw new Error(`มีข้อมูลบางอย่างซ้ำกัน กรุณาตรวจสอบข้อมูลของคุณ`)
  }
  let post_url = language == 'TH' ? 'https://datanaliez.com/api/v1/form/submit/9ac55c2b380fa428ffb3313338f50962042fe33a27a7e4a3f845a9fbfe0ee54d'
  : 'https://datanaliez.com/api/v1/form/submit/724a92c1432f95e54618e87bf07911161c9cc192900282e1dca850cf98654fe5'
  for(var index in ar){
    var obj = ar[index]
    const isUserAlreadyRegist = await check_if_user_exist(obj["dynamic/nationalID"])
    console.log(isUserAlreadyRegist)
    if(!isUserAlreadyRegist){
      mark_that_user_already_registered(obj["dynamic/nationalID"])
      Vue.http.post(post_url, obj).then(null, err => {
        throw err
      })
    }else{
      throw new Error(`${obj["dynamic/fullname"]} ได้ลงทะเบียนไปแล้ว กรุณาติดต่อผู้ดูแลระบบ หากคุณคิดว่านี่คือความผิดพลาด`)
    }
  }
}
export {get_regist_form, post_regist_form};
