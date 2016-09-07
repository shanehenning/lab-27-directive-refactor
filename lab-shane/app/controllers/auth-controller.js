'use strict';

module.exports = function(app) {
  app.controller('AuthController', ['$http', '$location', '$window', function($http, $location, $window) {
    this.baseUrl = `${__API_URL__}`;

    this.signup = function(user) {
      $http.post(this.baseUrl + '/api/signup', user)
        .then((res) => {
          $http.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
          $location.path('/');
        }, (err) => {
          console.log(err);
        });
    };

    this.signin = function(user) {
      $http.get(this.baseUrl + '/api/signin', {
        headers: {
          'Authorization': 'Basic ' + $window.btoa(user.email + ':' + user.password)
        }
      })
        .then((res) => {
          $http.defaults.headers.common['Authorization'] = 'Basic ' + res.data.token;
          $location.path('/');
        }, (err) => {
          console.log(err);
        });
    };

  }]);
};
