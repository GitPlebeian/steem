
function AddClicked(){
	if ($("#username").val() == "") {
		alert("A username must be entered")
	}
	else {
		$.ajax({
			url: "/requestFriend/" + $("#username").val(),
			type: "POST",
			success: function(data){
				if (!data){
					alert("error");
						console.log("666");
					}
				else {
						alert(data.username + "has been sent a friend request");
						location.reload();
						console.log("hello2222");
					}


			},
			dataType: "json"
		});
	}

	return false;

}

$(document).ready(function(){

  $.ajax({
      url: "/getUsernames",
      type: "GET",
      success: function(data){
        if (!data){
            $("#errorMessage").html("error");
          }
        else {
          for(i=0;i<data.length;i++){
            $("#usernameList").append(data[i].username + "</br>");
          }

          }


      },
      dataType: "json"
    });
 	$("#Add").click(AddClicked);

});
