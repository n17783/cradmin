CRAdminApp.controller("ProjectTypeController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();
    $scope.AddNew = false;
    $scope.Details = true;

    $scope.TotalRecords = 0;
    $scope.TotalPages = 0

    $scope.ProjectTypeModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), ProjectTypeDescription: "" };

    $scope.AddNewClick = function () {
        var valid = true;
        $scope.ErrorModel.ProjectTypeDescription = false;
        $scope.AddNew = true;
        $scope.Details = false;
        $scope.ProjectTypeModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), ProjectTypeDescription: "" };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.ProjectTypeModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), ProjectTypeDescription: "" };
    }

    $scope.PageSizeList=[5,10,15,20];
    $scope.ProjectTypeList = [];

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
                        url: $scope.urlBase + '/ProjectType/Save',
                        data: $scope.ProjectTypeModel,
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
                $scope.GetProjectTypeList();
            }, function (error) {
                HideLoader();
                console.log(error);
            });
                }
            });
            objShowCustomAlert.ShowCustomAlertBox();
            }
    }
    $scope.GetProjectTypeList = function () {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/ProjectType/GetProjectType',
            data: $scope.ProjectTypeModel,
        }).then(function (response) {
            HideLoader();
            $scope.ProjectTypeList = response.data;
            if (response.data.length > 0) {
                $scope.TotalRecords = response.data[0].TotalRecords;
                $scope.TotalPages = parseInt($scope.TotalRecords / $scope.ProjectTypeModel.PageSize);
                var reminder = $scope.TotalRecords % $scope.ProjectTypeModel.PageSize;
                if (reminder > 0) {
                    $scope.TotalPages++;
                }
            }
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }
    $scope.ErrorModel = {
        ProjectTypeDescription: false, ErrorMessagEnterProjectType: ""
    };
    
    $scope.Validate = function () {
        var valid = true;
        if ($scope.ProjectTypeModel.ProjectTypeDescription =="") {
            $scope.ErrorModel.ProjectTypeDescription = true;
            $scope.ErrorModel.ErrorMessagEnterProjectType = "Please Enter Project Type.";
            valid = false;
           
        }
        return valid
    }
    $scope.Prev = function () {
        if ($scope.ProjectTypeModel.PageNo > 1) {
            $scope.ProjectTypeModel.PageNo--;
            $scope.GetProjectTypeList();
        }
    }

    $scope.Next = function () {

        if ($scope.ProjectTypeModel.PageNo < $scope.TotalPages) {
            $scope.ProjectTypeModel.PageNo++;
            $scope.GetProjectTypeList();
        }
    }

    $scope.init = function () {
        checkToken();
        $("#ddlPageSize").val(5);
        $scope.ProjectTypeModel.PageSize = $("#ddlPageSize").val();
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.GetProjectTypeList();

    }

    $scope.init();
}]);