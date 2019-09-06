
CRAdminApp.controller("CandidatesForAssessmentController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {
    $scope.urlBase = GetVirtualDirectory();

    $scope.TotalRecords = 0;
    $scope.TotalPages = 0;
    $scope.GridContentText = "Loading...";

    $scope.CandidatesForValidationModel = {
        PageNo: 1, PageSize: 10, getCandidates: 'AssessmentReport'
    };

    $scope.PageSizeList = [5, 10, 15, 20];
    $scope.CandidatesForValidationList = [];

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

    $scope.AssessReport = function (obj) {
                      
            SelectedValidaterModel = obj;            
            $scope.LoadUserControls('AssessmentReport');       
}

    $scope.init = function () {
        

        checkToken();
        $scope.CandidatesForValidationModel.getCandidates = 'AssessmentReport';
       
        $('.modal-backdrop').hide();
        $("#ddlPageSize").val(5);
        $scope.CandidatesForValidationModel.PageSize = 10;
        $scope.Details = true;
        //getCandidates
        $scope.GetCandidatesForValidationList();

    }

    $scope.init();

}]);