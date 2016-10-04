var app = angular.module('userService', [])

app.factory('User', function() {

		return {
			get : function() {
				var data = oktell.getUsers();
				var result = [];
				for (k in data){
					if (data[k].numberObj !=undefined){
						result.push(data[k]);
					}
				}
				return result;
			},
			getdict : function() {
				var data = oktell.getUsers();
				var result = {};
				for (k in data){
					if (data[k].numberObj !=undefined){
						result[data[k].id] =data[k];
					}
				}
				return result;
			},
			getqueue : function(F) {
				oktell.exec('gettotalqueue',function(data){
					F(data);
				});

			},
			webgetlines : function(F) {
				oktell.exec('execpredefineddbstoredproc',{'procedure':'web_getlines','inputparams':{}},function(data){
					var result = [];
					if (data.dataset === undefined) return;
					for (i=1;i<data.dataset[0].length;i++){
						result[i-1] = {};
						for(j=0;j<data.dataset[0][i].length;j++){

							result[i-1][data.dataset[0][0][j]] = data.dataset[0][i][j]}}
					//console.log(result);
					F(result);
				});

			},
			webgetbusyusers : function(F) {
				oktell.exec('execpredefineddbstoredproc',{'procedure':'web_getbusyusers','inputparams':{}},function(data){
					var result = [];
					if (data.dataset === undefined) return;
					for (i=1;i<data.dataset[0].length;i++){
						result[i-1] = {};
						for(j=0;j<data.dataset[0][i].length;j++){

							result[i-1][data.dataset[0][0][j]] = data.dataset[0][i][j]}}
					//console.log(result);
					F(result);
				});

			},
			webgetlineintask : function(F) {
				oktell.exec('execpredefineddbstoredproc',{'procedure':'web_getlineintask','inputparams':{}},function(data){
					var result = [];
					if (data.dataset === undefined) return;
					for (i=1;i<data.dataset[0].length;i++){
						result[i-1] = {};
						for(j=0;j<data.dataset[0][i].length;j++){

							result[i-1][data.dataset[0][0][j]] = data.dataset[0][i][j]}}
					//console.log(result);
					F(result);
				});

			},
			webgettasks : function(F) {
				oktell.exec('execpredefineddbstoredproc',{'procedure':'web_gettasks','inputparams':{}},function(data){
					var result = [];
					if (data.dataset === undefined) return;
					for (i=1;i<data.dataset[0].length;i++){
						result[i-1] = {};
						for(j=0;j<data.dataset[0][i].length;j++){

							result[i-1][data.dataset[0][0][j]] = data.dataset[0][i][j]}}
					//console.log(result);
					F(result);
				});

			},
			webgetuserintask : function(F) {
				oktell.exec('execpredefineddbstoredproc',{'procedure':'web_getuserintask','inputparams':{}},function(data){
					var result = [];
					if (data.dataset === undefined) return;
					for (i=1;i<data.dataset[0].length;i++){
						result[i-1] = {};
						for(j=0;j<data.dataset[0][i].length;j++){

							result[i-1][data.dataset[0][0][j]] = data.dataset[0][i][j]}}
					//console.log(result);
					F(result);
				});

			},
			webgetskills : function(F) {
				oktell.exec('execpredefineddbstoredproc',{'procedure':'web_getskills','inputparams':{}},function(data){
					var result = [];
					if (data.dataset === undefined) return;
					for (i=1;i<data.dataset[0].length;i++){
						result[i-1] = {};
						for(j=0;j<data.dataset[0][i].length;j++){

							result[i-1][data.dataset[0][0][j]] = data.dataset[0][i][j]}}
					var resultarray={};
					for (r in result)
						resultarray[result[r].Phone.trim()]=result[r].Skill.trim();
					//console.log(resultarray);
					F(resultarray);
				});

			},
			webdropin : function(d,F) {
				oktell.exec('execpredefineddbstoredproc',{'procedure':'web_dropin','inputparams':{ 'idtask': d.idtask, 'operator':d.operator, 'type':d.t}},function(data){
					F();
				});
				oktell.exec('execsvcscript',{'scriptname':'refresh_task_list','waitresponse':false, 'waittimeoutsec':10},function(data){
					//
				});

			},
			webdropout : function(d,F) {
				oktell.exec('execpredefineddbstoredproc',{'procedure':'web_dropout','inputparams':{ 'idtask': d.idtask, 'operator':d.operator, 'type':d.t}},function(data){
					F();//
				});
				oktell.exec('execsvcscript',{'scriptname':'refresh_task_list','waitresponse':false, 'waittimeoutsec':10},function(data){
					//
				});

			},
			webrefresh : function() {
				oktell.exec('execsvcscript',{'scriptname':'refresh_task_list','waitresponse':false, 'waittimeoutsec':10},function(data){
					//console.log(data);
				});

			},



			

		}

	});