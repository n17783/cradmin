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
        $scope.ErrorModel.CourseTitle = false;
        $scope.ErrorModel.CourseCreatedBy = false;
        $scope.ErrorModel.CourseSanctionDate = false;
        $scope.ErrorModel.CourseDescription = false;
        $scope.CourseMasterModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), CourseId: "", CourseTitle: "", CourseDescription: "", CourseCreatedBy: "", EntryBy: "", EntryDate: "", CourseSanctionDate: "" };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.CourseMasterModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), CourseId: "", CourseTitle: "", CourseDescription: "", CourseCreatedBy: "", EntryBy: "", EntryDate: "", CourseSanctionDate: "" };
    }

    $scope.PageSizeList = [5, 10, 15, 20];
    $scope.CourseMasterResponse = [];
    var objdatehelper = new datehelper({ format: "dd/MM/yyyy", cdate: new Date() });
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
            });
            objShowCustomAlert.ShowCustomAlertBox();

        }
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
    $scope.Validate = function () {
        var valid = true;


        if ($scope.CourseMasterModel.CourseTitle == "") {
            $scope.ErrorModel.CourseTitle = true;
            $scope.ErrorModel.ErrorSelectCourseTitle = "Please Enter Course Name.";
            valid = false;
        }
        else {
            $scope.ErrorModel.CourseTitle = false;


            valid = true;
        }



        if ($scope.CourseMasterModel.CourseCreatedBy == "") {
            $scope.ErrorModel.CourseCreatedBy = true;
            $scope.ErrorModel.ErrorSelectCourseCreatedBy = "Please Enter Authority Name  .";
            valid = false;
        }
        else {
            $scope.ErrorModel.CourseCreatedBy = false;

            valid = true;
        }
        if ($scope.CourseMasterModel.CourseSanctionDate == "") {
            $scope.ErrorModel.CourseSanctionDate = true;
            $scope.ErrorModel.ErrorSelectCourseSanctionDate = "Please Enter Course Sanction Date  .";
            valid = false;
        }
        else {
            $scope.ErrorModel.CourseSanctionDate = false;

            valid = true;
        }
        
        if ($scope.CourseMasterModel.CourseDescription == "") {
            $scope.ErrorModel.CourseDescription = true;
            $scope.ErrorModel.ErrorSelectCourseDescription = "Please Enter Course Description.";
            valid = false;
        }
        else {
            if (valid == false) {
                valid = false;
                $scope.ErrorModel.CourseDescription = true;
            }
            else {
                $scope.ErrorModel.CourseDescription = false;
                valid = true;
            }
        }



        return valid;
    }

    $scope.ErrorModel = {
        CourseTitle: false, ErrorSelectCourseTitle: "", CourseCreatedBy: false, ErrorSelectCourseCreatedBy: "", CourseSanctionDate: false, ErrorSelectCourseSanctionDate: "",
        CourseDescription: false, ErrorSelectCourseDescription: "" };
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