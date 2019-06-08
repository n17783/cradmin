CRAdminApp.controller("RegisterController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();

    $scope.AddNew = false;
    $scope.Details = true;

    $scope.TotalRecords = 0;
    $scope.TotalPages = 0


    $scope.GetMasterDataforRegister=function(){
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/Dashboard/GetMasterDataforRegister',
            data: $scope.TradeModal,
        }).then(function (response) {
            HideLoader();
            
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }

    $scope.init = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.GetMasterDataforRegister();
    }

    $scope.init();
}]);