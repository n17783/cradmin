CRAdminApp.controller("ValidationTestQuetionController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();

    $scope.TradeCList = [];
    $scope.TradeList = [];
    $scope.TestList = [];
    $scope.MainQuetionList = [];
    $scope.SearchMainQuetionList = [];
    $scope.TotalRecords = 0;
    $scope.TotalPages = 0
    $scope.Prefix = "";
    $scope.PageSize = 5;
    $scope.TestQuetionModelStrenth = { Dstrength: 0, Pstrength: 0 };

    function GetMasterDataList() {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/ValidationTestQuetion/GetMasterDataforQuetions',
            data: $scope.TestQuetionModel,
        }).then(function (response) {
            HideLoader();
            if (response.data.Status == 1) {
                $scope.TradeList = response.data.TradeList;
                $scope.TradeCList = response.data.TradeCList
                $scope.TestList = response.data.TestList;


               
                $scope.TradeCList.splice(0, 0, { TradeCId: 0, TradCDescription: "---Select Trade Domain---" });
                $scope.TestList.splice(0, 0, { TestId: 0, TestDescription: "---Select Test---" });
                var html1 = "";
                angular.forEach($scope.TradeCList, function (value, key) {
                    html1 += "<option value='" + value.TradeCId + "'>" + value.TradCDescription + "</option>";
                });
                $("#ddlTradeC").html(html1);
                var html1 = "";
                angular.forEach($scope.TestList, function (value, key) {
                    html1 += "<option value='" + value.TestId + "'>" + value.TestDescription + "</option>";
                });
                $("#ddlTest").html(html1);


            }
            else {
                //window.location = $scope.urlBase + "/PlantQuetion/index";
            }
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }
    //bind total strenth of plant
    $scope.BindTradeList = function () {

        if ($("#ddlTradeC").val() > 0) {
            $scope.tradeList = $scope.TradeList.filter(function (Trade) {
                return (Trade.TradeCId == $("#ddlTradeC").val());
            });
            $scope.tradeList.splice(0, 0, { TradeId: 0, TradDescription: "---Select Trade---" });
            var html6 = "";
            angular.forEach($scope.tradeList, function (value, key) {
                html6 += "<option value='" + value.TradeId + "'>" + value.TradDescription + "</option>";
            });
            $("#ddlTrade").html(html6);
        }
        
    }
        





    //

    $scope.AddNew = false;
    $scope.Details = true;
    $scope.Update = false;
    $scope.next = true;
    $scope.prev = true;


    $scope.TestQuetionModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), Prefix: "", TestQuetionCatagoryId: "", TestId: "", TestQCategory: "", TestDescription: "", TradeId: "", TestQDescription: "" };

    $scope.AddNewClick = function () {
        $scope.AddNew = true;
        $scope.Details = false;
        $scope.Update = false;

        $scope.TestQuetionModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), Prefix: "", TestQuetionCatagoryId: "", TestId: "", TestQCategory: "", TestDescription: "", TradeId: "", TestQDescription: "" };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $("#ddlplant").val("");
        $("#ddlPstrenth").val("");
        $("#ddlPDstrenth").val("");
        $("#ddlAstrenth").val("");
        $("#ddlAAuthority").val("");


        $scope.TestQuetionModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), Prefix: "", TestQuetionCatagoryId: "", TestId: "", TestQCategory: "", TestDescription: "", TradeId: "", TestQDescription: "" };
    }

    $scope.PageSizeList = [5, 10, 15, 20];
    $scope.PlantQuetionList = [];

    $scope.Save = function () {
        if ($scope.Validate()) {

            $scope.TestQuetionModel.TradeId = $("#ddlTrade").val();
            $scope.TestQuetionModel.TestId = $("#ddlTest").val();
            $scope.TestQuetionModel.TestQCategory = $("#ddlQCategory").val();

            ShowLoader();
            $http({
                method: 'post',
                url: $scope.urlBase + '/ValidationTestQuetion/Save',
                data: $scope.TestQuetionModel,
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
                $scope.GetQuetionList();
                GetMasterDataList()
            }, function (error) {
                HideLoader();
                console.log(error);
            });
        }

    }

        //Edit 

        //update
    $scope.Update1 = function () {
        if ($scope.Validate()) {
            ShowLoader();
            $http({
                method: 'post',
                url: $scope.urlBase + '/ValidationTestQuetion/Save',
                data: $scope.TestQuetionModel,
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
                $scope.GetQuetionList();
                GetMasterDataList()
            }, function (error) {
                HideLoader();
                console.log(error);
            });
        }

    }

    
    //update

    $scope.Edit = function (Quetion1) {
        $scope.Details = false;
        $scope.AddNew = true;
        $scope.Update = true;
        $scope.TestQuetionModel = { TestQuetionCatagoryId: Quetion1.TestQuetionCatagoryId, TestId: Quetion1.TestId, TestQCategory: Quetion1.TestQCategory, TestDescription: Quetion1.TestDescription, TradeId: Quetion1.TradeId, TestQDescription: Quetion1.TestQDescription};
    }
    //Edit

    $scope.GetQuetionList = function () {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/ValidationTestQuetion/GetQuetion',
            data: $scope.TestQuetionModel,
        }).then(function (response) {
            HideLoader();

            $scope.MainQuetionList = response.data;
            if (response.data.length > 0) {
                $scope.TotalRecords = response.data[0].TotalRecords;
                $scope.TotalPages = parseInt($scope.TotalRecords / $scope.TestQuetionModel.PageSize);
                var reminder = $scope.TotalRecords % $scope.TestQuetionModel.PageSize;
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
        if ($scope.TestQuetionModel.PageNo > 1) {
            $scope.TestQuetionModel.PageNo--;
            $scope.GetQuetionList();
        }
    }

    $scope.Next = function () {
        if ($scope.TestQuetionModel.PageNo < $scope.TotalPages) {
            $scope.TestQuetionModel.PageNo++;
            $scope.GetQuetionList();
        }
        if ($scope.TestQuetionModel.PageNo == $scope.TotalPages) {
            $scope.next = true;
            $scope.prev = true;
        }
    }



    $scope.FilterList = function () {

        $scope.GetQuetionList();

        $scope.First();
    }
    $scope.Reset = function () {
        $scope.MainQuetionList = $scope.MainQuetionList;
        $scope.SearchMainQuetionList = $scope.MainQuetionList;
        $scope.First();
    }

    $scope.ErrorModel = {
        PlantId: false, ErrorSelectPlant: "", TradeId: false, ErrorSelectTrade: "",
        AuthorizedStrenth: false, ErrorEnterStrenth: "", AuthorizedBy: false, ErrorEnterAuthority: "",
        AuthorizedDate: false, ErrorEnterDate: ""
    };
    $scope.Validate = function () {
        var valid = true;

        if ($scope.TestQuetionModel.AuthorizedStrenth == "") {
            $scope.ErrorModel.AuthorizedStrenth = true;
            $scope.ErrorModel.ErrorEnterStrenth = "Please Enter Valid Strength.";
            valid = false;
        }
        else {

            valid = true;
        }
        if ($scope.TestQuetionModel.AuthorizedBy == "") {
            $scope.ErrorModel.AuthorizedBy = true;
            $scope.ErrorModel.ErrorEnterAuthority = "Please Enter Authority Name.";
            valid = false;
        }
        else {

            valid = true;
        }
        if ($scope.TestQuetionModel.AuthorizedDate == "") {
            $scope.ErrorModel.AuthorizedDate = true;
            $scope.ErrorModel.ErrorEnterDate = "Please Enter Authorized Date.";
            valid = false;
        }
        else {

            valid = true;
        }
        return valid;
    }


    $scope.init = function () {

        checkToken();

        $scope.MainQuetionList.PageSize = $("#ddlPageSize").val();
        GetMasterDataList();
        $scope.GetQuetionList();
    }

    $scope.init();
}]);