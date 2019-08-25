CRAdminApp.controller("PlantTradeTrackingController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();

    $scope.PlantList = [];
    $scope.TradeList = [];
    $scope.MainTradeTrackList = [];
    $scope.SearchTradeTrackList = [];
    $scope.TotalRecords = 0;
    $scope.TotalPages = 0
    $scope.Prefix = "";
    $scope.PageSize = 5;
    $scope.TradeTrackingModelStrenth = { Dstrength: 0, Pstrength: 0, Tradestrength:0 };

    function GetMasterDataList() {
        ShowLoader();
        $http({
            method: 'post',
            beforeSend: function (request) {
                request.setRequestHeader("Token", getToken());
            },
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
    //bind total strenth of plant
    $scope.BindTotalStrength = function () {

        if ($("#ddlplant").val() > 0) {
            $scope.strength = $scope.PlantList.filter(function (plant) {
                return (plant.PlantId == $("#ddlplant").val());
            });
            $("#ddlPstrenth").val($scope.strength[0].PlantStrenth);
        }
        var plantstrenth = 0;
        if ($("#ddlplant").val() > 0) {
            $scope.tstrength = $scope.MainTradeTrackList.filter(function (plant) {
                return (plant.PlantId == $("#ddlplant").val());
            });
            var deploysrenth = 0;
            for (i = 0; i < $scope.tstrength.length; i++) {
                deploysrenth = deploysrenth + $scope.tstrength[i].AuthorizedStrenth;
            }

            $("#ddlPDstrenth").val(deploysrenth);
        }
    }





    //

    $scope.AddNew = false;
    $scope.Details = true;
    $scope.Update = false;
    $scope.next = true;
    $scope.prev = true;


    $scope.TradeTrackingModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), Prefix: "", AuthorizedStrenth: "", AuthorizedBy: "", AuthorizedDate: "", PlantId: "", TradeId: "", TradDescription: "", PlantTitle: "", PlantTradeTrackingId: "", PlantStrenth: 0 };

    $scope.AddNewClick = function () {
        $scope.ErrorModel.PlantId = false;
        $scope.ErrorModel.TradeId = false;
        $scope.ErrorModel.AuthorizedStrenth = false;
        $scope.ErrorModel.AuthorizedDate = false;
        $scope.ErrorModel.AuthorizedBy = false;
        $scope.AddNew = true;
        $scope.Details = false;
        $scope.Update = false;

        $scope.TradeTrackingModel = { PageNo: 1, PageSize: 2, AuthorizedStrenth: "", AuthorizedBy: "", AuthorizedDate: "", PlantId: "", TradeId: "", TradDescription: "", PlantTitle: "", PlantTradeTrackingId: "" };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        //$("#ddlplant").val("---Select Plant---");
        $("#ddlPstrenth").val("");
        $("#ddlPDstrenth").val("");
        $("#ddlAstrenth").val("");
        $("#ddlAAuthority").val("");


        $scope.TradeTrackingModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), Prefix: "", AuthorizedStrenth: "", AuthorizedBy: "", AuthorizedDate: "", PlantId: "", TradeId: "", TradDescription: "", PlantTitle: "", PlantTradeTrackingId: "" };
    }

    $scope.PageSizeList = [5, 10, 15, 20];
    $scope.PlantTradeTrackingList = [];

    $scope.Save = function () {
       
            if ($scope.Validate()) {

                var objShowCustomAlert = new ShowCustomAlert({
                    Title: "Error",
                    Message: "Are You Want To Save This Record",
                    Type: "confirm",
                    OnOKClick: function () {
                        var pdstr = parseInt($("#ddlPDstrenth").val());
                        var astr = parseInt($scope.TradeTrackingModel.AuthorizedStrenth);
                        var srenth = parseInt(pdstr + astr);
                        var pstr = parseInt($("#ddlPstrenth").val());
                   
                        if (srenth <= pstr) {
                            $scope.TradeTrackingModel.TradeId = $("#ddltrade").val();
                            $scope.TradeTrackingModel.PlantId = $("#ddlplant").val();

                            $scope.TradeTrackingModel.AuthorizedDate = $("#ddlAdate").val();
                            ShowLoader();
                            $http({
                                method: 'post',
                                beforeSend: function (request) {
                                    request.setRequestHeader("Token", getToken());
                                },
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
                                GetMasterDataList()
                            }, function (error) {
                                HideLoader();
                                console.log(error);
                            });
                        }
                        else {
                            var objShowCustomAlert = new ShowCustomAlert({
                                Title: "Error",
                                Message: "Please Increase Plant Strength First",
                                Type: "alert"
                            });
                            objShowCustomAlert.ShowCustomAlertBox();
                        }
                    }
                });
                objShowCustomAlert.ShowCustomAlertBox();
            
            }
    
    }
    //
    $scope.Update1 = function () {
        if ($("#ddlAstrenth").val() == $("#ddlTradestrength").val()) {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "Error",
                Message: "You Enter Trade Strength Is Same please Change Trade Strength ",
                Type: "alert"
            });
            objShowCustomAlert.ShowCustomAlertBox();
        }
        else{
            if ($scope.Validate()) {
           
                var objShowCustomAlert = new ShowCustomAlert({
                    Title: "Error",
                    Message: "Are You Want To Save This Record",
                    Type: "confirm",
                    OnOKClick: function () {
                       
                        var pdstr = parseInt($("#ddlPDstrenth").val());
                        var runningstr = $("#ddlTradestrength").val();
                        pdstr = parseInt(pdstr - runningstr);
                        var astr = parseInt($scope.TradeTrackingModel.AuthorizedStrenth);
                        var srenth = parseInt(pdstr + astr);
                        var pstr = parseInt($("#ddlPstrenth").val());

                        if (srenth <= pstr) {
                            $scope.TradeTrackingModel.TradeId = $("#ddltrade").val();
                            $scope.TradeTrackingModel.PlantId = $("#ddlplant").val();

                            $scope.TradeTrackingModel.AuthorizedDate = $("#ddlAdate").val();
                            ShowLoader();
                            $http({
                                method: 'post',
                                beforeSend: function (request) {
                                    request.setRequestHeader("Token", getToken());
                                },
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
                                GetMasterDataList()
                            }, function (error) {
                                HideLoader();
                                console.log(error);
                            });
                        }
                        else {
                            var objShowCustomAlert = new ShowCustomAlert({
                                Title: "Error",
                                Message: "Please Increase Plant Strength First",
                                Type: "alert"
                            });
                            objShowCustomAlert.ShowCustomAlertBox();
                        }
                    }
                });
                objShowCustomAlert.ShowCustomAlertBox();
            }
    }
    }
    //
    var objdatehelper = new datehelper({ format: "dd/MM/yyyy", cdate: new Date() });
    $scope.Edit = function (TradeTracking) {
        $scope.Details = false;
        $scope.AddNew = true;
        $scope.Update = true;
        $scope.ErrorModel.AuthorizedStrenth = false;
        $scope.ErrorModel.AuthorizedBy = false;
        $scope.ErrorModel.AuthorizedDate = false;
        
        //$scope.TradeTrackingModel.PlantId = TradeTracking.PlantId
        //$scope.TradeTrackingModel.TradeId = TradeTracking.TradeId
        $("#ddlplant").val(TradeTracking.PlantId);
        $("#ddltrade").val(TradeTracking.TradeId);
        $("#ddlTradestrength").val(TradeTracking.AuthorizedStrenth);
        
        if ($("#ddlplant").val() > 0) {
            $scope.strength = $scope.PlantList.filter(function (plant) {
                return (plant.PlantId == $("#ddlplant").val());
            });
            $("#ddlPstrenth").val($scope.strength[0].PlantStrenth);
            
        }
        var plantstrenth = 0;
        if ($("#ddlplant").val() > 0) {
            $scope.tstrength = $scope.MainTradeTrackList.filter(function (plant) {
                return (plant.PlantId == $("#ddlplant").val());
            });
            var deploysrenth = 0;
            for (i = 0; i < $scope.tstrength.length; i++) {
                deploysrenth = deploysrenth + $scope.tstrength[i].AuthorizedStrenth;
            }

            $("#ddlPDstrenth").val(deploysrenth);
        }
        $("#ddlAdate").val(objdatehelper.getFormatteddate($filter('mydate')(TradeTracking.AuthorizedDate), "dd/mm/yyyy"));
        $scope.TradeTrackingModel = { PlantTradeTrackingId: TradeTracking.PlantTradeTrackingId, AuthorizedStrenth: TradeTracking.AuthorizedStrenth, AuthorizedBy: TradeTracking.AuthorizedBy, PlantId: TradeTracking.PlantId, TradeId: TradeTracking.TradeId };
     


    }
    //Edit
    
        $scope.GetTradeTrackingList=function () {
        $scope.TradeTrackingModel.PageSize = parseInt($scope.TradeTrackingModel.PageSize);
        var model = $scope.TradeTrackingModel;
        console.log(model);
        //= { PageNo: 1, PageSize: $("#ddlPageSize").val(), Prefix: ""};
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/PlantTradeTracking/GetTradeStrenth',
            data: model,
            //headers: getToken(),
            beforeSend: function (request) {
                request.setRequestHeader("Token", getToken());
            },
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
        if ($scope.TradeTrackingModel.PageNo == $scope.TotalPages) {
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

    $scope.ErrorModel = {
        PlantId: false, ErrorSelectPlantId: "", TradeId: false, ErrorSelectTradeId: "",
        AuthorizedStrenth: false, ErrorEnterStrenth: "", AuthorizedBy: false, ErrorEnterAuthority: "",
        AuthorizedDate: false, ErrorEnterDate: ""
    };
    $scope.Validate = function () {
        var valid = true;
        if ($("#ddlplant").val() <=0) {
            $scope.ErrorModel.PlantId = true;
            $scope.ErrorModel.ErrorSelectPlantId = "Please Select Plant.";
            valid = false;
        }
        else {
            $scope.ErrorModel.PlantId = false;
            valid = true;
        }
        if (valid) {
            if ($("#ddltrade").val() <= 0) {
                $scope.ErrorModel.TradeId = true;
                $scope.ErrorModel.ErrorSelectTradeId = "Please Select Trade.";
                valid = false;
            }
            else {
                $scope.ErrorModel.TradeId = false;
                valid = true;
            }
        }
        if (valid) {
            if ($scope.TradeTrackingModel.AuthorizedStrenth == "") {
                $scope.ErrorModel.AuthorizedStrenth = true;
                $scope.ErrorModel.ErrorEnterStrenth = "Please Enter Valid Strength.";
                valid = false;
            }
            else {
                $scope.ErrorModel.AuthorizedStrenth = false;
                valid = true;
            }
        }
       
        if(valid==true){
        if ($scope.TradeTrackingModel.AuthorizedBy == "") {
            $scope.ErrorModel.AuthorizedBy = true;
            $scope.ErrorModel.ErrorEnterAuthority = "Please Enter Authority Name.";
            valid = false;
        }
        else {
            
                $scope.ErrorModel.AuthorizedBy = false;
                valid = true;

            }
        }
        if (valid) {
            if ($("#ddlAdate").val() == "") {
                $scope.ErrorModel.AuthorizedDate = true;
                $scope.ErrorModel.ErrorEnterDate = "Please Enter Authorized Date.";
                valid = false;
            }
            else {
                $scope.ErrorModel.AuthorizedDate = false;

                valid = true;

            }
        }
       
        return valid;
    }


    $scope.init = function () {
        setCookie("Token", $('#hdnToken').val());
        checkToken();

        $scope.MainTradeTrackList.PageSize = $("#ddlPageSize").val();
         $scope.GetTradeTrackingList();
        GetMasterDataList();
       
    }

    $scope.init();
}]);
