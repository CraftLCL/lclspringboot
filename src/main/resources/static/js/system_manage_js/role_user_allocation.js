/**
 * Created by lcl on 2017/7/24.
 */
$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';
$(document).ready(function(){

    
    //加载组织信息
    $.ajax({
        type: "POST",
        url:"/hrsys/allocationUserAndRole/getOrgList",
        //contentType: "application/json; charset=utf-8",
        dataType: "json",
        success:function (orgList) {
            for(var i=0;i<orgList.length;i++){
                var orgHtml="<option value=\""+ orgList[i].id+"\">"+orgList[i].orgname+"</option>"
                //alert(orgHtml);
                $("#org").append(orgHtml);
            }

        }
    });
    $("#org").change(function(){
        //var orgId=$(this).val();
        //alert(orgId);
        $("#unEmployee").clearGridData();
    	fetchUnEmployeeGridData();
    });




    $("#unEmployee").jqGrid({
        //url: 'data.json',
        //datatype: "json",
        datatype: 'local',
        colModel: [
            { label: '员工id', name: 'employee_id', width: 250, key: true ,align:'center',hidden:true},
            { label: '员工名', name: 'employee_name', width: 250, align:'center'}
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
        //multiselect: true,
        pager: "#unEmployeePaper"
    });
    $("#inEmployee").jqGrid({
        //url: 'data.json',
        //datatype: "json",
        datatype: 'local',
        colModel: [
            { label: '员工id', name: 'employee_id', width: 250, key: true ,align:'center',hidden:true},
            { label: '员工名', name: 'employee_name', width: 250, align:'center'}
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
        //multiselect: true,
        pager: "#inEmployeePaper"
    });

    setTimeout(fetchUnEmployeeGridData,1000);
    fetchInEmployeeGridData();

});
function fetchUnEmployeeGridData() {
    var orgId=$("#org").val();
    //alert(orgId);
    var gridArrayData = [];
    // show loading message
    $("#unEmployee")[0].grid.beginReq();
    $.ajax({
        url: "/hrsys/allocationUserAndRole/getUnEmployeeList",
        data:{"orgId":orgId},
        type: "POST",
        dataType: "json",
        success: function (result) {
            for (var i = 0; i < result.length; i++) {
                var item = result[i];
                gridArrayData.push({
                    employee_id: item.id,
                    employee_name: item.employeename,
                });
            }
            // set the new data
            $("#unEmployee").jqGrid('setGridParam', { data: gridArrayData});
            // hide the show message
            $("#unEmployee")[0].grid.endReq();
            // refresh the grid
            $("#unEmployee").trigger('reloadGrid');
        }
    });
}
function fetchInEmployeeGridData() {

    var gridArrayData = [];
    // show loading message
    $("#inEmployee")[0].grid.beginReq();
    $.ajax({
        url: "/hrsys/allocationUserAndRole/getInEmployeeList",
        dataType: "json",
        success: function (result) {
            for (var i = 0; i < result.length; i++) {
                var item = result[i];
                if(item!=null){
                    gridArrayData.push({
                        employee_id: item.id,
                        employee_name: item.employeename,
                    });
                }

            }
            // set the new data
            $("#inEmployee").jqGrid('setGridParam', { data: gridArrayData});
            // hide the show message
            $("#inEmployee")[0].grid.endReq();
            // refresh the grid
            $("#inEmployee").trigger('reloadGrid');
        }
    });
}






function  removeEmployeeToRole() {
   
        var grid = $("#inEmployee");
        var rowKey = grid.jqGrid('getGridParam',"selrow");
        if (!rowKey){
            alert("没有选择数据");
        }
        $.ajax({
            type: "POST",
            url:"/hrsys/allocationUserAndRole/removeEmployeeToRole",
            //contentType: "application/json; charset=utf-8",
            data:{"employeeId":rowKey},
            dataType: "json",
            success:function (orgList) {
                $("#unEmployee").clearGridData();
                $("#inEmployee").clearGridData();
                fetchInEmployeeGridData();
                fetchUnEmployeeGridData();

            }
        });
    
}
function  addEmployeeToRole() {
    
    var grid = $("#unEmployee");
    var rowKey = grid.jqGrid('getGridParam',"selrow");
    if (!rowKey){
        alert("没有选择数据");
    }
    $.ajax({
        type: "POST",
        url:"/hrsys/allocationUserAndRole/addEmployeeToRole",
        //contentType: "application/json; charset=utf-8",
        data:{"employeeId":rowKey},
        dataType: "json",
        success:function (orgList) {
            $("#unEmployee").clearGridData();
            $("#inEmployee").clearGridData();
            fetchInEmployeeGridData();
            fetchUnEmployeeGridData();

        }
    });
          
}
