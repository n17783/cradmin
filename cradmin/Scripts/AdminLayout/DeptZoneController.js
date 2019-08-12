CRAdminApp.controller("DeptZoneController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();
    $scope.AddNew = false;
    $scope.Details = true;

    $scope.TotalRecords = 0;
    $scope.TotalPages = 0

    $scope.DeptZoneModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), DeptZoneId: "", DeptZoneDescription: "", ContactNo: "", EntryDate: "", EntryBy: "", ExitDate: "", ExitBy: "", IsContinew: null, ContactNo2: "", EmailId: "", CreatedBy: "", DeptZoneAddress: "" };

    $scope.AddNewClick = function () {
        $scope.AddNew = true;
        $scope.Details = false;

        $scope.DeptZoneModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), DeptZoneId: "", DeptZoneDescription: "", ContactNo: "", EntryDate: "", EntryBy: "", ExitDate: "", ExitBy: "", IsContinew: null, ContactNo2: "", EmailId: "", CreatedBy: "", DeptZoneAddress: "" };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.DeptZoneModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), DeptZoneId: "", DeptZoneDescription: "", ContactNo: "", EntryDate: "", EntryBy: "", ExitDate: "", ExitBy: "", IsContinew: null,ContactNo2:"",EmailId:"",CreatedBy:"", DeptZoneAddress: "" };
    }

    $scope.PageSizeList = [5, 10, 15, 20];
    $scope.DeptZoneList = [];

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
            url: $scope.urlBase + '/DeptZone/Save',
            data: $scope.DeptZoneModel,
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
            $scope.GetDeptZoneList();
        }, function (error) {
            HideLoader();
            console.log(error);
        });

                }
            });
            objShowCustomAlert.ShowCustomAlertBox();
        }
    }



    $scope.GetDeptZoneList = function () {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/DeptZone/GetDeptZone',
            data: $scope.DeptZoneModel,
        }).then(function (response) {
            HideLoader();
            $scope.DeptZoneList = response.data;
            if (response.data.length > 0) {
                $scope.TotalRecords = response.data[0].TotalRecords;
                $scope.TotalPages = parseInt($scope.TotalRecords / $scope.DeptZoneModel.PageSize);
                var reminder = $scope.TotalRecords % $scope.DeptZoneModel.PageSize;
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
        if ($scope.DeptZoneModel.PageNo > 1) {
            $scope.DeptZoneModel.PageNo--;
            $scope.GetDeptZoneList();
        }
    }

    $scope.Next = function () {
        if ($scope.DeptZoneModel.PageNo < $scope.TotalPages) {
            $scope.DeptZoneModel.PageNo++;
            $scope.GetDeptZoneList();
        }
    }
    $scope.Validate = function () {
        var valid = true;


        if ($scope.DeptZoneModel.DeptZoneDescription == "") {
            $scope.ErrorModel.DeptZoneDescription = true;
            $scope.ErrorModel.ErrorSelectDeptZone = "Please Enter Zone Name.";
            valid = false;
        }
        else {
            $scope.ErrorModel.DeptZoneDescription = false;

            valid = true;
        }

       

        if ($scope.DeptZoneModel.DeptZoneAddress == "") {
            $scope.ErrorModel.DeptZoneAddress = true;
            $scope.ErrorModel.ErrorSelectDeptZoneDeptZoneAddress = "Please Enter Zone Address .";
            valid = false;
        }
        else {
            $scope.ErrorModel.DeptZoneAddress = false;
            valid = true;
        }
        if ($scope.DeptZoneModel.ContactNo == "") {
            $scope.ErrorModel.ContactNo = true;
            $scope.ErrorModel.ErrorSelectDeptZoneContactNo = "Please Enter Contact No.";
            valid = false;
        }
        else {
            $scope.ErrorModel.ContactNo = false;
            valid = true;
        }

        //if ($scope.DeptZoneModel.ContactNo2 == "") {
        //    $scope.ErrorModel.ContactNo2 = true;
        //    $scope.ErrorModel.ErrorSelectDeptZoneContactNo2 = "Please Enter Contact No 2.";
        //    valid = false;
        //}
        //else {
        //    $scope.ErrorModel.ContactNo2 = false;
        //    valid = true;
        //}
        if ($scope.DeptZoneModel.EmailId == "") {
            $scope.ErrorModel.EmailId = true;
            $scope.ErrorModel.ErrorSelectDeptZoneEmail = "Please Enter Email Id.";
            valid = false;
        }
        else {
            $scope.ErrorModel.EmailId = false;
            valid = true;
        }
        if ($scope.DeptZoneModel.CreatedBy == "") {
            $scope.ErrorModel.CreatedBy = true;
            $scope.ErrorModel.ErrorSelectCreated =" Enter Created By ";
            valid = false;
        }
        else {
            if (valid == false) {
                valid = false;
                $scope.ErrorModel.CreatedBy = true;
            }
            else {
                $scope.ErrorModel.CreatedBy = false;
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
        $scope.DeptZoneModel.PageSize = $("#ddlPageSize").val();
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.GetDeptZoneList();

    }

    $scope.init();
}]);