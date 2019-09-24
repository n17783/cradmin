 CRAdminApp.controller("DMJoiningProcessController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {
        $scope.urlBase = GetVirtualDirectory();
        $scope.IsNewUser = undefined;
        $scope.IsBank = 2;
        $scope.IsFamyly = 2;
        $scope.Prefix = "";
        $scope.Details = true;
        $scope.Buttons = true;
        $scope.NewButtons = true;
        $scope.BankDetails = [];
        $scope.FamilyDetails = [];
        $scope.DMJoiningList = [];
        $scope.GetJoiningDetails = [];
        $scope.StaffJoiningModel = [];
        $scope.StaffJoiningModelEmpId=[];
        $scope.StaffJoiningModelEmpId = { EmpDetailsId: "" };
        //$scope.GetJoiningDetails1 = { AadharNo: "", FullName: "", EmpDesignation: "", DmJoiningDate:"",RowNum:"" };
        var objdatehelper = new datehelper({ format: "dd/MM/yyyy", cdate: new Date() });
        $scope.Emp = { PageNo: 1, PageSize: 2, Prefix:"", AadharNo: "", Regt_No: "", FName: "", MName: "", LName: "", DOB: "", EmpPhoto: "" };
        $scope.EmpDetails = {
            EmpDetailsId: 0, PkId: 0,
            ContractorId: "", DeptZoneId: 0, ValidationAgencyId: "",
            IsAlreadyValidated: 0, TradeId: 0, ProfileImage: "", DeptId: "", ProjectTypeId: ""
        };
        $scope.ErrorModel = {
            AadharNo: false, ErrorMessageAdhaarNo: "", DmJoiningDate: false, ErrorMessageStaffJoiningDate: "", Appointment: "", ErrorMessageAppointment:""
       
        };
        $scope.Joining = { PageNo: 1, PageSize: 2, Prefix: "", AadharNo: "", RowNum: "" };
    

        $scope.StaffJoiningModel = {
            DMJoiningId: "", SalaryFinalization: null, Biometric: null, AddPhotos: null, JobApplicationLetter: null
                              , BankForm: null, FormNo35: null, FormNo2: null, PkId: "",FormNo11:null,
                              ContractualEndDate: "", StaffExitDate: "", CsmCard: null,
                              DmJoiningDate: "", Duration: "", DurationTypeM_Y: "", OfferLater: null,
                              IsPassIssue: null, ContractualPermenant: null, DeploymenForm: null, EmpDetailsId: "", Flag1: "",
                              HasBankAccountOpen: null, IsSaftyShoesIssue: null, IsTradeValidationPass: null, IsSefetyInductionDone: null, IsWorkAtHightDone: null, IsConfinedspaceDone: null, IsNomineeDetailsDone:null
        };
        $scope.EmpExit = {};
        $scope.Cleardatastaffsearsh = function () {
            $("#chkSalFin").prop("checked", false);
            $("#chkBio").prop("checked", false);
            $("#chkAddPhotos").prop("checked", false);
            $("#chkJALetter").prop("checked", false);
            $("#chkBForm").prop("checked", false);
            $("#chkFormNo35").prop("checked", false);
            $("#chkFormNo2").prop("checked", false);
            $("#chkFormNo11").prop("checked", false);
            $("#chkTradeValidation").prop("checked", false);
            $("#chkSafetyInduction").prop("checked", false);
            $("#chkWorkatHeight").prop("checked", false);
            $("#chkConfinedSpace").prop("checked", false);
            $("#chkCSMCard").prop("checked", false);
            $("#chkSafetyShoes").prop("checked", false);
            $("#chkOfferLatter").prop("checked", false);
            $("#chkDeploymentForm").prop("checked", false);
            $("#chkPassIssueDate").prop("checked", false);
            $("#chkBankAccountOpen").prop("checked", false);
            $("#chkNomineeDetails").prop("checked", false);
         
            // $scope.Emp = { PageNo: 1, PageSize: 2, Prefix: "", AadharNo: "", Regt_No: "", FName: "", MName: "", LName: "", DOB: "", EmpPhoto: "" };
            $scope.TermesAppoi = [];
            $scope.DurationPerioed = []; 
            $scope.TermesAppoi = [{ name: "Permanent" }, { name: "Contractual" }];
            $scope.DurationPerioed = [{ name: "0" }, { name: "1" }, { name: "2" }, { name: "3" }, { name: "4" }, { name: "5" },
                { name: "6" }, { name: "7" }, { name: "8" }, { name: "9" }, { name: "10" }, { name: "11" }, { name: "12" }];
         
        
        
            $scope.TermesAppoi.splice(0, 0, { name: 0, name: "---Select Term of Appointment---" });
            var html1 = "";
            angular.forEach($scope.TermesAppoi, function (value, key) {
                html1 += "<option value='" + value.name + "'>" + value.name + "</option>";
            });
            $("#ddlTOAppointment").html(html1);
            var html2= "";
            angular.forEach($scope.DurationPerioed, function (value, key) {
                html2 += "<option value='" + value.name + "'>" + value.name + "</option>";
            });
            $("#ddlDurationTypeM_Y").html(html2);
            var html3 = "";
            angular.forEach($scope.DurationPerioed, function (value, key) {
                html3 += "<option value='" + value.name + "'>" + value.name + "</option>";
            });
            $("#ddlDuration").html(html3);
       
        }
        $scope.ChangeDropDown = function () {
            $("#chkTravel").prop("checked", false);
            $("#chkMedicalcheck").prop("checked", false);
            $("#chkEasily").prop("checked", false);
            $scope.StaffJoiningModel = {
                DMJoiningId: "", SalaryFinalization: null, Biometric: null, AddPhotos: null, JobApplicationLetter: null
                              , BankForm: null, FormNo35: null, FormNo2: null, PkId: "", FormNo11: null,
                ContractualEndDate: "", StaffExitDate: "", CsmCard: null,
                DmJoiningDate: "", Duration: "", DurationTypeM_Y: "", OfferLater: null,
                IsPassIssue: null, ContractualPermenant: null, DeploymenForm: null, EmpDetailsId: "", Flag1: "",
                HasBankAccountOpen: null, IsSaftyShoesIssue: null, IsTradeValidationPass: null, IsSefetyInductionDone: null, IsWorkAtHightDone: null, IsConfinedspaceDone: null, IsNomineeDetailsDone: null
            };

            $scope.TermesAppoi = [];
            $scope.DurationPerioed = [];
            $scope.TermesAppoi = [{ name: "Permanent" }, { name: "Contractual" }];
            $scope.DurationPerioed = [{ name: "0" }, { name: "1" }, { name: "2" }, { name: "3" }, { name: "4" }, { name: "5" },
                { name: "6" }, { name: "7" }, { name: "8" }, { name: "9" }, { name: "10" }, { name: "11" }, { name: "12" }];



            $scope.TermesAppoi.splice(0, 0, { name: 0, name: "---Select Term of Appointment---" });
            var html1 = "";
            angular.forEach($scope.TermesAppoi, function (value, key) {
                html1 += "<option value='" + value.name + "'>" + value.name + "</option>";
            });
            $("#ddlTOAppointment").html(html1);
            var html2 = "";
            angular.forEach($scope.DurationPerioed, function (value, key) {
                html2 += "<option value='" + value.name + "'>" + value.name + "</option>";
            });
            $("#ddlDurationTypeM_Y").html(html2);
            var html3 = "";
            angular.forEach($scope.DurationPerioed, function (value, key) {
                html3 += "<option value='" + value.name + "'>" + value.name + "</option>";
            });
            $("#ddlDuration").html(html3);

        }
        $scope.GetDoneJoiningStaffList = function ()
        {
            $scope.Details = false;
            if ($scope.Joining.AadharNo.length < 12) {
                $scope.ErrorModel.AadharNo = true;
                $scope.ErrorModel.ErrorMessageAdhaarNo = "Please Enter Valid Aadhar Number.";
                valid = false;
            }
            else {
                if ($scope.Joining.AadharNo.length == 12) {
                    ShowLoader();
                    $http({
                        method: 'post',
                        url: $scope.urlBase + '/DMJoiningProcess/GetJoiningDoneStaffList',
                        data: $scope.Joining,
                        beforeSend: function (request) {
                            request.setRequestHeader("Token", getToken());
                        },
                    }).then(function (response) {
                        HideLoader();
                        console.log(response);
                        if (response.data == "") {
                         
                            var objShowCustomAlert = new ShowCustomAlert({
                                Title: "Warning",
                                Message: "No such user exist.",
                                Type: "alert"
                            });
                            objShowCustomAlert.ShowCustomAlertBox();
                        
                        }
                        else {
                            $scope.GetJoiningDetails = response.data;
                            var objShowCustomAlert = new ShowCustomAlert({
                                Title: "Warning",
                                Message: "This user already exist in system.",
                                Type: "alert"
                            });

                        }
                 
                    })
                }
            }
        }
        $("#chkTravel").prop("checked", false);
        $("#chkMedicalcheck").prop("checked", false );
        $("#chkEasily").prop("checked", false);
   
    
        $scope.AddNew = function () {
            $scope.ChangeDropDown();
            $scope.Details = true;
        }
   
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
                        url: $scope.urlBase + '/DMJoiningProcess/CheckUserForStaffJoining',
                        data: $scope.Emp,
                        beforeSend: function (request) {
                            request.setRequestHeader("Token", getToken());
                        },
                    }).then(function (response) {
                        HideLoader();
                        console.log(response);
                        if (response.data == "") {
                            $scope.ChangeDropDown();
                            $scope.NewButtons = true;
                            $scope.Buttons = true;
                        
                            var objShowCustomAlert = new ShowCustomAlert({
                                Title: "Warning",
                                Message: "No such user exist. you have to register new user.",
                                Type: "alert"
                            });
                            objShowCustomAlert.ShowCustomAlertBox();
                            $scope.Cleardatastaffsearsh();
                            $scope.Emp = { PageNo: 1, PageSize: 2, Prefix: "", AadharNo: "", Regt_No: "", FName: "", MName: "", LName: "", DOB: "", EmpPhoto: "" };
                            $scope.IsNewUser = 5;
                            $scope.IsFamyly = 2;
                            $scope.IsBank = 2;

                        }
                        else {
                            var objShowCustomAlert = new ShowCustomAlert({
                                Title: "Warning",
                                Message: "This user already exist in system.",
                                Type: "alert"
                            });
                            objShowCustomAlert.ShowCustomAlertBox();
                            $scope.Emp = response.data.Emp;
                            $scope.EmpDetails = response.data.EmpDetails;
                            $scope.EmpExit = response.data.EmpExit;
                            $scope.FamilyDetails = response.data.FamilyDetails;
                            $scope.BankDetails = response.data.BankDetails;
                            $scope.DMJoiningList = response.data.DMJoiningList;
                            $scope.StaffJoiningModel = $scope.DMJoiningList;
                            $scope.StaffJoiningModelEmpId.EmpDetailsId = response.data.EmpDetails.EmpDetailsId;
                        
                            if ($scope.EmpExit.IsExit == 0) {
                                $scope.IsNewUser = 0;
                            }
                            else {
                                $scope.IsNewUser = 2;
                            }
                            if ($scope.FamilyDetails.IsFD > 0) {
                                $scope.IsFamyly = 0;
                            }
                            else {
                                $scope.IsFamyly = 1;
                            }
                            if ($scope.BankDetails.IsEBD >0) {
                                $scope.IsBank = 0;
                            }
                            else {
                                $scope.IsBank = 1;
                            }
                            if ($scope.DMJoiningList.DMJoiningId > 0) {
                                $scope.Buttons = false;
                                $scope.NewButtons = true;
                                if ($scope.DMJoiningList.SalaryFinalization == 1) {
                                    $("#chkSalFin").prop("checked", true);

                                }
                                else {
                                    $("#chkSalFin").prop("checked", false);
                                }
								
                                if ($scope.StaffJoiningModel.Biometric  == 1) {

                                
                                    $("#chkBio").prop("checked",true);
                                }
                                else {
                                    $("#chkBio").prop("checked",false);
                                }
							
                                if ($scope.StaffJoiningModel.AddPhotos == 1) {

                                
                                    $("#chkAddPhotos").prop("checked",true);
                                }
                                else {
                                    $("#chkAddPhotos").prop("checked",false);
                                }
							
							
                                if ($scope.StaffJoiningModel.JobApplicationLetter == 1) {
                                    $("#chkJALetter").prop("checked",true);
                                
                                }
                                else {
                                    $("#chkJALetter").prop("checked",false);
                                }
							
                                if ( $scope.StaffJoiningModel.BankForm== 1) {
                                    $("#chkBForm").prop("checked",true);
                                
                                }
                                else {
                                    $("#chkBForm").prop("checked",false);
                                }
                                if ($scope.StaffJoiningModel.FormNo35 == 1) {
                                    $("#chkFormNo35").prop("checked",true);
                               
                                }
                                else {
                                    $("#chkFormNo35").prop("checked",false);
                                }
                                if ( $scope.StaffJoiningModel.FormNo2== 1) {
                                    $("#chkFormNo2").prop("checked",true);
                                
                                }
                                else {
                                    $("#chkFormNo2").prop("checked",false);
                                }
                                if ($scope.StaffJoiningModel.FormNo11 == 1) {
                                    $("#chkFormNo11").prop("checked",true); 
                               
                                }
                                else {
                                    $("#chkFormNo11").prop("checked",false); 
                                }
                                if ($scope.StaffJoiningModel.IsTradeValidationPass == 1) {
                                    $("#chkTradeValidation").prop("checked",true);
                                
                                }
                                else {
                                    $("#chkTradeValidation").prop("checked",false);
                                }
                                if ($scope.StaffJoiningModel.IsSefetyInductionDone  == 1) {
                                    $("#chkSafetyInduction").prop("checked",true);
                               
                                }
                                else {
                                    $("#chkSafetyInduction").prop("checked",false);
                                }
                                if ( $scope.StaffJoiningModel.IsWorkAtHightDone == 1) {
                                    $("#chkWorkatHeight").prop("checked",true);
                               
                                }
                                else {
                                    $("#chkWorkatHeight").prop("checked",false);
                                }
                                if ($scope.StaffJoiningModel.IsConfinedspaceDone == 1) {
                                    $("#chkConfinedSpace").prop("checked",true);
                                    
                                }
                                else {
                                    $("#chkConfinedSpace").prop("checked",false);
                                }
                                if ($scope.StaffJoiningModel.CsmCard == 1) {
                                    $("#chkCSMCard").prop("checked",true);
                                 
                                }
                                else {
                                    $("#chkCSMCard").prop("checked",false);
                                }
                                if ($scope.StaffJoiningModel.IsSaftyShoesIssue == 1) {
                                    $("#chkSafetyShoes").prop("checked", true);

                                }
                                else {
                                    $("#chkSafetyShoes").prop("checked", false);
                                }
							
                                    if ($scope.StaffJoiningModel.OfferLater == 1) {
                                        $("#chkOfferLatter").prop("checked",true);
                                 
                                    }
                                    else {
                                        $("#chkOfferLatter").prop("checked",false);
                                    }
							
                                    if ( $scope.StaffJoiningModel.IsPassIssue  == 1) {
                                        $("#chkPassIssueDate").prop("checked",true);
                              
                                    }
                                    else {
                                        $("#chkPassIssueDate").prop("checked",false);
                                    }
                                    if ( $scope.StaffJoiningModel.DeploymenForm == 1) {
                                        $("#chkDeploymentForm").prop("checked",true);
                               
                                    }
                                    else {
                                        $("#chkDeploymentForm").prop("checked",false);
                                    }
                                    if ($scope.StaffJoiningModel.HasBankAccountOpen == 1) {
                                        $("#chkBankAccountOpen").prop("checked",true);
                                 
                                    }
                                    else {
                                        $("#chkBankAccountOpen").prop("checked",false);
                                    }
                                    if ($scope.StaffJoiningModel.IsNomineeDetailsDone == 1) {
                                        $("#chkNomineeDetails").prop("checked",true);
                                     
                                    }
                                    else {
                                        $("#chkNomineeDetails").prop("checked",false);
                                    }
                                if ($scope.DMJoiningList.ContractualPermenant ==1) {
                                    html2 = "";
                                    html2 += '<option value="' + 'Permanent' + '">' + 'Permanent' + '</option>';
                                    $("#ddlTOAppointment").html(html2);

                                }
                                if ($scope.DMJoiningList.ContractualPermenant == 0) {
                                    html2 = "";
                                    html2 += '<option value="' + 'Contractual' + '">' + 'Contractual' + '</option>';
                                    $("#ddlTOAppointment").html(html2);
                                }
                              
                               
                                var html4 = "";
                                if ($scope.DMJoiningList.DurationTypeM_Y != "") {
                                    html4 = "";
                                    html4 += '<option value="' + $scope.DMJoiningList.DurationTypeM_Y + '">' + $scope.DMJoiningList.DurationTypeM_Y + '</option>';
                                    $("#ddlDurationTypeM_Y").html(html4);
                                }
                                var html5 = "";
                                if ($scope.DMJoiningList.Duration != "") {
                                    html5 = "";
                                    html5 += '<option value="' + $scope.DMJoiningList.Duration + '">' + $scope.DMJoiningList.Duration + '</option>';
                                    $("#ddlDuration").html(html5);
                                }
                                $scope.StaffJoiningModel.ContractualEndDate = objdatehelper.getFormatteddate($filter('mydate')($scope.StaffJoiningModel.ContractualEndDate), "dd/MM/yyyy");
                                $scope.StaffJoiningModel.StaffExitDate = objdatehelper.getFormatteddate($filter('mydate')($scope.StaffJoiningModel.StaffExitDate), "dd/MM/yyyy");
                                $scope.StaffJoiningModel.DmJoiningDate = objdatehelper.getFormatteddate($filter('mydate')($scope.DMJoiningList.DmJoiningDate), "dd/MM/yyyy");


                            }
                            else {
                                $scope.Cleardatastaffsearsh()
                            
                                $scope.ChangeDropDown();
                                $scope.NewButtons = false;
                                $scope.Buttons = true;
                            }
                
                        
                            //else block of cheking joining id
                        }
        
                        ///////

                    }, function (error) {
                        HideLoader();
                        console.log(error);
                    })
                }
            }
        }

        $scope.StaffJoiningModel = {
            DMJoiningId: "", SalaryFinalization: null, Biometric: null, AddPhotos: null, JobApplicationLetter: null
                              , BankForm: null, FormNo35: null, FormNo2: null, PkId: "", FormNo11: null,
            ContractualEndDate: "", StaffExitDate: "", CsmCard: null,
            DmJoiningDate: "", Duration: "", DurationTypeM_Y: "", OfferLater: null,
            IsPassIssue: null, ContractualPermenant: null, DeploymenForm: null, EmpDetailsId: "", Flag1: "",
            HasBankAccountOpen: null, IsSaftyShoesIssue: null, IsTradeValidationPass: null, IsSefetyInductionDone: null, IsWorkAtHightDone: null, IsConfinedspaceDone: null, IsNomineeDetailsDone: null
        };
        $scope.NewJoinStaff = function () {
            if ($scope.Validate()) {
                var objShowCustomAlert = new ShowCustomAlert({
                    Title: "Error",
                    Message: "Are You Want To Save This Record",
                    Type: "confirm",
                    OnOKClick: function () {
                        if ($scope.Emp.AadharNo.length == 12 && $scope.StaffJoiningModel.DmJoiningDate != "") {
                            if ($("#chkSalFin").prop("checked") == true) {
                                $scope.StaffJoiningModel.SalaryFinalization = true;
                            }
                            else {
                                $scope.StaffJoiningModel.SalaryFinalization = false;
                            }


                            if ($("#chkBio").prop("checked") == true) {

                                $scope.StaffJoiningModel.Biometric = true;
                            }
                            else {
                                $scope.StaffJoiningModel.Biometric = false;
                            }
                            if ($("#chkAddPhotos").prop("checked") == true) {

                                $scope.StaffJoiningModel.AddPhotos = true;
                            }
                            else {
                                $scope.StaffJoiningModel.AddPhotos = false;
                            }
                            if ($("#chkJALetter").prop("checked") == true) {

                                $scope.StaffJoiningModel.JobApplicationLetter = true;
                            }
                            else {
                                $scope.StaffJoiningModel.JobApplicationLetter = false;
                            }
                            if ($("#chkBForm").prop("checked") == true) {

                                $scope.StaffJoiningModel.BankForm = true;
                            }
                            else {
                                $scope.StaffJoiningModel.BankForm = false;
                            }
                            if ($("#chkFormNo35").prop("checked") == true) {

                                $scope.StaffJoiningModel.FormNo35 = true;
                            }
                            else {
                                $scope.StaffJoiningModel.FormNo35 = false;
                            }
                            if ($("#chkFormNo2").prop("checked") == true) {

                                $scope.StaffJoiningModel.FormNo2 = true;
                            }
                            else {
                                $scope.StaffJoiningModel.FormNo2 = false;
                            }
                            if ($("#chkFormNo11").prop("checked") == true) {

                                $scope.StaffJoiningModel.FormNo11 = true;
                            }
                            else {
                                $scope.StaffJoiningModel.FormNo11 = false;
                            }
                            if ($("#chkTradeValidation").prop("checked") == true) {

                                $scope.StaffJoiningModel.IsTradeValidationPass = true;
                            }
                            else {
                                $scope.StaffJoiningModel.IsTradeValidationPass = false;
                            }
                            if ($("#chkSafetyInduction").prop("checked") == true) {

                                $scope.StaffJoiningModel.IsSefetyInductionDone = true;
                            }
                            else {
                                $scope.StaffJoiningModel.IsSefetyInductionDone = false;
                            }
                            if ($("#chkWorkatHeight").prop("checked") == true) {

                                $scope.StaffJoiningModel.IsWorkAtHightDone = true;
                            }
                            else {
                                $scope.StaffJoiningModel.IsWorkAtHightDone = false;
                            }
                            if ($("#chkConfinedSpace").prop("checked") == true) {

                                $scope.StaffJoiningModel.IsConfinedspaceDone = true;
                            }
                            else {
                                $scope.StaffJoiningModel.IsConfinedspaceDone = false;
                            }
                            if ($("#chkCSMCard").prop("checked") == true) {

                                $scope.StaffJoiningModel.CsmCard = true;
                            }
                            else {
                                $scope.StaffJoiningModel.CsmCard = false;
                            }
                            if ($("#chkSafetyShoes").prop("checked") == true) {

                                $scope.StaffJoiningModel.IsSaftyShoesIssue = true;
                            }
                            else {
                                $scope.StaffJoiningModel.IsSaftyShoesIssue = false;
                            }
                            if ($("#chkOfferLatter").prop("checked") == true) {

                                $scope.StaffJoiningModel.OfferLater = true;
                            }
                            else {
                                $scope.StaffJoiningModel.OfferLater = false;
                            }
                            if ($("#chkPassIssueDate").prop("checked") == true) {

                                $scope.StaffJoiningModel.IsPassIssue = true;
                            }
                            else {
                                $scope.StaffJoiningModel.IsPassIssue = false;
                            }
                            if ($("#chkDeploymentForm").prop("checked") == true) {

                                $scope.StaffJoiningModel.DeploymenForm = true;
                            }
                            else {
                                $scope.StaffJoiningModel.DeploymenForm = false;
                            }
                            if ($("#chkBankAccountOpen").prop("checked") == true) {

                                $scope.StaffJoiningModel.HasBankAccountOpen = true;
                            }
                            else {
                                $scope.StaffJoiningModel.HasBankAccountOpen = false;
                            }
                            if ($("#chkNomineeDetails").prop("checked") == true) {

                                $scope.StaffJoiningModel.IsNomineeDetailsDone = true;
                            }
                            else {
                                $scope.StaffJoiningModel.IsNomineeDetailsDone = false;
                            }
                            $scope.StaffJoiningModel.DurationTypeM_Y = $("#ddlDurationTypeM_Y").val();
                            $scope.StaffJoiningModel.Duration = $("#ddlDuration").val();
                            if ($("#ddlTOAppointment").val() == "Contractual") {
                                $scope.StaffJoiningModel.ContractualPermenant = false;
                                var date = new Date($scope.StaffJoiningModel.DmJoiningDate);
                                var jodate = moment(date);
                                var retdate = moment(jodate).add($scope.StaffJoiningModel.DurationTypeM_Y, 'month');
                                var asidate = moment(retdate).add($scope.StaffJoiningModel.Duration, 'year');
                                $scope.StaffJoiningModel.ContractualEndDate = asidate.format('MM-DD-YYYY');

                            }
                            if ($("#ddlTOAppointment").val() == "Permanent") {
                                $scope.StaffJoiningModel.ContractualPermenant = true;
                                $scope.StaffJoiningModel.ContractualEndDate = null;
                            }
                            var date1 = new Date($scope.StaffJoiningModel.DmJoiningDate);
                            var date2 = moment(date1);
                            $scope.StaffJoiningModel.DmJoiningDate = date2.format('MM-DD-YYYY');
                            $scope.StaffJoiningModel.EmpDetailsId = $scope.StaffJoiningModelEmpId.EmpDetailsId;
                            $scope.StaffJoiningModel.DMJoiningId = null;
                            $scope.StaffJoiningModel.Flag1 = "Insert1";


                            $http({
                                method: 'post',
                                url: $scope.urlBase + '/DMJoiningProcess/SaveStaffForJoining',
                                data: $scope.StaffJoiningModel,
                                beforeSend: function (request) {
                                    request.setRequestHeader("Token", getToken());
                                },
                            }).then(function (response) {
                                HideLoader();
                                if (response.data.Status == 1) {

                                    var objShowCustomAlert = new ShowCustomAlert({
                                        Title: "Success",
                                        Message: "Employee Joined Successfully.",
                                        Type: "alert",
                                        OnOKClick: function () {

                                        }
                                    });
                               
                                    objShowCustomAlert.ShowCustomAlertBox();
                                    $scope.Emp = { PageNo: 1, PageSize: 2, Prefix: "", AadharNo: "", Regt_No: "", FName: "", MName: "", LName: "", DOB: "", EmpPhoto: "" };
                                    $scope.Cleardatastaffsearsh();
                                    $scope.IsNewUser = 5;
                                    $scope.IsFamyly = 2;
                                    $scope.IsBank = 2;
                                    $scope.NewButtons = true;
                                }
                                else {
                                    var objShowCustomAlert = new ShowCustomAlert({
                                        Title: "Success",
                                        Message: "Technical Error Occured.",
                                        Type: "alert",
                                        OnOKClick: function () {

                                        }
                                    });
                                    objShowCustomAlert.ShowCustomAlertBox();
                                    $scope.Emp = { PageNo: 1, PageSize: 2, Prefix: "", AadharNo: "", Regt_No: "", FName: "", MName: "", LName: "", DOB: "", EmpPhoto: "" };
                                    $scope.Cleardatastaffsearsh();
                                    $scope.IsNewUser = 5;
                                    $scope.IsFamyly = 2;
                                    $scope.IsBank = 2;
                                    $scope.NewButtons = true;
                                }
                            }, function (error) {
                                HideLoader();
                                console.log(error);
                            });
                        }

                    }
                });
                objShowCustomAlert.ShowCustomAlertBox();
            }
        }
        $scope.Update = function () {
            if ($scope.Validate()) {
                var objShowCustomAlert = new ShowCustomAlert({
                    Title: "Error",
                    Message: "Are You Want To Save This Record",
                    Type: "confirm",
                    OnOKClick: function () {
                        if ($scope.Emp.AadharNo.length == 12 && $scope.StaffJoiningModel.DmJoiningDate != "") {
                            if ($("#chkSalFin").prop("checked") == true) {
                                $scope.StaffJoiningModel.SalaryFinalization = true;
                            }
                            else {
                                $scope.StaffJoiningModel.SalaryFinalization = false;
                            }


                            if ($("#chkBio").prop("checked") == true) {

                                $scope.StaffJoiningModel.Biometric = true;
                            }
                            else {
                                $scope.StaffJoiningModel.Biometric = false;
                            }
                            if ($("#chkAddPhotos").prop("checked") == true) {

                                $scope.StaffJoiningModel.AddPhotos = true;
                            }
                            else {
                                $scope.StaffJoiningModel.AddPhotos = false;
                            }
                            if ($("#chkJALetter").prop("checked") == true) {

                                $scope.StaffJoiningModel.JobApplicationLetter = true;
                            }
                            else {
                                $scope.StaffJoiningModel.JobApplicationLetter = false;
                            }
                            if ($("#chkBForm").prop("checked") == true) {

                                $scope.StaffJoiningModel.BankForm = true;
                            }
                            else {
                                $scope.StaffJoiningModel.BankForm = false;
                            }
                            if ($("#chkFormNo35").prop("checked") == true) {

                                $scope.StaffJoiningModel.FormNo35 = true;
                            }
                            else {
                                $scope.StaffJoiningModel.FormNo35 = false;
                            }
                            if ($("#chkFormNo2").prop("checked") == true) {

                                $scope.StaffJoiningModel.FormNo2 = true;
                            }
                            else {
                                $scope.StaffJoiningModel.FormNo2 = false;
                            }
                            if ($("#chkFormNo11").prop("checked") == true) {

                                $scope.StaffJoiningModel.FormNo11 = true;
                            }
                            else {
                                $scope.StaffJoiningModel.FormNo11 = false;
                            }
                            if ($("#chkTradeValidation").prop("checked") == true) {

                                $scope.StaffJoiningModel.IsTradeValidationPass = true;
                            }
                            else {
                                $scope.StaffJoiningModel.IsTradeValidationPass = false;
                            }
                            if ($("#chkSafetyInduction").prop("checked") == true) {

                                $scope.StaffJoiningModel.IsSefetyInductionDone = true;
                            }
                            else {
                                $scope.StaffJoiningModel.IsSefetyInductionDone = false;
                            }
                            if ($("#chkWorkatHeight").prop("checked") == true) {

                                $scope.StaffJoiningModel.IsWorkAtHightDone = true;
                            }
                            else {
                                $scope.StaffJoiningModel.IsWorkAtHightDone = false;
                            }
                            if ($("#chkConfinedSpace").prop("checked") == true) {

                                $scope.StaffJoiningModel.IsConfinedspaceDone = true;
                            }
                            else {
                                $scope.StaffJoiningModel.IsConfinedspaceDone = false;
                            }
                            if ($("#chkCSMCard").prop("checked") == true) {

                                $scope.StaffJoiningModel.CsmCard = true;
                            }
                            else {
                                $scope.StaffJoiningModel.CsmCard = false;
                            }
                            if ($("#chkSafetyShoes").prop("checked") == true) {

                                $scope.StaffJoiningModel.IsSaftyShoesIssue = true;
                            }
                            else {
                                $scope.StaffJoiningModel.IsSaftyShoesIssue = false;
                            }
                            if ($("#chkOfferLatter").prop("checked") == true) {

                                $scope.StaffJoiningModel.OfferLater = true;
                            }
                            else {
                                $scope.StaffJoiningModel.OfferLater = false;
                            }
                            if ($("#chkPassIssueDate").prop("checked") == true) {

                                $scope.StaffJoiningModel.IsPassIssue = true;
                            }
                            else {
                                $scope.StaffJoiningModel.IsPassIssue = false;
                            }
                            if ($("#chkDeploymentForm").prop("checked") == true) {

                                $scope.StaffJoiningModel.DeploymenForm = true;
                            }
                            else {
                                $scope.StaffJoiningModel.DeploymenForm = false;
                            }
                            if ($("#chkBankAccountOpen").prop("checked") == true) {

                                $scope.StaffJoiningModel.HasBankAccountOpen = true;
                            }
                            else {
                                $scope.StaffJoiningModel.HasBankAccountOpen = false;
                            }
                            if ($("#chkNomineeDetails").prop("checked") == true) {

                                $scope.StaffJoiningModel.IsNomineeDetailsDone = true;
                            }
                            else {
                                $scope.StaffJoiningModel.IsNomineeDetailsDone = false;
                            }
                            $scope.StaffJoiningModel.DurationTypeM_Y = $("#ddlDurationTypeM_Y").val();
                            $scope.StaffJoiningModel.Duration = $("#ddlDuration").val();
                            if ($("#ddlTOAppointment").val() == "Contractual") {
                                $scope.StaffJoiningModel.ContractualPermenant = false;

                            }
                            if ($("#ddlTOAppointment").val() == "Permanent") {
                                $scope.StaffJoiningModel.ContractualPermenant = true;
                            }

                            $scope.StaffJoiningModel.DmJoiningDate = new Date().toLocaleDateString();
                            $scope.StaffJoiningModel.ContractualEndDate = new Date().toLocaleDateString();
                            $scope.StaffJoiningModel.Flag1 = "Update1";



                            $http({
                                method: 'post',
                                url: $scope.urlBase + '/DMJoiningProcess/SaveStaffForJoining',
                                data: $scope.StaffJoiningModel,
                                beforeSend: function (request) {
                                    request.setRequestHeader("Token", getToken());
                                },
                            }).then(function (response) {
                                HideLoader();
                                if (response.data.Status == 1) {
                                    var objShowCustomAlert = new ShowCustomAlert({
                                        Title: "Success",
                                        Message: "Employee Updated Successfully.",
                                        Type: "alert",
                                        OnOKClick: function () {

                                        }
                                    });
                                    $scope.ChangeDropDown();
                                    $scope.Cleardatastaffsearsh();
                                    $scope.IsNewUser = 5;
                                    $scope.IsFamyly = 2;
                                    $scope.IsBank = 2;
                                    $scope.Buttons = true;
                                    $scope.Emp = { PageNo: 1, PageSize: 2, Prefix: "", AadharNo: "", Regt_No: "", FName: "", MName: "", LName: "", DOB: "", EmpPhoto: "" };
                                    objShowCustomAlert.ShowCustomAlertBox();
                                }
                                else {
                                    var objShowCustomAlert = new ShowCustomAlert({
                                        Title: "Success",
                                        Message: "Technical Error Occured.",
                                        Type: "alert",
                                        OnOKClick: function () {

                                        }
                                    });
                                    objShowCustomAlert.ShowCustomAlertBox();
                                    $scope.ChangeDropDown();
                                    $scope.Cleardatastaffsearsh();
                                    $scope.IsNewUser = 5;
                                    $scope.IsFamyly = 2;
                                    $scope.IsBank = 2;
                                    $scope.Buttons = true;
                                    $scope.Emp = { PageNo: 1, PageSize: 2, Prefix: "", AadharNo: "", Regt_No: "", FName: "", MName: "", LName: "", DOB: "", EmpPhoto: "" };

                                }
                            }, function (error) {
                                HideLoader();
                                console.log(error);
                            });
                        }
                    
                    }
                });
                objShowCustomAlert.ShowCustomAlertBox();
            }
        }
        $scope.Validate = function () {
       
            var valid = true;
            if ($scope.Emp.AadharNo.length > 12 && $scope.Emp.AadharNo.length < 12) {
                $scope.ErrorModel.AadharNo = true;
                $scope.ErrorModel.ErrorMessageAdhaarNo = "Please Enter Valid AadharNo.";
                valid = false;
            }
            else {
                $scope.ErrorModel.AadharNo = false;
                valid = true;
            }
            if (valid)
            {
                if($("#ddlTOAppointment").val()=="---Select Term of Appointment---")
                {
                    $scope.ErrorModel.Appointment = true;
                    $scope.ErrorModel.ErrorMessageAppointment = "Please Select Appointment.";
                    valid = false;
                }
                else
                {
                    $scope.ErrorModel.Appointment = false;
                    valid = true;

                }

            }
            if (valid) {
                if ($scope.StaffJoiningModel.DmJoiningDate == "") {
                    $scope.ErrorModel.DmJoiningDate = true;
                    $scope.ErrorModel.ErrorMessageStaffJoiningDate = "Please Select Date Once Again.";
                    valid = false;

                }
                else {
                    $scope.ErrorModel.DmJoiningDate = false;
                    valid = true;
                }
            }
            if (valid) {
                if ($("#ddlTOAppointment").val() == "Contractual") {
                    if ($("#ddlDurationTypeM_Y").val() == 0 && $("#ddlDuration").val() == 0) {
                        valid = false;
                        var objShowCustomAlert = new ShowCustomAlert({
                            Title: "Success",
                            Message: "Please Select Month Or Year For Contractual Person ",
                            Type: "alert"
                        });
                        objShowCustomAlert.ShowCustomAlertBox();
                    }

                }

            }
        
            return valid;
        }


        $scope.init = function () {
            setCookie("Token", $('#hdnToken').val());
            checkToken();
            $("#ddlPageSize").val(5);
        

        
            $("#dtStaffJoining").datepicker({
                format: "dd-MM-yyyy",
                autoclose: true,
                todayHighlight: false
            
            }).datepicker('update', new Date());

       

       

        }

        $scope.init();
    }]);