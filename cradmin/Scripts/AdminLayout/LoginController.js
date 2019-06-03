CRAdminApp.factory('UserService', ['$http', function ($http) {
    var urlBase = GetVirtualDirectory();
    var ReportService = {};
    ReportService.VarifyAndLogin = function (model) {
        return $http.post(urlBase + "/account/Login", model);
    };

    return ReportService;
}]);

CRAdminApp.controller("LoginController", ['$scope', '$http', '$filter', '$rootScope', 'UserService', function ($scope, $http, $filter, $rootScope,UserService) {

    $scope.LoginModal = { Email: "", Password: "" };
    $scope.urlBase = GetVirtualDirectory();
    $scope.LoginUser = function () {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/account/login',
            data:$scope.LoginModal,
        }).then(function (response) {
            HideLoader();
            if (response.data.Authorised==0) {
                var objShowCustomAlert = new ShowCustomAlert({
                    Title: "Unauthorised",
                    Message: response.data.ErrorMessage,
                    Type: "alert"
                });
                objShowCustomAlert.ShowCustomAlertBox();
            }
            else {
                window.location = $scope.urlBase + "/dashboard/index";
            }
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }

    $scope.init = function () {

    }

    $scope.init();
}]);