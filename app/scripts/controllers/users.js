'use strict';
var HomeCtrl = ['$scope', 'UserApi', 'FriendApi', '$cookieStore', function($scope, UserApi, FriendApi, $cookieStore) {
	$scope.users = UserApi.users.getList();
	$scope.addFriend = function (userId) {
		FriendApi.friendRequest.customPOST('', {'auth_token': $cookieStore.get('auth_token')}, '',{'friend_id': userId}).then(function (response) {
			if(response.status === 'success'){
				//do something
			}
		});
	};
	$scope.searchUser = function() {           
		UserApi.usersSearch.get({'search': $scope.mySearch}).then(function (response) {
			if(response.status === 'success'){
				$scope.users = response;
			}
		});
	};
}];
/**
 * user registration
 * @param $scope
 * @param $location
 * @param UserApi
 */
var SignupCtrl = ['$scope', '$location', 'UserApi', function($scope, $location, UserApi) {
	$scope.create = function () {
		UserApi.users.post($scope.User).then(function(){
			$location.path('/home');
		});
	};
}];

var LoginCtrl = ['$scope', '$location', 'UserApi', '$cookieStore', function($scope, $location, UserApi, $cookieStore) { 
	$scope.login = function () {
		UserApi.userLogin.post($scope.User).then(function (response){
			if(response.user){
				$cookieStore.put('user_name', response.user.name);
				$cookieStore.put('auth_token', response.auth_token);
				$cookieStore.put('user_id', response.user.id);
				$cookieStore.put('loggedin', true);
				$location.path('/home');
			}else{
				$location.path('/login');
			}
		});
	};
}];

var LogoutCtrl = ['UserApi', '$location', '$cookieStore', function(UserApi, $location, $cookieStore) {
	var userAuth = {'auth_token': $cookieStore.get('auth_token')};
	UserApi.userLogout.remove(userAuth).then(function() {
		$cookieStore.put('auth_token', '');
		$cookieStore.put('loggedin', '');
		$cookieStore.put('user_id', '');
		$cookieStore.put('user_name', '');
		$location.path('/login');
	});
}];

var UserProfileCtrl = ['$scope', 'UserApi', '$cookieStore', function($scope, UserApi, $cookieStore) {
	$scope.userData = UserApi.user.one($cookieStore.get('user_id')).get();
	$scope.user_detail = "true";
	
	$scope.user_profile = function () {
		$scope.user_detail = "";
		$scope.user_update = "true";
	}
	$scope.userUpdate = function () {
		var auth_token = {'auth_token': $cookieStore.get('auth_token')};
		UserApi.users.customPUT("",auth_token, "", $scope.User).then(function (response){
			$scope.userData = response;
		});
		$scope.user_update = "";
		$scope.user_detail = "true";
	}
}];