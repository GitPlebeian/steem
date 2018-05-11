var pass1 = $('#password');
var pass2 = $('#password2');
var text  = $('#text');
var username = $("#username");

console.log('abdfg')

pass1.keyup(function(){
	if(pass1.val() == pass2.val()){
		text.css('display', 'none');
	} else {
		text.html('Passwords must match');
	}
})

pass2.keyup(function(){
	if(pass1.val() == pass2.val()){
		text.css('display', 'none');
	} else {
		text.html('Passwords must match');
	}
})
$('body').keydown( function( event ) {
  console.log('suck a dkick')
    if ( event.which === 13 ) {
      $('form').submit()
    }
});

// function signupClicked(){
//   if (username.val() == "" || pass1.val() == "" || pass2.val() == "") {
//     $("#errorMessage").html("All fields must be filled out");
//     console.log("asdfasfdasfdasdf");
//     return false;
//   }
//   if(pass1.val() == pass2.val()){
//   	$.ajax({
//     url: "/signup",
//     type: "POST",
//     data: {username:username, password:pass2},
//     success: function(data){
//       if (!data)
//         alert("ERROR");
//       else
//         window.location = data.redirect;
//     } ,
//     dataType: "json"
//   });
//   } else {
//   	text.html('Passwords must match');
//   }
  
//   return false;
//  }

// pass2.keydown( function( event ) {
//   console.log("keydown");
//     if ( event.which === 13 ) {
//       console.log('asdf')
//       signupClicked();
//       event.preventDefault();
//       return false;
//     }
// });

// pass1.keydown( function( event ) {
//     if ( event.which === 13 ) {
//       signupClicked();
//       event.preventDefault();
//       return false;
//     }
// });


