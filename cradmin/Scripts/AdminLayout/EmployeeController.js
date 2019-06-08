CRAdminApp.controller("EmployeeController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {
    
    $scope.ZoneList = [];
    $scope.TradeList = [];
    $scope.ValidationAgencyList = [];
    $scope.EmployeeTypeList = [];
    $scope.ContractorList = [];
    
    $scope.GetMasterDataList = function ()
    {

    }

    $scope.init = function () {
        $scope.GetMasterDataList();
    }

    $scope.init();
}]);