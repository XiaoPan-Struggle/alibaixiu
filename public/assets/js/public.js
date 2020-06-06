/*
 * @Author: your name
 * @Date: 2020-05-22 10:29:56
 * @LastEditTime: 2020-05-22 14:58:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \前端\alibaixiu\public\assets\js\public.js
 */
// 处理日期时间格式
function formateDate(date) {
  // 将日期时间字符串转换成日期对象
  date = new Date(date)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

// 随机推荐
$.ajax({
  type: 'get',
  url: '/posts/random',
  success: function (response) {
    // 将模板变成公共的
    var randomTpl = `
    {{each data}}
      <li>
        <a href="detail.html?id={{$value._id}}">
          <p class="title">{{$value.title}}</p>
          <p class="reading">阅读({{$value.meta.views}})</p>
          <div class="pic">
            <img src="{{$value.thumbnail}}" alt="">
          </div>
        </a>
      </li>
    {{/each}}`
    // 模板渲染
    var html = template.render(randomTpl, { data: response })
    $('#randomBox').html(html)
  },
})

// 最新评论
$.ajax({
  type: 'get',
  url: '/comments/lasted',
  success: function (response) {
    var commentTpl = `
    {{each data}}
    <li>
      <a href="javascript:;">
        <div class="avatar">
          <img src="{{$value.author.avatar}}" alt="">
        </div>
        <div class="txt">
          <p>
            <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
          </p>
          <p>{{$value.content}}</p>
        </div>
      </a>
    </li>
    {{/each}}`
    // 字符串和数据拼接
    var html = template.render(commentTpl, { data: response })
    $('#commendBox').html(html)
  },
})

// 文章分类数据导航列表
$.ajax({
  type: 'get',
  url: '/categories',
  success: function (response) {
    var classesTpl = `
    {{each data}}
      <li><a href="list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
    {{/each}}`
    var html = template.render(classesTpl, { data: response })
    $('#classesNav').html(html)
    $('#topNav').html(html)
  },
})

// 从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
  var paramsAry = location.search.substr(1).split('&')
  // 循环数据
  for (var i = 0; i < paramsAry.length; i++) {
    var tmp = paramsAry[i].split('=')
    if (tmp[0] == name) {
      return tmp[1]
    }
  }
  return -1
}

// 搜索功能
$('.search form').on('submit', function () {
  // 获取用户输入的关键字
  var key = $(this).find('.keys').val()
  // 跳转页面
  location.href = '/serach.html?key='+ key
  // 阻止默认提交
  return false
})
