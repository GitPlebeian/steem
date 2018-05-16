  function deleteClicked(){
        if ($("#username").val() == "") {
          $("#errorMessage").html("A username must be entered")
        }
        else {
          $.ajax({
            url: "/deleteLogin/" + $("#username").val(),
            type: "DELETE",
            success: function(data){
              if (!data){
                  $("#errorMessage").append("error");
                  console.log("666");
                }
              else {
                  $("#errorMessage").append(data.username + "has been deleted from the database");
                  location.reload();
                  console.log("hello2222");
                }


            },
            dataType: "json"
          });
        }

        return false;
      }

      if(window.location.href.match('/admin') != null){
        console.log("hello");
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
      }

        $("#username").keydown( function( event ) {
            if ( event.which === 13 ) {
              console.log("hello");
              deleteClicked();
              event.preventDefault();
              return false;
            }
        });

        $("#deleteButton").click(deleteClicked);