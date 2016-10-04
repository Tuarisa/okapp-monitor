var app = angular.module('cacheService', [])

app.factory('Cache', function() {
    return {
    	get: function(key){
    		//console.log(localStorage);
    		return localStorage[key]
    	}
    ,
    	put: function(key,value){
    		localStorage[key]=value;
    	}
    };
  });