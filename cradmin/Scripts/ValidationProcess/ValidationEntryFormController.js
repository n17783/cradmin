CRAdminApp.controller("ValidationEntryFormController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {
        $scope.urlBase = GetVirtualDirectory();
        $scope.ZoneList = [];
        $scope.TradeList = [];
        $scope.ValidationAgencyList = [];
        $scope.EmployeeTypeList = [];
        $scope.SubContractorList = [];
        $scope.CountryList = [];
        $scope.StateList = [];
        $scope.CityList = [];
        $scope.DeptList = [];
        $scope.ProjectTypeList = [];
        $scope.AssignTradeList = [];
        $scope.TradeList = [];
        $scope.IsNewUser = undefined;
        //$scope.Token = getCookie("Token");
        $scope.Emp = { PageNo: 1, PageSize: 2, AdhaarNo: "", Regt_No: "", FName: "", MName: "", LName: "", DOB: "", EmpPhoto: "" };
        $scope.EmpDetails = {
            EmpDetailsId: 0, PkId: 0, 
            ContractorId: "",  DeptZoneId: 0, ValidationAgencyId: "",
            IsAlreadyValidated: 0, TradeId: 0, ProfileImage: "",  DeptId: "", ProjectTypeId: ""
        };

      
        $scope.EmpExit = {};
        var objdatehelper = new datehelper({ format: "dd/MM/yyyy", cdate: new Date() });
       
    

        function GetMasterDataList() {
            ShowLoader();
            $http({
                method: 'post',
                url: $scope.urlBase + '/Dashboard/GetMasterDataforRegister',
                beforeSend: function (request) {
                    request.setRequestHeader("Token", getToken());},
                data: $scope.Emp,
            }).then(function (response) {
                HideLoader();
                if (response.data.Status == 1) {
                    $scope.ZoneList = response.data.ZoneList;
                    //$scope.TradeList = response.data.TradeList;
                    $scope.ValidationAgencyList = response.data.ValidationAgencyList;
                    $scope.EmployeeTypeList = response.data.EmployeeTypeList;
                    $scope.SubContractorList = response.data.SubContractorList;
                    $scope.CountryList = response.data.CountryList;
                    $scope.StateList = response.data.StateList;
                    $scope.CityList = response.data.CityList;
                    $scope.DeptList = response.data.DeptList;
                    $scope.ProjectTypeList = response.data.ProjectTypeList;
                    $scope.CountryList.splice(0, 0, { ContryId: 0, ContryName: "---Select Country---" });
                    $scope.ZoneList.splice(0, 0, { DeptZoneId: 0, DeptZoneDescription: "---Select Zone---" });
                    //$scope.TradeList.splice(0, 0, { TradeId: 0, TradDescription: "---Select Trade---" });
                    $scope.ValidationAgencyList.splice(0, 0, { ValidationAgencyId: 0, AgencyDescription: "---Select Agency---" });
                    $scope.EmployeeTypeList.splice(0, 0, { EmpTypeId: 0, EmpDesignation: "---Select Employee Type---" });
                    $scope.SubContractorList.splice(0, 0, { SubContractorId: 0, SubCCompanyName: "---Select Contractor---" });
                    $scope.DeptList.splice(0, 0, { DeptId: 0, Dept_Name: "---Select Sub Department---" });
                    $scope.ProjectTypeList.splice(0, 0, { ProjectTypeId: 0, ProjectTypeDescription: "---Select Project type---" });
                    var html = "";
                    angular.forEach($scope.ZoneList, function (value, key) {
                        html += "<option value='" + value.DeptZoneId + "'>" + value.DeptZoneDescription + "</option>";
                    });
                    $("#ddlZone").html(html);
                    //var html = "";
                    //angular.forEach($scope.EmployeeTypeList, function (value, key) {
                    //    html += "<option value='" + value.EmpTypeId + "'>" + value.EmpDesignation + "</option>";
                    //});
                    //$("#ddlEmpType").html(html);
                    //var html = "";
                    //angular.forEach($scope.TradeList, function (value, key) {
                    //    html += "<option value='" + value.TradeId + "'>" + value.TradDescription + "</option>";
                    //});
                    //$("#ddlTrade").html(html);


                    var html2 = "";
                    angular.forEach($scope.ValidationAgencyList, function (value, key) {
                        html2 += "<option value='" + value.ValidationAgencyId + "'>" + value.AgencyDescription + "</option>";
                    });
                    $("#ddlVAgency").html(html2);

                    var html4 = "";
                    angular.forEach($scope.SubContractorList, function (value, key) {
                        html4 += "<option value='" + value.SubContractorId + "'>" + value.SubCCompanyName + "</option>";
                    });
                    $("#ddlContractor").html(html4);

                    var html5 = "";
                    angular.forEach($scope.CountryList, function (value, key) {
                        html5 += "<option value='" + value.ContryId + "'>" + value.ContryName + "</option>";
                    });
                    $("#ddlCountry").html(html5);
                    $("#ddlPCountry").html(html5);
                    var html5 = "";
                    angular.forEach($scope.DeptList, function (value, key) {
                        html5 += "<option value='" + value.DeptId + "'>" + value.Dept_Name + "</option>";
                    });
                    $("#ddlSDep").html(html5);
                    var html5 = "";
                    angular.forEach($scope.ProjectTypeList, function (value, key) {
                        html5 += "<option value='" + value.ProjectTypeId + "'>" + value.ProjectTypeDescription + "</option>";
                    });
                    $("#ddlProjectType").html(html5);

                }
                else {
                    window.location = $scope.urlBase + "/dashboard/index";
                }
            }, function (error) {
                HideLoader();
                console.log(error);
            });
        }

        $scope.ErrorModel = {
            AdhaarNo: false, ErrorMessageAdhaarNo: "",
            MappingDate: false, ErrorMessageMappingDate: "",
            DeptZoneId: false, ErrorMessageDeptZoneId: "",
            ValidationAgencyId: false, ErrorMessageValidationAgencyId: "", TradeId: false, ErrorMessageTradeId: "",
            DeptId: false, ErrorMessageDeptId: "", ContractorId: false, ErrorMessageContractorId: "",
            ProjectTypeId: false, ErrorMessageProjectTypeId: "", FilePath: false, ErrorMessageFilePath:""
        };

        $scope.Validate = function () {
            var valid = true;
            if ($scope.Emp.AadharNo.length < 12 || $scope.Emp.AadharNo.length > 12) {
                $scope.ErrorModel.AadharNo = true;
                $scope.ErrorModel.ErrorMessageAdhaarNo = "Please Enter Valid Aadhar Number.";
                valid = false;
            }
            else {
                valid = true;
                $scope.ErrorModel.AadharNo = false;
            }
            
            if (valid) {
                if ($scope.MultiValidation.MappingDate == "") {
                    $scope.ErrorModel.MappingDate = true;
                    $scope.ErrorModel.ErrorMessageMappingDate = "Date Of Assign Validation.";
                    valid = false;
                }
                else {
                    valid = true;
                    $scope.ErrorModel.MappingDate = false;
                }
            }
            if (valid) {
                if ($("#ddlZone").val() <= 0) {
                    $scope.ErrorModel.DeptZoneId = true;
                    $scope.ErrorModel.ErrorMessageDeptZoneId = "Select Zone";
                    valid = false;
                }
                else {
                    valid = true;
                    $scope.ErrorModel.DeptZoneId = false;
                }
            }
            if (valid) {
                if ($("#ddlContractor").val() <= 0) {
                    $scope.ErrorModel.ContractorId = true;
                    $scope.ErrorModel.ErrorMessageContractorId = "Select Contractor";
                    valid = false;
                }
                else {
                    valid = true;
                    $scope.ErrorModel.ContractorId = false;
                }
            }
            if (valid) {
                if ($("#ddlProjectType").val() <= 0) {
                    $scope.ErrorModel.ProjectTypeId = true;
                    $scope.ErrorModel.ErrorMessageProjectTypeId = "Select ProjectType";
                    valid = false;
                }
                else {
                    valid = true;
                    $scope.ErrorModel.ProjectTypeId = false;
                }
            }
            if (valid) {
                if ($("#chkIsAlreadyValidated").prop("checked") == true) {
                    if ($("#InputFilePath").val() == "") {
                        $scope.ErrorModel.FilePath = true;
                        $scope.ErrorModel.ErrorMessageFilePath = "Select Validation Certificate";
                        valid = false;
                    }

                    else {
                        valid = true
                        $scope.ErrorModel.FilePath = false;
                        
                    }

                }
            }
            if (valid) {
                if ($("#ddlVAgency").val() <= 0) {
                    $scope.ErrorModel.ValidationAgencyId = true;
                    $scope.ErrorModel.ErrorMessageValidationAgencyId = "Select Validation Agency";
                    valid = false;
                }
                else {
                    valid = true;
                    $scope.ErrorModel.ValidationAgencyId = false;
                }
            }
            if (valid) {
                if ($("#ddlTrade").val() <= 0) {
                    $scope.ErrorModel.TradeId = true;
                    $scope.ErrorModel.ErrorMessageTradeId = "Select Trade";
                    valid = false;
                }
                else {
                    valid = true;
                    $scope.ErrorModel.TradeId = false;
                }
            }
            if (valid) {
                if ($("#ddlSDep").val() <= 0) {
                    $scope.ErrorModel.DeptId = true;
                    $scope.ErrorModel.ErrorMessageDeptId = "Select Sub Department";
                    valid = false;
                }
                else {
                    valid = true;
                    $scope.ErrorModel.DeptId = false;
                }
            }
            
           
            return valid
        }

       

        

        $scope.vacerti = true;
        $scope.checkAlreadyValidated = function ()
        {
            if ($("#chkIsAlreadyValidated").prop("checked") == true) {
                $scope.MultiValidation.IsAlreadyValidated = true;
                $scope.vacerti = false;
            }
            else {
                $scope.vacerti = true;
                $scope.MultiValidation.IsAlreadyValidated = false;
                $("#InputFilePath").val("");
            }
        }
        $scope.MultiValidation = {
            MappingId: "", TradeId: "", ValidationAgencyId: "", DeptZoneId: "", MappingDate: "",
            IsAlreadyValidated: "", EmpDetailsId: "", VCertificatePath: "", ProjectTypeId: "", ContractorId: "", CreatedBy: 0
        };
        $scope.RegisterStaff = function () {
           
            if ($scope.Validate()) {
                var objShowCustomAlert = new ShowCustomAlert({
                    Title: "Error",
                    Message: "Are You Want To Save This Record",
                    Type: "confirm",
                    OnOKClick: function () {
                    ShowLoader();
                    $scope.MultiValidation.EmpDetailsId = $scope.EmpDetails.EmpDetailsId;
                    $scope.MultiValidation.DeptZoneId = $("#ddlZone").val();
                    $scope.MultiValidation.ValidationAgencyId = $("#ddlVAgency").val();
                    $scope.MultiValidation.TradeId = $("#ddlTrade").val();
                    $scope.MultiValidation.ContractorId = $("#ddlContractor").val();
                    $scope.MultiValidation.DeptId = $("#ddlSDep").val();
                    $scope.MultiValidation.ProjectTypeId = $("#ddlProjectType").val();
                    $scope.MultiValidation.VCertificatePath = $("#hdnVCertificatePath").val();
                    if ($("#chkIsAlreadyValidated").prop("checked") == true) {
                        $scope.MultiValidation.IsAlreadyValidated = true;
                    }
                    else {
                        $scope.MultiValidation.IsAlreadyValidated = false;
                    }
                    $http({
                        method: 'post',

                        url: $scope.urlBase + '/Dashboard/MultiTrade',
                        data: $scope.MultiValidation,
                        beforeSend: function (request) {
                            request.setRequestHeader("Token", getToken());
                        },
                    }).then(function (response) {
                        HideLoader();
                        if (response.data.Status == 0) {
                            var objShowCustomAlert = new ShowCustomAlert({
                                Title: "Error",
                                Message: "This Record Is All Ready Exist",
                                Type: "alert"
                            });
                            objShowCustomAlert.ShowCustomAlertBox();
                            $scope.IsNewUser = 2;

                        }
                        else {
                            $scope.IsNewUser = 2;
                            $scope.ClearOldData();
                            var objShowCustomAlert = new ShowCustomAlert({
                                Title: "Success",
                                Message: "Record Seved Successfully",
                                Type: "alert"
                            });
                            objShowCustomAlert.ShowCustomAlertBox();
                        }
                    }, function (error) {
                        HideLoader();
                        console.log(error);
                    });
                    }
                });
                objShowCustomAlert.ShowCustomAlertBox();
            }
        }
                
            
        

        $scope.ClearOldData = function () {
            $scope.Emp = { PageNo: 1, PageSize: 2, AdhaarNo: "", Regt_No: "", Gender: 0, FName: "", MName: "", LName: "", EmpPhoto: "" };
            $scope.EmpDetails = {
                EmpDetailsId: 0, PkId: 0,  DateOfReport: "",
                ContractorId: 1,  DeptZoneId: 0, ValidationAgencyId: 0,
                IsAlreadyValidated: 0, TradeId: 0, ProfileImage: "", DeptId: ""
            };
            $scope.MultiValidation = {
                MappingId: "", TradeId: "", ValidationAgencyId: "", DeptZoneId: "", MappingDate: "",
                IsAlreadyValidated: "", EmpDetailsId: "", VCertificatePath: "", ProjectTypeId: "", ContractorId: "", CreatedBy: 0
            };
        }

        $scope.modelAadhar = {PageNo:"",PageSize:"",EmpDetailsId:""};

        $scope.CheckAdhaarExist = function () {
            $scope.TradeList = [];
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
                        url: $scope.urlBase + '/Dashboard/CheckUserForMultiValidation',
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
                            $("#ddlAssignTrade").val("");
                            var objShowCustomAlert = new ShowCustomAlert({
                                Title: "Warning",
                                Message: "No Such User Exist Of DM Type.",
                                Type: "alert"
                            });
                            objShowCustomAlert.ShowCustomAlertBox();
                            $("#rdoMale").prop("checked", true);
                        }
                        else {
                            $scope.IsNewUser = 0;
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


                            $("#ddlEmpType").val($scope.EmpDetails.EmpTypeId);
                            $scope.Emp.AadharNo = $scope.Emp.AadharNo;
                            $scope.AssignTradeList = response.data.AssignTradeList;
                            $scope.AssignTradeList.splice(0, 0, { TradeId: 0, TradDescription: "---See Assign Trade---" });
                            var html = "";
                            angular.forEach($scope.AssignTradeList, function (value, key) {
                                html += "<option value='" + value.TradeId + "'>" + value.TradDescription + "</option>";
                            });
                            $("#ddlAssignTrade").html(html);
                            $scope.modelAadhar.EmpDetailsId = $scope.EmpDetails.EmpDetailsId;
                            $scope.getFilterTradeList();
                        }
                    }, function (error) {
                        HideLoader();
                    })
                }
            }
        }

        $scope.getFilterTradeList = function () {
            $scope.modelAadhar.EmpDetailsId = $scope.EmpDetails.EmpDetailsId;
            $http({
                method: 'post',
                url: $scope.urlBase + '/Dashboard/GetEmpFilterTradeList',
                data: $scope.modelAadhar,
                beforeSend: function (request) {
                    request.setRequestHeader("Token", getToken());
                },
            }).then(function (response) {
                $scope.TradeFilterList = response.data;
                $scope.TradeFilterList.splice(0, 0, { TradeId: 0, TradDescription: "---Select filter Trade---" });
                var html = "";
                angular.forEach($scope.TradeFilterList, function (value, key) {
                    html += "<option value='" + value.TradeId + "'>" + value.TradDescription + "</option>";
                });
                $("#ddlTrade").html(html);

            }, function (error) {
                HideLoader();
                console.log(error);
            })
        }

        function Capture() {
            webcam.capture();
        }

        $scope.init = function () {
            setCookie("Token",$('#hdnToken').val());
            checkToken();
            $("#ddlPageSize").val(5);
            $scope.Emp.PageSize = $("#ddlPageSize").val();
           
            $scope.EmpDetails.IsAlreadyValidated = false;
            $("#dtMapping").datepicker({
                format: "dd-MM-yyyy",
                autoclose: true,
                todayHighlight: true
            }).datepicker('update', new Date());

           
           
            GetMasterDataList();

        }

        $scope.init();
    }]);

function Capture() {
    webcam.capture();
}
    

    
    

    