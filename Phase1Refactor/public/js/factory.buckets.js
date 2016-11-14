angular.module('Buckets')
    .factory('bucketFactory', bucketFactory);

bucketFactory.$inject = ['$http'];

function bucketFactory ($http) {

    return {

        createBucket : function(bucketData){
            return $http.post('/api/buckets', bucketData)
        },

        getBucket : function(bucketID){
            bucketID = bucketID ? '/' + bucketID : ''
            return $http.get('/api/buckets' + bucketID)
        }

    }
}