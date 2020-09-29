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

})