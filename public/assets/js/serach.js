//  接收搜索传递过来的参数key
var key = getUrlParams('key')
$.ajax({
  type: 'get',
  url: '/posts/search/' + key,
  success: function (response) {
    var html = template('searchTpl', { data: response })
    $('#newsBox').html(html)
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
