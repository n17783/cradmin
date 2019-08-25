CRAdminApp.controller("SkillController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();
    $scope.AddNew = false;
    $scope.Details = true;

    $scope.TotalRecords = 0;
    $scope.TotalPages = 0
    $scope.Prefix="";
    $scope.SkillTypModel = { PageNo: 1, PageSize: 10, SkillTitle: "" };

    $scope.AddNewClick = function () {
        $scope.AddNew = true;
        $scope.Details = false;
        $scope.ErrorModel.SkillTitle = false;
        $scope.ErrorModel.EmpTypeId = false;
        valid = false;
        $scope.SkillTypModel = { PageNo: 1, PageSize: 10, Prefix: "", SkillTitle: "", EmpDesignation: "", SkillId: "", EmpTypeId: "", SkillCreationId:"" };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.SkillTypModel = { PageNo: 1, PageSize: 10, Prefix: "", SkillTitle: "", EmpDesignation: "", SkillId: "", EmpTypeId: "", SkillCreationId: "" };
    }

    $scope.PageSizeList = [5, 10, 15, 20];
    $scope.SkillTypeList = [];

    $scope.Save = function () {
        if ($scope.Validate()) {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "Error",
                Message: "Are You Want To Save This Record",
                Type: "confirm",
                OnOKClick: function () {
                    $scope.SkillTypModel.EmpTypeId = $("#ddlEmpId").val();
                    $scope.SkillTypModel.SkillCreationId = $("#ddlSkillCreationId").val();
       
        ShowLoader();
        $http({
            method: 'post',
            beforeSend: function (request) {
                request.setRequestHeader("Token", getToken());
            },
            url: $scope.urlBase + '/Skill/Save',
            data: $scope.SkillTypModel,
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
            $scope.GetSkillTypeList();
        }, function (error) {
            HideLoader();
            console.log(error);
        });
                }
            });
            objShowCustomAlert.ShowCustomAlertBox();

        }
    }

    $scope.EmpDesignationList = [];

    $scope.GetSkillTypeList = function () {
        ShowLoader();
        $http({
            method: 'post',
            beforeSend: function (request) {
                request.setRequestHeader("Token", getToken());
            },
            url: $scope.urlBase + '/Skill/GetSkillType',
            data: $scope.SkillTypModel,
        }).then(function (response) {
            HideLoader();
            $scope.SkillTypeList = response.data;
            if (response.data.length > 0) {
                $scope.TotalRecords = response.data[0].TotalRecords;
                $scope.TotalPages = parseInt($scope.TotalRecords / $scope.SkillTypModel.PageSize);
                var reminder = $scope.TotalRecords % $scope.SkillTypModel.PageSize;
                if (reminder > 0) {
                    $scope.TotalPages++;
                }
            }
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }

    $scope.GetEmpDesignationList = function () {
        ShowLoader();
        $http({
            method: 'post',
            beforeSend: function (request) {
                request.setRequestHeader("Token", getToken());
            },
            url: $scope.urlBase + '/EmployeeType/GetEmpType',
            data: $scope.SkillTypModel,
        }).then(function (response) {
            HideLoader();
            $scope.EmpDesignationList = response.data;
             $scope.EmpDesignationList.splice(0, 0, { EmpTypeId: 0, EmpDesignation: "---Select Employee Designation---" });
            var html = "";
            angular.forEach($scope.EmpDesignationList, function (value, key) {
                html += "<option value='" + value.EmpTypeId + "'>" + value.EmpDesignation + "</option>"
            });
            $("#ddlEmpId").html(html);
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }
    $scope.SkillCreationList = [];
    $scope.GetSkillCreationList = function () {
        ShowLoader();
        $http({
            method: 'post',
            beforeSend: function (request) {
                request.setRequestHeader("Token", getToken());
            },
            url: $scope.urlBase + '/SkillCreation/GetSkillType',
            data: $scope.SkillTypModel,
        }).then(function (response) {
            HideLoader();
            $scope.SkillCreationList = response.data;
            $scope.SkillCreationList.splice(0, 0, { SkillCreationId: 0, SkillTitle: "---Select Skill For Mapping ---" });
            var html = "";
            angular.forEach($scope.SkillCreationList, function (value, key) {
                html += "<option value='" + value.SkillCreationId + "'>" + value.SkillTitle + "</option>"
            });
            $("#ddlSkillCreationId").html(html);
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }

    $scope.Prev = function () {
        if ($scope.SkillTypModel.PageNo > 1) {
            $scope.SkillTypModel.PageNo--;
           
            $scope.GetSkillTypeList();
        }
    }

    $scope.Next = function () {
        if ($scope.SkillTypModel.PageNo < $scope.TotalPages) {
            $scope.SkillTypModel.PageNo++;
            $scope.GetSkillTypeList();
        }
    }
    $scope.Validate = function () {
        var valid = true;
        if ($("#ddlSkillCreationId").val() <=0) {
            $scope.ErrorModel.SkillTitle = true;
            $scope.ErrorModel.ErrorSelectSkillTitle = "Please Enter New Skill.";
            valid = false;
        }
        else {
            $scope.ErrorModel.SkillTitle = false;
           

            valid = true;
        }

        if(valid==true){

        if ($("#ddlEmpId").val() <=0) {
            $scope.ErrorModel.EmpTypeId = true;
            $scope.ErrorModel.ErrorSelectEmpTypeId = "Please Select Employee Designation .";
            valid = false;
        }
        else {
          
            $scope.ErrorModel.EmpTypeId = false;
                valid = true;
            }
        }
       
        return valid;
    }

    $scope.ErrorModel = {
        SkillTitle: false, ErrorSelectSkillTitle: "", EmpTypeId: false,
        ErrorSelectEmpTypeId: ""
    };
    $scope.init = function () {
        setCookie("Token", $('#hdnToken').val());
        checkToken();
        $("#ddlPageSize").val(5);
        $scope.SkillTypModel.PageSize = $("#ddlPageSize").val();
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.GetSkillTypeList();
        $scope.GetSkillCreationList();
        $scope.GetEmpDesignationList();
        
    }

    $scope.init();
}]);