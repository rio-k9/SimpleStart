$(function(){
  /* VARIABLES
  ------------------------------------------------------------------------
   */


  var weatherAddToPage = this.weatherAddToPage;
  var dir = "welcome_style/background/";
  var file_extension = ".jpeg";
  var date = new Date();
  var day = date.getDate();
  var time = date.getHours();
  var sun_shower_array = [0, 1, 2, 3, 4];
  var thunder_storm_array = [35, 37, 38, 39, 45, 47];
  var cloudy_array = [19 ,20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31, 33, 44];
  var flurries_array = [13, 14, 15, 16, 17, 41, 42, , 46];
  var sunny_array = [32, 34, 36];
  var rainy_array = [5, 6, 7, 8, 9, 10, 11, 12, 18, 40];
  var image_of_the_day = dir + daylight_check(time) + day.toString() + file_extension;
  // var sun_shower_msg = ["wear a jacket.", "it could rain."]
  // var thunder_msg = ["don't stand under a tree.", "watch out for lightning!"]
  // var cloudy_msg = ["it could rain.", "wear a coat."]
  // var flurries_msg = ["take your time travelling", "wear a hat and gloves."]
  // var sunny_msg  = ["enjoy the weather!", "not bad..."]
  // var rainy_msg = ["take an umbrella.", "wear a hood.", "wrap up warm."]



  /* VARIABLES
  ------------------------------------------------------------------------
   */

  /*INITIALISE */
  __init();
  function __init(){
    setTimeout(function(){
      $("html").css({"opacity" : "1"}).hide().fadeIn(2000)
    }, 800);
    console.log(image_of_the_day);
    $("body").css({"background-image" : "url(" + image_of_the_day + ")"});
    generateGreeting("Rio.");
    jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key= AIzaSyA-HpkKuF9wrbISAkJpX4LFsFcl2FVszBs ", function(success) {
      console.log(success.location.lat, success.location.lng)
        loadWeather(success.location.lat, success.location.lng)
      })
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

    else if (time >= 5 && time <= 11) $(".greeting-box").html(morning_greeting).hide().fadeIn(1000);

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
        var sun_shower = "<div class=\"icon sun-shower\">\n" +
          "  <div class=\"cloud\"></div>\n" +
          "  <div class=\"sun\">\n" +
          "    <div class=\"rays\"></div>\n" +
          "  </div>\n" +
          "  <div class=\"rain\"></div>\n" +
          "</div>";

        var thunder_storm = "<div class=\"icon thunder-storm\">\n" +
          "  <div class=\"cloud\"></div>\n" +
          "  <div class=\"lightning\">\n" +
          "    <div class=\"bolt\"></div>\n" +
          "    <div class=\"bolt\"></div>\n" +
          "  </div>\n" +
          "</div>";

        var cloudy = "<div class=\"icon cloudy\">\n" +
          "  <div class=\"cloud\"></div>\n" +
          "  <div class=\"cloud\"></div>\n" +
          "</div>";

        var flurries = "<div class=\"icon flurries\">\n" +
          "  <div class=\"cloud\"></div>\n" +
          "  <div class=\"snow\">\n" +
          "    <div class=\"flake\"></div>\n" +
          "    <div class=\"flake\"></div>\n" +
          "  </div>\n" +
          "</div>";

        var sunny = "<div class=\"icon sunny\">\n" +
          "  <div class=\"sun\">\n" +
          "    <div class=\"rays\"></div>\n" +
          "  </div>\n" +
          "</div>";

        var rainy = "<div class=\"icon rainy\">\n" +
          "  <div class=\"cloud\"></div>\n" +
          "  <div class=\"rain\"></div>\n" +
          "</div>";
        console.log(weather.code);
        console.log(weatherAddToPage)
        this.weatherAddToPage = correctWeatherIcon(weather.code)
        // var wind_direction = wind.direction;
        // var wind_speed = wind.speed
        html = '<div class="icon_box">' + cloudy + '</div>';
        html += '<div class="city_box">' + weather.city+', '+weather.region + '</div> <div class="temp_box">' + weather.temp + '&deg;' + weather.units.temp + '</div>';
        $("#weather").html(html).hide().fadeIn(700);
        generateWeatherGreet(weather.text.toLowerCase())
      },
      error: function(error) {
        $("#weather").html('<p>'+error+'</p>');
      }
    })
  }

  function correctWeatherIcon(weatherCode){


    if (contains.call(sun_shower_array, weatherCode) === true) {
      return sun_shower;
    } else if (contains.call(thunder_storm_array, weatherCode) === true) {
      return thunder_storm;
    } else if (contains.call(cloudy_array, weatherCode) === true) {
      return cloudy;
    } else if (contains.call(flurries_array, weatherCode) === true) {
      return flurries;
    } else if (contains.call(sunny_array, weatherCode) === true) {
      return sunny;
    } else if (contains.call(rainy_array, weatherCode) === true) {
      return rainy;
    }
  }
  var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
      indexOf = Array.prototype.indexOf;
    } else {
      indexOf = function(needle) {
        var i = -1, index = -1;

        for(i = 0; i < this.length; i++) {
          var item = this[i];

          if((findNaN && item !== item) || item === needle) {
            index = i;
            break;
          }
        }

        return index;
      };
    }

    return indexOf.call(this, needle) > -1;
  };

  /* GENERATE THE WEATHER CONTENT
---------------------------------------------------
 */
});
