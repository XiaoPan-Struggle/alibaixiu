/*
 * @Author: your name
 * @Date: 2020-05-13 14:53:03
 * @LastEditTime: 2020-05-22 09:36:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \前端\alibaixiu\public\assets\js\common.js
 */

// 添加退出点击事件
$('#logout').on('click', function () {
  // 提示框是否退出 返回值 true或false
  var ifconfirm = confirm('您确认退出')
  if (ifconfirm) {
    $.ajax({
      type: 'post',
      url: '/logout',
      success: function (response) {
        location.href = 'login.html'
        // 退出提示
        alert(response.message)
      },
      error: function () {
        alert('退出失败')
      },
    })
  }
})

// 处理日期时间格式
function formateDate(date) {
  // 将日期时间字符串转换成日期对象
  date = new Date(date)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

// 向服务器发送请求，获取登录用户信息
$.ajax({
  type: 'get',
  url: '/users/' + userId,
  success: function (response) {
    $('.avatar').attr('src', response.avatar)
    $('.profile .name').html(response.nickName)
  },
})
