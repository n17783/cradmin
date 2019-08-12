CRAdminApp.controller("PlantController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();
    $scope.AddNew = false;
    $scope.Details = true;

    $scope.TotalRecords = 0;
    $scope.TotalPages = 0
    $scope.AddNew = false;
    $scope.Details = true;
    $scope.Update = false;
    $scope.next = true;
    $scope.prev = true;
    $scope.PlantModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), PlantId: "", PlantTitle: "", PlantDescription: "", PlantIncharge: "", PlantStrenth: 0, PlantPhoneNo1: "" };

    $scope.AddNewClick = function () {
        $scope.AddNew = true;
        $scope.Details = false;
        $scope.Update = false;
        $scope.PlantModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), PlantId: "", PlantTitle: "", PlantDescription: "", PlantIncharge: "", PlantStrenth: 0, PlantPhoneNo1: "" };
    }
    $scope.Edit = function (PlantType) {
        $scope.Details = false;
        $scope.AddNew = true;
        $scope.Update = true;
        valid = true;
        $scope.ErrorModel.PlantTitle = false;
        $scope.ErrorModel.PlantDescription = false;
        $scope.ErrorModel.PlantIncharge = false;
        $scope.ErrorModel.PlantStrenth = false;
        $scope.ErrorModel.PlantPhoneNo1 = false;
        $("#ddlplant").val(PlantType.PlantTitle);
        $scope.PlantModel = { PlantId: PlantType.PlantId, PlantTitle: PlantType.PlantTitle, PlantDescription: PlantType.PlantDescription, PlantIncharge: PlantType.PlantIncharge, PlantStrenth: PlantType.PlantStrenth, PlantPhoneNo1: PlantType.PlantPhoneNo1 };
    }
    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.PlantModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), PlantId: "", PlantTitle: "", PlantDescription: "", PlantIncharge: "", PlantStrenth: 0, PlantPhoneNo1: "" };
    }

    $scope.PageSizeList = [5, 10, 15, 20];
    $scope.PlantList = [];

    $scope.Save = function () {
        if ($scope.Validate()) {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "Error",
                Message: "Are You Want To Save This Record",
                Type: "confirm",
                OnOKClick: function () {
                    ShowLoader();
                    $http({
                        method: 'post',
                        url: $scope.urlBase + '/Plant/Save',
                        data: $scope.PlantModel,
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
                        $scope.GetPlantList();
                    }, function (error) {
                        HideLoader();
                        console.log(error);
                    });

                }
            });
            objShowCustomAlert.ShowCustomAlertBox();
        }
    }
    //edit
    $scope.EditPlantType = function () {
        if ($scope.Validate()) {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "Error",
                Message: "Are You Want To Save This Record",
                Type: "confirm",
                OnOKClick: function () {
                    ShowLoader();
                    $http({
                        method: 'post',
                        url: $scope.urlBase + '/Plant/Save',
                        data: $scope.PlantModel,
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
                        $scope.GetPlantList();
                    }, function (error) {
                        HideLoader();
                        console.log(error);
                    });
                }
            });
            objShowCustomAlert.ShowCustomAlertBox();

        }
    }

    //edit
    $scope.PlantList = [];

    $scope.GetPlantList = function () {

        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/Plant/GetPlantList',
            data: $scope.PlantModel,
        }).then(function (response) {
            HideLoader();
            $scope.PlantList = response.data;
            if (response.data.length > 0) {
                $scope.TotalRecords = response.data[0].TotalRecords;
                $scope.TotalPages = parseInt($scope.TotalRecords / $scope.PlantModel.PageSize);
                var reminder = $scope.TotalRecords % $scope.PlantModel.PageSize;
                if (reminder > 0) {
                    $scope.TotalPages++;
                }
            }
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }



    $scope.Prev = function (PageNo) {
        if ($scope.PlantModel.PageNo > 1) {
            $scope.PlantModel.PageNo--;
            $scope.GetPlantList();
        }
    }

    $scope.Next = function (PageNo) {
        if ($scope.PlantModel.PageNo < $scope.TotalPages) {
            $scope.PlantModel.PageNo++;
            $scope.GetPlantList();
        }
    }
    $scope.Validate = function () {
        var valid = true;


        if ($scope.PlantModel.PlantTitle == "") {
            $scope.ErrorModel.PlantTitle = true;
            $scope.ErrorModel.ErrorSelectPlantTitle = "Please Enter Plant Name.";
            valid = false;
        }
        else {
            $scope.ErrorModel.PlantTitle = false;


            valid = true;
        }



        if ($scope.PlantModel.PlantDescription == "") {
            $scope.ErrorModel.PlantDescription = true;
            $scope.ErrorModel.ErrorSelectPlantDescription = "Please Enter Plant Description .";
            valid = false;
        }
        else {
            $scope.ErrorModel.PlantDescription = false;

            valid = true;
        }
        if ($scope.PlantModel.PlantIncharge == "") {
            $scope.ErrorModel.PlantIncharge = true;
            $scope.ErrorModel.ErrorSelectPlantIncharge = "Please Enter Incharge Name.";
            valid = false;
        }
        else {
            if (valid == false) {
                valid = false;
                $scope.ErrorModel.PlantIncharge = true;
            }
            else {
                $scope.ErrorModel.PlantIncharge = false;
                valid = true;
            }
        }

       
       
        return valid;
    }

    $scope.ErrorModel = {
        DeptZoneDescription: false, ErrorSelectDeptZone: "", DeptZoneAddress: false, ErrorSelectDeptZoneDeptZoneAddress: "", ContactNo: false, ErrorSelectDeptZoneContactNo: "",
        ContactNo2: false, ErrorSelectDeptZoneContactNo2: "", EmailId: false, ErrorSelectDeptZoneEmail: "",
        CreatedBy: false, ErrorSelectCreated: ""
    };
    $scope.init = function () {
        checkToken();
        $("#ddlPageSize").val(5);
        $scope.PlantModel.PageSize = $("#ddlPageSize").val();
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.GetPlantList();

    }

    $scope.init();
}]);