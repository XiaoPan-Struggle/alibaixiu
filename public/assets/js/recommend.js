/*
 * @Author: your name
 * @Date: 2020-05-22 09:52:53
 * @LastEditTime: 2020-05-22 10:23:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \前端\alibaixiu\public\assets\js\recommend.js
 */

// 热门数据
$.ajax({
  type: 'get',
  url: '/posts/recommend',
  success: function (response) {
    // 将模板变成公共的
    var recommendTpl = `
    {{each data}}
      <li>
        <a href="detail.html?id={{$value._id}}">
          <img src="{{$value.thumbnail}}" alt="">
          <span>{{$value.title}}</span>
        </a>
      </li>
      {{/each}}`
    // 模板渲染
    var html = template.render(recommendTpl, { data: response })
    $('#recommendBox').html(html)
  },
})
