'use strict';

/**
 * @ngdoc function
 * @name angularWeatherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularWeatherApp
 */
angular.module('angularWeatherApp')
  .controller('MainCtrl', function ($http) {
    this.locations = [ ];
    var locations = this.locations;

    this.addLocation = function(zipcode){
      $http.get("http://api.openweathermap.org/data/2.5/weather?zip="+zipcode+",us&units=imperial").
        then(function(response) {
          var newLocation = {zip: zipcode, weather: response.data.weather[0], temp: response.data.main, name: response.data.name};
          locations.push(newLocation);
        });
    }

    this.removeLocation = function(zipcode){
      angular.forEach(locations, function(value, index) {
        if (value.zip === zipcode)
          locations.splice(index, 1);
      }
      );
    }

    this.getWeatherIcon = function(forecast){
      var url = "https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/";
        if (forecast.id >= 200 && forecast.id <= 232)
          return url + "art_storm.png";
        else if (forecast.id >= 501 && forecast.id <= 511)
          return url + "art_rain.png";
        else if (forecast.id === 500 || (forecast.id >= 520 && forecast.id <= 531))
          return url + "art_light_rain.png";
        else if (forecast.id >= 600 && forecast.id <= 622)
          return url + "art_snow.png";
        else if (forecast.id >= 801 && forecast.id <= 804)
          return url + "art_clouds.png";
        else if (forecast.id === 741 || forecast.id === 761)
          return url + "art_fog.png";
        else
          return url + "art_clear.png";

    }
  });
