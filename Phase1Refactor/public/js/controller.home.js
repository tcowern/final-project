angular.module('Buckets')
    .controller('homeController', homeController);

homeController.$inject = ['bucketFactory', "$http"];

function homeController (bucketFactory, $http){
    var home = this;
    home.newbucket = {};
    home.bucket = {};
    home.bucketList = [];
    home.greeting = 'Welcome to the bucket list!';

    // heroesFactory.createHero().then


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

    home.getBucket = function(bucketID){
        console.log("Hit the GET function");
        bucketFactory.getBucket(bucketID)
            .then(function(returnData){
                console.log("buckets",returnData.data.buckets);
                if(returnData.data.buckets !== undefined){
                    // if array (has length), store in bucketList
                    home.bucketList = returnData.data.buckets;
                    console.log("Bucekys", home.bucketList)
                }
                else{
                    // if not, store in bucket
                    home.bucketList = [];
                }
            })
    }

    home.addBucket = function() {
        console.log(home.BucketItem);
        bucketFactory.addBucket(home.BucketItem)
            .then(function(returnData){
                console.log("addBucket response from server: ", returnData);
                    $http.get('/api/userID')
        .then(function(res){
            console.log("getUserID api :",res);
             home.getBucket(res.data); // get one
             home.BucketItem.buckets = "";
        })
        .catch(function(err){
            console.log("getUserID error :", err);
        });
            }).catch(function(err){
                console.log("addBucket error: ", err);
            });
    }
    
    // home.getBucket(); // get many
    
    $http.get('/api/userID')
        .then(function(res){
            console.log("getUserID api :",res);
             home.getBucket(res.data); // get one
        })
        .catch(function(err){
            console.log("getUserID error :", err);
        });
   
}