var app = angular.module('lineService', [])

app.factory('Line', function($http) {

		return {
			get : function() {
				return $http.get('/getlines.php');
			},
			getBusy : function(){
				return $http.get('/getbusyusers.php');
			},
			getTasks : function(){
				return $http.get('/gettasks.php');
			},
			getUserInTasks : function(){
				return $http.get('/getuserintasks.php');
			},
			getLineInTasks : function(){
				return $http.get('/getlineintask.php');
			},
			dropin:function(d){
				return $http.get('/dropin.php',{
    			params: { idtask: d.idtask, operator:d.operator, type:d.t}});
			},
			dropout:function(d){
				return $http.get('/dropout.php',{
    			params: { idtask: d.idtask, operator:d.operator, type:d.t}});
			}
			
			

		}

	});