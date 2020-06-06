// 添加分类表单添加提交
$('#classifyForm').on('submit',function(){
  // 获取输入的数据
  var formData = $(this).serialize();
  // 发送请求
  $.ajax({
    type:'post',
    url:'/categories',
    data:formData,
    success:function(){
      location.reload()
    }
  })
  // 阻止默认提交
  return false
})

// 渲染页面
$.ajax({
  type:'get',
  url:'/categories',
  success:function(response){
    // 给模板传递数据
    var html = template('modifyTpl',{data:response})
    // 渲染页面
    $('#classifyBox').html(html)
  }
})

// 编辑分类
$('#classifyBox').on('click','.edit',function(){
  // 获取当前id
  var id = $(this).attr('data-id')
  // 发送请求
  $.ajax({
    type:'get',
    url:'/categories/'+id,
    success:function(response){
      // 模板传递数据
      var html = template('classifyTpl',response)
      // 渲染页面
      $('#modifyBox').html(html)
    }
  })
})

// 编辑成功渲染页面
$('#modifyBox').on('submit','#modifyCategories',function(){
  // 获取当前表单信息
  var formData = $(this).serialize();
  // 获取表单id值
  var id = $(this).attr('data-id')
  // 发送请求
  $.ajax({
    type:'put',
    url:'/categories/' + id,
    data:formData,
    success:function(){
      location.reload()
    }
  })
  // 阻止默认提交
  return false
})

// 单个删除
$('#classifyBox').on('click','.delete',function(){
  if(confirm('您即将删除此分类')){
    // 获取当前id
    var id = $(this).attr('data-id')
    // 发送请求
    $.ajax({
      type:'delete',
      url:'/categories/'+id,
      success:function(){
        location.reload()
      }
    })
  }
})