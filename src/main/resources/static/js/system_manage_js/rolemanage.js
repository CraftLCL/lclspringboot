/**
 * Created by lcl on 2017/7/20.
 */
$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';
$(document).ready(function(){

    $("#jqGrid").jqGrid({
        //url: 'data.json',
        //datatype: "json",
        datatype: 'local',
        colModel: [
            { label: '角色id', name: 'role_id',  key: true ,hidden:true},
            { label: '角色名', name: 'role_name', width: 100},
            { label: '角色描述', name: 'roleDescribe', width: 100 },

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
            url: "/hrsys/getRoleList",
            success: function (result) {
                for (var i = 0; i < result.length; i++) {
                    var item = result[i];
                    gridArrayData.push({
                        role_id: item.id,
                        role_name: item.name,
                        roleDescribe: item.roleDescribe
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
    }
});

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
function  deleteRoles() {
    var grid = $("#jqGrid");
    var rowKey = grid.getGridParam("selrow");
    if (!rowKey)
        alert("没有选择项目");
    else {
        var jsondate=getJsonDate();
        //alert(jsondate);
        $.ajax({
            type: "POST",
            url:"/hrsys/deleteRoles",
            data:{ids:jsondate},

            //contentType: "application/json; charset=utf-8",
            dataType: "json",
            success:function (message) {
                //alert(JSON.stringify(message));
                //alert(message.message);
                window.location.href="/hrsys/getRoleList/before"

            }
        });



    }

}
function updateRoleBefore() {
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
                url:"/hrsys/updateRole/before",
                data:{roleId:seid},
                dataType: "json",
                success:function (message) {
                    //alert(JSON.stringify(message));
                    //alert(message.message);
                    window.location.href="/hrsys/getUpdateRoleJsp"

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
function allocationUserAndRoleBefore() {
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
                url:"/hrsys/allocationUserAndRole/before",
                data:{roleId:seid},
                dataType: "json",
                success:function (message) {
                    //alert(JSON.stringify(message));
                    //alert(message.message);
                    window.location.href="/hrsys/getRoleUserAllocationJsp"

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
function allocationResource() {
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
                url:"/hrsys/allocationResource/before",
                data:{roleId:seid},
                dataType: "json",
                success:function (message) {
                    //alert(JSON.stringify(message));
                    //alert(message.message);
                    window.location.href="/hrsys/getRoleAllocationJsp"

                }
            });

        }
        
    }
}