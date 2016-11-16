angular.module('Buckets')
    .factory('bucketFactory', bucketFactory);

 

bucketFactory.$inject = ['$http'];

function bucketFactory ($http) {


    return {

        // createBucket : function(bucketData){
        //     return $http.post('/register', bucketData)
        // },

        getBucket : function(bucketID){
            console.log("Hit the getBucket in factory");
            bucketID = bucketID ? '/' + bucketID : ''
            return $http.get('/api/buckets' + bucketID)
        },

        addBucket : function(bucketItem) {
            return $http.post('/api/buckets', bucketItem);
        },

        createUser : function(userData){
            return $http.post('/register', userData)
        },

    }
}