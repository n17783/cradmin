CRAdminApp.controller("TradeController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();
    $scope.AddNew = false;
    $scope.Details = true;

    $scope.TotalRecords = 0;
    $scope.TotalPages = 0

    $scope.TradeTypModel = { PageNo: 1, PageSize: 2, TradDescription: "" };

    $scope.AddNewClick = function () {
        $scope.AddNew = true;
        $scope.Details = false;
        $scope.TradeTypModel = { PageNo: 1, PageSize: 2, TradDescription: "", TradeCId: "", CreatedBy: "", SanctionDate: "" };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.TradeTypModel = { PageNo: 1, PageSize: 2, TradDescription: "", TradeCId: "", CreatedBy: "", SanctionDate:"" };
    }

    $scope.PageSizeList = [5, 10, 15, 20];
    $scope.TradeTypeList = [];

    $scope.Save = function () {
        
        $scope.TradeTypModel.TradeCId = $("#ddlTradeC").val();
        $scope.TradeTypModel.CreatedBy = $("#ddlTCAuto").val();
        $scope.TradeTypModel.SanctionDate = $("#ddlTSDate").val();
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/Trade/Save',
            data: $scope.TradeTypModel,
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
            $scope.GetTradeTypeList();
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }

    $scope.TradeCategoryList = [];

    $scope.GetTradeTypeList = function () {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/Trade/GetTradeType',
            data: $scope.TradeTypModel,
        }).then(function (response) {
            HideLoader();
            $scope.TradeTypeList = response.data;
            if (response.data.length > 0) {
                $scope.TotalRecords = response.data[0].TotalRecords;
                $scope.TotalPages = parseInt($scope.TotalRecords / $scope.TradeTypModel.PageSize);
                var reminder = $scope.TotalRecords % $scope.TradeTypModel.PageSize;
                if (reminder > 0) {
                    $scope.TotalPages++;
                }
            }
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }

    $scope.GetTradeCategoryList = function () {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/Category/GetTrade',
            data: {},
        }).then(function (response) {
            HideLoader();
            $scope.TradeCategoryList = response.data;
            $scope.TradeCategoryList.splice(0, 0, { TradeCId: 0, TradCDescription: "---Select Trade Category---" });
            var html = "";
            angular.forEach($scope.TradeCategoryList, function (value, key) {
                html += "<option value='" + value.TradeCId + "'>" + value.TradCDescription + "</option>"
            });
            $("#ddlTradeC").html(html);
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }

    $scope.Prev = function () {
        if ($scope.TradeTypModel.PageNo > 1) {
            $scope.TradeTypModel.PageNo--;
            $scope.GetTradeTypeList();
        }
    }

    $scope.Next = function () {
        if ($scope.TradeTypModel.PageNo < $scope.TotalPages) {
            $scope.TradeTypModel.PageNo++;
            $scope.GetTradeTypeList();
        }
    }

    $scope.init = function () {
        checkToken();
        $("#ddlPageSize").val(5);
        $scope.TradeTypModel.PageSize = $("#ddlPageSize").val();
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.GetTradeTypeList();
        $scope.GetTradeCategoryList();
    }

    $scope.init();
}]);