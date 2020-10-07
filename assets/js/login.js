$(function() {
    // 点击注册按钮
    $('#link_reg').on('click', function() {
            $('.login-box').hide();
            $('.reg-box').show();
        })
        // 点击登录按钮
    $('#link_login').on('click', function() {
            $('.reg-box').hide();
            $('.login-box').show();

        })
        //获取layui里面的form对象
    var form = layui.form;
    var layer = layui.layer;
    //通过函数自定义校验规则
    form.verify({
            //自定义密码检验规则
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            //校验两次密码不一样
            repwd: function(value) {
                //通过形参拿到确认密码的内容
                //还需要拿到密码框的内容
                //进行一次等于的判断
                //如果判断失败则返回一个提示
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return '两次密码不一样'
                }
            },
        })
        //监听注册表单的提交事件

    $('#form_reg').on('submit', function(e) {
            var data = {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            };
            //阻止默认提交事件
            e.preventDefault()
                //使用的Ajax的Post提交行为
            $.post('http://ajax.frontend.itheima.net/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登陆');
                $('#link_login').click();
            })
        })
        //监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                console.log(res.token);
                //将登录成功的token存到本地存储里面
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })

})