angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  /* Login action */
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
    
})

.controller('TasksCtrl', function($scope, $http) {
  
	$http.get("http://localhost/2015/tasky/public/tasks")
	.success(function(response) {
		$scope.tasks = response.tasks;
//		 console.log(response.tasks);
	}). error(function(data, status, headers, config){ 
		return false; 
	});
	
	
//	$scope.playlists = [
//	    { title: 'Reggae', id: 1 },
//	    { title: 'Chill', id: 2 },
//	    { title: 'Dubstep', id: 3 },
//	    { title: 'Indie', id: 4 },
//	    { title: 'Rap', id: 5 },
//	    { title: 'Cowbell', id: 6 }
//	];
	
})

.controller('TaskCtrl', function($scope, $stateParams, $http) {
	
	$http.get("http://localhost/2015/tasky/public/tasks/get/"+$stateParams.taskId)
	.success(function(response) {
		$scope.task = response.task;
		console.log(response.task);
	}). error(function(data, status, headers, config){ 
		return false; 
	});
	
});
