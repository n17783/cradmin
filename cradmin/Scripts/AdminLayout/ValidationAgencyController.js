CRAdminApp.controller("ValidationAgencyController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();
    $scope.AddNew = false;
    $scope.Details = true;

    $scope.TotalRecords = 0;
    $scope.TotalPages = 0

    $scope.ValidationAgencyModel = {
        PageNo: 1, PageSize: 5, ValidationAgencyId: 0, AgencyDescription: "", AgencyAddress: "",
        AgencyContactNo: "", isContinew: null
    };

    $scope.PageSizeList = [5, 10, 15, 20];
    $scope.ValidationAgencyList = [];

    $scope.AddNewClick = function () {
        $scope.AddNew = true;
        $scope.Details = false;
        $scope.ErrorModel.AgencyDescription = false;
        $scope.ErrorModel.AgencyAddress = false;
        $scope.ErrorModel.AgencyContactNo = false;
        $scope.ValidationAgencyModel = {
            PageNo: 1, PageSize: $("#ddlPageSize").val(), ValidationAgencyId: 0, AgencyDescription: "", AgencyAddress: "",
            AgencyContactNo: "", isContinew: null
        };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.ValidationAgencyModel = {
            PageNo: 1, PageSize: $("#ddlPageSize").val(), ValidationAgencyId: 0, AgencyDescription: "", AgencyAddress: "",
            AgencyContactNo: "", isContinew: null
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
        $scope.ValidationAgencyModel.DeptId = $('#ddldpt option:selected').val();
        $scope.ValidationAgencyModel.ValidationAgencyEntryBy = 1;
        $http({
            method: 'post',
            beforeSend: function (request) {
                request.setRequestHeader("Token", getToken());
            },
            url: $scope.urlBase + '/ValidationAgency/Save',
            data: $scope.ValidationAgencyModel,
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
            $scope.GetValidationAgencyList();
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
        if ($scope.ValidationAgencyModel.PageNo > 1) {
            $scope.ValidationAgencyModel.PageNo--;
            $scope.GetValidationAgencyList();
        }
    }

    $scope.Next = function () {
        if ($scope.ValidationAgencyModel.PageNo < $scope.TotalPages) {
            $scope.ValidationAgencyModel.PageNo++;
            $scope.GetValidationAgencyList();
        }
    }

    $scope.GetValidationAgencyList = function () {
        ShowLoader();
        $http({
            method: 'post',
            beforeSend: function (request) {
                request.setRequestHeader("Token", getToken());
            },
            url: $scope.urlBase + '/ValidationAgency/GetValidationAgencyList',
            data: $scope.ValidationAgencyModel,
        }).then(function (response) {
            HideLoader();
            $scope.ValidationAgencyList = response.data;
            if (response.data.length > 0) {
                $scope.TotalRecords = response.data[0].TotalRecords;
                $scope.TotalPages = parseInt($scope.TotalRecords / $scope.ValidationAgencyModel.PageSize);
                var reminder = $scope.TotalRecords % $scope.ValidationAgencyModel.PageSize;
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


        if ($scope.ValidationAgencyModel.AgencyDescription == "") {
            $scope.ErrorModel.AgencyDescription = true;
            $scope.ErrorModel.ErrorSelectAgencyDescription = "Please Enter Validation Agency Name.";
            valid = false;
        }
        else {
            $scope.ErrorModel.AgencyDescription = false;


            valid = true;
        }

        if (valid) {

            if ($scope.ValidationAgencyModel.AgencyAddress == "") {
                $scope.ErrorModel.AgencyAddress = true;
                $scope.ErrorModel.ErrorSelectAgencyAddress = "Please Enter Address .";
                valid = false;
            }
            else {
                $scope.ErrorModel.AgencyAddress = false;

                valid = true;
            }
        }
        if(valid==true){
        if ($scope.ValidationAgencyModel.AgencyContactNo == "") {
            $scope.ErrorModel.AgencyContactNo = true;
            $scope.ErrorModel.ErrorSelectAgencyContactNo = "Please Enter Contact No.";
            valid = false;
        }
        else {
          
                $scope.ErrorModel.AgencyContactNo = false;
                valid = true;
            }
        }



        return valid;
    }

    $scope.ErrorModel = {
        AgencyDescription: false, ErrorSelectAgencyDescription: "", AgencyAddress: false, ErrorSelectAgencyAddress: "", AgencyContactNo: false, ErrorSelectAgencyContactNo: ""
       
    };
    $scope.init = function () {
        setCookie("Token", $('#hdnToken').val());
        checkToken();
        $("#ddlPageSize").val(5);
        $scope.ValidationAgencyModel.PageSize = $("#ddlPageSize").val();
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.GetValidationAgencyList();

    }

    $scope.init();


}]);