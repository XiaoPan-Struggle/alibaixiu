// 当修改密码表单发生提交时
$('#modifyPass').on('submit',function(){
  // 获取输入的内容且转换为字符串
  var formData = $(this).serialize()
  // 发送请求
  $.ajax({
    type:'put',
    url:'/users/password',
    data:formData,
    success:function(){
      location.href = '/admin/login.html' // 改密码后重新登录
    }
  })
  // 阻止默认提交行为
  return false
})