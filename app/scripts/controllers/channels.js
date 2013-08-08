'use strict';
var ChannelListCtrl = ['$scope', 'ChannelApi', '$cookieStore', function($scope, ChannelApi, $cookieStore) {
	ChannelApi.channels.customGETLIST('', {'auth_token': $cookieStore.get('auth_token')}).then(function (response) {
		$scope.channels = response;
	});
	$scope.getPublicChannels = function () {
		ChannelApi.publicChannels.customGETLIST('', {'auth_token': $cookieStore.get('auth_token')}).then(function (response) {
			$scope.channels = response;
		});
	};
	$scope.getPrivateChannels = function () {
		ChannelApi.privateChannels.customGETLIST('', {'auth_token': $cookieStore.get('auth_token')}).then(function (response) {
			$scope.channels = response;
		});
	};
}];

var ChannelDetailsCtrl = ['$scope', '$routeParams', 'ChannelApi', function($scope, $routeParams, ChannelApi) {
	if($routeParams.channelId !== null){
		ChannelApi.channel.one($routeParams.channelId).get().then(function (response) {
			$scope.channel = response;
		});
	}
	$scope.getChannelPrograms = function (cid) {
		ChannelApi.channelPrograms.one(cid).get().then(function (response) {
			$scope.channelPrograms = response;
		});
	};
}];