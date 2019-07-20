CRAdminApp.controller("CategoryController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();
    $scope.AddNew = false;
    $scope.Details = true;

    $scope.TotalRecords = 0;
    $scope.TotalPages = 0

    $scope.TradeModal = { PageNo: 1, PageSize: 2, TradCDescription: "" };

    $scope.AddNewClick = function () {
        $scope.AddNew = true;
        $scope.Details = false;
        $scope.TradeModal = { PageNo: 1, PageSize: 2, TradCDescription: "" };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.TradeModal = { PageNo: 1, PageSize: 2, TradCDescription: "" };
    }

    $scope.TradeList = [];

    $scope.Save = function () {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/Category/Save',
            data: $scope.TradeModal,
        }).then(function (response) {
            HideLoader();
            $scope.CancelClick();
            $scope.GetTradeDetails();
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }

    $scope.GetTradeDetails = function () {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/Category/GetTrade',
            data: $scope.TradeModal,
        }).then(function (response) {
            HideLoader();
            $scope.TradeList = response.data;
            if (response.data.length > 0) {
                $scope.TotalRecords = response.data[0].TotalRecords;
                $scope.TotalPages = parseInt($scope.TotalRecords / $scope.TradeModal.PageSize);
                var reminder = $scope.TotalRecords % $scope.TradeModal.PageSize;
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
        if ($scope.TradeModal.PageNo > 1) {
            $scope.TradeModal.PageNo--;
            $scope.GetTradeDetails();
        }
    }

    $scope.Next = function () {
        if ($scope.TradeModal.PageNo < $scope.TotalPages) {
            $scope.TradeModal.PageNo++;
            $scope.GetTradeDetails();
        }
    }

    $scope.init = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.GetTradeDetails();

    }

    $scope.init();
}]);