CRAdminApp.controller("MainContractorController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();
    $scope.AddNew = false;
    $scope.Details = true;

    $scope.TotalRecords = 0;
    $scope.TotalPages = 0

    $scope.ContractorModel = { PageNo: 1, PageSize: 5, ContractorId: 0,ContractorName:"",ContractorCompanyName:"",
        ContractorRegistrationNo: "", ContractorGstNo: "", ContractorOfficeAddress: "", ContractorPhoneNo: ""
    };

    $scope.PageSizeList = [5, 10, 15, 20];
    $scope.ContractorList = [];

    $scope.AddNewClick = function () {
        $scope.AddNew = true;
        $scope.Details = false;
        $scope.ContractorModel = {
            PageNo: 1, PageSize: $("#ddlPageSize").val(), ContractorId: 0, ContractorName: "", ContractorCompanyName: "",
            ContractorRegistrationNo: "", ContractorGstNo: "", ContractorOfficeAddress: "", ContractorPhoneNo: ""
        };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.ContractorModel = {
            PageNo: 1, PageSize: $("#ddlPageSize").val(), ContractorId: 0, ContractorName: "", ContractorCompanyName: "",
            ContractorRegistrationNo: "", ContractorGstNo: "", ContractorOfficeAddress: "", ContractorPhoneNo: ""
        };
    }

    $scope.Save = function () {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/Contractor/Save',
            data: $scope.ContractorModel,
        }).then(function (response) {
            HideLoader();
            $scope.CancelClick();
            $scope.GetContractorList();
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }

    $scope.Prev = function () {
        if ($scope.ContractorModel.PageNo > 1) {
            $scope.ContractorModel.PageNo--;
            $scope.GetContractorList();
        }
    }

    $scope.Next = function () {
        if ($scope.ContractorModel.PageNo < $scope.TotalPages) {
            $scope.ContractorModel.PageNo++;
            $scope.GetContractorList();
        }
    }

    $scope.GetContractorList = function () {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/Contractor/GetContractorList',
            data: $scope.ContractorModel,
        }).then(function (response) {
            HideLoader();
            $scope.ContractorList = response.data;
            if (response.data.length > 0) {
                $scope.TotalRecords = response.data[0].TotalRecords;
                $scope.TotalPages = parseInt($scope.TotalRecords / $scope.ContractorModel.PageSize);
                var reminder = $scope.TotalRecords % $scope.ContractorModel.PageSize;
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
        $scope.ContractorModel.PageSize = $("#ddlPageSize").val();
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.GetContractorList();

    }

    $scope.init();


}]);