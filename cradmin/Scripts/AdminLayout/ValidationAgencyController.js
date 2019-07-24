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
        ShowLoader();

        $scope.ValidationAgencyModel.DeptId = $('#ddldpt option:selected').val();
        $scope.ValidationAgencyModel.ValidationAgencyEntryBy = 1;
        $http({
            method: 'post',
            url: $scope.urlBase + '/ValidationAgency/Save',
            data: $scope.ValidationAgencyModel,
        }).then(function (response) {
            HideLoader();
            $scope.CancelClick();
            $scope.GetValidationAgencyList();
        }, function (error) {
            HideLoader();
            console.log(error);
        });
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

    $scope.init = function () {
        checkToken();
        $("#ddlPageSize").val(5);
        $scope.ValidationAgencyModel.PageSize = $("#ddlPageSize").val();
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.GetValidationAgencyList();

    }

    $scope.init();


}]);