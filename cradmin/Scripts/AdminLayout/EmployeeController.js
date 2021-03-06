﻿CRAdminApp.controller("EmployeeController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

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
    $scope.IsNewUser = undefined;
    //$scope.Token = getCookie("Token");
    $scope.Emp = { PageNo: 1, PageSize: 2, AdhaarNo: "", Regt_No: "", Gender: 0, FName: "", MName: "", LName: "", DOB: "", BloodGroup: "", EmpPhoto: "", PanNo: "", UserName: "" };
    $scope.EmpDetails = {
        EmpDetailsId: 0, PkId: 0, EmpTypeId: 0, JoiningStatus: 1, DateOfReport: "",
        ContractorId: 1, ContactNo: "", EmrContactNo: "", IdProofType: "", IdProofNo: "",
        IdProofImage: "", PHouseNo: "", PVillageId: "", PDisticId: 0, PTalukaId: "", PStateId: 0,
        PCountryId: 0, PPincodeId: "", THouseNo: "", TVillageId: "", TDisticId: 0, TTalukaId: "",
        TStateId: 0, TCountryId: "", TPincode: "", ReJoineOrNewJoin: 0, DeptZoneId: 0, ValidationAgencyId: 0,
        IsAlreadyValidated: 0, TradeId: 0, ProfileImage: "", IsDMorStaff: 0, DeptId: "", ProjectTypeId: "",EmpEmail:""
    };

    $scope.ErrorModel = {
        AdhaarNo: false, ErrorMessageAdhaarNo: "", FName: false, ErrorMessageFName: "", MName: false, ErrorMessageMName: "", LName: false,
        ErrorMessageLName: "", DOB: false, ErrorMessageDOB: "", BloodGroup: false, ErrorMessageBloodGroup: "", EmpPhoto: false, ErrorMessageEmpPhoto: "", PanNo: false,
        ErrorMessagePanNo: "", UserName: false, ErrorMessageUserName: "",
        EmpTypeId: false, ErrorMessageEmpTypeId: "", DateOfReport: false, ErrorMessageDateOfReport: "",
        ContractorId: false, ErrorMessageContractorId: "", ContactNo: false, ErrorMessageContactNo: "", EmrContactNo: false, ErrorMessageEmrContactNo: "",
        PVillageId: false, ErrorMessagePVillageId: "", PDisticId: false, ErrorMessagePDisticId: "", PStateId: false, ErrorMessagePStateId: "",
        PCountryId: false, ErrorMessagePContryId: "", PPincodeId: false, ErrorMessagePPincodeId: "", TVillageId: false, ErrorMessageTVillageId: "", TDisticId: false,
        ErrorMessageTDisticId: "",
        TStateId: false, ErrorMessageTStateId: "", TCountryId: false, ErrorMessageContryId: "", TPincode: false, ErrorMessageTPincode: "", DeptZoneId: false, ErrorMessageDeptZoneId: "",
        ValidationAgencyId: false, ErrorMessageValidationAgencyId: "", TradeId: false, ErrorMessageTradeId: "",
        ProfileImage: false, ErrorMessageProfileImage: "", IsDMorStaff: false, ErrorMessageIsDMorStaff: "", DeptId: false, ErrorMessageDeptId: ""
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
                $scope.TradeList = response.data.TradeList;
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
                $scope.TradeList.splice(0, 0, { TradeId: 0, TradDescription: "---Select Trade---" });
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
                var html = "";
                angular.forEach($scope.TradeList, function (value, key) {
                    html += "<option value='" + value.TradeId + "'>" + value.TradDescription + "</option>";
                });
                $("#ddlTrade").html(html);
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
                $scope.changeEmpType();
            }
            else {
                window.location = $scope.urlBase + "/dashboard/index";
            }
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }

    $scope.BindStateList = function () {
        if ($("#ddlCountry").val() > 0) {
            var statelist = $scope.StateList.filter(function (state) {
                return (state.ContryId == $("#ddlCountry").val());
            });

            statelist.splice(0, 0, { StateId: 0, StateName: "---Select State---" });
            var html5 = "";
            angular.forEach(statelist, function (value, key) {
                html5 += "<option value='" + value.StateId + "'>" + value.StateName + "</option>";
            });
            $("#ddlState").html(html5);
        }

    }

    $scope.BindPStateList = function () {
        if ($("#ddlPCountry").val() > 0) {
            var statelist = $scope.StateList.filter(function (state) {
                return (state.ContryId == $("#ddlPCountry").val());
            });

            statelist.splice(0, 0, { StateId: 0, StateName: "---Select State---" });
            var html5 = "";
            angular.forEach(statelist, function (value, key) {
                html5 += "<option value='" + value.StateId + "'>" + value.StateName + "</option>";
            });
            $("#ddlPState").html(html5);
        }
    }

    $scope.BindPDistrictList = function () {
        if ($("#ddlPState").val() > 0) {
            var citylist = $scope.CityList.filter(function (state) {
                return (state.SateId == $("#ddlPState").val());
            });

            citylist.splice(0, 0, { DTCVId: 0, DTCVName: "---Select City---" });
            var html5 = "";
            angular.forEach(citylist, function (value, key) {
                html5 += "<option value='" + value.DTCVId + "'>" + value.DTCVName + "</option>";
            });
            $("#ddlPDistrict").html(html5);
        }
    }

    $scope.BindDistrictList = function () {
        if ($("#ddlState").val() > 0) {
            var citylist = $scope.CityList.filter(function (state) {
                return (state.SateId == $("#ddlState").val());
            });

            citylist.splice(0, 0, { DTCVId: 0, DTCVName: "---Select City---" });
            var html5 = "";
            angular.forEach(citylist, function (value, key) {
                html5 += "<option value='" + value.DTCVId + "'>" + value.DTCVName + "</option>";
            });
            $("#ddlDistrict").html(html5);
        }
    }

    $scope.Validate = function () {
        var valid = true;
        if ($scope.Emp.AadharNo.length <12) {
            $scope.ErrorModel.AadharNo = true;
            $scope.ErrorModel.ErrorMessageAdhaarNo = "Please Enter Valid Aadhar Number.";
            valid = false;
        }
        else {
            valid = true;
            $scope.ErrorModel.AadharNo = false;
        }
        if (valid) {
            if ($scope.Emp.FName == "") {
                $scope.ErrorModel.FName = true;
                $scope.ErrorModel.ErrorMessageFName = "First Name should be filled.";
                valid = false;
            }
            else {
                valid = true;
                $scope.ErrorModel.FName = false;
            }
        }
        if (valid) {
            if ($scope.Emp.LName == "") {
                $scope.ErrorModel.LName = true;
                $scope.ErrorModel.ErrorMessageLName = "Last Name should be filled.";
                valid = false;
            }
            else {
                valid = true;
                $scope.ErrorModel.LName = false;
            }
        }

        if (valid) {
            if ($scope.Emp.MName == "") {
                $scope.ErrorModel.MName = true;
                $scope.ErrorModel.ErrorMessageMName = "Middle Name should be filled.";
                valid = false;
            }
            else {
                valid = true;
                $scope.ErrorModel.MName = false;
            }
        }
        if (valid) {
            if ($scope.EmpDetails.DateOfReport == "") {
                $scope.ErrorModel.DateOfReport = true;
                $scope.ErrorModel.ErrorMessageMName = "Date Of Report should be filled.";
                valid = false;
            }
            else {
                valid = true;
                $scope.ErrorModel.DateOfReport = false;
            }
        }
        if (valid) {
            if ($("#rdoStaff").prop("checked") == false && $("#rdoDM").prop("checked") == false) {
                $scope.ErrorModel.IsDmOrStaff = true;
                $scope.ErrorModel.ErrorMessageIsDMorStaff = "Please select employee type.";
                valid = false;
            }
            else {
                valid = true;
                $scope.ErrorModel.IsDmOrStaff = false;
            }
        }
        if (valid) {
            if ($("#rdoStaff").prop("checked") == true) {
                if ($scope.Emp.UserName == "") {
                    $scope.ErrorModel.UserName = true;
                    $scope.ErrorModel.ErrorMessageUserName = "Mail id should be filled while staff registration.";
                    valid = false;
                }
                else {
                    valid = true;
                    $scope.ErrorModel.UserName = false;
                }
            }
        }
        return valid
    }

    $scope.changeEmpType = function () {
        var isdm = $("#rdoDM").prop("checked");
        if (isdm) {
            var html3 = "";
            var lst = $scope.EmployeeTypeList.filter(emptype => emptype.IsDmOrStaff == isdm);
            lst.splice(0, 0, { EmpTypeId: 0, EmpDesignation: "---Select Emp Type---" });
            lst.map((etype) => {
                html3 += '<option value="' + etype.EmpTypeId + '">' + etype.EmpDesignation + '</option>';
            });
            $("#ddlEmpType").html(html3);
        }
        else {
            var html3 = "";
            var lst = $scope.EmployeeTypeList.filter(emptype => emptype.IsDmOrStaff == isdm);
            lst.splice(0, 0, { EmpTypeId: 0, EmpDesignation: "---Select Emp Type---" });
            lst.map((etype) => {
                html3 += '<option value="' + etype.EmpTypeId + '">' + etype.EmpDesignation + '</option>';
            });
            $("#ddlEmpType").html(html3);

        }
    }

    $scope.copyAddress = function () {
        if ($("#chkAddressSame").prop("checked")) {
            $scope.EmpDetails.THouseNo = $scope.EmpDetails.PHouseNo;
            $scope.EmpDetails.TTalukaId = $scope.EmpDetails.PTalukaId;
            $scope.EmpDetails.TVillageId = $scope.EmpDetails.PVillageId;
            $scope.EmpDetails.TPincode = $scope.EmpDetails.PPincodeId;
            $("#ddlCountry").val($("#ddlPCountry").val());
            $scope.BindStateList();
            $("#ddlState").val($("#ddlPState").val());
            $scope.BindDistrictList();
            $("#ddlDistrict").val($("#ddlPDistrict").val());
        }
    }


    $scope.checkAlreadyValidated = function ()
    {
        $scope.EmpDetails.IsAlreadyValidated = $("#chkIsAlreadyValidated").prop("checked");
    }

    $scope.RegisterStaff = function () {
        if ($scope.Validate()) {
            ShowLoader();
            if ($("#rdoMale").prop("checked") == true) {
                $scope.Emp.Gender = true;
            }
            else {
                $scope.Emp.Gender = false;
            }
            if ($("#rdoStaff").prop("checked") == true) {
                $scope.EmpDetails.IsDMorStaff = true;
            }
            else {
                $scope.EmpDetails.IsDMorStaff = false;
            }

            $scope.EmpDetails.TCountryId = $("#ddlCountry").val();
            $scope.EmpDetails.TStateId = $("#ddlState").val();
            $scope.EmpDetails.TDisticId = $("#ddlDistrict").val();
            $scope.EmpDetails.PCountryId = $("#ddlPCountry").val();
            $scope.EmpDetails.PStateId = $("#ddlPState").val();
            $scope.EmpDetails.PDisticId = $("#ddlPDistrict").val();
            $scope.EmpDetails.DeptZoneId = $("#ddlZone").val();
            $scope.EmpDetails.ValidationAgencyId = $("#ddlVAgency").val();
            $scope.EmpDetails.TradeId = $("#ddlTrade").val();
            $scope.EmpDetails.IdProofType = $("#ddlIdProofType").val();
            $scope.EmpDetails.EmpTypeId = $("#ddlEmpType").val();
            $scope.EmpDetails.ContractorId = $("#ddlContractor").val();
            $scope.EmpDetails.DeptId = $("#ddlSDep").val();
            $scope.EmpDetails.ProjectTypeId = $("#ddlProjectType").val();
            $scope.Emp.EmpPhoto = $("#imgCapture").attr("src");
            $scope.EmpDetails.VCertificatePath = $("#hdnVCertificatePath").val();
            $scope.EmpDetails.AdhaarImage = $("#hdnAdhaarImage").val();
            $scope.EmpDetails.IdProofImage = $("#hdnIdProofImage").val();
            
            var model = { Emp: $scope.Emp, EmpDetails: $scope.EmpDetails };
            $http({
                method: 'post',
               
                url: $scope.urlBase + '/Dashboard/Save',
                data: model,
                beforeSend: function (request) {
                    request.setRequestHeader("Token", getToken());
                },
            }).then(function (response) {
                HideLoader();
                var objShowCustomAlert = new ShowCustomAlert({
                    Title: "Success",
                    Message: "Employee Registered Successfully.",
                    Type: "alert",
                    OnOKClick: function () {
                        $scope.ClearOldData();
                    }
                });
                objShowCustomAlert.ShowCustomAlertBox();
            }, function (error) {
                HideLoader();
                console.log(error);
            });
        }
    }

    $scope.ClearOldData = function () {
        $scope.Emp = { PageNo: 1, PageSize: 2, AdhaarNo: "", Regt_No: "", Gender: 0, FName: "", MName: "", LName: "", DOB: "", BloodGroup: "", EmpPhoto: "", PanNo: "", UserName: "" };
        $scope.EmpDetails = {
            EmpDetailsId: 0, PkId: 0, EmpTypeId: 0, JoiningStatus: 1, DateOfReport: "",
            ContractorId: 1, ContactNo: "", EmrContactNo: "", IdProofType: "", IdProofNo: "",
            IdProofImage: "", PHouseNo: "", PVillageId: "", PDisticId: 0, PTalukaId: "", PStateId: 0,
            PCountryId: 0, PPincodeId: "", THouseNo: "", TVillageId: "", TDisticId: 0, TTalukaId: "",
            TStateId: 0, TCountryId: "", TPincode: "", ReJoineOrNewJoin: 0, DeptZoneId: 0, ValidationAgencyId: 0,
            IsAlreadyValidated: 0, TradeId: 0, ProfileImage: "", IsDMorStaff: 0, DeptId: ""
        };
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
                        $scope.BindPStateList();
                        $("#ddlPState").val($scope.EmpDetails.PStateId);
                        $scope.BindPDistrictList();
                        $("#ddlPDistrict").val($scope.EmpDetails.PDisticId);
                        $("#ddlZone").val($scope.EmpDetails.DeptZoneId);
                        $("#ddlVAgency").val($scope.EmpDetails.ValidationAgencyId);
                        $("#ddlTrade").val($scope.EmpDetails.TradeId);
                        $("#ddlIdProofType").val($scope.EmpDetails.IdProofType);
                        $("#ddlEmpType").val($scope.EmpDetails.EmpTypeId);
                        $("#ddlContractor").val($scope.EmpDetails.ContractorId);
                        $("#ddlSDep").val($scope.EmpDetails.DeptId);
                        $("#ddlProjectType").val($scope.EmpDetails.ProjectTypeId)
                        $scope.Emp.AadharNo = $scope.Emp.AadharNo;
                    }
                }, function (error) {
                    HideLoader();
                    console.log(error);
                })
            }
        }
    }


    $scope.fromUser = function () {
        if ($scope.Emp.AadharNo.length > 0) {
            var transformedInput = $scope.Emp.AadharNo.replace(/[^0-9]/g, '');

            if (transformedInput !== '') {
                $scope.Emp.AadharNo = transformedInput;
                var st;
            }
            else {
                $scope.Emp.AadharNo = '';
            }
        }
    }

    

    $scope.init = function () {
        setCookie("Token",$('#hdnToken').val());
        checkToken();
        $("#ddlPageSize").val(5);
        $scope.Emp.PageSize = $("#ddlPageSize").val();
        $("#rdoMale").prop("checked", true);
        $("#rdoDM").prop("checked", true);
        
        $("#ddlEmpType").html("");
        $scope.EmpDetails.IsAlreadyValidated = false;
        jQuery("#webcam").webcam({
            width: 320,
            height: 240,
            mode: "save",
            swffile: $scope.urlBase + '/Scripts/AdminLayout/jscam.swf"',
            debug: function (type, status) {
                $('#camStatus').append(type + ": " + status + '<br /><br />');
            },
            onSave: function (data, ab) {
                $.ajax({
                    type: "POST",
                    url: $scope.urlBase + '/Dashboard/Get_Url',
                    data: '',
                    contentType: "application/json; charset=utf-8",
                    dataType: "text",
                    success: function (r) {
                        $("#webcam").hide();
                        $("#imgCapture").show();
                        $("#imgCapture").attr("src", JSON.parse(r));
                    },
                    failure: function (response) {
                        alert(response.d);
                    }
                });
            },
            onCapture: function () {
                webcam.save($scope.urlBase + '/Dashboard/Capture');
            }
        });
        

        $("#uploadProfile").click(function () {
            files = $("#ProfileImage").get(0).files;
            if (files.length == 0) {
                $("#ProfileImage").trigger("click");
            }
            else {
                UploadA();
            }
        })
        $("#ProfileImage").change(function () {
            $("#uploadProfile").trigger("click");
        });
        $("#uploadAdhaar").click(function () {
            files = $("#AdhaarImage").get(0).files;
            if (files.length == 0) {
                $("#AdhaarImage").trigger("click");
            }
            else {
                UploadAdhaar();
            }
        })
        $("#AdhaarImage").change(function () {
            $("#uploadAdhaar").trigger("click");
        });

        $("#uploadValidationC").click(function () {
            files = $("#ValidationCertificate").get(0).files;
            if (files.length == 0) {
                $("#ValidationCertificate").trigger("click");
            }
            else {
                UploadValidationC();
            }
        })
        $("#ValidationCertificate").change(function () {
            $("#uploadValidationC").trigger("click");
        });

        $("#uploadIdProof").click(function () {
            files = $("#IdProofDoc").get(0).files;
            if (files.length == 0) {
                $("#IdProofDoc").trigger("click");
            }
            else {
                UploadIdProofDoc();
            }
        })
        $("#ValidationCertificate").change(function () {
            $("#IdProofDoc").trigger("click");
        });
        $("#dtReport").datepicker({
            format: "dd-MM-yyyy",
            autoclose: true,
            todayHighlight: true
        }).datepicker('update', new Date());

        $("#dtBirth").datepicker({
            format: "dd-MM-yyyy",
            autoclose: true,
            todayHighlight: true
        }).datepicker('update', new Date());
        $("#ddlAdate").datepicker({
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

function UploadA() {
    var urlbase = GetVirtualDirectory();
    ShowLoader();
    var data = new FormData();
    var files = $("#ProfileImage").get(0).files;
    if (files.length > 0) {
        data.append("ProfileImage", files[0]);
    }
    $.ajax({
        url: urlbase + "/Dashboard/UploadA",
        type: "POST",
        processData: false,
        contentType: false,
        data: data,
        success: function (response) {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "",
                Message: "Image uploaded successfully.",
                Type: "alert",
            });
            objShowCustomAlert.ShowCustomAlertBox();
            $("#webcam").hide();
            $("#imgCapture").show();
            $("#imgCapture").attr("src", response);
            HideLoader();
        },
        error: function (er) {
            alert(er.responseText);
        }
    });
}



function UploadAdhaar() {
    var urlbase = GetVirtualDirectory();
    ShowLoader();
    var data = new FormData();
    var files = $("#AdhaarImage").get(0).files;
    if (files.length > 0) {
        data.append("AdhaarImage", files[0]);
    }
    $.ajax({
        url: urlbase + "/Dashboard/UploadAdhaar",
        type: "POST",
        processData: false,
        contentType: false,
        data: data,
        success: function (response) {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "",
                Message: "Image uploaded successfully.",
                Type: "alert",
            });
            objShowCustomAlert.ShowCustomAlertBox();
            HideLoader();
            $("#hdnAdhaarImage").val(response);
            
        },
        error: function (er) {
            alert(er.responseText);
        }
    });
}

function UploadValidationC() {
    var urlbase = GetVirtualDirectory();
    ShowLoader();
    var data = new FormData();
    var files = $("#ValidationCertificate").get(0).files;
    if (files.length > 0) {
        data.append("ValidationCertificate", files[0]);
    }
    $.ajax({
        url: urlbase + "/Dashboard/UploadValidationCertificate",
        type: "POST",
        processData: false,
        contentType: false,
        data: data,
        success: function (response) {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "",
                Message: "Image uploaded successfully.",
                Type: "alert",
            });
            objShowCustomAlert.ShowCustomAlertBox();
            HideLoader();
            $("#hdnVCertificatePath").val(response);
            
        },
        error: function (er) {
            alert(er.responseText);
        }
    });
}

function UploadIdProofDoc() {
    var urlbase = GetVirtualDirectory();
    ShowLoader();
    var data = new FormData();
    var files = $("#IdProofDoc").get(0).files;
    if (files.length > 0) {
        data.append("IdProofDoc", files[0]);
    }
    $.ajax({
        url: urlbase + "/Dashboard/UploadIdProofDoc",
        type: "POST",
        processData: false,
        contentType: false,
        data: data,
        success: function (response) {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "",
                Message: "Image uploaded successfully.",
                Type: "alert",
            });
            objShowCustomAlert.ShowCustomAlertBox();
            HideLoader();
            $("#hdnIdProofImage").val(response);
        },
        error: function (er) {
            alert(er.responseText);
        }
    });
}