console.log('shroudpage.js');

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
}

if (window.location.href.match('/') != null) {
  $.get("/userInfo",function(data){
   if (data){
      $("#logout").css('display','block');
      $('#login').css('display', 'none')
      $('#signup').css('display', 'none')
    }
  })
}

setTimeout(function(){
  console.log('setTimeshroud')
    $.ajax({
      url: "/newGame",
      type: "GET",
      dataType: "json",
      data: '',
      timeout: 5000,
      success: function(data){
            let currObj = {};
            console.log('Wheres Shrood');
            for(let i = 0;i<data.length;i++) {
                if(data[i] != null || data[i] != undefined) {
                currObj = data[i];
                console.log("currObj " + currObj.description);
                $('.allItems').append(
                  "<div class=\"item\" id=\"" + currObj.game +"\">" +
                  "<p class=\"itemName\">" + currObj.game + "</p>" +
                  "<img class=\"itemImage\" src=\"" + currObj.picture + "\" alt=\"\">" +
                  "<p class=\"price\">$" + currObj.price + "</p>" +
                  "<p class=\"description\">" + currObj.price + "</p>" +
                  "<input type=\"button\" class=\"cartButton\" value=\"Add to Cart\">" +
                  "</div>");
                 }
                 else {
                  console.log('shroud is empty');
                 }
              }
            },
      error: function(xhr, textStatus, errorThrown){
       console.log(xhr.status);
      }
        
          });
},500)
