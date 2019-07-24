CRAdminApp.controller("PlantController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();
    $scope.AddNew = false;
    $scope.Details = true;

    $scope.TotalRecords = 0;
    $scope.TotalPages = 0

    $scope.PlantModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), PlantId: "", PlantTitle: "", PlantDescription: "", PlantAddress: "", PlantPhoneNo: "", PlantPhoneNo2: "" };

    $scope.AddNewClick = function () {
        $scope.AddNew = true;
        $scope.Details = false;
        $scope.PlantModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), PlantId: "", PlantTitle: "", PlantDescription: "", PlantAddress: "", PlantPhoneNo: "", PlantPhoneNo2: "" };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.PlantModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), PlantId: "", PlantTitle: "", PlantDescription: "", PlantAddress: "", PlantPhoneNo: "", PlantPhoneNo2: "" };
    }

    $scope.PageSizeList = [5, 10, 15, 20];
    $scope.PlantList = [];

    $scope.Save = function () {
        var objShowCustomAlert = new ShowCustomAlert({
            Title: "Error",
            Message: "Are You Want To Save This Record",
            Type: "confirm",
            OnOKClick: function () {
                ShowLoader();
                $http({
                    method: 'post',
                    url: $scope.urlBase + '/Plant/Save',
                    data: $scope.PlantModel,
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
                    $scope.GetPlantList();
                }, function (error) {
                    HideLoader();
                    console.log(error);
                });
            }
        });
        objShowCustomAlert.ShowCustomAlertBox();

        
    }

    $scope.PlantList = [];

    $scope.GetPlantList = function () {

        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/Plant/GetPlantList',
            data: $scope.PlantModel,
        }).then(function (response) {
            HideLoader();
            $scope.PlantList = response.data;
            if (response.data.length > 0) {
                $scope.TotalRecords = response.data[0].TotalRecords;
                $scope.TotalPages = parseInt($scope.TotalRecords / $scope.PlantModel.PageSize);
                var reminder = $scope.TotalRecords % $scope.PlantModel.PageSize;
                if (reminder > 0) {
                    $scope.TotalPages++;
                }
            }
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }



    $scope.Prev = function (PageNo) {
        if ($scope.PlantModel.PageNo > 1) {
            $scope.PlantModel.PageNo--;
            $scope.GetPlantList();
        }
    }

    $scope.Next = function (PageNo) {
        if ($scope.PlantModel.PageNo < $scope.TotalPages) {
            $scope.PlantModel.PageNo++;
            $scope.GetPlantList();
        }
    }

    $scope.init = function () {
        checkToken();
        $("#ddlPageSize").val(5);
        $scope.PlantModel.PageSize = $("#ddlPageSize").val();
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.GetPlantList();
       
    }

    $scope.init();
}]);