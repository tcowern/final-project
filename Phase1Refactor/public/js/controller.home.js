angular.module('Buckets', ["xeditable"])
    .controller('homeController', homeController);
    
    

homeController.$inject = ['bucketFactory', "$http"];

function homeController (bucketFactory, $http){
    var home = this;
    home.newbucket = {};
    home.bucket = {};
    home.bucketList = [];
    home.taskList = [];
    home.addbucket = {};
    home.BucketItem = {};
    home.greeting = 'Welcome to the bucket list!';
    home.user = {complete: false};  
    var user = "";
    var task = "";


     $http.get('/api/userID')
        .then(function(res){
            console.log("getUserID api :",res);
             home.getBucket(res.data); // get one
            //  home.BucketItem = {};
            user = res.data;
            console.log("Loser: ",user);
            
            // console.log("Get attempt: ", user);
        })
        .catch(function(err){
            console.log("getUserID error :", err);
        });


    home.createBucket = function(){
        bucketFactory.createBucket(home.newBucket)
            .then(function(returnData){
                console.log('Response from server : ', returnData)
                home.newBucket = {}; // reset the form
                home.getBucket();

                window.location.href = "/";
            }).catch(function(err){
                console.log("create bucket error", err);
            });
    }

    home.createUser = function(){
        bucketFactory.createUser(home.newUser)
            .then(function(returnData){
                console.log('Response from server : ', returnData)
                home.newUser = {}; // reset the form
                // home.getBucket();

                window.location.href = "/";
            }).catch(function(err){
                console.log("create user error", err);
            });
    }

    home.getBucket = function(){
        console.log("Hit the GET function");
        bucketFactory.getBucket()
            .then(function(returnData){
                console.log("buckets",returnData.data);
                if(returnData.data !== undefined){
                    // if array (has length), store in bucketList
                    home.bucketList = returnData.data;
                    console.log("Bucekys", home.bucketList)
                    // return home.bucketList;
                }
                else{
                    // if not, store in bucket
                    home.bucketList = [];
                }
            });
           
    }

    home.addBucket = function() {
        console.log("Hit addBucket", home.BucketItem);
        bucketFactory.addBucket(home.BucketItem)
            .then(function(returnData){
                home.BucketItem = {
                    userid : user
                }
                console.log("addBucket response from server: ", returnData);
                home.getBucket(); // get many

            }).catch(function(err){
                console.log("addBucket error: ", err);
            });
    }
    
    home.addTask = function() {
        console.log("Hit addTask", home.Task);
        console.log("ID: ",home.selectedName._id)

        home.Task.bucketid = home.selectedName._id;
                console.log("home.task: ", home.Task);
        bucketFactory.addTask(home.Task)
            .then(function(returnData){

                console.log("addTask response from server: ", returnData);
                // home.getBucket(); // get many
                home.Task.taskname = '';
            }).catch(function(err){
                console.log("addBucket error: ", err);
            });

            home.test();
    }

    home.dateBucket = function (bucketId, bucketDate) {
        
        console.log("BucketID: ", bucketId);
        console.log("BucketDate: ", bucketDate);
        var editData = {};
        bucketFactory.dateBucket(bucketId, bucketDate)

            .then(function(returnData){

                console.log("date Bucket response from server: ", returnData);
                // home.getBucket(); // get many
                // home.Task.taskname = '';
            }).catch(function(err){
                console.log("dateBucket error: ", err);
            });

    }

    home.getAllTask = function(){
        console.log("Hit the get task function");
        console.log("user in get all",user);
        bucketFactory.getAllTasks()
            .then(function(returnData){
                console.log("Tasks",returnData.data);
                if(returnData.data !== undefined){
                    // if array (has length), store in bucketList
                    home.taskList = returnData.data;
                    console.log("Taskies", home.taskList)
                    // return home.bucketList;
                }
                else{
                    // if not, store in bucket
                    home.taskList = [];
                }
            });
           
    }

    // home.getAllTask();
    
    home.test = function() {
        console.log("Test worked!")

        var selected = home.selectedName._id;
        console.log("selected: ", selected);

        TaskID = selected;
        bucketFactory.getTask(TaskID)
            .then(function(res){
                console.log("Get task with BL id :",res);
                home.taskList = res.data;
            })
            .catch(function(err){
                console.log("get Task error :", err);
            });
    }    

}

angular.module('Buckets')
    .run(function(editableOptions) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});


