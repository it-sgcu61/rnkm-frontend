import Vue from 'vue'
const middleAPI = "https://localhost:3000"
async function getAllowEditPersonalForm(username, password) {
  var resp = await Vue.http.post(`${middleAPI}/api/chkInfo/getInfo`,{tel:password, nationalID: username})
  return resp.body
}
async function postEditForm(username, password, newform) {
  var resp = await Vue.http.post(`${middleAPI}/api/chkInfo/editInfo`,{tel:password, nationalID: username, formData: JSON.stringify(newform)})
  return resp.body
}
export {getAllowEditPersonalForm, postEditForm}
