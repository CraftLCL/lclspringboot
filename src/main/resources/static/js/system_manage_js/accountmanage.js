/**
 * Created by lcl on 2017/7/20.
 */

$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';



var zNodes =[
    { id:1, pId:0, name:"父节点1 - 展开", open:true},
    { id:11, pId:1, name:"父节点11 - 折叠"},
    { id:111, pId:11, name:"叶子节点111"},
    { id:112, pId:11, name:"叶子节点112"},
    { id:113, pId:11, name:"叶子节点113"},
    { id:114, pId:11, name:"叶子节点114"},
    { id:12, pId:1, name:"父节点12 - 折叠"},
    { id:121, pId:12, name:"叶子节点121"},
    { id:122, pId:12, name:"叶子节点122"},
    { id:123, pId:12, name:"叶子节点123"},
    { id:124, pId:12, name:"叶子节点124"},
    { id:13, pId:1, name:"父节点13 - 没有子节点", isParent:true},
    { id:2, pId:0, name:"父节点2 - 折叠"},
    { id:21, pId:2, name:"父节点21 - 展开", open:true},
    { id:211, pId:21, name:"叶子节点211"},
    { id:212, pId:21, name:"叶子节点212"},
    { id:213, pId:21, name:"叶子节点213"},
    { id:214, pId:21, name:"叶子节点214"},
    { id:22, pId:2, name:"父节点22 - 折叠"},
    { id:221, pId:22, name:"叶子节点221"},
    { id:222, pId:22, name:"叶子节点222"},
    { id:223, pId:22, name:"叶子节点223"},
    { id:224, pId:22, name:"叶子节点224"},
    { id:23, pId:2, name:"父节点23 - 折叠"},
    { id:231, pId:23, name:"叶子节点231"},
    { id:232, pId:23, name:"叶子节点232"},
    { id:233, pId:23, name:"叶子节点233"},
    { id:234, pId:23, name:"叶子节点234"},
    { id:3, pId:0, name:"父节点3 - 没有子节点", isParent:true}
];

// 选择一个员工添加用户账号
function addUserBefore(){
    var grid = $("#jqGrid");
    var rowKey = grid.getGridParam("selrow");
    if (!rowKey)
        alert("没有选择项目");
    else {
        var selectedIDs = grid.getGridParam("selarrrow");
        if(selectedIDs.length>1){
            alert("只能选择一项！");
        }
        else {
            var seid =selectedIDs[0];
            //alert(seid);
            $.ajax({
                url:"/hrsys/addUser/before",
                data:{id:seid},
                dataType: "json",
                success:function (message) {
                	//alert(JSON.stringify(message));
                    //alert(message.message);
                	
                	
                	
                    //如果选择的员工已经拥有账号则返回提示信息
                    if(message.message=="wrong"){
                        $('#myModal').modal('show');
                    }else {
                        window.location.href="/hrsys/addUser/getAddUserJsp"
                    }
                }
            });

        }
        /* var result = "";
         for (var i = 0; i < selectedIDs.length; i++) {
         result += selectedIDs[i] + ",";
         }

         alert(result);*/
    }
}
//更新一个员工的账号
function updateUserBefore() {
    var grid = $("#jqGrid");
    var rowKey = grid.getGridParam("selrow");
    if (!rowKey)
        alert("没有选择项目");
    else {
        var selectedIDs = grid.getGridParam("selarrrow");
        if(selectedIDs.length>1){
            alert("只能选择一项！");
        }
        else {
            var seid =selectedIDs[0];
            //alert(seid);
            $.ajax({
                url:"/hrsys/updateUser/before",
                data:{id:seid},
                dataType: "json",
                success:function (message) {
                    //alert(JSON.stringify(message));
                    //alert(message.message);
                    window.location.href="/hrsys/updateUser/getUpdateUserJsp"

                }
            });

        }
        /* var result = "";
         for (var i = 0; i < selectedIDs.length; i++) {
         result += selectedIDs[i] + ",";
         }

         alert(result);*/
    }
}
function  deleteUsers() {
    var grid = $("#jqGrid");
    var rowKey = grid.getGridParam("selrow");
    if (!rowKey)
        alert("没有选择项目");
    else {
            var jsondate=getJsonDate();
            //alert(jsondate);
            $.ajax({
            	type: "POST",
                url:"/hrsys/deleteUsers",
                data:{ids:jsondate},
                
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                success:function (message) {
                    //alert(JSON.stringify(message));
                    //alert(message.message);
                    window.location.href="/hrsys/accountmanage/before"

                }
            });



    }

}
//注销用户
function  logoutUsers() {
    var grid = $("#jqGrid");
    var rowKey = grid.getGridParam("selrow");
    if (!rowKey)
        alert("没有选择项目");
    else {
        var jsondate=getJsonDate();
        //alert(jsondate);
        $.ajax({
            type: "POST",
            url:"/hrsys/logoutUsers",
            data:{ids:jsondate},
            //contentType: "application/json; charset=utf-8",
            dataType: "json",
            success:function (message) {
                //alert(JSON.stringify(message));
                //alert(message.message);
                window.location.href="/hrsys/accountmanage/before"

            }
        });
    }
}
//
function  usingUsers() {
    var grid = $("#jqGrid");
    var rowKey = grid.getGridParam("selrow");
    if (!rowKey)
        alert("没有选择项目");
    else {
        var jsondate=getJsonDate();
        //alert(jsondate);
        $.ajax({
            type: "POST",
            url:"/hrsys/usingUsers",
            data:{ids:jsondate},
            //contentType: "application/json; charset=utf-8",
            dataType: "json",
            success:function (message) {
                //alert(JSON.stringify(message));
                //alert(message.message);
                window.location.href="/hrsys/accountmanage/before"

            }
        });
    }
}


//获取选中的行并拼接成json
function getJsonDate() {
    var grid = $("#jqGrid");
    var selectedIDs = grid.getGridParam("selarrrow");
    var jsonIds="["
    for(var i=0;i<selectedIDs.length;i++){
        if(i==selectedIDs.length-1){
            jsonIds=jsonIds+selectedIDs[i];
        }else {
            jsonIds=jsonIds+selectedIDs[i]+",";
        }

    }
    jsonIds=jsonIds+"]";

    var jsondate="{\"ids\":"+jsonIds+"}";
    return jsondate;
}
$(document).ready(function(){
	getzNodes();


   // 好看的checkbox
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });

	//为数据表添加数据
    $("#jqGrid").jqGrid({
        //url: 'data.json',
        datatype: "local",
        shrinkToFit: true,
        colModel: [
            { label: '员工编号', name: 'employee_id',  key: true ,hidden:true},   
            { label: '员工编号', name: 'employee_idCard', },
            { label: '员工姓名', name: 'employee_employeeName', },
            { label: '所在组织', name: 'org_orgName', },
            { label: '账号', name: 'user_username', },
            { label: '账号状态', name: 'user_status',  sorttype: 'integer' },
            // sorttype is used only if the data is loaded locally or loadonce is set to true
            /*{ label: 'Quantity', name: 'Quantity', width: 80, sorttype: 'number' }*/
        ],
        loadonce: true,
        viewrecords: true,
        autowidth: true,
        height: 250,
        rowNum: 20,
        rowList : [20,30,50],
        rownumbers: true,
        rownumWidth: 25,
        multiselect: true,
        pager: "#jqGridPager"
    });
    fetchGridData();

    function fetchGridData() {
        
        var gridArrayData = [];
		// show loading message
		$("#jqGrid")[0].grid.beginReq();
        $.ajax({
            url: "/hrsys/getListEmployAndUser",
            dataType: "json",
            success: function (result) {
                /*for (var i = 0; i < result.items.length; i++) {
                    var item = result.items[i];
                    gridArrayData.push({
                        Title: item.title,
                        Link: item.link,
                        CreationDate: item.creation_date,
                        ViewCount: item.view_count,
                        AnswerCount: item.answer_count
                    });                            
                }*/
            	/*alert(result);
            	alert(JSON.stringify(result));
            	alert(result[0]);*/
            	for(var i=0;i<result.length;i++){
            		 var item=result[i];
            		 //alert(item.employee_idCard);
            		 //alert(item.user_status);
            		 //alert(formartStats(item.user_status));
            		 gridArrayData.push({
            			 employee_id:item.employee_id,
            			 employee_idCard: item.employee_idCard,
            			 employee_employeeName: item.employee_employeeName,
            			 org_orgName: item.org_orgName,
            			 user_username: item.user_username,
            			 user_status: formartStats(item.user_status,item.user_username)
            			 //user_status: item.user_status
                     });
            	}
				// set the new data
				$("#jqGrid").jqGrid('setGridParam', { data: gridArrayData});
				// hide the show message
				$("#jqGrid")[0].grid.endReq();
				// refresh the grid
				$("#jqGrid").trigger('reloadGrid');
            }
        });
    };

    function formatTitle(cellValue, options, rowObject) {
        return cellValue.substring(0, 50) + "...";
    };

    function formatLink(cellValue, options, rowObject) {
        return "<a href='" + cellValue + "'>" + cellValue.substring(0, 25) + "..." + "</a>";
    };
    function formartStats(status,username){
    	//alert(statas);
    	if(username==null){
    		return "";
    	}
    	if(status==0){
    		return "禁用";
    	}
    	if(status==1){
    		return "启用";
    	}
    	
    	 
    }




    var setting = {
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onClick: onClick
        }
    };
// 树的回掉函数
    function onClick(event, treeId, treeNode, clickFlag) {
        //alert(treeNode.id);
        var gridArrayData = [];
        // show loading message
        $("#jqGrid")[0].grid.beginReq();
        $.ajax({
            url: "/hrsys/getListEmployAndUserByOrgId",
            data:{orgId:treeNode.id},
            dataType: "json",
            success: function (result) {
                for(var i=0;i<result.length;i++){
                    var item=result[i];
                    gridArrayData.push({
                        employee_id:item.employee_id,
                        employee_idCard: item.employee_idCard,
                        employee_employeeName: item.employee_employeeName,
                        org_orgName: item.org_orgName,
                        user_username: item.user_username,
                        user_status: formartStats(item.user_status,item.user_username)
                    });
                }
                $("#jqGrid").clearGridData();
                // set the new data
                $("#jqGrid").jqGrid('setGridParam', { data: gridArrayData});
                // hide the show message
                $("#jqGrid")[0].grid.endReq();
                // refresh the grid
                $("#jqGrid").trigger('reloadGrid');
            }
        });
    }
    function getzNodes() {
        $.ajax({
            url: "/hrsys/getOrgList",
            dataType: "json",
            
            success:function (result) {         	
            	 $.fn.zTree.init($("#treeDemo"), setting,result);
            }

        })
    }

    
    

});