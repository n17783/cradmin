CRAdminApp.controller("ProjectTypeController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();
    $scope.AddNew = false;
    $scope.Details = true;

    $scope.TotalRecords = 0;
    $scope.TotalPages = 0

    $scope.ProjectTypeModel = { PageNo: 1, PageSize: 2, ProjectTypeDescription: "", PTEnteryDate:"", CreatedBy: "" };

    $scope.AddNewClick = function () {
        $scope.AddNew = true;
        $scope.Details = false;
        $scope.ProjectTypeModel = { PageNo: 1, PageSize: 2, ProjectTypeDescription: "" };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.ProjectTypeModel = { PageNo: 1, PageSize: 2, ProjectTypeDescription: "" };
    }

    $scope.PageSizeList=[5,10,15,20];
    $scope.ProjectTypeList = [];

    $scope.Save = function () {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/ProjectType/Save',
            data: $scope.ProjectTypeModel,
        }).then(function (response) {
            HideLoader();
            $scope.CancelClick();
            $scope.GetProjectTypeList();
        }, function (error) {
            HideLoader();
            console.log(error);
        });
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
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.GetProjectTypeList();

    }

    $scope.init();
}]);