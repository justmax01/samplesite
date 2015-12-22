
     $(function(){
    //Setting lang for moment.js
    moment.locale('en');
    // Adding handler for inputCityName button
    $('#btnGetWeather').click(function () {
        getWeatherByCity('en', dataReceived, showError, $('#inputCityName').val());
    });
    // Adding handler for 'Enter' key on keyboard
    $('#inputCityName').keypress(function(e) {
        var ENTER_KEY_CODE = 13;
        if ( e.which === ENTER_KEY_CODE ) 
        {
            $('#btnGetWeather').trigger('click');
            return false;
        }
    });
  function dataReceived(data) {
        // Calc time difference from UTC, confert from min to milliseconds
        var offset = (new Date()).getTimezoneOffset()*60*1000; 
        var city = data.city.name;
        var country = data.city.country;
        var icon = data.list[0].weather[0].icon ;
        $('#icon-current-time').html('<img src="/img/'+ icon +'.svg" alt="' + data.list[0].weather[0].description + '" >');
        $('#current-temperature').html(Math.round(data.list[0].temp.morn) + '&deg;C');
        $('#descr-current').html(data.list[0].weather[0].description);
        $('#min-temperature').html('Min temp:' + '&nbsp;' + '&nbsp;' + Math.round(data.list[0].temp.min) + '&deg;C');
        $('#max-temperature').html('Max temp:' + '&nbsp;' + '&nbsp;' + Math.round(data.list[0].temp.max) + '&deg;C');
        $('#humidity-day').html('Humidity:'+ '&nbsp;' + '&nbsp;' + data.list[0].humidity + '%');
        $('#wind-day').html('Windy:' + '&nbsp;' + '&nbsp;' + data.list[0].speed + '&nbsp;' + 'm/s');
        $('#location').html(city + ', <b>' + country + '</b>');
        //Connected elements: air temperature, description for the current day afternoon!
        $('#afternoon').html(Math.round(data.list[0].temp.day) + '&deg;C');
        //Connected elements: air temperature, description for the current day evening!
        $('#evening').html(Math.round(data.list[0].temp.eve) + '&deg;C');
        //Connected elements: air temperature, description for the current day night!
        $('#night').html(Math.round(data.list[0].temp.night) + '&deg;C');
        $('#list-date').html(data.list[2].dt);
        var date = new Date();
        
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        
        var weatherForDay = '';
        var weatherContainer = $('#weather-container');
        
        for(var i = 1; i < data.list.length; i++) {
            
            date.setDate(date.getDate() + 1);
    
            weatherForDay += '<div class="week-day-weather">' +
                '<h1 class="day-week">' + getDayNameByNumber(date.getDay()) + '</h1>' +
                '<h2 class="month-dat"> ' + monthNames[date.getMonth()] + '&nbsp;' + date.getDate() + '</h2>' +
                '<div id="iconWeek">' + ('<img src="img/' + data.list[i].weather[0].icon + '.svg" alt="Icon afternoon" alt="' + data.list[1].weather[0].description + '" >') +'</div>' +
                '<div class="day-temperature">' + Math.round(data.list[i].temp.min) + '&deg;C &nbsp;' + Math.round(data.list[i].temp.max) + '&deg;C</div>' +
                '<div id="main-week">' + (data.list[i].weather[0].description) +'</div>' +
            '</div>';
        }
        weatherContainer.html(weatherForDay);
    };

    function getDayNameByNumber(numberOfDay) {
        var days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

        return days[numberOfDay];
    }
   function showError(msg){
        $('#error').html('An error occured: ' + msg);
    }
   

 
    

})