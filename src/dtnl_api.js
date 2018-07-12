
import Vue from 'vue'
import {check_if_user_exist, mark_that_user_already_registered} from './middle-api'
async function get_regist_form(lang) {
  let th_form = 'https://datanaliez.com/api/v1/form/info/c71b2019e1b82f4bdfdf2edff8e28efc3f3c2df14284e7c3ea2e3aea7d5d87ac'
  let en_form = 'https://datanaliez.com/api/v1/form/info/2f1a1b950af77e04c2294ba116af1b9bfefe53aa73eed282d32dc2d643f7b333'
  let field =  lang == "TH" ?
    await Vue.http.get(th_form).then(res => res.body, err => err) :
    await Vue.http.get(en_form).then(res => res.body, err => err)
  return field.result
}
async function post_regist_form(ar){
  console.assert(ar instanceof Array)
  let post_url = 'https://datanaliez.com/api/v1/form/submit/c71b2019e1b82f4bdfdf2edff8e28efc3f3c2df14284e7c3ea2e3aea7d5d87ac'
  for(var index in ar){
    var obj = ar[index]
    const isUserAlreadyRegist = await check_if_user_exist(obj["dynamic/nationalID_URL"])
    console.log(isUserAlreadyRegist)
    if(!isUserAlreadyRegist){
      mark_that_user_already_registered(obj["dynamic/nationalID_URL"])
      Vue.http.post(post_url, obj).then(null, err => {
        throw err
      })
    }else{
      throw new Error(`${obj["dynamic/fullname"]} ได้ลงทะเบียนไปแล้ว กรุณาติดต่อผู้ดูแลระบบ หากคุณคิดว่านี่คือความผิดพลาด`)
    }
  }
}
export {get_regist_form, post_regist_form};
