
import Vue from 'vue'
async function get_regist_form() {
  // return {
  //   "TH": require('../src/others//rnkm_regist_form_TH_lang.json').result.fieldList,
  //   "EN": require('../src/others/rnkm_regist_form_EN_lang.json').result.fieldList,
  // }
  let th_form = 'https://datanaliez.com/api/v1/form/info/c71b2019e1b82f4bdfdf2edff8e28efc3f3c2df14284e7c3ea2e3aea7d5d87ac'
  let en_form = 'https://datanaliez.com/api/v1/form/info/2f1a1b950af77e04c2294ba116af1b9bfefe53aa73eed282d32dc2d643f7b333'
  let th = await Vue.http.get(th_form).then(res => res.body, err => err)
  let en = await Vue.http.get(en_form).then(res => res.body, err => err)
  return {
    "TH": th.result.fieldList,
    "EN": en.result.fieldList
  }
}
async function post_regist_form(ar) {
  console.assert(ar instanceof Array)
  return new Promise((resolve, reject) => {
    let post_url = 'https://datanaliez.com/api/v1/form/submit/c71b2019e1b82f4bdfdf2edff8e28efc3f3c2df14284e7c3ea2e3aea7d5d87ac'
    for (let obj in ar) {
      console.log('>>> ')
      console.log(obj)
      Vue.http.post(post_url, obj).then(res => {console.log(res)}, err => {
        console.log('error');
        console.log(err)
      })
    }
    console.log('resolve')
    resolve(ar)
  })
}
export {get_regist_form, post_regist_form};
