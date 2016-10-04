var app = angular.module('taskService', [])

app.factory('Task', function($http) {

		return {
			get : function() {
				return $http.get('/api/tasks');
			},
			show : function(id) {
				return $http.get('/api/tasks/' + id);
			},
			save : function(commentData) {
				return $http({
					method: 'POST',
					url: '/api/tasks',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(commentData)
				});
			},
			destroy : function(id) {
				return $http.delete('/api/tasks/' + id);
			},
			update : function(commentData, id) {
				return $http({
					method: 'PUT',
					url: '/api/tasks/'+id,
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(commentData)
				});
			},

		}

	});