var canSubmintUserName=true;
var canSubmintPassWord=true;
function checkUserName() {
	canSubmintUserName=true;
    var username=$("#username").val();
    //alert(username);
    if(username!=null&&username!=""){
    	  $.ajax({
    	        url: "/hrsys/add/checkUserName",
    	        dataType: "json",
    	        data:{"username":username},
    	        success:function (result) {
    	            $("#usernameMessage").empty();
    	            $("#usernameMessage").append(result.message);
    	            if(result.message=="该员工已经拥有账号了"){
    	            	canSubmintUserName=false;
                    }
    	        }

    	    })
    }
  
}

function  checkPassWord() {
	canSubmintPassWord=true;
    var password=$("#password").val();
    var repassword=$("#repassword").val();
    $("#passwordMessage").empty();
    if(password!=repassword){
        $("#passwordMessage").append("两次输入的密码不同");
        canSubmintPassWord=false;
    }
}

function checkSubmit() {
    if(!canSubmintUserName||!canSubmintPassWord){
        return false;
    }
}


$(function () {
    function checkUserName() {
        var username=$("#username").val();
        alert(username);
    }
})