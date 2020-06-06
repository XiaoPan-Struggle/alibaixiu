// 模板显示用户
$.ajax({
  type:'get',
  url:'/users',
  success:function(response){
    // 模板拼接用户信息
    const html = template('userTpl',{data:response})
    // 展示在页面
    $('#userList').html(html)
  }
})

// 当表单提交时
$('#userForm').on('submit',function(){
// 将用户填写在表单的信息格式转换为 参数字符串  name=1&age=10
var formData = $(this).serialize()
// 向服务器端传递数据
$.ajax({
  type:'post',
  url:'/users',
  data:formData,
  success:function(){
    // 刷新页面
    location.reload();
  },
  error:function(){
    alert('添加失败')
  }
})
// 阻止表单默认提交
return false
})

// 设置头像，用事件委托形式进行
$('#modifyBox').on('change','#avatar',function(){
  // 二进制文件处理
  var formData = new FormData();
  formData.append('avatar',this.files[0])
  // 向服务器端发送请求
  $.ajax({
    type:'post',
    url:'/upload',
    data:formData,
    // 设置不要解析请求参数
    processData: false,
    // 设置不要设置请求参数的类型
    contentType: false,
    success:function(response){
      // 头像预览
      $('#preview').attr('src',response[0].avatar)
      // 隐藏域，方便其他页面使用
      $('#hiddenAvatar').val(response[0].avatar)
    }
  })
})

// 编辑用户
// 通过事件委托给编辑添加点击
$('#userList').on('click','.edit',function(){
  // 获取当前用户属性的id值
  var id = $(this).attr('data-id');
  // 用id查询数据
  $.ajax({
    type:'get',
    url:'/users/' + id,
    success:function(response){
      var html = template('modifyTpl',response)
      $('#modifyBox').html(html)
    }
  })
  
})

// 编辑提交事件委派点击
$('#modifyBox').on('submit','#modifyForm',function(){
  // 将当前表单数据转化为formdata 数据字符串
  var formData = $(this).serialize();
  // 获取当前数据的id值，根据id值进行对数据修改
  var id = $(this).attr('data-id')
  // 发送请求
  $.ajax({
    type:'put',
    url:'/users/' + id,
    data:formData,
    success:function(response){
      // 修改成功，重新加载页面
      location.reload()
    }
  })
  // 阻止默认提交
  return false
})

// 删除用户
$('#userList').on('click','.delete',function(){
  if(confirm('您即将删除该用户')){
    // 获取要删除用户的id值
    var id = $(this).attr('data-id')
    $.ajax({
      type:'delete',
      url:'/users/' + id,
      success:function(){
        // 重新加载页面
        location.reload()
      }
    })
  }
})

// 全选和单选
// 获取全选
var selectAll = $('.selectAll')
selectAll.on('change',function(){
  var status = $(this).prop('checked')
  // 单选跟随全选状态
  $('#userList').find('input').prop('checked',status)
  if(status){
    // 当全选时，批量删除显示
    $('.deleteMany').show()
  }else{
    // 批量删除隐藏
    $('.deleteMany').hide()
  }
})

// 单选状态发生改变时
$('#userList').on('change','.userStatus',function () {
  // 判断选中的单选和总共的单选数量是否相等
  // 获取全部单选
 var inputs = $('#userList').find('input')
  // 当单选个数 和 选中个数相等时就是全选
 if(inputs.length == inputs.filter(':checked').length) {
  //  全选选中
  selectAll.prop('checked',true)
 }else{
  //  全选不选中
  selectAll.prop('checked',false)
 }
 if(inputs.filter(':checked').length > 0) {
  // 当全选时，批量删除显示
  $('.deleteMany').show()
 }else{
   // 批量删除隐藏
   $('.deleteMany').hide()
 }
})

// 批量删除
$('.deleteMany').on('click',function(){
  // 获取选中的用户信息
  var selectUser = $('#userList').find('input').filter(':checked')
  // 定义一个空数组
  var ids = []
  // 遍历选中用户，获取每一个id值
  selectUser.each(function(index,ele){
    // 把每一个id值添加在一个数组里面
    ids.push($(ele).attr('data-id'))
  })
  if(confirm('您确定要删除选中的用户？')){
    $.ajax({
      type:'delete',
      url:'/users/' + ids.join('-'),// 把每个数组元素用 - 拼接成字符串
      success:function(){
        // 重新加载页面
        location.reload()
      }
    })
  }

})