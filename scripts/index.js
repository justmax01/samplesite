
$(document).ready(function () {
    function getWeatherByCity(lang, fnOK, fnError, cityName) {
        $.getJSON(
            'http://api.openweathermap.org/data/2.5/forecast/daily?q=' 
            + cityName + '&APPID=4d801b1b726cc89fc5ffa7af543e9190&cnt=7&units=metric' + '&lang=' + lang + '&callback=?',
            function (data) {
                fnOK.call(this, data);
            }
           
        );
    }
    var functionOk = function (data) {
        console.log(data);
        
        //Connected elements: images, air temperature, max temperature, 
        //min temperature, main, speed wind, humidity to the data that 
        //came from the site 'OpenWeatherMap'  on current day!
        var icon = data.list[0].weather[0].icon ;
        $('#icon-current-time').html('<img src="/img/'+ icon +'.svg" alt="' + data.list[0].weather[0].description + '" >');
        $('#current-temperature').html(Math.round(data.list[0].temp.morn) + '&deg;C');
        $('#descr-current').html(data.list[0].weather[0].description);
        $('#min-temperature').html('Min temp:' + '&nbsp;' + '&nbsp;' + Math.round(data.list[0].temp.min) + '&deg;C');
        $('#max-temperature').html('Max temp:' + '&nbsp;' + '&nbsp;' + Math.round(data.list[0].temp.max) + '&deg;C');
        $('#humidity-day').html('Humidity:'+ '&nbsp;' + '&nbsp;' + data.list[0].humidity + '%');
        $('#wind-day').html('Windy:' + '&nbsp;' + '&nbsp;' + data.list[0].speed + '&nbsp;' + 'm/s');

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

    var functionError = function (msg) {
        $('#error').html('An error has occurred: ' + msg);
    };
    
    getWeatherByCity('eng', functionOk, functionError, 'Lviv');
    
})