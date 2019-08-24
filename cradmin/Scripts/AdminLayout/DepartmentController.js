CRAdminApp.controller("DepartmentController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();
    $scope.AddNew = false;
    $scope.Details = true;

    $scope.TotalRecords = 0;
    $scope.TotalPages = 0;

    $scope.DeptTypModel = { PageNo: 1, PageSize: 2, Dept_Name: "" };

    $scope.AddNewClick = function () {
        $scope.AddNew = true;
        $scope.Details = false;
        $scope.ErrorModel.Dept_Name = false;
        $scope.DeptTypModel = { PageNo: 1, PageSize: 2, Dept_Name: "", DeptId: "" };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.DeptTypModel = { PageNo: 1, PageSize: 2, Dept_Name: "", DeptId: "" };
    }
    $scope.PageSizeList = [5, 10, 15, 20];
    $scope.DeptTypeList = [];

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
            beforeSend: function (request) {
                request.setRequestHeader("Token", getToken());},
            url: $scope.urlBase + '/Department/Save',
            data: $scope.DeptTypModel,
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
            $scope.GetDeptTypeList();
        }, function (error) {
            HideLoader();
            console.log(error);
        });

                }
            });
            objShowCustomAlert.ShowCustomAlertBox();
        }
    }

    

    $scope.GetDeptTypeList = function () {
        ShowLoader();
        $http({
            method: 'post',
            beforeSend: function (request) {
                request.setRequestHeader("Token", getToken());},
            url: $scope.urlBase + '/Department/GetDeptList',
            data: $scope.DeptTypModel,
        }).then(function (response) {
            HideLoader();
            $scope.DeptTypeList = response.data;
            if (response.data.length > 0) {
                $scope.TotalRecords = response.data[0].TotalRecords;
                $scope.TotalPages = parseInt($scope.TotalRecords / $scope.DeptTypModel.PageSize);
                var reminder = $scope.TotalRecords % $scope.DeptTypModel.PageSize;
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
        if ($scope.DeptTypModel.PageNo > 1) {
            $scope.DeptTypModel.PageNo--;
            $scope.GetDeptTypeList();
        }
    }

    $scope.Next = function () {
        if ($scope.DeptTypModel.PageNo < $scope.TotalPages) {
            $scope.DeptTypModel.PageNo++;
            $scope.GetDeptTypeList();
        }
    }
    $scope.ErrorModel = {
        Dept_Name: false, ErrorEnterDept_Name: ""
    };
    $scope.Validate = function () {
        var valid = true;


        if ($scope.DeptTypModel.Dept_Name == "") {
            $scope.ErrorModel.Dept_Name = true;
            $scope.ErrorModel.ErrorEnterDept_Name = "Please Enter Sub Department Name.";
            valid = false;
        }
        else {
            $scope.ErrorModel.Dept_Name = false;

            valid = true;
        }
        return valid
    }
    $scope.init = function () {
        setCookie("Token", $('#hdnToken').val());
        checkToken();
        $("#ddlPageSize").val(5);
        $scope.DeptTypModel.PageSize = $("#ddlPageSize").val();
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.GetDeptTypeList();
       
    }

    $scope.init();
}]);