CRAdminApp.controller("DeptZoneController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();
    $scope.AddNew = false;
    $scope.Details = true;

    $scope.TotalRecords = 0;
    $scope.TotalPages = 0

    $scope.DeptZoneModel = { PageNo: 1, PageSize: 2, DeptZoneId: "", DeptZoneDescription: "", ContactNo: "", EntryDate: "", EntryBy: "", ExitDate: "", ExitBy: "", IsContinew: null, ContactNo2: "", EmailId: "", CreatedBy: "", DeptZoneAddress: "" };

    $scope.AddNewClick = function () {
        $scope.AddNew = true;
        $scope.Details = false;

        $scope.DeptZoneModel = { PageNo: 1, PageSize: 2, DeptZoneId: "", DeptZoneDescription: "", ContactNo: "", EntryDate: "", EntryBy: "", ExitDate: "", ExitBy: "", IsContinew: null, ContactNo2: "", EmailId: "", CreatedBy: "", DeptZoneAddress: "" };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.DeptZoneModel = { PageNo: 1, PageSize: 2, DeptZoneId: "", DeptZoneDescription: "", ContactNo: "", EntryDate: "", EntryBy: "", ExitDate: "", ExitBy: "", IsContinew: null,ContactNo2:"",EmailId:"",CreatedBy:"", DeptZoneAddress: "" };
    }

    $scope.PageSizeList = [5, 10, 15, 20];
    $scope.DeptZoneList = [];

    $scope.Save = function () {
       


        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/DeptZone/Save',
            data: $scope.DeptZoneModel,
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
            $scope.GetDeptZoneList();
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }



    $scope.GetDeptZoneList = function () {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/DeptZone/GetDeptZone',
            data: $scope.DeptZoneModel,
        }).then(function (response) {
            HideLoader();
            $scope.DeptZoneList = response.data;
            if (response.data.length > 0) {
                $scope.TotalRecords = response.data[0].TotalRecords;
                $scope.TotalPages = parseInt($scope.TotalRecords / $scope.DeptZoneModel.PageSize);
                var reminder = $scope.TotalRecords % $scope.DeptZoneModel.PageSize;
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
        if ($scope.DeptZoneModel.PageNo > 1) {
            $scope.DeptZoneModel.PageNo--;
            $scope.GetDeptZoneList();
        }
    }

    $scope.Next = function () {
        if ($scope.DeptZoneModel.PageNo < $scope.TotalPages) {
            $scope.DeptZoneModel.PageNo++;
            $scope.GetDeptZoneList();
        }
    }

    $scope.init = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.GetDeptZoneList();

    }

    $scope.init();
}]);