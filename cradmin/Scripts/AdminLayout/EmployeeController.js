CRAdminApp.controller("EmployeeController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {
    
    $scope.urlBase = GetVirtualDirectory();
    $scope.ZoneList = [];
    $scope.TradeCategoryList = [];
    $scope.ValidationAgencyList = [];
    $scope.EmployeeTypeList = [];
    $scope.ContractorList = [];
    $scope.CountryList = [];
    $scope.StateList = [];
    $scope.CityList = [];
    $scope.IsNewUser = "";
    $scope.Token=getCookie("token");
    $scope.Emp = { PageNo: 1, PageSize: 2, AdhaarNo: "", Regt_No: "", Gender: 0, FName: "", MName: "", LName: "", DOB: "", BloodGroup: "", EmpPhoto: "", PanNo: "", UserName:"" };
    $scope.EmpDetails = {
        EmpDetailsId: 0, PkId: 0, EmpTypeId: 0, JoiningStatus: 1, DateOfReport: "",
        ContractorId: 1, ContactNo: "", EmrContactNo: "", IdProofType: "", IdProofNo: "",
        IdProofImage: "", PHouseNo: "", PVillageId: "", PDisticId: 0, PTalukaId: "", PStateId: 0,
        PCountryId: 0, PPincodeId: "", THouseNo: "", TVillageId: "", TDisticId: 0, TTalukaId: "",
        TStateId: 0, TCountryId: "", TPincode: "", ReJoineOrNewJoin: 0, DeptZoneId: 0, ValidationAgencyId: 0,
        IsAlreadyValidated: 0, TradeId: 0, AdhaarImage: "", IsDMorStaff: 0
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
        AdhaarImage: false, ErrorMessageAdhaarImage: "", IsDMorStaff: false, ErrorMessageIsDMorStaff: ""
    };
    $scope.EmpExit = {};
    var objdatehelper = new datehelper({ format: "dd/MM/yyyy", cdate: new Date() });

    

    function GetMasterDataList()
    {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/Dashboard/GetMasterDataforRegister',
            headers: getToken(),
            data: $scope.Emp,
        }).then(function (response) {
            HideLoader();
            if (response.data.Status == 1) {
                $scope.ZoneList = response.data.ZoneList;
                $scope.TradeCategoryList = response.data.TradeCategoryList;
                $scope.ValidationAgencyList = response.data.ValidationAgencyList;
                $scope.EmployeeTypeList = response.data.EmployeeTypeList;
                $scope.ContractorList = response.data.ContractorList;
                $scope.CountryList = response.data.CountryList;
                $scope.StateList = response.data.StateList;
                $scope.CityList = response.data.CityList;

                $scope.CountryList.splice(0, 0, { ContryId: 0, ContryName: "---Select Country---" });
                $scope.ZoneList.splice(0, 0, { DeptZoneId: 0, DeptZoneDescription: "---Select Zone---" });
                $scope.TradeCategoryList.splice(0, 0, { TradeCId: 0, TradCDescription: "---Select Category---" });
                $scope.ValidationAgencyList.splice(0, 0, { ValidationAgencyId: 0, AgencyDescription: "---Select Agency---" });
                $scope.EmployeeTypeList.splice(0, 0, { EmpTypeId: 0, EmpDesignation: "---Select Employee Type---" });
                $scope.ContractorList.splice(0, 0, { ContractorId: 0, ContractorName: "---Select Contractor---" });
                var html = "";
                angular.forEach($scope.ZoneList, function (value, key) {
                    html += "<option value='" + value.DeptZoneId + "'>" + value.DeptZoneDescription + "</option>";
                });
                $("#ddlZone").html(html);
                var html1 = "";
                angular.forEach($scope.TradeCategoryList, function (value, key) {
                    html1 += "<option value='" + value.TradeCId + "'>" + value.TradCDescription + "</option>";
                });
                $("#ddlTrade").html(html1);

                var html2 = "";
                angular.forEach($scope.ValidationAgencyList, function (value, key) {
                    html2 += "<option value='" + value.ValidationAgencyId + "'>" + value.AgencyDescription + "</option>";
                });
                $("#ddlVAgency").html(html2);

                var html3 = "";
                angular.forEach($scope.EmployeeTypeList, function (value, key) {
                    html3 += "<option value='" + value.EmpTypeId + "'>" + value.EmpDesignation + "</option>";
                });
                $("#ddlEmpType").html(html3);
                var html4 = "";
                angular.forEach($scope.ContractorList, function (value, key) {
                    html4 += "<option value='" + value.ContractorId + "'>" + value.ContractorName + "</option>";
                });
                $("#ddlContractor").html(html4);

                var html5 = "";
                angular.forEach($scope.CountryList, function (value, key) {
                    html5 += "<option value='" + value.ContryId + "'>" + value.ContryName + "</option>";
                });
                $("#ddlCountry").html(html5);
                $("#ddlPCountry").html(html5);
            }
            else {
                window.location = $scope.urlBase + "/dashboard/index";
            }
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }

    $scope.BindStateList = function ()
    {
        if ($("#ddlCountry").val()>0) {
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
        if ( $scope.Emp.AdhaarNo.length<12) {
            $scope.ErrorModel.AadharNo = true;
            $scope.ErrorModel.ErrorMessageAdhaarNo = "Please Enter Valid Aadhar Number.";
            valid = false;
           
        }
        if ($scope.Emp.FName == "") {
            $scope.ErrorModel.FName = true;
            $scope.ErrorModel.ErrorMessageFName = "First Name should be filled.";
            valid = false;
        }
        if ($scope.Emp.LName == "") {
            $scope.ErrorModel.LName = true;
            $scope.ErrorModel.ErrorMessageLName = "Last Name should be filled.";
            valid = false;
        }
        if ($scope.Emp.MName == "") {
            $scope.ErrorModel.MName = true;
            $scope.ErrorModel.ErrorMessageMName = "Middle Name should be filled.";
            valid = false;
        }
        if ($scope.EmpDetails.DateOfReport == "") {
            $scope.ErrorModel.DateOfReport = true;
            $scope.ErrorModel.ErrorMessageMName = "Date Of Report should be filled.";
            valid = false;
        }
        return valid
    }

    $scope.RegisterStaff = function () {
        if($scope.Validate())
        {
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

            $scope.EmpDetails.TCountryId=$("#ddlCountry").val();
            $scope.EmpDetails.TStateId=$("#ddlState").val();
            $scope.EmpDetails.TDisticId=$("#ddlDistrict").val();
            $scope.EmpDetails.PCountryId=$("#ddlPCountry").val();
            $scope.EmpDetails.PStateId=$("#ddlPState").val();
            $scope.EmpDetails.PDisticId=$("#ddlPDistrict").val();
            $scope.EmpDetails.DeptZoneId=$("#ddlZone").val();
            $scope.EmpDetails.ValidationAgencyId=$("#ddlVAgency").val();
            $scope.EmpDetails.TradeId=$("#ddlTrade").val();
            $scope.EmpDetails.IdProofType=$("#ddlIdProofType").val();
            $scope.EmpDetails.EmpTypeId=$("#ddlEmpType").val();
            $scope.EmpDetails.ContractorId = $("#ddlContractor").val();
            $scope.Emp.EmpPhoto = $("#imgCapture").attr("src");
            var model = { Emp: $scope.Emp, EmpDetails: $scope.EmpDetails };
            $http({
                method: 'post',
                url: $scope.urlBase + '/Dashboard/Save',
                data: model,
            }).then(function (response) {
                HideLoader();

            }, function (error) {
                HideLoader();
                console.log(error);
            });    
        }
    }



    $scope.CheckAdhaarExist = function () {
        if ($scope.Emp.AadharNo.length < 12) {
            $scope.ErrorModel.AadharNo = true;
            $scope.ErrorModel.ErrorMessageAdhaarNo = "Please Enter Valid Aadhar Number.";
            valid = false;
        }
        else {
            $scope.ErrorModel.ErrorMessageAdhaarNo = "";
            if ($scope.Emp.AadharNo.length == 12) {
                ShowLoader();
                $http({
                    method: 'post',
                    url: $scope.urlBase + '/Dashboard/CheckAdhaarExist',
                    data: $scope.Emp,
                }).then(function (response) {
                    HideLoader();
                    console.log(response);
                    if (response.data == "") {
                        $scope.IsNewUser = 1;
                        var objShowCustomAlert = new ShowCustomAlert({
                            Title: "Warning",
                            Message: "No such user exist. you have to register new user.",
                            Type: "alert"
                        });
                        objShowCustomAlert.ShowCustomAlertBox();
                        $("#rdoMale").prop("checked", true);
                        $("#rdoDM").prop("checked", true);
                    }
                    else {
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
                        if ($scope.Emp.IsDMorStaff) {
                            $("#rdoStaff").prop("checked", true);
                        }
                        else {
                            $("#rdoDM").prop("checked", false);
                        }
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
    //$scope.fromUser1=function()
    //{
    //    if ($scope.Emp.FName == '/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/') {
    //        var transformedInput = $scope.Emp.FName.replace(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g, '');

    //        if (transformedInput !== '') {
    //            $scope.Emp.FName = transformedInput;
    //            var st;
                
    //        }
    //        else {
    //            $scope.Emp.FName = '';

    //        }
    //    }

    //}





    
       
    

    $scope.init = function () {
        $("#rdoMale").prop("checked", true);
        $("#rdoDM").prop("checked", true);
        GetMasterDataList();
       
    }

    $scope.init();
}]);

function UploadA() {
    var urlbase = GetVirtualDirectory();
    ShowLoader();
    var data = new FormData();
    var files = $("#AdhaarImage").get(0).files;
    if (files.length > 0) {
        data.append("AdhaarImage", files[0]);
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