CRAdminApp.controller("CategoryController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();
    $scope.AddNew = false;
    $scope.Details = true;

    $scope.TotalRecords = 0;
    $scope.TotalPages = 0

    $scope.TradeModal = { PageNo: 1, PageSize: 2, TradCDescription: "" };

    $scope.AddNewClick = function () {
        $scope.ErrorModel.TradCDescription = false;
        $scope.AddNew = true;
        $scope.Details = false;
        $scope.TradeModal = { PageNo: 1, PageSize: 2, TradCDescription: "" };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.TradeModal = { PageNo: 1, PageSize: 2, TradCDescription: "" };
    }

    $scope.TradeList = [];

    $scope.Save = function () {
        valid = true;
        if ($scope.Validate()) {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "Error",
                Message: "Are You Want To Save This Record",
                Type: "confirm",
                OnOKClick: function () {
        ShowLoader();
        $http({
            method: 'post',
            beforeSend: function (request) {
                request.setRequestHeader("Token", getToken());},
            url: $scope.urlBase + '/Category/Save',
            data: $scope.TradeModal,
        }).then(function (response) {
            HideLoader();
            if (response.data.Status == 0) {
                var objShowCustomAlert = new ShowCustomAlert({
                    Title: "Error",
                    Message: "This Record Is All Ready Exist",
                    Type: "alert"
                });
                objShowCustomAlert.ShowCustomAlertBox();
            }
            else {
                var objShowCustomAlert = new ShowCustomAlert({
                    Title: "Success",
                    Message: "Record Seved Successfully",
                    Type: "alert"
                });
                objShowCustomAlert.ShowCustomAlertBox();
            }
            $scope.CancelClick();
            $scope.GetTradeDetails();
        }, function (error) {
            HideLoader();
            console.log(error);
        });
                }
            });
            objShowCustomAlert.ShowCustomAlertBox();

        }
    }

    $scope.GetTradeDetails = function () {
        ShowLoader();
        $http({
            method: 'post',
            beforeSend: function (request) {
                request.setRequestHeader("Token", getToken());},
            url: $scope.urlBase + '/Category/GetTrade',
            data: $scope.TradeModal,
        }).then(function (response) {
            HideLoader();
            $scope.TradeList = response.data;
            if (response.data.length > 0) {
                $scope.TotalRecords = response.data[0].TotalRecords;
                $scope.TotalPages = parseInt($scope.TotalRecords / $scope.TradeModal.PageSize);
                var reminder = $scope.TotalRecords % $scope.TradeModal.PageSize;
                if (reminder > 0) {
                    $scope.TotalPages++;
                }
            }
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }

    $scope.Prev = function () {
        if ($scope.TradeModal.PageNo > 1) {
            $scope.TradeModal.PageNo--;
            $scope.GetTradeDetails();
        }
    }

    $scope.Next = function () {
        if ($scope.TradeModal.PageNo < $scope.TotalPages) {
            $scope.TradeModal.PageNo++;
            $scope.GetTradeDetails();
        }
    }
    $scope.Validate = function () {
        var valid = true;


        if ($scope.TradeModal.TradCDescription == "") {
            $scope.ErrorModel.TradCDescription = true;
            $scope.ErrorModel.ErrorSelectTradCDescription = "Please Enter Trade Catagory Domain Name.";
            valid = false;
        }
        else {
            $scope.ErrorModel.TradCDescription = false;


            valid = true;
        }
        return valid;
    }
    $scope.ErrorModel = {
        TradCDescription: false, ErrorSelectTradCDescription: ""
    };
    $scope.init = function () {
        setCookie("Token", $('#hdnToken').val());
        checkToken();
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.GetTradeDetails();

    }

    $scope.init();
}]);