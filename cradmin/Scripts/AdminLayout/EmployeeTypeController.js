CRAdminApp.controller("EmployeeTypeController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();
    $scope.AddNew = false;
    $scope.Details = true;

    $scope.TotalRecords = 0;
    $scope.TotalPages = 0

    $scope.EmployeeTypeModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), EmpTypeId: "", EmpDesignation: "", IsDmOrStaff: null, CreatedByAuthority: "" };

    $scope.AddNewClick = function () {
        $scope.AddNew = true;
        $scope.Details = false;
        
        $scope.EmployeeTypeModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), EmpTypeId:0, EmpDesignation: "", IsDmOrStaff: null, CreatedByAuthority: "" };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.EmployeeTypeModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), EmpTypeId: 0, EmpDesignation: "", IsDmOrStaff: null, CreatedByAuthority: "" };
    }

    $scope.PageSizeList = [5, 10, 15, 20];
    $scope.EmpTypeList = [];

    $scope.Save = function () {
        if ($("#ddlIsDmOrStaff").val()=="DM") {
            $scope.EmployeeTypeModel.IsDmOrStaff = true;
        }
        else {
            $scope.EmployeeTypeModel.IsDmOrStaff = false;
        }

       
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/EmployeeType/Save',
            data: $scope.EmployeeTypeModel,
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
            $scope.GetEmpTypeList();
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }

   

    $scope.GetEmpTypeList = function () {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/EmployeeType/GetEmpType',
            data: $scope.EmployeeTypeModel,
        }).then(function (response) {
            HideLoader();
            $scope.EmpTypeList = response.data;
            if (response.data.length > 0) {
                $scope.TotalRecords = response.data[0].TotalRecords;
                $scope.TotalPages = parseInt($scope.TotalRecords / $scope.EmployeeTypeModel.PageSize);
                var reminder = $scope.TotalRecords % $scope.EmployeeTypeModel.PageSize;
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
        if ($scope.EmployeeTypeModel.PageNo > 1) {
            $scope.EmployeeTypeModel.PageNo--;
            $scope.GetEmpTypeList();
        }
    }

    $scope.Next = function () {
        if ($scope.EmployeeTypeModel.PageNo < $scope.TotalPages) {
            $scope.EmployeeTypeModel.PageNo++;
            $scope.GetEmpTypeList();
        }
    }

    $scope.init = function () {
        checkToken();
        $("#ddlPageSize").val(5);
        $scope.EmployeeTypeModel.PageSize = $("#ddlPageSize").val();
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.GetEmpTypeList();
       
    }

    $scope.init();
}]);