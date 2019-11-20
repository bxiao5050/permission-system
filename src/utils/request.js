import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { showLoading, hideLoading } from './loading';
// 创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
    timeout: 25000 // 请求超时时间
})

// 请求拦截器(请求之前的操作)
service.interceptors.request.use(
        config => {
            showLoading();
            return config
        },
        error => {
            console.log(error) // for debug
            Promise.reject(error)
        }
    )
    // 请求之后的操作
service.interceptors.response.use(
    response => {
        hideLoading();
        const res = response.data
        if (res.code === 200) {
            return Promise.resolve(response.data);
        } else {
            Message({ message: res.message, type: 'error', duration: 5 * 1000 })
            return Promise.reject(response);
        }
    },
    error => {
        hideLoading();
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service