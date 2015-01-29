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
//		console.log($scope.tasks.length);
	}). error(function(data, status, headers, config){ 
		return false; 
	});
	
})

.controller('TaskCtrl', function($scope, $stateParams, $http) {
	
	$http.get("http://localhost/2015/tasky/public/tasks/get/"+$stateParams.taskId)
	.success(function(response) {
		$scope.task = response.task;
//		console.log(response.task);
	}). error(function(data, status, headers, config){ 
		return false; 
	});
	
})

.controller('addTaskCtrl', function($scope, $location, $http, transformRequestAsFormPost) {
	$scope.taskData = []
	$scope.tags = [
      {
        name: 'Music',
        value: 'Music'
      }, 
      {
	    name: 'Work',
	    value: 'Work'
	  }, 
	  {
	    name: 'Work At Home',
	    value: 'Work-at-home'
	  }
    ];
    $scope.taskData.tag = $scope.tags[0];
    
    $scope.submit = function(){
    	if($scope.taskData){
    		
    		var request = $http({
                method: "post",
                url: "http://localhost/2015/tasky/public/tasks/add",
                transformRequest: transformRequestAsFormPost,
                data: {
                    title: $scope.taskData.title,
                    description: $scope.taskData.description,
                    tag: $scope.taskData.tag.value
                }
            });
			
			$location.path('/tasks');
    		
    	}
    }
})

.factory("transformRequestAsFormPost", function() {

        // I prepare the request data for the form post.
        function transformRequest( data, getHeaders ) {

            var headers = getHeaders();

            headers[ "Content-Type" ] = "application/x-www-form-urlencoded; charset=utf-8";
            
            return( serializeData( data ) );

        }


        // Return the factory value.
        return( transformRequest );


        // ---
        // PRVIATE METHODS.
        // ---


        // I serialize the given Object into a key-value pair string. This
        // method expects an object and will default to the toString() method.
        // --
        // NOTE: This is an atered version of the jQuery.param() method which
        // will serialize a data collection for Form posting.
        // --
        // https://github.com/jquery/jquery/blob/master/src/serialize.js#L45
        function serializeData( data ) {
        	
            // If this is not an object, defer to native stringification.
            if ( ! angular.isObject( data ) ) {

                return( ( data == null ) ? "" : data.toString() );

            }

            var buffer = [];

            // Serialize each key in the object.
            for ( var name in data ) {

                if ( ! data.hasOwnProperty( name ) ) {

                    continue;

                }

                var value = data[ name ];

                buffer.push(
                    encodeURIComponent( name ) +
                    "=" +
                    encodeURIComponent( ( value == null ) ? "" : value )
                );

            }

            // Serialize the buffer and clean it up for transportation.
            var source = buffer
                .join( "&" )
                .replace( /%20/g, "+" );

            return( source );

        }

    }
);
