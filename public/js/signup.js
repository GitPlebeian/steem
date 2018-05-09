var pass1 = $('#password')
var pass2 = $('#password2')
var text  = $('#text')

pass1.keyup(function(){
	if(pass1.val() == pass2.val()){
		text.css('display', 'none')
	} else {
		text.html('Passwords must match')
	}
})

pass2.keyup(function(){
	if(pass1.val() == pass2.val()){
		text.css('display', 'none')
	} else {
		text.html('Passwords must match')
	}
})