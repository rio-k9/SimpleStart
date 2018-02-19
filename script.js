$(function(){
  /* VARIABLES
  ------------------------------------------------------------------------
   */

  var dir = "background/";
  var file_extension = ".jpeg";
  var date = new Date();
  var day = date.getDate();
  var time = date.getHours();
  var image_of_the_day = dir + daylight_check(time) + day.toString() + file_extension;
  // var sun_shower_msg = ["wear a jacket.", "it could rain."]
  // var thunder_msg = ["don't stand under a tree.", "watch out for lightning!"]
  // var cloudy_msg = ["it could rain.", "wear a coat."]
  // var flurries_msg = ["take your time travelling", "wear a hat and gloves."]
  // var sunny_msg  = ["enjoy the weather!", "not bad..."]
  // // var rainy_msg = ["take an umbrella.", "wear a hood.", "wrap up warm."]
  // var sun_shower_array = [0, 1, 2, 3, 4]
  // var thunder_storm_array = [35, 37, 38, 39, 45, 47]
  // var cloudy_array = [19 ,20, 21, 22, 23, 24, 25, 26,
  //   27, 28, 29, 30, 31, 33, 44]
  // var flurries_array = [13, 14, 15, 16, 17, 41, 42, , 46]
  // var sunny_array = [32, 34, 36]
  // var rainy_array = [5, 6, 7, 8, 9, 10, 11, 12, 18, 40]
  // // var sun_shower = "<div class=\"icon sun-shower\">\n" +
  // //   "  <div class=\"cloud\"></div>\n" +
  // //   "  <div class=\"sun\">\n" +
  // //   "    <div class=\"rays\"></div>\n" +
  //   "  </div>\n" +
  //   "  <div class=\"rain\"></div>\n" +
  //   "</div>"
  //
  // var thunder_storm = "<div class=\"icon thunder-storm\">\n" +
  //   "  <div class=\"cloud\"></div>\n" +
  //   "  <div class=\"lightning\">\n" +
  //   "    <div class=\"bolt\"></div>\n" +
  //   "    <div class=\"bolt\"></div>\n" +
  //   "  </div>\n" +
  //   "</div>"
  //
  // var cloudy = "<div class=\"icon cloudy\">\n" +
  //   "  <div class=\"cloud\"></div>\n" +
  //   "  <div class=\"cloud\"></div>\n" +
  //   "</div>"
  //
  // var flurries = "<div class=\"icon flurries\">\n" +
  //   "  <div class=\"cloud\"></div>\n" +
  //   "  <div class=\"snow\">\n" +
  //   "    <div class=\"flake\"></div>\n" +
  //   "    <div class=\"flake\"></div>\n" +
  //   "  </div>\n" +
  //   "</div>"
  //
  // var sunny = "<div class=\"icon sunny\">\n" +
  //   "  <div class=\"sun\">\n" +
  //   "    <div class=\"rays\"></div>\n" +
  //   "  </div>\n" +
  //   "</div>"
  //
  // var rainy = "<div class=\"icon rainy\">\n" +
  //   "  <div class=\"cloud\"></div>\n" +
  //   "  <div class=\"rain\"></div>\n" +
  //   "</div>"

  /* VARIABLES
  ------------------------------------------------------------------------
   */

  /*INITIALISE */
  __init()
  function __init(){
    setTimeout(function(){
      $("html").css({"opacity" : "1"}).hide().fadeIn(2000)
    }, 800);
    console.log(image_of_the_day);
    $("body").css({"background-image" : "url(" + image_of_the_day + ")"})
    $(".DuckSearch").focus();
    generateGreeting("Rio.");
    navigator.geolocation.getCurrentPosition(function(position) {
      loadWeather(position.coords.latitude, position.coords.longitude); //load weather using your lat/lng coordinates
    });
  }
  /*INITIALISE */



  /*Generate Personal Greeting
  ------------------------------------------------------------------------
   */
  function generateGreeting(name){
    var morning_greeting = "<div><h1>Good Morning " + name + "</h1></div>";
    var evening_greeting = "<div><h1>Good Evening "+ name + "</h1></div>";
    var afternoon_greeting = "<div><h1>Good Afternoon " + name + "</h1></div>";
    console.log(time);

    if(time >= 12 && time <= 16) $(".greeting-box").html(afternoon_greeting).hide().fadeIn(1000);

    else if(time >= 17 || time <= 4) $(".greeting-box").html(evening_greeting).hide().fadeIn(1000);

    else if (time >= 5 && time <= 11) $(".greeting-box").html(morning_greeting).hide().fadeIn(1000)

    else $(".greeting-box").html("Hello " + NAME).hide().fadeIn(1000);
    $(".quote-box").hide().fadeIn(3000);
  }

  function daylight_check(current_time){
    if (current_time >= 5 && current_time <=16){
      return "day/";
    }
    else{
      return "night/";
    }
  }
  /*Generate Personal Greeting
------------------------------------------------------------------------
 */



  /* GENERATE THE WEATHER CONTENT
  ---------------------------------------------------

   */
  //
  // function randomArrayMsg(ar) {
  //   return ar[Math.floor(Math.random() * ar.length)]
  // }

  function generateWeatherGreet(currentWeather){
    $(".current-conditions-box").html("Today the weather forecast is <i>" + currentWeather + "</i>.").hide().fadeIn(700);
  }

  function loadWeather(latitude, longitude){
    $.simpleWeather({
      location: latitude + "," + longitude,
      woeid:"",
      unit: 'c',
      success: function(weather) {
        var weatherHTML;
        console.log(weather.code)
        // switch (weather.code) {
        //   case jQuery.inArray(sun_shower_array) != -1:
        //     weatherHTML = sun_shower;
        //     break;
        //   case jQuery.inArray(thunder_storm_array) != -1:
        //     weatherHTML = thunder_storm;
        //     break;
        //   case  jQuery.inArray(weather.code, cloudy_array) != -1:
        //     weatherHTML = cloudy;
        //     break;
        //   case  jQuery.inArray(flurries_array) != -1:
        //     weatherHTML = flurries;
        //     break;
        //   case  jQuery.inArray(sunny_array) != -1:
        //     weatherHTML = sunny;
        //     break;
        //   case  jQuery.inArray(rainy_array) != -1:
        //     weatherHTML = rainy;
        //     break;
        //   default:           weatherHTML = cloudy;
        // }
        // var wind_direction = wind.direction;
        // var wind_speed = wind.speed
        html = '<div class="city_box">' + weather.city+', '+weather.region + '</div> <div class="temp_box">' + weather.temp + '&deg;' + weather.units.temp + '</div>';
        $("#weather").html(html).hide().fadeIn(700);
        generateWeatherGreet(weather.text.toLowerCase())
      },
      error: function(error) {
        $("#weather").html('<p>'+error+'</p>');
      }
    })
  }

  /* GENERATE THE WEATHER CONTENT
---------------------------------------------------
 */
})
