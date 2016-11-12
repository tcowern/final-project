var myApp = angular.module('App', ["xeditable", "ngRoute", "ui.bootstrap"])
    .controller('myCtr', myController);


myController.$inject = ['$timeout']

function myController($timeout) {
    console.log("myController works!")
    var main = this;
    var localList = [];
    main.newBucket = {};
    main.bucketList = JSON.parse(window.localStorage.getItem('bucketlist')) || [];
    window.main = main;
    main.addBucket = function() {

        console.log(main.newBucket.name);
        main.newBucket.date = "01/01/2017";
        main.newBucket.task = [];
        if (main.newBucket.name && main.newBucket.date) {

            main.bucketList.push(main.newBucket);

            // Give newBucket a new object
            main.newBucket = {};

            // Manually trigger the modal
            $('#myModal').modal('toggle');

            // Update localStorage

            var bucketlist = angular.copy(main.bucketList); // copy our list of spells


            // Strip $$hashKey for storage
            bucketlist.forEach(function(bucket) {
                delete bucket.$$hashKey;
            });

            window.localStorage.setItem('bucketlist', JSON.stringify(bucketlist));

        } else {
            main.bucketFormErrMessage = 'Please make sure both the "Bucket List" and Date field are filled out!';
            $timeout(function() {
                main.bucketFormErrMessage = '';
            }, 3000)

        }


    }

    main.Prioritize = function($index) {
        // console.log("ng-click works!");

        console.log($index);

        if ($index === 0) {

        } else {

            // copy the Bucket List
            var bucketlist = angular.copy(main.bucketList);

            // switch the values of the clicked item and the one above it
            var myIndex = "";
            myIndex = bucketlist[$index + 1];
            console.log(myIndex);
            var oldName = bucketlist[$index].name;
            var newName = bucketlist[$index - 1].name;
            var oldDate = bucketlist[$index].date;
            var newDate = bucketlist[$index - 1].date;
            var oldTask = bucketlist[$index].task;
            var newTask = bucketlist[$index - 1].task;
            bucketlist[$index - 1].name = oldName;
            bucketlist[$index].name = newName;
            bucketlist[$index - 1].date = oldDate;
            bucketlist[$index].date = newDate;
            bucketlist[$index - 1].task = oldTask;
            bucketlist[$index].task = newTask;

            // Strip $$hashKey for storage
            bucketlist.forEach(function(bucket) {
                delete bucket.$$hashKey;
            });

            // update main Bucket List to display new list order
            main.bucketList = angular.copy(bucketlist);

            // Update localStorage
            window.localStorage.setItem('bucketlist', JSON.stringify(bucketlist));

        }
    }

    main.updateDate = function($index, date) {
        // console.log("Index is " + $index + ", " + "Date is " + date)
        // copy the Bucket List
        var bucketlist = angular.copy(main.bucketList);

        // update the date value in the copy of bucketlist
        bucketlist[$index].date = date;

        // Update localStorage
        window.localStorage.setItem('bucketlist', JSON.stringify(bucketlist));

    }

    main.startClock = function() {
        var clock = $('.clock').FlipClock({
            clockFace: 'MinuteCounter',
            autoStart: false,
            callbacks: {
                stop: function() {
                    $('#congratsModal').modal(true);
                }
            }
        });

        clock.setTime(100);
        clock.setCountdown(true);
        clock.start();
    }

    main.selectBucket = function($index) {
        // console.log("Dropdown works!")
        // document.getElementById("nobucket").style.visibility="hidden";
        // copy the Bucket List
        var bucketlist = angular.copy(main.bucketList);
        main.addTaskErrMessage = '';

        // var myIndex = "";

        var myName = bucketlist[$index].name;
        var myIndex = $index + 1;

        document.getElementById("dLabel").innerHTML = myName;

        myItemCombo = "Item: " + myIndex + " - " + myName;

        document.getElementsByName("myBucketHeading")[0].innerHTML = (myName);
        document.getElementsByName("index")[0].innerHTML = (myIndex);
        document.getElementsByName("search")[0].value = myName;

        // main.addTask($index);

    }

    // main.getIndex = function() {
    //     var myName = document.getElementsByName("search")[0].value;
    //     var bucketlist = angular.copy(main.bucketList);
    //     for (var i = 0; i < bucketlist.length; i++) {
    //         if (myName === bucketlist[i].name) {
    //             console.log(bucketlist[i].name);
    //             var myIndex = bucketlist[i].$index;
    //             document.getElementsByName("index")[0].innerHTML = (myIndex);
    //             console.log(myIndex);
    //         }
    //     }
    //     console.log(myName);
    // }


    main.addTask = function() {
        // console.log("clicked")
        main.addTaskErrMessage = '';
  
        var myIndex = document.getElementsByName("index")[0].innerHTML;
        // var myName = document.getElementsByName("name")[0].innerHTML;
        // console.log(myName);
        myIndex--;
        // console.log(myIndex);
        var myTask = document.getElementById("task").value;
        console.log(myTask);
        if (myTask === "") {
            console.log("No Task!");
            // document.getElementById("err1").className("ng-show");
            main.addTaskErrMessage = 'Please add a task before clicking Submit!';
            
        } else {
            console.log(myTask);
            var bucketlist = angular.copy(main.bucketList);
            console.log(bucketlist[myIndex].name);
            // var myString= "BL one, Item Three"
            // var myString = bucketlist.task
            // console.log(myTask);
            bucketlist[myIndex].task.push(myTask);
            console.log(bucketlist[myIndex].task);

            // Strip $$hashKey for storage
            bucketlist.forEach(function(bucket) {
                delete bucket.$$hashKey;
            });

            window.localStorage.setItem('bucketlist', JSON.stringify(bucketlist));

            // update main Bucket List to display new list order
            main.bucketList = angular.copy(bucketlist);
            document.getElementById("task").value = "";

        }
    }

    main.choiceEmpty = function() {
        // console.log("onChange worked")
        main.addTaskErrMessage = '';
        var myCheck = document.getElementById('dLabel').innerText;
        var checkStr = "Select Your Bucket List Item here";
        // console.log(checkStr);
        // console.log(myCheck);
        if(myCheck === checkStr) {
            console.log("equals")
            document.getElementById("nobucket").style.display="none";
            main.addTaskErrMessage = 'Please add a task before clicking Submit2!';
        // console.log("clicked")


        }
        
    }


}


myApp.run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});