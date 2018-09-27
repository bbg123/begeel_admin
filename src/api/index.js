import axios from 'axios'
import qs from 'qs'

// 基础路径
axios.defaults.baseURL = '/api/'
// 过期时间
axios.defaults.timeout = 5000
// 设置头部
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

export const login = (data) => {
  return axios.post('login.php', qs.stringify(data)).then(res => res.data)
}

export const GetMenuList = (data = {}) => {
  return axios.post('get_menu_list.php', qs.stringify(data)).then(res => res.data)
}

export const getUserList = (data = {}) => {
  return axios.post('index.php', qs.stringify(data)).then(res => res.data)
}

export const delUser = (data = {}) => {
  return axios.post('del.php', qs.stringify(data)).then(res => res.data)
}

export const addUser = (data = {}) => {
  return axios.post('add.php', qs.stringify(data)).then(res => res.data)
}

export const reviseUser = (data = {}) => {
  return axios.post('revise.php', qs.stringify(data)).then(res => res.data)
}
