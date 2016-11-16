angular.module('Buckets')
    .controller('homeController', homeController);

homeController.$inject = ['bucketFactory', "$http"];

function homeController (bucketFactory, $http){
    var home = this;
    home.newbucket = {};
    home.bucket = {};
    home.bucketList = [];
    home.addbucket = {};
    home.BucketItem = {};
    home.greeting = 'Welcome to the bucket list!';
    var user = "";

    // heroesFactory.createHero().then

     $http.get('/api/userID')
        .then(function(res){
            // console.log("getUserID api :",res);
             home.getBucket(res.data); // get one
            //  home.BucketItem = {};
            user = res.data;
            
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
                }
                else{
                    // if not, store in bucket
                    home.bucketList = [];
                }
            })
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
    
    home.getBucket(); // get many
    
    $http.get('/api/userID')
        .then(function(res){
            console.log("getUserID api :",res);
             home.getBucket(res.data); // get one
        })
        .catch(function(err){
            console.log("getUserID error :", err);
        });

    // home.Prioritize = function($index) {
    //     // console.log("ng-click works!");

    //     console.log("index: ", $index);

    //     if ($index === 0) {

    //     } else {

    //         // copy the Bucket List
    //         var bucketlist = angular.copy(home.bucketList);

    //         // switch the values of the clicked item and the one above it
    //         var myIndex = "";
    //         myIndex = bucketlist[$index + 1];
    //         console.log("bucketlist item: ",myIndex);
    //         var oldName = bucketlist[$index].buckets;
    //         var newName = bucketlist[$index - 1].buckets;
    //         // var oldDate = bucketlist[$index].date;
    //         // var newDate = bucketlist[$index - 1].date;
    //         // var oldTask = bucketlist[$index].task;
    //         // var newTask = bucketlist[$index - 1].task;
    //         bucketlist[$index - 1].buckets = oldName;
    //         bucketlist[$index].buckets = newName;
    //         // bucketlist[$index - 1].date = oldDate;
    //         // bucketlist[$index].date = newDate;
    //         // bucketlist[$index - 1].task = oldTask;
    //         // bucketlist[$index].task = newTask;

    //         // Strip $$hashKey for storage
    //         // bucketlist.forEach(function(bucket) {
    //         //     delete bucket.$$hashKey;
    //         // });

    //         // update main Bucket List to display new list order
    //        home.bucketList = angular.copy(bucketlist);

    //         // Update localStorage
    //         // window.localStorage.setItem('bucketlist', JSON.stringify(bucketlist));

    //     }
    // }

   
}