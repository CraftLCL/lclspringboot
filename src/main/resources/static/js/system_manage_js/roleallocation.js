/**
 * Created by lcl on 2017/7/24.
 */
var setting = {
    check: {
        enable: true
    },
    data: {
        simpleData: {
            enable: true
        }
    }
};

var zNodes =[
    { id:1, pId:0, name:"随意勾选 1", open:true},
    { id:11, pId:1, name:"随意勾选 1-1", open:true},
    { id:111, pId:11, name:"随意勾选 1-1-1"},
    { id:112, pId:11, name:"随意勾选 1-1-2"},
    { id:12, pId:1, name:"随意勾选 1-2", open:true},
    { id:121, pId:12, name:"随意勾选 1-2-1"},
    { id:122, pId:12, name:"随意勾选 1-2-2"},
    { id:2, pId:0, name:"随意勾选 2", checked:true, open:true},
    { id:21, pId:2, name:"随意勾选 2-1"},
    { id:22, pId:2, name:"随意勾选 2-2", open:true},
    { id:221, pId:22, name:"随意勾选 2-2-1", checked:true},
    { id:222, pId:22, name:"随意勾选 2-2-2"},
    { id:23, pId:2, name:"随意勾选 2-3"}
];
$(document).ready(function(){
    $.ajax({
        type: "POST",
        url:"/hrsys/getMenuByRoleId",

        dataType: "json",
        success:function (message) {
            //alert(message);
            $.fn.zTree.init($("#treeDemo"), setting, message);

        }
    });

});
function saveMenu() {
    var jsonIds= getJsonDate();
    $.ajax({
        type: "POST",
        url:"/hrsys/saveMenu",
        data:{ids:jsonIds},
        dataType: "json",
        success:function (message) {
            //alert(message);
            window.location.href="/hrsys/getRoleList/before";

        }
    });
}
function getJsonDate() {
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var nodes = treeObj.getCheckedNodes(true);
    var jsonIds="["
    for(var i=0;i<nodes.length;i++){
        if(i==nodes.length-1){
            jsonIds=jsonIds+nodes[i].id;
        }else {
            jsonIds=jsonIds+nodes[i].id+",";
        }

    }
    jsonIds=jsonIds+"]";

    var jsondate="{\"ids\":"+jsonIds+"}";
    //alert(jsondate);
    return jsondate;
}