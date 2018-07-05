
import Vue from 'vue'
async function get_regist_form() {
  let th_form = 'http://datanaliez.com/api/v1/form/info/9ac55c2b380fa428ffb3313338f50962042fe33a27a7e4a3f845a9fbfe0ee54d'
  let en_form = 'http://datanaliez.com/api/v1/form/info/724a92c1432f95e54618e87bf07911161c9cc192900282e1dca850cf98654fe5'
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
    let post_url = 'http://datanaliez.com/api/v1/form/submit/724a92c1432f95e54618e87bf07911161c9cc192900282e1dca850cf98654fe5'
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
