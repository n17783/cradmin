CRAdminApp.controller("RoleController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();
    $scope.AddNew = false;
    $scope.Details = true;

    $scope.TotalRecords = 0;
    $scope.TotalPages = 0

    $scope.RollModel = {
        PageNo: 1, PageSize: 10, RollId: 0, RollDescription: "",
        RoleEntryDate: "", RollEntryBy: ""
    };

    $scope.PageSizeList = [5, 10, 15, 20];
    $scope.RollList = [];

    $scope.AddNewClick = function () {
        $scope.AddNew = true;
        $scope.Details = false;
         $scope.ErrorModel.RollDescription = false;
        $scope.RollModel = {
            RollDescription: "",

        };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.RollModel = {
            PageNo: 1, PageSize: $("#ddlPageSize").val(), RollId: 0, RollDescription: "",
            RollEntryDate: "", RollEntryBy: ""
        };
    }

    $scope.Save = function () {
        if ($scope.Validate()) {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "Error",
                Message: "Are You Want To Save This Record",
                Type: "confirm",
                OnOKClick: function () {
    ShowLoader();
        $scope.RollModel.RollEntryBy = 1;
        $http({
            method: 'post',
            url: $scope.urlBase + '/Role/Save',
            data: $scope.RollModel,
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
            $scope.GetRollList();
        }, function (error) {
            HideLoader();
            console.log(error);
        });
                }
            });
            objShowCustomAlert.ShowCustomAlertBox();

        }
    }

    $scope.Prev = function () {
        if ($scope.RollModel.PageNo > 1) {
            $scope.RollModel.PageNo--;
            $scope.GetRollList();
        }
    }

    $scope.Next = function () {
        if ($scope.RollModel.PageNo < $scope.TotalPages) {
            $scope.RollModel.PageNo++;
            $scope.GetRollList();
        }
    }
    $scope.RollModel = {
        PageNo: 1, PageSize: $("#ddlPageSize").val()
    };
    $scope.GetRollList = function () {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/Role/GetRollList1',
            data: $scope.RollModel,
        }).then(function (response) {
            HideLoader();
            $scope.RollList = response.data;
            if (response.data.length > 0) {
                $scope.TotalRecords = response.data[0].TotalRecords;
                $scope.TotalPages = parseInt($scope.TotalRecords / $scope.RollModel.PageSize);
                var reminder = $scope.TotalRecords % $scope.RollModel.PageSize;
                if (reminder > 0) {
                    $scope.TotalPages++;
                }
            }
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }
    $scope.Validate = function () {
        var valid = true;


        if ($scope.RollModel.RollDescription == "") {
            $scope.ErrorModel.RollDescription = true;
            $scope.ErrorModel.ErrorSelectRollDescription = "Please Enter New Role.";
            valid = false;
        }
        else {
            $scope.ErrorModel.RollDescription = false;


            valid = true;
        }
        return valid;
    }
    $scope.ErrorModel = {
        DeptZoneDescription: false, ErrorSelectDeptZone: ""
    };
    $scope.init = function () {
        checkToken();
        $("#ddlPageSize").val(5);
        $scope.RollModel.PageSize = $("#ddlPageSize").val();
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.GetRollList();

    }

    $scope.init();


}]);