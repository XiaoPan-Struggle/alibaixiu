// 获取管理员选择的图片
$('#logo').on('change',function(){
  // 获取管理员选择到的文件
  var file = this.files[0]
  // 创建formdata对象，实现二进制文件上传
  var formData = new FormData()
  // 将文件添加在formdata对象中
  formData.append('logo',file)
  // 发送请求
  $.ajax({
    type:'post',
    url:'/upload',
    data:formData,
    processData:false,
    contentType:false,
    success:function(response){
      $('#hiddenLogo').val(response[0].logo)
      $('#showLogo').attr('src',response[0].logo)
    }
  })
})

// 保存设置
$('#settingsForm').on('submit',function(){
  // 获取表单输入内容
  var formData = $(this).serialize()
  // 保存设置发送请求
  $.ajax({
    type:'post',
    url:'/settings',
    data:formData,
    success:function(){
      location.reload()
    }
  })
  // 阻止默认提交
  return false
})

// 将管理员设置的数据显示在表单中
$.ajax({
  type:'get',
  url:'/settings',
  success:function(response){
    if(response){
      // 页面显示
      $('#showLogo').attr('src',response.logo)
      // 隐藏域存储地址
      $('#hiddenLogo').val(response.logo)
      // 站点名称
      $('input[name="title"]').val(response.title)
      // 评论设置
      $('input[name="comment"]').prop('checked',response.comment)
      $('input[name="review"]').prop('checked',response.review)
    }
  }
})