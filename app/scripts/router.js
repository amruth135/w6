'use strict';
/**
 * All template navigation done here
 */
WatchinNgApp.config(['$routeProvider', 'RestangularProvider', function($routeProvider, RestangularProvider) {
	  
	$routeProvider.when('/home', {
		templateUrl: 'views/home.html',
		controller: HomeCtrl,
		access: { isFree: false	}
	});
	
	$routeProvider.when('/signup', {
		templateUrl: 'views/signup.html',
		controller: SignupCtrl,
		access: { isFree: true }
	});
	
	$routeProvider.when('/login', {
		templateUrl: 'views/login.html',
		controller: LoginCtrl,
		access: { isFree: true }
	});
	
	$routeProvider.when('/channel_list', {
		templateUrl: 'views/channel_list.html',
		controller: ChannelListCtrl,
		access: { isFree: false }
	});
	
	$routeProvider.when('/channel/:channelId', {
		templateUrl: 'views/channel_details.html',
		controller: ChannelDetailsCtrl,
		access: { isFree: false }
	});
	
	$routeProvider.when('/user_profile', {
		templateUrl: 'views/user_profile.html',
		controller: UserProfileCtrl,
		access: { isFree: false }
	});
	
	$routeProvider.when('/my_friends', {
		templateUrl: 'views/my_friends.html',
		controller: FriendsListCtrl,
		access: { isFree: false }
	});
	
	$routeProvider.when('/approve_requests', {
		templateUrl: 'views/approve_request.html',
		controller: FriendshipRequestListCtrl,
		access: { isFree: false }
	});
	
	$routeProvider.when('/logout', {
		templateUrl: 'views/home.html',
		controller: LogoutCtrl,
		access: { isFree: false	}
	});
  
	$routeProvider.otherwise({redirectTo: '/home'});
	RestangularProvider.setBaseUrl(localRequestUrl + '/api/');
	RestangularProvider.setRequestSuffix('.json');
    
}]);