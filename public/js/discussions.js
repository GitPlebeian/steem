var socket = io()
var numSent = 0
var sent = true

if (window.location.href.match('/') != null) {
  $.get("/userInfo",function(data){
   if (data){
      $("#logout").css('display','block');
      $('#login').css('display', 'none')
      $('#signup').css('display', 'none')
    }
  })
}

$('form').submit(function(){
	if($('#message').val() == ''){

	} else {
		var username
		$.get("/userInfo",function(data){
			if (data && sent) {

				var textStuff = $('#message').val()
				var username = data.username;
				socket.emit('chat message',textStuff,username);
  				$('#message').val('');

  				numSent++;
  				if(numSent > 3){
  					
  				}
			}
				
		});
	}
	return false;
});

socket.on('chat message', function(msg,username){
	$('.discussionsText').append('<strong>'+ username + ': </strong><p style=\'display: inline;\'>' + msg + '</p>' + '<hr>')

    var element = document.getElementById("discussionsText");
    element.scrollTop = element.scrollHeight;

})