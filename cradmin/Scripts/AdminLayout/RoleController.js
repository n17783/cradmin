CRAdminApp.controller("RoleController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();
    $scope.AddNew = false;
    $scope.Details = true;

    $scope.TotalRecords = 0;
    $scope.TotalPages = 0

    $scope.RollModel = {
        PageNo: 1, PageSize: 5, RollId: 0, RollDescription: "", 
         RoleEntryDate: "", RollEntryBy: ""
    };

    $scope.PageSizeList = [5, 10, 15, 20];
    $scope.RollList = [];

    $scope.AddNewClick = function () {
        $scope.AddNew = true;
        $scope.Details = false;
        $scope.RollModel = { RollDescription: "", 
             
        };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.RollModel = {
            PageNo: 1, PageSize: $("#ddlPageSize").val(), RollId: 0, RollDescription: "", 
             RollEntryDate: "", RollEntryBy: ""
        };
    }

    $scope.Save = function () {
        ShowLoader();

       
        $scope.RollModel.RollEntryBy = 1;
        $http({
            method: 'post',
            url: $scope.urlBase + '/Role/Save',
            data: $scope.RollModel,
        }).then(function (response) {
            HideLoader();
            $scope.CancelClick();
            $scope.GetRollList();
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }

    $scope.Prev = function () {
        if ($scope.RollModel.PageNo > 1) {
            $scope.RollModel.PageNo--;
            $scope.GetRollList();
        }
    }

    $scope.Next = function () {
        if ($scope.RollModel.PageNo < $scope.TotalPages) {
            $scope.RollModel.PageNo++;
            $scope.GetRollList();
        }
    }
    $scope.RollModel = {
        PageNo: 1, PageSize: $("#ddlPageSize").val()
    };
    $scope.GetRollList = function () {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/Role/GetRollList1',
            data: $scope.RollModel,
        }).then(function (response) {
            HideLoader();
            $scope.RollList = response.data;
            if (response.data.length > 0) {
                $scope.TotalRecords = response.data[0].TotalRecords;
                $scope.TotalPages = parseInt($scope.TotalRecords / $scope.RollModel.PageSize);
                var reminder = $scope.TotalRecords % $scope.RollModel.PageSize;
                if (reminder > 0) {
                    $scope.TotalPages++;
                }
            }
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }

    $scope.init = function () {
        checkToken();
        $("#ddlPageSize").val(5);
        $scope.RollModel.PageSize = $("#ddlPageSize").val();
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.GetRollList();

    }

    $scope.init();


}]);