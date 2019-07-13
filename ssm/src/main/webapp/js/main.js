function openTab(text, url, iconCls){
    if($("#tabs").tabs("exists",text)){
        $("#tabs").tabs("select",text);
    }else{
        var content="<iframe frameborder=0 scrolling='auto' style='width:100%;height:100%' src='" + url + "'></iframe>";
        $("#tabs").tabs("add",{
            title:text,
            iconCls:iconCls,
            closable:true,
            content:content
        });
    }
}

/**
 * 退出登录
 * 1.清空cookie
 * 2.跳转到登录页
 */
function logout() {
    $.messager.confirm('来自crm', '您确认想退出系统吗？', function (r) {
        if (r) {
            // 1.清空cookie
            $.removeCookie("userIdStr");
            $.removeCookie("userName");
            $.removeCookie("realName");
            //2.跳转到登录页
            window.location.href = ctx + '/index';
        }
    });
}

/**
 * 修改密码
 */
function openPasswordModifyDialog () {
    $('#dlg').dialog('open');// 显示弹窗
}
/**
 * EasyUI的弹窗按钮点击实现修改密码
 */
function modifyPassword () {
    $('#fm').form('submit', {
        url: ctx + '/user/updateUserPwd',
        onSubmit: function () {
            return $(this).form('validate');	// 返回false终止表单提交
        },
        success: function (data) {
            data = JSON.parse(data);// 手动解析json
            //console.log(data);
            if(data.code==200){
                // 清除cookie, 跳转登陆页
                $.messager.alert('来自crm',data.msg,'info',function () {
                    // 清空cookie
                    $.removeCookie("userIdStr");
                    $.removeCookie("userName");
                    $.removeCookie("realName");
                    //跳转到登录页
                    window.location.href = ctx + '/index';
                });
            }else{
                $.messager.alert('来自crm',data.msg,'error');
            }
        }
    });
}