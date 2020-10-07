$(function() {
        getUserInfo();
        var layer = layui.layer
        $('#btnLogout').on('click', function() {
            layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
                //do something  
                //清空本地储存的token
                localStorage.removeItem('token')
                location.href = '/login.html'
                layer.close(index);
            });
        })
    })
    //获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //header是请求头对象
        // headers: {
        //     // Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')

            }
            //调用renderAvatar渲染用户头像
            renderAvatar(res.data);
        },
        //不论成功还是失败，最终都会调用complete回调函数
        // complete: function(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //强制清空token
        //         localStorage.removeItem('token')
        //             //强制跳转登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}
//渲染用户头像
function renderAvatar(user) {
    //1.获取用户名称
    var name = user.nickname || user.username
        //设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //渲染图片头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()

    }
}