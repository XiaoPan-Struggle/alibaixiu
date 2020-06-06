/*
 * @Author: your name
 * @Date: 2020-05-20 17:57:22
 * @LastEditTime: 2020-05-22 14:47:46
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \前端\alibaixiu\public\assets\js\index.js
 */

// 获取文章数量
$.ajax({
  type: 'get',
  url: '/posts/count',
  success: function (response) {
    $('#post').html(
      '<strong>' +
        response.postCount +
        '</strong>篇文章（<strong>' +
        response.draftCount +
        '</strong>篇草稿）'
    )
  },
})

// 获取分类数量
$.ajax({
  type: 'get',
  url: '/categories/count',
  success: function (response) {
    $('#category').html('<strong>' + response.categoryCount + '</strong>个分类')
  },
})

// 获取评论数量
$.ajax({
  type: 'get',
  url: '/comments/count',
  success: function (response) {
    $('#comments').html('<strong>' + response.commentCount + '</strong>条评论')
  },
})


