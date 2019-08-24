CRAdminApp.controller("ValidationTestController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();
    $scope.AddNew = false;
    $scope.Details = true;

    $scope.TotalRecords = 0;
    $scope.TotalPages = 0

    $scope.TestModal = { PageNo: 1, PageSize: 2, TestDescription: "" };
    $scope.ErrorModel = {
        TestDescription: false, ErrorMessageTestName: ""
    };
    $scope.AddNewClick = function () {
        $scope.AddNew = true;
        $scope.Details = false;
        $scope.ErrorModel.TestDescription = false;
        $scope.TestModal = { PageNo: 1, PageSize: 2, TestDescription: "" };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.TestModal = { PageNo: 1, PageSize: 2, TestDescription: "" };
    }

    $scope.TestList = [];

    $scope.Save = function () {
        if ($scope.Validate()) {
            ShowLoader();
            $http({
                method: 'post',
                beforeSend: function (request) {
                    request.setRequestHeader("Token", getToken());
                },
                url: $scope.urlBase + '/ValidationTest/Save',
                data: $scope.TestModal,
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
                $scope.GetTestDetails();
            }, function (error) {
                HideLoader();
                console.log(error);
            });
        }
    }

    $scope.GetTestDetails = function () {
        ShowLoader();
        $http({
            method: 'post',
            beforeSend: function (request) {
                request.setRequestHeader("Token", getToken());
            },
            url: $scope.urlBase + '/ValidationTest/GetTest',
            data: $scope.TestModal,
        }).then(function (response) {
            HideLoader();
            $scope.TestList = response.data;
            if (response.data.length > 0) {
                $scope.TotalRecords = response.data[0].TotalRecords;
                $scope.TotalPages = parseInt($scope.TotalRecords / $scope.TestModal.PageSize);
                var reminder = $scope.TotalRecords % $scope.TestModal.PageSize;
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
        if ($scope.TestModal.PageNo > 1) {
            $scope.TestModal.PageNo--;
            $scope.GetTestDetails();
        }
    }

    $scope.Next = function () {
        if ($scope.TestModal.PageNo < $scope.TotalPages) {
            $scope.TestModal.PageNo++;
            $scope.GetTestDetails();
        }
    }

    $scope.init = function () {
        setCookie("Token", $('#hdnToken').val());
        checkToken();
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.GetTestDetails();

    }
    
    $scope.Validate = function () {
        var valid = true;
        if ($scope.TestModal.TestDescription == "") {
            $scope.ErrorModel.TestDescription = true;
            $scope.ErrorModel.ErrorMessageTestName = "Please Enter Test Name.";
            valid = false;
           
        }
        
        return valid;
    }

    $scope.init();
}]);