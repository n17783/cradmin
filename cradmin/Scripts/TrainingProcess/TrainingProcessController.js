
CRAdminApp.controller("TrainingProcessController", ['$scope', '$http', '$filter', '$rootScope',
    function ($scope, $http, $filter, $rootScope) {
    $scope.urlBase = GetVirtualDirectory();
  

    $scope.GetTrainingProcessDetails = function () {
        ShowLoader();
        var pValue = SelectedValidaterModel;
        $http({
            method: 'post',
            url: $scope.urlBase + '/CandidatesForValidation/GetTrainingProcessDetails',
            data: $scope.TrainingProcessDetailsModel,
        }).then(function (response) {
            debugger;
            if (response.data.length > 0) {
                $scope.TrainingProcessDetailsResponse = {
                    ExmSInductionName: response.data[0].ExmSInductionName,
                    ExmSInductionDate: response.data[0].ExmSInductionDate,
                    ExmSInductionMarks: response.data[0].ExmSInductionMarks,
                    ExmSInductionPassFail: response.data[0].ExmSInductionPassFail,
                    ExmSInductionIsDone: response.data[0].ExmSInductionIsDone,
                    ExmCSpaceName: response.data[0].ExmCSpaceName,
                    ExmCSpaceDate: response.data[0].ExmCSpaceDate,
                    ExmCSpaceMarks: response.data[0].ExmCSpaceMarks,
                    ExmCSpacePassFail: response.data[0].ExmCSpacePassFail,
                    ExmCSpaceIsDone: response.data[0].ExmCSpaceIsDone,
                    ExmWAtHightName: response.data[0].ExmWAtHightName,
                    ExmWAtHightDate: response.data[0].ExmWAtHightDate,
                    ExmWAtHightMarks: response.data[0].ExmWAtHightMarks,
                    ExmWAtHightPassFail: response.data[0].ExmWAtHightPassFail,
                    ExmWAtHightIsDone: response.data[0].ExmWAtHightIsDone,
                    Name: pValue.Name,
                    RegistrationNo: pValue.RegistrationNo,
                    TraineeRegistrationNo: pValue.TraineeRegNo
                };
            }
            HideLoader();
            
        }, function (error) {            
            HideLoader();
            console.log(error);
        });
    }

    $scope.filterNumericValue = function ($event) {
        if (isNaN(String.fromCharCode($event.keyCode))) {
            $event.preventDefault();
        }
    };

    $scope.init = function () {
        debugger;
        var pValue = SelectedValidaterModel;

        checkToken();
        
        $scope.TrainingProcessDetailsModel = {
            EmpDetailsId: pValue.EmpDetailsId
        };
        $scope.TrainingProcessDetailsResponse = {
            ExmSInductionName: '', ExmSInductionDate: '', ExmSInductionMarks: '', ExmSInductionPassFail: '', ExmSInductionIsDone: '',
            ExmCSpaceName: '', ExmCSpaceDate: '', ExmCSpaceMarks: '', ExmCSpacePassFail: '', ExmCSpaceIsDone: '',
            ExmWAtHightName: '', ExmWAtHightDate: '', ExmWAtHightMarks: '', ExmWAtHightPassFail: '', ExmWAtHightIsDone: '',
            Name: pValue.Name, RegistrationNo: pValue.RegistrationNo, TraineeRegistrationNo: pValue.RegistrationNo
        };
        $scope.GetTrainingProcessDetails();

    }

    $scope.init();

}]);