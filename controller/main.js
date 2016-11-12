angular.module("App")
    .config(Router);

Router.$inject=["$routeProvider"];

function Router($routeProvider) {
    $routeProvider

    .when('/', {
      templateUrl: "/view/home.html"
    })
    .when('/resources', {
      templateUrl: "/view/resources.html"
    })
    .when('/start', {
      templateUrl: "/view/start.html"
    })
    .when('/viewbucketlist', {
      templateUrl: "/view/viewbucketlist.html"
    })
    .when('/datebucketlist', {
      templateUrl: "/view/datebucketlist.html"
    })
    .when('/addtasks', {
      templateUrl: "/view/addtasks.html"
    })
    .when('/yourbucketlist', {
      templateUrl: "/view/yourbucketlist.html"
    })
    .otherwise({
      redirectTo: "/"
    })
}