angular.module('Buckets')
    .factory('bucketFactory', bucketFactory);

bucketFactory.$inject = ['$http'];

function bucketFactory ($http) {

    return {

        createBucket : function(bucketData){
            return $http.post('/register', bucketData)
        },

        getBucket : function(bucketID){
            bucketID = bucketID ? '/' + bucketID : ''
            return $http.get('/api/buckets' + bucketID)
        },

        addBucket : function(bucketItem) {
            return $http.put('/api/buckets', bucketItem);
        }

    }
}