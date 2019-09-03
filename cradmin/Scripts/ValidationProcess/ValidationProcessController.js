CRAdminApp.controller("ValidationProcessController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();
    $scope.TotalMarks = 0;
    $scope.ObtainedMarks = 0;
    $scope.OutofPer = 0.00;
    $scope.ObtainedPer = 0;
    $scope.OutOfMarks = 0;
    $scope.PassinngPer = 0;
    $scope.isWrittenTest = false;
    $scope.resultCriteriaTest = '';   
    $scope.ValidationProcessModel = {
        Name: '', RegistrationNo: '', Date:'',TestType:''
    };

    $scope.ValidateQuestionsList = [];

    $scope.CancelValidation=function(){
        $scope.LoadUserControls('CandidatesForValidation');
    }

    $scope.GetQuestionsList = function () {
        debugger;
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/CandidatesForValidation/GetQuestionsList',
            data: $scope.ValidationProcessModel,
        }).then(function (response) {
            debugger;
            HideLoader();
            $scope.ValidateQuestionsList = response.data;
            if ($scope.ValidateQuestionsList.length > 0)
            {
                $scope.TradeName = $scope.ValidateQuestionsList[0].TradDescription;
                $scope.TradeCName = $scope.ValidateQuestionsList[0].TradCDescription;
            }
           

            $scope.TotalMarks = $scope.ValidateQuestionsList.length * 5;
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }

    $scope.calMarks = function () {
        debugger;
        var ObtainedMarks = 0;        
            $('.radio-marks').each(function (ind, rdbtn) {
                if (rdbtn.checked)
                    ObtainedMarks += parseInt(rdbtn.value);
            });        
        $scope.ObtainedMarks = ObtainedMarks;
    }

    $scope.validateTest = function () {
        debugger;
        $('#error_written_marks').hide();
        if (SelectedTestType == 'Written') {           
            if ($('#written_marks').val() == "") {
                $('#error_written_marks').show();
                return;
            }
            else if (parseInt($('#written_marks').val()) > $scope.TotalMarks) {
                $('#error_written_marks').show();
                return;
            }
            $scope.ObtainedMarks = parseInt($('#written_marks').val());
        }
        $scope.ObtainedPer = parseFloat(parseInt($scope.ObtainedMarks) / parseInt($scope.TotalMarks), 2) * 100;
        $scope.OutofPer = parseFloat(parseFloat($scope.OutOfMarks / 100, 2) * $scope.ObtainedPer, 2).toFixed(2);
        $('#VPConfermDialog').modal('show');
    }

    $scope.resetTestResult = function (callFrom) {
        $('#VPConfermDialog').modal('hide');
        if (callFrom === 'modal-written-marks') {
            $('#modal-written-marks').modal('hide');
            $scope.LoadUserControls('CandidatesForValidation');
        }
    }

    $scope.setWrittentTestMarks = function () {
        debugger;
        if ($('#written_totial_e_marks').val() == "") {
            $('#error_written_totial_e_marks').show();
            return;
        }

        $scope.TotalMarks = parseInt($('#written_totial_e_marks').val());
        $('#modal-written-marks').modal('hide');
    }

    $scope.VPFinalSubmit = function () {
        debugger;
        ShowLoader();
        $scope.ValidationProcessSaveModel = {
            EmpValidationId: SelectedValidaterModel.EmpValidationId, EmpDetailsId: SelectedValidaterModel.EmpDetailsId,
            TradeId: 0, VAgencyId: 0, VDoneFlag: 0, VIsContinew: 0,
            VResult: 0, VAssTekenBy: 0,
            TestType: SelectedTestType, TestTakenByEmpId: SelectedValidaterModel.SrNo, TestTotalMarks: $scope.OutOfMarks, TestObtainMarks: $scope.OutofPer,
            TResult: $scope.ObtainedPer < $scope.PassinngPer ? 0 : 1
        }
        $http({
            method: 'post',
            url: $scope.urlBase + '/CandidatesForValidation/SaveValidatonProcess',
            data: $scope.ValidationProcessSaveModel,
        }).then(function (response) {
            debugger;
            HideLoader();
            $('#VPConfermDialog').modal('hide');
            $scope.LoadUserControls('CandidatesForValidation');

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
        $('body').removeClass('modal-open');
        var mValue = SelectedValidaterModel;
        var d = new Date();

        var month = d.getMonth() + 1;
        var day = d.getDate();

        var cDate = (day < 10 ? '0' : '') + day + '/' +
            (month < 10 ? '0' : '') + month + '/' + d.getFullYear();
            
        $scope.isWrittenTest = false;

        if (SelectedTestType == 'Oral') {
            $scope.OutOfMarks = 30;
            $scope.resultCriteriaTest = '40% or 12 marks out of 30 marks';
            $scope.PassinngPer = 40;
        }
        else if (SelectedTestType == 'Practical') {
            $scope.OutOfMarks = 60;
            $scope.resultCriteriaTest = '60% or 36 marks out of 60 marks';
            $scope.PassinngPer = 40;
        }
        else if (SelectedTestType == 'Written') {
            $scope.OutOfMarks = 10;
            $scope.isWrittenTest = true;           
            $scope.resultCriteriaTest = '40% or 4 marks out of 10 marks';
            $scope.PassinngPer = 40;
        }
        debugger;
        $scope.ValidationProcessModel = {
            Name: mValue.Name, PRN: mValue.PRN, Date: cDate, TestType: SelectedTestType, SrNo: mValue.SrNo,
            EmpDetailsId: mValue.EmpDetailsId, TradeName: mValue.TradeName, TradeCName: mValue.TradeCategory
        };
    

        if (SelectedTestType != 'Written')
            $scope.GetQuestionsList();
        else
            $('#modal-written-marks').modal('show');
       
    }

    $scope.init();


}]);