//var Site = angular.module('Site', []);
var Site = angular.module('Site', ['restangular'])
  .config(function (RestangularProvider) {
      RestangularProvider.setBaseUrl("http://localhost:57422/api");
  });

//angular.module('Site').controller('RouteController', function ($scope, Restangular) {
  //  $scope.WebApiUrl = Restangular.all('users').getList();
//});
Site.config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/pages/my-account/', { templateUrl: 'pages/personal-information-show.html', controller: 'RouteController' })
        .when('/pages/my-account/edit-user:slug', { templateUrl: 'pages/personal-information-edit.html', controller: 'RouteController' })
        .when('/pages/:slug', { templateUrl: 'pages/page.html', controller: 'RouteController' })
        .otherwise({ redirectTo: '/pages/my-account/' });	
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});


function AppController ($scope, $rootScope, $http) {
  // Load pages on startup
    $http.get('json/main-menu.json').success(function (data) {
        console.log(data.topMenu[0].subMenu);
        $scope.menuList = data.topMenu;
        $scope.subMenuList = data.topMenu[0].subMenu;
    });

  // Set the slug for menu active class
    $scope.$on('routeLoaded', function (event, args) {
        //console.log(args);
        $scope.slug = args.slug;
    });
    $scope.showSubMenu = function (item, pos) {
        //console.log(item);
        // Move submenu based on position of parent
        $scope.subLeft = { 'padding-left': (80 * pos) + 'px' };
        // Set activeItem and sublinks to the currectly
        // selected item.
        $scope.activeItem = item;
        $scope.subMenuList = item.subMenu;
    };
}

function RouteController($scope, $rootScope, $routeParams, $http, $location) {
    // Getting the slug from $routeParams
    //alert('ta');
    //console.log($routeParams);
    var slug = $routeParams.slug;
    //alert(slug);
    $scope.$emit('routeLoaded', { slug: slug });
    //$scope.page = $rootScope.pages[slug];

    $scope.save = function ($scope) {
        //$http.get('json/horz-menu.json').success(function (data) {
        //alert('dumeo');
        //});
        $scope.UserName = "prakash pathak";
        $location.hash('/dfhjhsdf');
    };
    $scope.cancel = function (hash) {
        $location.hash(hash);
    };
}


function LoadPersonalInfo($scope, $location, $route, $http, Restangular) {
	delete $http.defaults.headers.common['X-Requested-With'];	
	 //$http.get('http://localhost:57422/api/users/1').success(function (data) {        
    //});
	$scope.WebApiUrl = Restangular.all('users/1').getList();
    $scope.UserName = "prakash";
    $scope.UserDateOfBirth = "1987/10/20";
    $scope.UserEmail = "Pr.akash@yahoo.com";
    $scope.UserAddress = "Dwarka";
    $scope.UserCity = "Delhi";
    $scope.UserCountry = "India";
    $scope.UserZip = "110045";
    $scope.save = function () {
        $scope.UserName = "Prakash pathak";
        //$location.path('/');
    };
}
function SavePersonalInfo($scope) {
    //$scope.UserName = "prakash pathak";
    //$location.hash('/dfhjhsdf');
}



function MyCtrl($scope) {

}