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

        getAllTasks : function(){
            console.log("Hit the getAllTasks in factory");
            // bucketid = bucketid ? '/' + bucketid : ''
            return $http.get('/api/task/')
        },

        dateBucket : function(dateItem, dateDate) {
            // dateItem = dateItem ? '/' + dateItem : ''
            var data = {
                bucketid: dateItem,
                bucketdate: dateDate
            };
            return $http.put('/api/bucketedit/', data);
        },
        
        compBucket : function(bucketId, bucketComp) {
            // dateItem = dateItem ? '/' + dateItem : ''
            var data = {
                bucketid: bucketId,
                bucketcomp: bucketComp
            };
            return $http.put('/api/bucketcomp/', data);
        },
        
        compTask : function(taskId, taskComp) {
            // dateItem = dateItem ? '/' + dateItem : ''
            var data = {
                taskid: taskId,
                taskcomp: taskComp
            };
            return $http.put('/api/taskcomp/', data);
        }, 
        
        groupBucket : function(bucketId, topGroup) {
            // dateItem = dateItem ? '/' + dateItem : ''
            var data = {
                bucketid: bucketId,
                topgroup: topGroup
            };
            return $http.put('/api/bucketgroup/', data);
        },

    }
}