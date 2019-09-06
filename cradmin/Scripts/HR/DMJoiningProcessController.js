CRAdminApp.controller("DMJoiningProcessController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    

    $scope.Emp = { AadharNo: "" };
   
    $scope.ErrorModel = { AadharNo: false, ErrorMessageAdhaarNo: "" };
    
    $scope.CheckAdhaarExist = function () {
        if ($scope.Emp.AadharNo.length < 12) {
            $scope.ErrorModel.AadharNo = true;
            $scope.ErrorModel.ErrorMessageAdhaarNo = "Please Enter Valid Aadhar Number.";
            valid = false;
        }
        else {
            var adhaarno = $scope.Emp.AadharNo;
            $scope.ErrorModel.ErrorMessageAdhaarNo = "";
            if ($scope.Emp.AadharNo.length == 12) {
                ShowLoader();
                $http({
                    method: 'post',
                    url: $scope.urlBase + '/Dashboard/CheckAdhaarExist',
                    data: $scope.Emp,
                    beforeSend: function (request) {
                        request.setRequestHeader("Token", getToken());
                    },
                }).then(function (response) {
                    HideLoader();
                    console.log(response);
                    if (response.data == "") {
                        $scope.ClearOldData();
                        $scope.Emp.AadharNo = adhaarno;
                        $scope.IsNewUser = 1;
                        var objShowCustomAlert = new ShowCustomAlert({
                            Title: "Warning",
                            Message: "No such user exist. you have to register new user.",
                            Type: "alert"
                        });
                        objShowCustomAlert.ShowCustomAlertBox();
                        $("#rdoMale").prop("checked", true);


                    }
                    else {
                        var objShowCustomAlert = new ShowCustomAlert({
                            Title: "Warning",
                            Message: "This user already exist in system.",
                            Type: "alert"
                        });
                        objShowCustomAlert.ShowCustomAlertBox();
                        $("#webcam").hide();
                        $("#imgCapture").show();
                        $("#imgCapture").attr("src", response.data.Emp.EmpPhoto);
                        $scope.Emp = response.data.Emp;
                        $scope.EmpDetails = response.data.EmpDetails;
                        $scope.EmpExit = response.data.EmpExit;
                        if ($scope.EmpExit.IsExit == 0) {
                            $scope.IsNewUser = 0;
                        }
                        else {
                            $scope.IsNewUser = 2;
                        }
                        if ($scope.Emp.Gender) {
                            $("#rdoMale").prop("checked", true);
                        }
                        else {
                            $("#rdoFemale").prop("checked", false);
                        }
                        if ($scope.EmpDetails.IsDMorStaff) {
                            $("#rdoDM").prop("checked", true);
                        }
                        else {
                            $("#rdoStaff").prop("checked", true);
                        }
                        $scope.changeEmpType();
                        $scope.Emp.DOB = objdatehelper.getFormatteddate($filter('mydate')($scope.Emp.DOB), "dd/mm/yyyy");
                        $scope.EmpDetails.DateOfReport = objdatehelper.getFormatteddate($filter('mydate')($scope.EmpDetails.DateOfReport), "dd/mm/yyyy");
                        $("#ddlCountry").val($scope.EmpDetails.TCountryId);
                        $scope.BindStateList();
                        $("#ddlState").val($scope.EmpDetails.TStateId);
                        $scope.BindDistrictList();
                        $("#ddlDistrict").val($scope.EmpDetails.TDisticId);
                        $("#ddlPCountry").val($scope.EmpDetails.PCountryId);
                        $scope.BindStateList();
                        $("#ddlPState").val($scope.EmpDetails.PStateId);
                        $scope.BindDistrictList();
                        $("#ddlPDistrict").val($scope.EmpDetails.PDisticId);
                        $("#ddlZone").val($scope.EmpDetails.DeptZoneId);
                        $("#ddlVAgency").val($scope.EmpDetails.ValidationAgencyId);
                        $("#ddlTrade").val($scope.EmpDetails.TradeId);
                        $("#ddlIdProofType").val($scope.EmpDetails.IdProofType);
                        $("#ddlEmpType").val($scope.EmpDetails.EmpTypeId);
                        $("#ddlContractor").val($scope.EmpDetails.ContractorId);
                        $("#ddlSDep").val($scope.EmpDetails.DeptId);
                    }
                }, function (error) {
                    HideLoader();
                    console.log(error);
                })
            }
        }
    }


   

    

    $scope.init = function () {
        setCookie("Token", $('#hdnToken').val());
        checkToken();
        

    }

    $scope.init();
}]);

