angular.module('App', [])
    .controller('myCtr', myController);
    
    myController.$inject = ['$timeout']

    function myController($timeout) {
      console.log("myController works!")
      var main = this;
      main.newBucket = {};
      main.bucketList = JSON.parse(window.localStorage.getItem('bucketlist')) || [];
      window.main = main;
      main.addBucket = function() {
        console.log(main.newBucket.name);
        if(main.newBucket.name){

            main.bucketList.push(main.newBucket);

            // Give newBucket a new object
            main.newBucket = {};

            // Manually trigger the modal
            $('#myModal').modal('toggle');

            // Update localStorage

            var bucketlist = angular.copy(main.bucketList); // copy our list of spells

            // Strip $$hashKey for storage
             bucketlist.forEach(function(bucket){
                delete bucket.$$hashKey;
            });

            window.localStorage.setItem('bucketlist', JSON.stringify(bucketlist));
        } else {
            main.bucketFormErrMessage = 'Fill out the form completely!';
            $timeout(function() { 
                main.bucketFormErrMessage = '';
            }, 3000)
        }
      }

    }