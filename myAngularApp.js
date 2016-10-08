var app = angular.module("vidFlixApp",[]);
app.controller("MainCtrl",function($scope){

});
app.component('videoList', {
	//Note: URL is relative to the index.html file
	template:
		'<div ng-repeat="video in $ctrl.videos" class="well">'+
		'<h3>{{video.name}}</h3>'+
		'<p><video src="{{video.name}}">Browser Support Error!</video></p></div>',
	controller: function VideoListController($http){
		var _this=this;
		$http.get('videoList.json')
    .success(function(data) {
		_this.videos=data;
    })
    .error(function(data,status,error,config){
        this.videos = [{heading:"Error",description:"Could not load json   data"}];
    });
	}
});
// app.controller("VideoListCtrl",function($scope){

// });