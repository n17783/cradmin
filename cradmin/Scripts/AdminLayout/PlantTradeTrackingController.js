CRAdminApp.controller("PlantTradeTrackingController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();
   
    $scope.PlantList = [];
    $scope.TradeList = [];
    $scope.MainTradeTrackList = [];
    $scope.SearchTradeTrackList = [];

    function GetMasterDataList() {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/PlantTradeTracking/GetMasterDataforRegister',
            data: $scope.LoginModal,
        }).then(function (response) {
            HideLoader();
            if (response.data.Status == 1) {
             $scope.TradeList = response.data.TradeList;
                $scope.PlantList = response.data.PlantList;
               
                
                $scope.TradeList.splice(0, 0, { TradeId: 0, TradDescription: "---Select Trade---" });
                $scope.PlantList.splice(0, 0, { PlantId: 0, PlantTitle: "---Select Plant---" });
               
                var html = "";
                angular.forEach($scope.TradeList, function (value, key) {
                    html += "<option value='" + value.TradeId + "'>" + value.TradDescription + "</option>";
                });
                $("#ddltrade").html(html);
                var html1 = "";
                angular.forEach($scope.PlantList, function (value, key) {
                    html1 += "<option value='" + value.PlantId + "'>" + value.PlantTitle + "</option>";
                });
                $("#ddlplant").html(html1);

               
            }
            else {
                window.location = $scope.urlBase + "/PlantTradeTracking/index";
            }
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }
    //
   
    $scope.AddNew = false;
    $scope.Details = true;

    $scope.TotalRecords = 0;
    $scope.TotalPages = 0

    $scope.TradeTrackingModel = { PageNo: 1, PageSize: 2, AuthorizedStrenth: "", AuthorizedBy: "", AuthorizedDate: "", PlantId:"",TradeId:"" };

    $scope.AddNewClick = function () {
        $scope.AddNew = true;
        $scope.Details = false;
        $scope.TradeTrackingModel = { PageNo: 1, PageSize: 2, AuthorizedStrenth: "", AuthorizedBy: "", AuthorizedDate: "", PlantId: "", TradeId: "" };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.TradeTrackingModel = { PageNo: 1, PageSize: 2, AuthorizedStrenth: "", AuthorizedBy: "", AuthorizedDate: "", PlantId: "", TradeId: "" };
    }

    $scope.PageSizeList = [5, 10, 15, 20];
    $scope.PlantTradeTrackingList = [];

    $scope.Save = function () {
        $scope.TradeTrackingModel.TradeId = $("#ddltrade").val();
        $scope.TradeTrackingModel.PlantId = $("#ddlplant").val();
        $scope.TradeTrackingModel.AuthorizedStrenth = $("#ddlAstrenth").val();
        $scope.TradeTrackingModel.AuthorizedBy = $("#ddlAAuthority").val();
        $scope.TradeTrackingModel.AuthorizedDate = $("#ddlAdate").val();
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/PlantTradeTracking/Save',
            data: $scope.TradeTrackingModel,
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
            $scope.GetTradeTrackingList();
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }

    $scope.GetTradeTrackingList = function () {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/PlantTradeTracking/GetTradeStrenth',
            data: $scope.TradeTrackingModel,
        }).then(function (response) {
            HideLoader();
            $scope.PlantTradeTrackingList = response.data.PlantTradeTrackingList;
            $scope.MainTradeTrackList = response.data.PlantTradeTrackingList;
            if (response.data.PlantTradeTrackingList.length > 0) {
                $scope.TotalRecords = response.data[0].TotalRecords;
                $scope.TotalPages = parseInt($scope.TotalRecords / $scope.TradeTrackingModel.PageSize);
                var reminder = $scope.TotalRecords % $scope.TradeTrackingModel.PageSize;
                if (reminder > 0) {
                    $scope.TotalPages++;
                }
            }
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }
    //
    $scope.FilterList = function () {
        var reg = new RegExp($scope.Prefix.toLowerCase());
        $scope.MainTradeTrackList = $scope.PlantTradeTrackingList.filter(function (actype) {
            return (reg.test(actype.PlantTradeTrackingId.toLowerCase()));
        });
        $scope.First();
    }
    $scope.Reset = function () {
        $scope.MainTradeTrackList = $scope.PlantTradeTrackingList;
        $scope.SearchTradeTrackList = $scope.MainTradeTrackList;
        $scope.First();
    }


    $scope.init = function () {
        GetMasterDataList();
        $scope.GetTradeTrackingList();
    }

    $scope.init();
}]);