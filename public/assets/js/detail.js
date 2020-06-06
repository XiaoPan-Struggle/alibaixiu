/*
 * @Author: your name
 * @Date: 2020-05-22 14:03:21
 * @LastEditTime: 2020-05-22 15:59:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \前端\alibaixiu\public\assets\js\detail.js
 */

// 获取当前文章再地址栏传入的id值
var id = getUrlParams('id')
// 获取设置里的state值，判断评论是否需要审核
var review
$.ajax({
  type: 'get',
  url: '/posts/' + id,
  success: function (response) {
    var html = template('articleTpl', { data: response })
    $('#articleBox').html(html)
  },
})

// 获取网站设置
$.ajax({
  type: 'get',
  url: '/settings',
  success: function (response) {
    review = response.review
    if (response.comment) {
      var html = template('commentTpl', response)
      $('.comment').html(html)
    }
  },
})

// 评论提交事件
$('.comment').on('submit', 'form', function () {
  // 获取评论
  var content = $(this).find('textarea').val()
  // 代表评论状态
  var state
  if (review) {
    // 要经过人工审核
    state = 0 //未审核
  } else {
    // 直接发表
    state = 1 // 成功
  }
  $.ajax({
    type: 'post',
    url: '/comments',
    data: {
      content: content,
      post: id,
      state: state,
    },
    success: function () {
      alert('评论成功')
      location.reload()
    },
    error: function () {
      alert('评论失败')
    },
  })
  // 阻止默认提交
  return false
})
