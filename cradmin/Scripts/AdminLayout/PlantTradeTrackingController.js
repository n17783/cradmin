CRAdminApp.controller("PlantTradeTrackingController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();

    $scope.PlantList = [];
    $scope.TradeList = [];
    $scope.MainTradeTrackList = [];
    $scope.SearchTradeTrackList = [];
    $scope.TotalRecords = 0;
    $scope.TotalPages = 0
    $scope.Prefix="" ;

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
                //window.location = $scope.urlBase + "/PlantTradeTracking/index";
            }
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }
    //

    $scope.AddNew = false;
    $scope.Details = true;
    $scope.Update = false;
    $scope.next = true;
    $scope.prev = true;
   

    $scope.TradeTrackingModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), Prefix: "", AuthorizedStrenth: "", AuthorizedBy: "", AuthorizedDate: "", PlantId: "", TradeId: "", TradDescription: "", PlantTitle: "", PlantTradeTrackingId: "" };

    $scope.AddNewClick = function () {
        $scope.AddNew = true;
        $scope.Details = false;
        $scope.Update = false;
        $scope.TradeTrackingModel = null;
       // $scope.TradeTrackingModel = { PageNo: 1, PageSize: 2, AuthorizedStrenth: "", AuthorizedBy: "", AuthorizedDate: "", PlantId: "", TradeId: "", TradDescription: "", PlantTitle: "", PlantTradeTrackingId: "" };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.TradeTrackingModel = null;
        $scope.TradeTrackingModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), Prefix: "", AuthorizedStrenth: "", AuthorizedBy: "", AuthorizedDate: "", PlantId: "", TradeId: "", TradDescription: "", PlantTitle: "", PlantTradeTrackingId: "" };
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
    //Edit 

    //update
    $scope.Update = function () {
        $scope.TradeTrackingModel.TradeId = $("#ddltrade").val();
        $scope.TradeTrackingModel.PlantId = $("#ddlplant").val();
       
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
                    Message: "Record  Successfully",
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
    //update
     var objdatehelper = new datehelper({ format: "dd/MM/yyyy", cdate: new Date() });
    $scope.Edit = function (TradeTracking) {
        $scope.Details = false;
        $scope.AddNew = true;
        $scope.Update = true;
        $("#ddltrade").val(TradeTracking.TradeId)
        $("#ddlplant").val(TradeTracking.PlantId);
        $("#ddlAdate").val(objdatehelper.getFormatteddate($filter('mydate')(TradeTracking.AuthorizedDate), "dd/mm/yyyy"));
       
       
        $scope.TradeTrackingModel = { PlantTradeTrackingId:TradeTracking.PlantTradeTrackingId, AuthorizedStrenth: TradeTracking.AuthorizedStrenth, AuthorizedBy: TradeTracking.AuthorizedBy, PlantId: TradeTracking.PlantId, TradeId: TradeTracking.TradeId };


    }
    //Edit

    $scope.GetTradeTrackingList = function () {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/PlantTradeTracking/GetTradeStrenth',
            data: $scope.TradeTrackingModel,
        }).then(function (response) {
            HideLoader();
           
            $scope.MainTradeTrackList = response.data;
            if (response.data.length > 0) {
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
    $scope.Prev = function () {
        if ($scope.TradeTrackingModel.PageNo > 1) {
            $scope.TradeTrackingModel.PageNo--;
            $scope.GetTradeTrackingList();
        }
    }

    $scope.Next = function () {
        if ($scope.TradeTrackingModel.PageNo < $scope.TotalPages) {
            $scope.TradeTrackingModel.PageNo++;
            $scope.GetTradeTrackingList();
        }
        if ($scope.TradeTrackingModel.PageNo == $scope.TotalPages)
        {
            $scope.next = true;
            $scope.prev = true;
        }
    }


    
    $scope.FilterList = function () {
       
        $scope.GetTradeTrackingList();
        
        $scope.First();
    }
    $scope.Reset = function () {
        $scope.MainTradeTrackList = $scope.MainTradeTrackList;
        $scope.SearchTradeTrackList = $scope.MainTradeTrackList;
        $scope.First();
    }


    $scope.init = function () {
        
        checkToken();
        $("#ddlPageSize").val(5);
        $scope.MainTradeTrackList.PageSize = $("#ddlPageSize").val();
        GetMasterDataList();
        $scope.GetTradeTrackingList();
    }

    $scope.init();
}]);