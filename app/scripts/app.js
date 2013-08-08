'use strict';
var localRequestUrl = 'http://localhost/w5/app/request.php';
var WatchinNgApp = angular.module('watchinApp', ['restangular', 'ngCookies']);

WatchinNgApp.run(['$rootScope', 'UserApi', '$location', '$cookieStore', function(root, UserApi, $location, $cookieStore) {
	root.$on('$routeChangeSuccess', function(scope, currView) {
		root.url = localRequestUrl;
		root.loggedIn = $cookieStore.get('loggedin');
		root.userName = $cookieStore.get('user_name');
		if (root.loggedIn === true) {
			root.loggedOut = '';
			UserApi.isLogged = true;
		}
		else {
			root.loggedOut = true;
			UserApi.isLogged = false;
		}
		
		if(currView){
			if (!currView.access.isFree && !UserApi.isLogged) {
				$location.path('/login');
			}
		}
	});
}]);


/**
 * data resources
 */
WatchinNgApp.factory('UserApi', function (Restangular) {
	var users = Restangular.all('users');
	var user = Restangular.one('users');
	var userLogin = Restangular.all('users/sign_in');
	var userLogout = Restangular.one('users/sign_out');
	var usersSearch = Restangular.one('users/search');
	
	var userAuth = {isLogged: false};
	
	return {
		userAuth: userAuth,
		users: users,
		user: user,
		userLogin: userLogin,
		userLogout: userLogout,
		usersSearch: usersSearch
	};
});

WatchinNgApp.factory('FriendApi', function (Restangular) {
	var friends = Restangular.all('friendships');
	var friend = Restangular.one('friendships');
	var friendRequest = Restangular.one('friendship_requests');
	
	return {
		friends: friends,
		friend: friend,
		friendRequest: friendRequest
	};
});

WatchinNgApp.factory('ChannelApi', function (Restangular) {
	var channels = Restangular.all('channels');
	var channel = Restangular.one('channels');
	var publicChannels = Restangular.all('channels/public');
	var privateChannels = Restangular.all('channels/private');
	var channelPrograms = Restangular.all('channels/get_programmes');
	
	return {
		channels: channels,
		channel: channel,
		publicChannels: publicChannels,
		privateChannels: privateChannels,
		channelPrograms: channelPrograms
	};
});