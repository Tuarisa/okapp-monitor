angular.module('mainCtrl', ['dnd','angularMoment'])

	.controller('mainController', function($scope, $http,$window, Task,User,Line,AuthenticationService,FlashService,Cache) {
		// object to hold all the data for the new comment form
		//$scope.keys = [];
		$scope.commentData = {};
		$scope.commentDataByID = {}
		$scope.users = [];
		$scope.busers = {};
		// loading variable to show the spinning loading icon
		$scope.loading = false;
		$scope.username='';
		//$scope.users2 = [];
		$scope.lines = [];
		$scope.linesobj = {};
		$scope.userintasks={};
		$scope.lineintasks={};
		$scope.tasks = [];
		$scope.queue = {};
		$scope.cache = Cache;
		$scope.skills={};
		//console.log($scope.cache.getAll());
		//var cache = $cacheFactory('myCache');
		$scope.phonestatuses={
			1:'bg-success',
			2:'bg-warning',
			3:'bg-info',
			5:'bg-danger',
			6:'bg-info',
			7:'bg-undef',
			0:'bg-undef'

		}
		$scope.intervals=
			[ 10, 20, 30
  ];
		
		$scope.intervalsarray={
			10:'m10',
			20:'m20',
			30:'m30'
		}	
		$scope.interval = 10;


		$scope.skillcolors={
			'Русский':'label-success',
			'Английский':'label-info',
			'Казахский':'label-warning'

		}
		$scope.skilllang={
			'Русский':'RU',
			'Английский':'EN',
			'Казахский':'KZ'

		}
		// get all the comments first and bind it to the $scope.comments object
		/*Line.get()
			.success(function(data) {
				$scope.lines = data;
				//$scope.loading = false;
				//$scope.c = {};
			});
		*/
		/*var u = $scope.cache.get('users')
		$scope.element={
			users:'true',
			lines:true,
			table:false,
			linesname:true,
			usersnumbers:true
		}
		*/
		$scope.element={};
		$scope.element.users = $scope.cache.get('users')
		$scope.element.lines = $scope.cache.get('lines')
		$scope.element.table = $scope.cache.get('table')
		$scope.element.linesname=$scope.cache.get('linesname')
		$scope.element.usersnumbers=$scope.cache.get('usersnumbers')
		//console.log($scope.element.users)
		//console.log($scope.cache.get('users'))
		$scope.$apply();

		
		$scope.dropin = function (dragmodel, model){
            console.log('dropin');
            //console.log(dragmodel);
            //console.log(model);
            var d ={}
            d.idtask = dragmodel.id;
            d.operator = model.u;
            d.t = model.t
            //console.log('2');
            if (model.t=='line')
            		return;
            User.webdropin(d,function(){
            	User.webgetuserintask(wgetUserInTasks);
            	//User.webgetlineintask(wgetLineInTasks);
            });
            //User.webgetuserintask(wgetUserInTasks);
            //User.webgetlineintask(wgetLineInTasks);

			


        };

        $scope.dropout = function (dragmodel, model){
            //console.log('dropout');
 			var d ={}
 			if (model.tid != dragmodel.id) return;
            d.idtask = dragmodel.id;
            d.operator = model.u;
            d.t = model.t
            if (d.t =='user'){
            	 $scope.userintasks[model.tid].visible=0;
            	}
            else
            	$scope.lineintasks[model.tid].visible=0;
            User.webdropout(d, function(){
            	$scope.$apply();
            	User.webgetuserintask(wgetUserInTasks);
            	//User.webgetlineintask(wgetLineInTasks);
            });

        };

        $scope.changetaskcheckbox=function(id,value){
        	//console.log(id);
        	//console.log(value);
        	$scope.cache.put(id,value);
        }

        var PrintQueue = function(data){
        	$scope.queue = {};
        	//data = JSON.parse('{"result":[{"numid":"00000000-0000-0000-0000-000000000000","rulename":"Операторы входящей задачи «ыыы»","queue":[{"srclineid":"56ca8d7a-bea1-4b0f-84a6-c31b6e99d241","srclinenumber":"13076","callerid":"834323807082","objectid":"e79d6c22-8d1d-425c-8ad3-c1d9402aa4d3","managedlineid":"56ca8d7a-bea1-4b0f-84a6-c31b6e99d241","srcelementid":"56ca8d7a-bea1-4b0f-84a6-c31b6e99d241","queuesourcestr":"qsIncomingTaskSpecial","department":"","objecttype":0,"lenqueue":79.3703546,"isuser":false,"istask":true,"queuepriority":10,"startqueuetime":"2015-04-01 14:27:25","objecttypestr":"qotQueueLogic","taskdirection":"incoming","taskid":"d680fdc9-8506-48da-b08b-7447f27d5bfd","managedlinenumber":"13076","queuesource":8,"calledid":"73432380708","taskname":"ыыы","tasklistid":13,"chainid":"46ba46c0-aa52-4705-8b47-a04e0a36e581"},{"srclineid":"00f36431-8961-4461-ae0e-ba7644aaa151","srclinenumber":"13077","callerid":"834323807082","objectid":"6c4a7031-46a1-402c-9140-72225b46335b","managedlineid":"00f36431-8961-4461-ae0e-ba7644aaa151","srcelementid":"00f36431-8961-4461-ae0e-ba7644aaa151","queuesourcestr":"qsIncomingTaskSpecial","department":"","objecttype":0,"lenqueue":66.1127523,"isuser":false,"istask":true,"queuepriority":10,"startqueuetime":"2015-04-01 14:27:38","objecttypestr":"qotQueueLogic","taskdirection":"incoming","taskid":"d680fdc9-8506-48da-b08b-7447f27d5bfd","managedlinenumber":"13077","queuesource":8,"calledid":"73432380708","taskname":"ыыы","tasklistid":13,"chainid":"a008bb08-fd38-4f46-ad08-34e4b3cc2915"},{"srclineid":"89772055-33ab-4078-8091-13dd0c7aa8f5","srclinenumber":"13078","callerid":"834323807083","objectid":"c3522317-d66f-44cc-bc0c-7438dcfd1453","managedlineid":"89772055-33ab-4078-8091-13dd0c7aa8f5","srcelementid":"89772055-33ab-4078-8091-13dd0c7aa8f5","queuesourcestr":"qsIncomingTaskSpecial","department":"","objecttype":0,"lenqueue":53.2004073,"isuser":false,"istask":true,"queuepriority":10,"startqueuetime":"2015-04-01 14:27:51","objecttypestr":"qotQueueLogic","taskdirection":"incoming","taskid":"d680fdc9-8506-48da-b08b-7447f27d5bfd","managedlinenumber":"13078","queuesource":8,"calledid":"73432380708","taskname":"ыыы","tasklistid":13,"chainid":"a7716b80-4e0e-4075-b2fd-5a1994e8e414"}],"numprefix":"","ruleid":"042ed653-55e4-4e9d-aacf-aa7bd24858b5"}],"qid":"0.7025722193066031"}')
        	if (data.result.length > 0){
        		for (var i =0; i<data.result.length;i++){
        			r = data.result[i];
        			if (r.queue.length > 0){
        				for (var q =0; q<r.queue.length;q++){
        					if (!$scope.queue.hasOwnProperty(r.queue[q].taskid))
        						$scope.queue[r.queue[q].taskid] = {};
        					if (!$scope.queue[r.queue[q].taskid].hasOwnProperty(r.queue[q].callerid)){
        						$scope.queue[r.queue[q].taskid][r.queue[q].callerid] = {};
        						$scope.queue[r.queue[q].taskid][r.queue[q].callerid].count = 0;
        					}
        					$scope.queue[r.queue[q].taskid][r.queue[q].callerid].count +=1;
        					$scope.queue[r.queue[q].taskid][r.queue[q].callerid].phone = r.queue[q].callerid;
        				}
        			}
        		}
        	}
        	//console.log($scope.queue);
        	//console.log($scope.tasks);
        }

		var getUsers = function(){
			$scope.loading = true;
			data = User.get();
			$scope.users = data
			$scope.loading = false;
			//console.log($scope.users);
			//User.getqueue(PrintQueue);
			User.webgetlines(wgetLines);
			//User.webrefresh();
			User.webgetbusyusers(wgetBusy);
			//User.webgetlineintask(wgetLineInTasks);
			User.webgettasks(wgetTasks);
			//User.webgetuserintask(wgetUserInTasks);
			try {
				$scope.$apply();
			}
			catch(e){
				//console.log('error');
			}
					
		}

		var getOthers = function(){
			//User.webgettasks(wgetTasks);
			//User.webgetlineintask(wgetLineInTasks);
			User.webgetuserintask(wgetUserInTasks);
			User.getqueue(PrintQueue);
			User.webgetskills(wgetSkills);
			try {
				$scope.$apply();
			}
			catch(e){
				//console.log('error');
			}
					
		}


		var getLines = function(){
			if ($scope.users.length == 0) return;
			Line.get()
			.success(function(data) {
				for (k in data){
					$scope.linesobj[k.SystemNumStr] = k;
				}
				$scope.lines = data;
				//$scope.$apply();
				//$scope.loading = false;
				//$scope.c = {};
			});
		}

		var wgetLines = function(data){
			if ($scope.users.length == 0) return;
			for (k in data){
					$scope.linesobj[k.SystemNumStr] = k;
				}
				$scope.lines = data;
		}
		var wgetSkills = function(data){
			if ($scope.users.length == 0) return;
			/*data = {
				'834323807082':'Английский',
				'834323807083':'Казахский'
			}*/
			$scope.skills = data;
		}

		var getTasks = function(){
			if ($scope.users.length == 0) return;
			Line.getTasks()
			.success(function(data) {
				if ($scope.tasks.length==0) {
					$scope.tasks = data;
					//console.log(JSON.stringify($scope.tasks));
					//console.log(JSON.stringify(data));
				}
				//$scope.$apply();
				//$scope.loading = false;
				//$scope.c = {};
			});
		}
		var wgetTasks = function(data){
			if ($scope.users.length == 0) return;

				if ($scope.tasks.length==0) {
					$scope.tasks = data;
					//console.log(JSON.stringify($scope.tasks));
					//console.log(JSON.stringify(data));
				}
				for (t in $scope.tasks){
					//console.log($scope.tasks[t].id);
					if ($scope.cache.get($scope.tasks[t].id)===undefined)
						$scope.cache.put($scope.tasks[t].id,0)
					else{
						$scope.tasks[t].show=$scope.cache.get($scope.tasks[t].id)
					}
				}
				$scope.$apply();
				//console.log($scope.tasks);
				//$scope.loading = false;
				//$scope.c = {};
		}
		var getUserInTasks = function(){
			if ($scope.users.length == 0) return;
			//$scope.userintasks = {};
			var rstring = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

			Line.getUserInTasks()
			.success(function(data) {
				var usersdict = User.getdict();
				for (k in data){
					if (!$scope.userintasks.hasOwnProperty(data[k].taskid)){

						$scope.userintasks[data[k].taskid]=[];
					}
					$scope.userintasks[data[k].taskid][data[k].operatorid] = data[k].Name;
					//console.log(usersdict[data[k].operatorid]);
					//var o = {}
					//o.Name = data[k].Name;
					//o.Id = data[k].operatorid;
					//$scope.userintasks[data[k].taskid].push(o)


				}
				//console.log($scope.userintasks);
			});
		}

		var wgetUserInTasks = function(data){
			if ($scope.users.length == 0) return;
			var rstring = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
			var usersdict = User.getdict();
				for (k in data){
					if (!$scope.userintasks.hasOwnProperty(data[k].taskid)){

						$scope.userintasks[data[k].taskid]={};
					}
					//$scope.userintasks[data[k].taskid][data[k].operatorid] = data[k].Name;
					var o = {}
					//o = usersdict[data[k].operatorid]
					o.Name = data[k].Name;
					o.Id = data[k].operatorid;
					o.rstring = rstring;
					o.visible = 1;
					//console.log(usersdict[data[k].operatorid]);
					if (usersdict[data[k].operatorid]){
						o.numberObj = usersdict[data[k].operatorid].numberObj
						$scope.userintasks[data[k].taskid][data[k].Name] = o;
					}
					//console.log(usersdict[data[k].operatorid]);

					//$scope.userintasks[data[k].taskid].push(o)
				}
				for (t in $scope.userintasks)
					for (u in $scope.userintasks[t])
						if ($scope.userintasks[t][u].rstring !=rstring)
							$scope.userintasks[t][u].visible=0;
				//console.log($scope.userintasks);
		}

		var getLineInTasks = function(){
			if ($scope.users.length == 0) return;
			var rstring = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
			Line.getLineInTasks()
			.success(function(data) {
				for (k in data){
					if (!$scope.lineintasks.hasOwnProperty(data[k].taskid)){

						$scope.lineintasks[data[k].taskid]={};
					}
					//$scope.lineintasks[data[k].taskid][data[k].ExtLineId] = data[k].SystemNumStr;
					var o = {}
					o.Name = data[k].SystemNumStr;
					o.Id = data[k].ExtLineId;
					o.rstring = rstring;
					o.visible = 1;
					$scope.lineintasks[data[k].taskid][data[k].ExtLineId] = o;
				}
			});
		}
		var wgetLineInTasks = function(data){
			if ($scope.users.length == 0) return;
			var rstring = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
				for (k in data){
					if (!$scope.lineintasks.hasOwnProperty(data[k].taskid)){

						$scope.lineintasks[data[k].taskid]={};
					}
					//$scope.lineintasks[data[k].taskid][data[k].ExtLineId] = data[k].SystemNumStr;
					var o = {}
					o.Name = data[k].SystemNumStr;
					o.Id = data[k].ExtLineId;
					o.rstring = rstring;
					o.visible = 1;
					$scope.lineintasks[data[k].taskid][data[k].ExtLineId] = o; 
				}
				for (t in $scope.lineintasks)
					for (u in $scope.lineintasks[t])
						if ($scope.lineintasks[t][u].rstring !=rstring)
							$scope.lineintasks[t][u].visible=0;
		}

		var getBusy = function(){
			if ($scope.users.length == 0) return;
			Line.getBusy()
			.success(function(data) {
				for (k in data){
					o = {};
					o.num = data[k].num;
					o.direction = data[k].direction;
					$scope.busers[data[k].userid.toLowerCase()]=o;
					$scope.linesobj[data[k].linenum]=o;

				}
				//$scope.$apply();
			});
		}

		var wgetBusy = function(data){
			var rstring = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
			if ($scope.users.length == 0) return;
			for (k in data){
				o = {};
				o.num = data[k].num;
				o.direction = data[k].direction;
				o.timestart = data[k].timestart;
				o.rstring = rstring;
				$scope.busers[data[k].userid.toLowerCase()]=o;
				$scope.linesobj[data[k].linenum]=o;

			}
			for (t in $scope.busers)
				if ($scope.busers[t].rstring !=rstring)
					$scope.timestart = null;

		}

		oktell.on('connecting',
			function(){
				getUsers();
				getOthers();
			});
		oktell.on('abonentsChange',getUsers);
		oktell.on('Phone Events',getUsers);
		oktell.on('stateChange',getUsers);
		oktell.on('statusChange',getUsers);
		oktell.on('disconnect',function(){
			console.log('disconnected');
			 $window.location.reload();
		})
		getUsers();
		getOthers();
		setInterval(function() { getUsers();}, 12000);
		setInterval(function() { getOthers();}, 33000);
		setInterval(function() { $scope.$apply();}, 2000);
		//setInterval(function() { getBusy();}, 5550);
		//setInterval(function() { getTasks();}, 5660);
		//setInterval(function() { getUserInTasks();}, 5770);
		//setInterval(function() { getLineInTasks();}, 5770);
		// function to handle submitting the form
		var response = AuthenticationService.CheckisLoggedIn();
		console.log(response);
	      if (response==false){
	      	//FlashService.show('Please, log in');
	      	var login = AuthenticationService.savedLogin();

			  if (login){
			    console.log('login find')
			    //AuthenticationService.login({ email: login, password: null })
			  }
	      	console.log('log in, pls')
	      	//var landingUrl = "http://" + $window.location.host + "/#login";
			//$window.location.href = landingUrl;

	      }
	      else{
	      	console.log('you are already logged')
	      	FlashService.clear();
	      };
		$scope.username = AuthenticationService.GetUserName();
		if (!$scope.username){
			var landingUrl = "http://" + $window.location.host + "/#login";
			$window.location.href = landingUrl;
		}


		// function to handle deleting a comment

		$scope.logout = function() {
		    AuthenticationService.logout();
		  };

	}).filter('durationsec', function(){
     return function(param){
        // некоторые действия над param
        var now = Date.now() / 1000 | 0
        return moment.duration(now - param, "seconds").format("mm:ss", { trim: false });
    }
})
;
moment.lang('en', {
    relativeTime : {
        future: "in %s",
        past:   "%s ago",
        s:  "seconds",
        m:  "1m",
        mm: "%dm",
        h:  "1h",
        hh: "%dh",
        d:  "1d",
        dd: "%dd",
        M:  "1m",
        MM: "%dm",
        y:  "1y",
        yy: "%dy"
    }
});

