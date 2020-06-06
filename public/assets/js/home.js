// 轮播图
$.ajax({
  type:'get',
  url:'/slides',
  success:function(response){
    var html = template('slidesTpl',{data:response})
    $('#swipes').html(html)
    
    //轮播图
     var swiper = Swipe(document.querySelector('.swipe'), {
      auto: 3000,
      transitionEnd: function (index) {
        // index++;
        $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
      }
    });

    // 上/下一张
    $('.swipe .arrow').on('click', function () {
      var _this = $(this);

      if(_this.is('.prev')) {
        swiper.prev();
      } else if(_this.is('.next')) {
        swiper.next();
      }
    })
  }
})

// 处理日期时间格式
function formateDate(date) {
  // 将日期时间字符串转换成日期对象
  date = new Date(date)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

// 最新发布数据
$.ajax({
  type:'get',
  url:'/posts/lasted',
  success:function(response){
    var html = template('lastedTpl',{data:response})
    $('#lastedBox').html(html)
  }
})


// 点赞功能
$('#lastedBox').on('click', '#like', function () {
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
