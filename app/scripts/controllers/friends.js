'use strict';
var FriendsListCtrl = ['$scope', 'FriendApi', '$cookieStore', '$route', function($scope, FriendApi, $cookieStore, $route) {
	FriendApi.friends.customGETLIST('', {'auth_token': $cookieStore.get('auth_token')}).then(function (response) {
		$scope.friends = response;
	});
	$scope.unFriend = function (friendshipId) {
		FriendApi.friends.customDELETE(friendshipId, {'auth_token': $cookieStore.get('auth_token')}).then(function () {
			$route.reload();
		});
	};
}];

var FriendshipRequestListCtrl = ['$scope', 'FriendApi', '$cookieStore', '$location', function($scope, FriendApi, $cookieStore, $location) {
	FriendApi.friendRequest.customGET('', {'auth_token': $cookieStore.get('auth_token')}).then(function (response) {
		$scope.friendRequests = response;
	});
	$scope.approveRequest = function (userId) {
		FriendApi.friend.customPOST('', {'auth_token': $cookieStore.get('auth_token')}, '',{'friend_id': userId}).then(function () {
			$location.path('/my_friends');
		});
	};
	$scope.ignoreRequest = function (friendshipRequestId) {
		FriendApi.friendRequest.customDELETE(friendshipRequestId, {'auth_token': $cookieStore.get('auth_token')}, '').then(function () {
			$location.path('/my_friends');
		});
	};
}];