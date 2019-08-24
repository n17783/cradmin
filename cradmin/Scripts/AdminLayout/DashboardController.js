CRAdminApp.controller("RegisterController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();

    $scope.AddNew = false;
    $scope.Details = true;
    $scope.EmployeeModal = { PageNo: 1, PageSize: 2 ,AdhaarNo:""};
    $scope.TotalRecords = 0;
    $scope.TotalPages = 0


    $scope.GetMasterDataforRegister=function(){
        ShowLoader();
        $http({
            method: 'post',
            beforeSend: function (request) {
                request.setRequestHeader("Token", getToken());},
            url: $scope.urlBase + '/Dashboard/GetMasterDataforRegister',
            data: $scope.EmployeeModal,
        }).then(function (response) {
            HideLoader();
            
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }

    

    $scope.init = function () {
        setCookie("Token", $('#hdnToken').val());
        checkToken();
        $scope.AddNew = true;
        $scope.Details = true;
        $scope.GetMasterDataforRegister();
    }

    $scope.init();
}]);



