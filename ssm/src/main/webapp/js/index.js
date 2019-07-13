/**
 * Created by 大猫 on 2019/7/10.
 */
/**
 * 登录:
 * 1.获取参数
 * 2.非空判断
 * 3.发送ajax请求
 */
function login() {
    //1.获取参数
    var userName = $("#username").val();
    var userPwd = $("#password").val();
    //2.非空判断
    if(isEmpty(userName)){
        alert("用户名为空");
        return;
    }
    if(isEmpty(userPwd)){
        alert("密码为空");
        return;
    }
    // 3.发送ajax请求
    $.ajax({
        type:"post",
        url:ctx + "/user/login",/*这样写也可以 url:"user/login",*/
        data:{
            userName:userName,
            userPwd:userPwd
        },
        success:function (data) {
            if(data.code == 200){
                alert(data.msg);
                // 存cookie信息
                $.cookie("userIdStr",data.result.userIdStr);
                $.cookie("userName",data.result.userName);
                $.cookie("realName",data.result.realName);
                // 跳转到主页
                window.location.href = ctx+"/main";
            }else {
                alert(data.msg);
            }
        }
    });
}

