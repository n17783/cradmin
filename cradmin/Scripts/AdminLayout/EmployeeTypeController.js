CRAdminApp.controller("EmployeeTypeController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();
    $scope.AddNew = false;
    $scope.Details = true;

    $scope.TotalRecords = 0;
    $scope.TotalPages = 0

    $scope.EmployeeTypeModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), EmpTypeId: "", EmpDesignation: "", IsDmOrStaff: null, EmpGrade: "", Category: "" };

    $scope.AddNewClick = function () {
        $scope.ErrorModel.EmpDesignation = false;
        $scope.ErrorModel.ErrorSelectEmpGrade = false;
        $scope.ErrorModel.Category = false;
        $scope.AddNew = true;
        $scope.Details = false;
        valid=false;
        $scope.EmployeeTypeModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), EmpTypeId: 0, EmpDesignation: "", IsDmOrStaff: null, EmpGrade: "", Category: "" };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.EmployeeTypeModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), EmpTypeId: 0, EmpDesignation: "", IsDmOrStaff: null, EmpGrade: "", Category: "" };
    }

    $scope.PageSizeList = [5, 10, 15, 20];
    $scope.EmpTypeList = [];

    $scope.Save = function () {
         valid = true;
        if ($scope.Validate()) {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "Error",
                Message: "Are You Want To Save This Record",
                Type: "confirm",
                OnOKClick: function () {
        if ($("#ddlIsDmOrStaff").val() == "DM") {
            $scope.EmployeeTypeModel.IsDmOrStaff = true;
        }
        else {
            $scope.EmployeeTypeModel.IsDmOrStaff = false;
        }


        ShowLoader();
        $http({
            method: 'post',
            beforeSend: function (request) {
                request.setRequestHeader("Token", getToken());
            },
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
            });
            objShowCustomAlert.ShowCustomAlertBox();

        }
    }



    $scope.GetEmpTypeList = function () {
        ShowLoader();
        $http({
            method: 'post',
            beforeSend: function (request) {
                request.setRequestHeader("Token", getToken());
            },
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
    $scope.Validate = function () {
        var valid = true;


        if ($scope.EmployeeTypeModel.EmpDesignation == "") {
            $scope.ErrorModel.EmpDesignation = true;
            $scope.ErrorModel.ErrorSelectEmpDesignation = "Please Enter New Designation.";
            valid = false;
        }
        else {
            $scope.ErrorModel.EmpDesignation = false;


            valid = true;
        }


        if (valid) {
            if ($scope.EmployeeTypeModel.EmpGrade == "") {
                $scope.ErrorModel.EmpGrade = true;
                $scope.ErrorModel.ErrorSelectEmpGrade = "Please Enter Employee Grade .";
                valid = false;
            }
            else {
                $scope.ErrorModel.EmpGrade = false;

                valid = true;
            }
        }
        if (valid == true) {
            if ($scope.EmployeeTypeModel.Category == "") {
                $scope.ErrorModel.Category = true;
                $scope.ErrorModel.ErrorSelectCategory = "Please Enter Employee Category.";
                valid = false;
            }
            else {

                $scope.ErrorModel.Category = false;
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
        setCookie("Token", $('#hdnToken').val());
        checkToken();
        $("#ddlPageSize").val(5);
        $scope.EmployeeTypeModel.PageSize = $("#ddlPageSize").val();
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.GetEmpTypeList();

    }

    $scope.init();
}]);