angular.module('App', ["ngRoute"])
    
    angular.module('App')
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
    .otherwise({
      redirectTo: "/"
    })
}