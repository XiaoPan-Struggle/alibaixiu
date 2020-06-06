// 向服务器发送请求，获取评论信息
$.ajax({
  type:'get',
  url:'/comments',
  success:function(response){
    var html = template('commentsTpl',response)
    $('#commentsBox').html(html)

    var pageHtml = template('pageTpl',response)
    $('#pageBox').html(html)
  }
})


// 实现分页
function changePage(page){
  $.ajax({
    type:'get',
    url:'/comments',
    data:{
      page:page
    },
    success:function(response){
      var html = template('commentsTpl',response)
      $('#commentsBox').html(html)
  
      var pageHtml = template('pageTpl',response)
      $('#pageBox').html(html)
    }
  })
}

// 当审核被点击时
$('#commentsBox').on('click','.status',function(){
  // 获取当前评论状态
  var status = $(this).attr('data-status')
  // 获取当前要修改的评论id
  var id = $(this).attr('data-id')
  // 向服务器发送请求 更改评论
  $.ajax({
    type:'put',
    url:'/comments/' + id,
    data:{
      state:status == 0 ? 1 : 0
    },
    success:function(){
      location.reload()
    }
  })
})

// 删除点击
$('#commentsBox').on('click','.delete',function(){
  if(confirm('您是否删除该评论')){
    // 获取当前评论id值
    var id = $(this).attr('data-id')
    // 发送请求
    $.ajax({
      type:'delete',
      url:'/comments/' + id,
      success:function(){
        location.reload()
      }
    })
  }
})