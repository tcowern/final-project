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
            return $http.post('/register', userData);
        },

        addTask : function(taskItem) {
            return $http.post('/api/task', taskItem);
        },

        getTask : function(bucketid){
            console.log("Hit the getTask in factory", bucketid);
            // bucketid = bucketid ? '/' + bucketid : ''
            return $http.get('/api/task/' + bucketid)
        },

        dateBucket : function(dateItem, dateDate) {
            // dateItem = dateItem ? '/' + dateItem : ''
            var data = {
                bucketid: dateItem,
                bucketdate: "01/01/2018"
            };
            return $http.put('/api/bucketedit/', data);
        }

    }
}