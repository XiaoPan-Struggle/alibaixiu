/*
 * @Author: your name
 * @Date: 2020-05-22 13:40:26
 * @LastEditTime: 2020-05-22 14:48:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \前端\alibaixiu\public\assets\js\list.js
 */

//  获取地址栏id
var categoryId = getUrlParams('categoryId')
// 发送请求
$.ajax({
  type: 'get',
  url: '/posts/category/' + categoryId,
  success: function (response) {
    var html = template('newsTpl', { data: response })
    $('#newsBox').html(html)
  },
})

// 获取分类信息
$.ajax({
  type: 'get',
  url: '/categories/' + categoryId,
  success: function (response) {
    $('#categorytitle').html(response.title)
  },
})

// 点赞功能
$('#newsBox').on('click', '#like', function () {
  var id = $(this).attr('data-id')
  $.ajax({
    type: 'post',
    url: '/posts/fabulous/' + id,
    success: function () {
      alert('点赞成功，感谢支持')
      location.reload()
    },
  })
})
