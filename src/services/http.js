import config from '@/config'
let baseUrl = config.server.url //'http://10.10.3.144:7011/api/v1.0'
let post = (url, params) => {
  loadingBar.start();
  showLoading();
  return new Promise((resolve, reject) => {
    $.ajax({
      url: baseUrl + url,
      type: 'post',
      data: params,
      xhrFields: {
        withCredentials: true
      }
    }).then(
      (data) => {
        loadingBar.finish();
        hideLoading();

        resolve(data)
      },
      (err) => {
        loadingBar.error();
        hideLoading();

        showPrompt({
          content: "异常错误!"
        })
        console.log(err)
      }
    )
  })
}
let get = (url, params) => {
  loadingBar.start();
  showLoading();
  return new Promise((resolve, reject) => {
    $.ajax({
      url: baseUrl + url,
      type: 'get',
      params: params,
      jsonp: 'callback',
      xhrFields: {
        withCredentials: true
      }
    }).then(
      (data) => {
        loadingBar.finish();
        hideLoading();

        resolve(data)
      },
      (err) => {
        loadingBar.error();
        hideLoading();
        showPrompt({
          content: "异常错误!"
        })
        console.log(err)
      }
    )
  })
}
let jsonp = (url, params) => {
  loadingBar.start();
  showLoading();
  return new Promise((resolve, reject) => {
    var option = {
      url: baseUrl + url,
      dataType: 'jsonp',
      data: params,
      jsonp: 'callback',
      xhrFields: {
        withCredentials: true
      }
    }
    console.log(option)
    $.ajax(option).then(
      (data) => {
        loadingBar.finish();
        hideLoading();
        resolve(data)
      },
      (err) => {
        loadingBar.error();
        hideLoading();
        showPrompt({
          content: "异常错误!"
        })
        console.log(err)
      }
    )
  })
}
export default {
  post,
  get,
  jsonp
}
