CRAdminApp.controller("AssessmentReportStatusController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.AssessmentReportStatusModel = [];
    $scope.AssessmentID='';
    $scope.ApplicationID = '';
    $scope.EmpValidationId = 0;
    $scope.init = function () {
        debugger;
        $scope.urlBase = GetVirtualDirectory();
        $('body').removeClass('modal-open');
        var mValue = SelectedValidaterModel;

        $scope.AssessmentReportStatusModel = {
            AssessmentID: mValue.AssessmentID, ApplicationID: mValue.ApplicationID,
            EmpValidationId: mValue.EmpValidationId
        };
        $scope.AssessmentID = mValue.AssessmentID;
        $scope.ApplicationID = mValue.ApplicationID;
        $scope.EmpValidationId = mValue.EmpValidationId;
    }

    $scope.init();


}]);