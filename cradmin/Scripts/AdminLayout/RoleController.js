CRAdminApp.controller("RoleController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();
    $scope.AddNew = false;
    $scope.Details = true;

    $scope.TotalRecords = 0;
    $scope.TotalPages = 0

    $scope.RoleModel = {
        PageNo: 1, PageSize: 5, RoleId: 0, RoleDescription: "", DeptId: "",
        DeptName: "", RoleEntryDate: "", RoleEntryBy: "", RoleEntryByName: ""
    };

    $scope.PageSizeList = [5, 10, 15, 20];
    $scope.RoleList = [];

    $scope.AddNewClick = function () {
        $scope.AddNew = true;
        $scope.Details = false;
        $scope.RoleModel = {
            PageNo: 1, PageSize: $("#ddlPageSize").val(), RoleId: 0, RoleDescription: "", DeptId: "",
            DeptName: "", RoleEntryDate: "", RoleEntryBy: "", RoleEntryByName: ""
        };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.RoleModel = {
            PageNo: 1, PageSize: $("#ddlPageSize").val(), RoleId: 0, RoleDescription: "", DeptId: "",
            DeptName: "", RoleEntryDate: "", RoleEntryBy: "", RoleEntryByName: ""
        };
    }

    $scope.Save = function () {
        ShowLoader();

        $scope.RoleModel.DeptId = $('#ddldpt option:selected').val();
        $scope.RoleModel.RoleEntryBy = 1;
        $http({
            method: 'post',
            url: $scope.urlBase + '/Role/Save',
            data: $scope.RoleModel,
        }).then(function (response) {
            HideLoader();
            $scope.CancelClick();
            $scope.GetRoleList();
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }

    $scope.Prev = function () {
        if ($scope.RoleModel.PageNo > 1) {
            $scope.RoleModel.PageNo--;
            $scope.GetRoleList();
        }
    }

    $scope.Next = function () {
        if ($scope.RoleModel.PageNo < $scope.TotalPages) {
            $scope.RoleModel.PageNo++;
            $scope.GetRoleList();
        }
    }

    $scope.GetRoleList = function () {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/Role/GetRoleList',
            data: $scope.RoleModel,
        }).then(function (response) {
            HideLoader();
            $scope.RoleList = response.data;
            if (response.data.length > 0) {
                $scope.TotalRecords = response.data[0].TotalRecords;
                $scope.TotalPages = parseInt($scope.TotalRecords / $scope.RoleModel.PageSize);
                var reminder = $scope.TotalRecords % $scope.RoleModel.PageSize;
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
        $scope.RoleModel.PageSize = $("#ddlPageSize").val();
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.GetRoleList();

    }

    $scope.init();


}]);