var myApp = angular.module("myApp", []);

myApp.controller('dbController', function($scope, $http){
	$scope.loaddb = function() {      
		$scope.url = 'https://cloudapi-a098.restdb.io/rest/recipe?q={"ingredients":"milk, flour, butter, cheese, ham"}';
		$http.get($scope.url, {
		headers: {'content-type': 'application/json', 'apikey': 'bc9ca860fcf163d37d7e8a30f0c7b37a7788d' }
     })
		.success(function(results){
		
		$scope.test = results;
		console.log("succes");
		
	})
	.error(function(error){
		console.log(error);
	});
};

});

myApp.controller('mapsController', function($scope, $http){
	$scope.imagesize = "800x400";
	$scope.imagelat = "51.228197";
	$scope.imagelng = "4.422751";
	$scope.imagemarkeraldi = "&markers=color:blue%7Clabel:A%7C51.226597,4.418551";
	$scope.imagemarkerliddle = "&markers=color:red%7Clabel:L%7C51.226097,4.416651";
	$scope.apikey = "AIzaSyAeKRuEXhwAJuZoKYgEie6xqo6sErmci3Y";

	$scope.imageurl = "https://maps.googleapis.com/maps/api/staticmap?center="+$scope.imagelat+","+$scope.imagelng+"&zoom=15&size="+$scope.imagesize+$scope.imagemarkeraldi+$scope.imagemarkerliddle+"&key="+$scope.apikey;
	$http.get($scope.imageurl)
	.success(function(results){
		$scope.selectedImg = {};
		$scope.selectedImg = results;
		console.log("succes");
		
	})
	.error(function(error){
		console.log(error);
	});
	
});

myApp.controller('MainController', function($scope, $http) {
        var getToken = function(successCb) {
          var request = {
            method: 'POST',
            url: 'https://api.stripe.com/v1/tokens',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Bearer sk_test_dedUkCcAmYnKZ7x598gXYiti'
            },
            data: 'card[number]=' + $scope.cardNumber + '&card[exp_month]=' + $scope.cardExpMonth + '&card[exp_year]=' + $scope.cardExpYear + '&card[cvc]=' + $scope.cardCvc
          };
          var errCb = function(err) {
            alert("Wrong " + JSON.stringify(err));
          };
          $http(request).then(function (data) {

            successCb(data["data"]["id"]); 
			console.log(data["data"]["id"]);
          }, errCb).catch(errCb);
        };

        var createCustomer = function(token, successCb) {
          var request = {
            method: 'POST',
            url: 'https://api.stripe.com/v1/customers',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Bearer sk_test_dedUkCcAmYnKZ7x598gXYiti'
            },
            data: 'source=' + token
          };
          var errCb = function(err) {
            alert("Wrong " + JSON.stringify(err));
          };
          $http(request).then(function (data) {
            successCb(data.data.id);
			console.log(data.data.id);
          }, errCb).catch(errCb);
        };

        var createSubscription = function(customer, plan, successCb) {
		console.log('plan=' + plan + '&customer=' + customer);
          var request = {
            method: 'POST',
            url: 'https://api.stripe.com/v1/subscriptions',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Bearer sk_test_dedUkCcAmYnKZ7x598gXYiti'
            },
            data: 'plan=' + plan + '&customer=' + customer
          };
		  
          var errCb = function(err) {
            alert("Wrong " + JSON.stringify(err));
          };
          $http(request).then(function (data) {
            successCb()
          }, errCb).catch(errCb);
        };

        var subscribe = function (plan) {
          getToken(function (token) {
            createCustomer(token, function (customer) {
              createSubscription(customer, plan, function (status) {
                alert("Subscribed!");
              });
            });
          });
        };

        $scope.subscribe = function() {
          subscribe('cloudapi');
        };
      });