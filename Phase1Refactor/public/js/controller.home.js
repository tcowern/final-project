angular.module('Buckets')
    .controller('homeController', homeController);

homeController.$inject = ['bucketFactory'];

function homeController (bucketFactory){
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
        bucketFactory.getBucket(bucketID)
            .then(function(returnData){
                if(returnData.data.length){
                    // if array (has length), store in bucketList
                    home.bucketList = returnData.data;
                }
                else{
                    // if not, store in bucket
                    home.bucket = returnData.data;
                }
            })
    }

    home.addBucket = function() {
        console.log(home.BucketItem);
        bucketFactory.addBucket(home.BucketItem)
            .then(function(returnData){
                console.log("addBucket response from server: ", returnData);
            }).catch(function(err){
                console.log("addBucket error: ", err);
            });
    }
    
    //home.getBucket(); // get many
    // home.getHero("581a2941fba8172b747af12f"); // get one
}