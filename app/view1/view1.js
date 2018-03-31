'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$rootScope', '$window', function($scope, $rootScope, $window) {
    $scope.user = {};
//  $rootScope.user = $scope.user;
  var stomp = null;
  $scope.join = function(){
      var url = 'http://' + 'localhost:8080' + '/chat/chatplay';
      console.log('url', url);
      console.log('scope', $scope);
      var sock = new SockJS(url);
      stomp = Stomp.over(sock);
      stomp.connect({}, function (frame) {
          console.log('connect', frame);
          stomp.subscribe("/user/topic/greet", showgreet);
      });
      stomp.send("/app/greeting", {}, $.param($scope.user));
  }

  function showgreet(incoming) {
      var msg = JSON.parse(incoming.body);
      console.log('msg', msg);
      $window.location.href = '/view2';
  }


}]);