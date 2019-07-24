CRAdminApp.controller("CourseMasterController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();
    $scope.AddNew = false;
    $scope.Details = true;

    $scope.TotalRecords = 0;
    $scope.TotalPages = 0

    $scope.CourseMasterModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), CourseId: "", CourseTitle: "", CourseDescription: "", CourseCreatedBy: "", EntryBy: "", EntryDate: "", CourseSanctionDate: "" };

    $scope.AddNewClick = function () {
        $scope.AddNew = true;
        $scope.Details = false;
        $scope.CourseMasterModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), CourseId: "", CourseTitle: "", CourseDescription: "", CourseCreatedBy: "", EntryBy: "", EntryDate: "", CourseSanctionDate: "" };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.CourseMasterModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), CourseId: "", CourseTitle: "", CourseDescription: "", CourseCreatedBy: "", EntryBy: "", EntryDate: "", CourseSanctionDate: "" };
    }

    $scope.PageSizeList = [5, 10, 15, 20];
    $scope.CourseMasterResponse = [];

    $scope.Save = function () {

       
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/CourseMaster/Save',
            data: $scope.CourseMasterModel,
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
            $scope.GetCourseMasterResponse();
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }

    $scope.CourseMasterResponse = [];

    $scope.GetCourseMasterResponse = function () {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/CourseMaster/GetCourseMasterDetails',
            data: $scope.CourseMasterModel,
        }).then(function (response) {
            HideLoader();
            $scope.CourseMasterResponse = response.data;
            if (response.data.length > 0) {
                $scope.TotalRecords = response.data[0].TotalRecords;
                $scope.TotalPages = parseInt($scope.TotalRecords / $scope.CourseMasterModel.PageSize);
                var reminder = $scope.TotalRecords % $scope.CourseMasterModel.PageSize;
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
        if ($scope.CourseMasterModel.PageNo > 1) {
            $scope.CourseMasterModel.PageNo--;
            $scope.GetCourseMasterResponse();
        }
    }

    $scope.Next = function () {
        if ($scope.CourseMasterModel.PageNo < $scope.TotalPages) {
            $scope.CourseMasterModel.PageNo++;
            $scope.GetCourseMasterResponse();
        }
    }

    $scope.init = function () {
        checkToken();
        $("#ddlPageSize").val(5);
        $scope.CourseMasterModel.PageSize = $("#ddlPageSize").val();
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.GetCourseMasterResponse();
    }

    $scope.init();
}]);