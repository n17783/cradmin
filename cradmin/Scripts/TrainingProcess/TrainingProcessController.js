
CRAdminApp.controller("TrainingProcessController", ['$scope', '$http', '$filter', '$rootScope',
    function ($scope, $http, $filter, $rootScope) {
        var pValue = SelectedValidaterModel;

    $scope.urlBase = GetVirtualDirectory();


    $scope.GetTrainingProcessDetails = function () {
        ShowLoader();
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
                $('#SI_result').val(response.data[0].ExmSInductionPassFail);
                $('#CS_result').val(response.data[0].ExmCSpacePassFail);
                $('#WH_result').val(response.data[0].ExmWAtHightPassFail);
                
                //if (response.data[0].ExmSInductionPassFail != null) {
                //    $('#SI_marks').attr('readonly', 'readonly');
                //    $('#SI_result').attr('readonly', 'readonly');
                //}
                //if (response.data[0].ExmCSpacePassFail != null) {
                //    $('#CS_marks').attr('readonly', 'readonly');
                //    $('#CS_result').attr('readonly', 'readonly');
                //}
                //if (response.data[0].ExmWAtHightPassFail != null) {
                //    $('#WH_marks').attr('readonly', 'readonly');
                //    $('#WH_result').attr('readonly', 'readonly');
                //}
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

    $scope.TrainingProcessSave = function () {
        debugger;
        if (pValue.PageType != 'TrainedCandidates') {
            ShowLoader();
            $('.errorMsg').addClass('hide');
            if ($('#SI_result option:selected').val().trim() == "" && $('#CS_result option:selected').val().trim() == "" && $('#WH_result option:selected').val().trim() == "") {
                $('.errorMsg').removeClass('hide');
                HideLoader();
            }
            else {
                $scope.TrainingProcessDetailsRequest = {
                    BTrainingId: pValue.BTrainingId,
                    EmpDetailsId: pValue.EmpDetailsId,
                    ExmSInductionName: $('#SI_name').val(),
                    ExmSInductionDate: $('#SI_date').val(),
                    ExmSInductionMarks: $('#SI_marks').val(),
                    ExmSInductionPassFail: $('#SI_result option:selected').val(),
                    ExmCSpaceName: $('#CS_name').val(),
                    ExmCSpaceDate: $('#CS_date').val(),
                    ExmCSpaceMarks: $('#CS_marks').val(),
                    ExmCSpacePassFail: $('#CS_result option:selected').val(),
                    ExmWAtHightName: $('#WH_name').val(),
                    ExmWAtHightDate: $('#WH_date').val(),
                    ExmWAtHightMarks: $('#WH_marks').val(),
                    ExmWAtHightPassFail: $('#WH_result option:selected').val()
                };
                $http({
                    method: 'post',
                    url: $scope.urlBase + '/CandidatesForValidation/SaveTrainingProcessDetails',
                    data: $scope.TrainingProcessDetailsRequest,
                }).then(function (response) {
                    debugger;
                    pValue.BTrainingId = response.data;
                    $scope.onBackPage();
                    HideLoader();

                }, function (error) {
                    HideLoader();
                    console.log(error);
                });
            }
        }
    }

    $scope.onBackPage = function () {
        $scope.LoadUserControls(pValue.PageType);
    }

    $scope.init = function () {
        debugger;
       

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
        if (pValue.PageType == 'TrainedCandidates')
        {
            $('.dtcontrol').attr('readonly', 'readonly');
            $('.dtcontrol').attr('disabled', 'disabled');
            $('.btnTrainingProcessSave').hide();
        }

        $scope.GetTrainingProcessDetails();

    }

    $scope.init();

}]);