// 当用户选择文件
$('#file').on('change',function(){
  // 获取二进制文件
  var file = this.files[0]
  // 创建formdata对象实现二进制文件上传
  var formData = new FormData()
  formData.append('image',file)
  // 向服务器发送请求
  $.ajax({
    type:'post',
    url:'/upload',
    data:formData,
    processData:false,
    contentType:false,
    success:function(response){
      $('#image').val(response[0].image)
    }
  })
})

// 当轮播图表单发生提交时
$('#slidesForm').on('submit',function(){
  // 获取表单输入的内容
  var formData = $(this).serialize()
  // 向服务器发送请求
  $.ajax({
    type:'post',
    url:'/slides',
    data:formData,
    success:function(){
      location.reload()
    }
  })
  // 阻止默认提交
  return false
})

// 获取轮播图列表
$.ajax({
  type:'get',
  url:'/slides',
  success:function(response){
    var html = template('slidesTpl',{data:response})
    $('#slidesBox').html(html)
  }
})

// 删除轮播图
$('#slidesBox').on('click','.delete',function(){
  if(confirm('您将删除该文章，是否继续？')){
    // 获取当前id
    var id = $(this).attr('data-id')
    // 发送请求删除操作
    $.ajax({
      type:'delete',
      url:'/slides/' + id,
      success:function(){
        location.reload()
      }
    })
  }
})