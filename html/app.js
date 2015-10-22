var main = function() {
    $('.article').click(function(){
        $('.article').removeClass('current');
        $('.description').hide();
        $(this).addClass('current');
        $(this).children('.description').show();
    });
    $(document).keypress(function(event){
        if (event.which === 111) {
            $('.current').children('.description').toggle();
        }
        else if(event.which === 110) {
            var currentArticle = $('.current');
            var nextArticle = currentArticle.next();
            currentArticle.removeClass('current');
            nextArticle.addClass('current');
        }

    });
};
$(document).ready(main);

  $("#cityfield").keyup(function() {
    var url = "getcity?q="+$("#cityfield").val();
    $.getJSON(url,function(data) {
      console.log(data)
    var everything;
    everything = "<ul>";
    $.each(data, function(i,item) {
      everything += "<li> "+data[i].city;
    });
    everything += "</ul>";
    $("#txtHint").html(everything);
  })
  .done(function() { console.log('getJSON request succeeded!'); })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log('getJSON request failed! ' + textStatus);
    console.log("incoming "+jqXHR.responseText);
  })
  .always(function() { console.log('getJSON request ended!');
  })
  .complete(function() { console.log("complete"); });
});

var submitButton = document.getElementById("button");

var submitCity = function(e) {
    e.preventDefault();
    var finalCity = document.getElementById("cityfield").value;
       dispcity.innerHTML = finalCity;
       var myurl = "https://api.wunderground.com/api/10d7481eaf8d816d/geolookup/conditions/q/Utah/"
       myurl += finalCity;
       myurl += ".json";
       console.log(myurl);
       $.ajax({
           url : myurl,
           dataType : "jsonp",
           success: function(parsed_json) {
               //console.log(data);
                var temp_string = parsed_json['current_observation']['temperature_string'];
                var current_weather = parsed_json['current_observation']['weather'];
                var weatherFinal = "<ul>";
                  weatherFinal += "<li>Location: "+ finalCity;
                  weatherFinal += "<li>Temperature: "+temp_string;
                  weatherFinal += "<li>Weather: "+current_weather;
                  weatherFinal += "</ul>";
                var weather_box = document.getElementById("weather");
                weather_box.innerHTML = weatherFinal;
           }
       })

    };

    submitButton.addEventListener("click", submitCity);
