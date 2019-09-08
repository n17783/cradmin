
CRAdminApp.controller("CandidatesForTrainingController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {
    $scope.urlBase = GetVirtualDirectory();

    $scope.TotalRecords = 0;
    $scope.TotalPages = 0;
    $scope.GridContentText = "Loading...";

    $scope.CandidatesForValidationModel = {
        PageNo: 1, PageSize: 10, getCandidates: 'CandidatesForTraining'
    };

    $scope.CandidatesForValidationList = [];
    $scope.PageSizeList = [{ id: 5, name: "5" }, { id: 10, name: "10" }, { id: 15, name: "15" }, { id: 20, name: "20" }];
    $scope.PagerDDLSelectedValue = $scope.PageSizeList[1];

    $scope.changedValue = function (item) {
            $scope.CandidatesForValidationModel.PageNo = 1;
            $scope.CandidatesForValidationModel.PageSize = item.id;
            $scope.GetCandidatesForValidationList();      
    }

    $scope.Prev = function () {
        if ($scope.CandidatesForValidationModel.PageNo > 1) {
            $scope.CandidatesForValidationModel.PageNo--;
            $scope.GetCandidatesForValidationList();
        }
    }

    $scope.Next = function () {
        if ($scope.CandidatesForValidationModel.PageNo < $scope.TotalPages) {
            $scope.CandidatesForValidationModel.PageNo++;
            $scope.GetCandidatesForValidationList();
        }
    }

    $scope.GetCandidatesForValidationList = function () {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/CandidatesForValidation/GetCandidatesForValidationList',
            data: $scope.CandidatesForValidationModel,
        }).then(function (response) {
            HideLoader();
            $scope.CandidatesForValidationList = response.data;
            debugger;

            if (response.data.length > 0) {
                $scope.TotalRecords = response.data[0].TotalRecords;
                $scope.TotalPages = parseInt($scope.TotalRecords / $scope.CandidatesForValidationModel.PageSize);
                var reminder = $scope.TotalRecords % $scope.CandidatesForValidationModel.PageSize;
                if (reminder > 0) {
                    $scope.TotalPages++;
                }
            }
            else
                $scope.GridContentText = "No data found";
        }, function (error) {
            $scope.GridContentText = "No data found";
            HideLoader();
            console.log(error);
        });
    }

    $scope.TrainingProcess = function (obj) {
        debugger;
        SelectedValidaterModel = obj;
        SelectedValidaterModel.PageType = 'CandidatesForTraining';
        $scope.LoadUserControls('TrainingProcess');
    }

    $scope.init = function () {
        debugger;

        checkToken();
        $scope.CandidatesForValidationModel.getCandidates = 'CandidatesForTraining';

        $('.modal-backdrop').hide();
        $scope.CandidatesForValidationModel.PageSize = 10;
        $scope.Details = true;
        //getCandidates
        $scope.GetCandidatesForValidationList();

    }

    $scope.init();

}]);