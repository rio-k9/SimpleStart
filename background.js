$(function(){

  var dir = "background/";
  var file_extension = ".jpeg";
  var date = new Date();
  var day = date.getDate();
  var time = date.getHours();

  function daylight_check(current_time){
    if (current_time >= 5 && current_time <=18){
      return "day/";
    }
    else{
      return "night/";
    }
  }

  var image_of_the_day = dir + daylight_check(time) + day.toString() + file_extension;
  console.log(image_of_the_day);
  $("body").css({"background-image" : "url(" + image_of_the_day + ")"})
})
