CRAdminApp.controller("SubContractorController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();

    $scope.ContractorList = [];
    
    $scope.SubContractorList = [];
    $scope.SearchSubContractorList = [];
    $scope.TotalRecords = 0;
    $scope.TotalPages = 0
    $scope.Prefix = "";
    $scope.PageSize=5;
  
   
    function GetMasterDataList() {
        ShowLoader();
        $http({
            method: 'post',
            beforeSend: function (request) {
                request.setRequestHeader("Token", getToken());
            },
            headers: getToken(),
            url: $scope.urlBase + '/SubContractor/GetMainContractor',
            data: $scope.LoginModal,
        }).then(function (response) {
            HideLoader();
            if (response.data.Status == 1) {
               
                $scope.ContractorList = response.data.ContractorList;
                $scope.ContractorList.splice(0, 0, { ContractorId: 0, ContractorCompanyName: "---Select Main Contractor ---" });
                var html = "";
                angular.forEach($scope.ContractorList, function (value, key) {
                    html += "<option value='" + value.ContractorId + "'>" + value.ContractorCompanyName + "</option>";
                });
                $("#ddlMconId").html(html);
            }
            else {
                //window.location = $scope.urlBase + "/Plantsubcontractor/index";
            }
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }
  

    $scope.AddNew = false;
    $scope.Details = true;
    $scope.Update = false;
    $scope.next = true;
    $scope.prev = true;
   

    $scope.SubContractorModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), Prefix: "", SubContractorId: null, ContractorId: "", SubCName: "", SubCCompanyName: "", SubCRegistrationNo: "", SubCGstNo: "", SubCOfficeAddress: "", SubCPhoneNo: "", ContractorPhoneNo1: "", EmailId: "", Code: "", WorkOrderNo: "", NatureOfWork: "", ValidUpTo:"" };

    $scope.AddNewClick = function () {
        $scope.AddNew = true;
        $scope.Details = false;
        $scope.Update = false;
        $scope.ErrorModel.ContractorId = false;
        $scope.ErrorModel.SubCName = false;
        $scope.ErrorModel.SubCCompanyName = false;
        $scope.ErrorModel.SubCRegistrationNo = false;
        $scope.ErrorModel.SubCGstNo = false;
        $scope.ErrorModel.SubCOfficeAddress = false;
        $scope.ErrorModel.SubCPhoneNo = false;
        $scope.ErrorModel.ContractorPhoneNo1 = false;
        $scope.ErrorModel.EmailId = false;
        $scope.ErrorModel.Code = false;
        $scope.ErrorModel.WorkOrderNo = false;
        $scope.ErrorModel.NatureOfWork = false;
        $scope.ErrorModel.ValidUpTo = false;
        $scope.SubContractorModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), Prefix: "", SubContractorId: null, ContractorId: "", SubCName: "", SubCCompanyName: "", SubCRegistrationNo: "", SubCGstNo: "", SubCOfficeAddress: "", SubCPhoneNo: "", ContractorPhoneNo1: "", EmailId: "", Code: "", WorkOrderNo: "", NatureOfWork: "", ValidUpTo: "" };
    }
    $scope.ErrorModel = {
        ContractorId: false, ErrorSelectMainContractor: "", SubCName: false, ErrorEnterSubContractor: "", SubCCompanyName: false,ErrorEnterSubCCName:"",
        SubCRegistrationNo: false, ErrorEnterSubCRNo: "", SubCGstNo: false, ErrorEnterSubGSTNo: "",
        SubCOfficeAddress: false, ErrorEnterSubOAdd: "", SubCPhoneNo: false, ErrorSubCPhon1: "", ContractorPhoneNo1: false, ErrorSubCPhon2: "",
        EmailId: false, ErrorSubCEmail: "", Code: false, ErrorSubCCode: "", WorkOrderNo: false, ErrorSubCWorkONO: "", NatureOfWork: false, ErrorSubCNOW: "",
        NatureOfWork: false, ErrorSubCNOW: "", ValidUpTo: false, ErrorEnterVDate: ""
    };

        
    

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        //$("#ddlMconId").val("");
        //$("#ddlSCName").val("");
        //$("#ddlSCCName").val("");
        //$("#ddlSCRNo").val("");
        //$("#ddlSCGSTNo").val("");
        //$("#ddlSCOAdd").val("");
        //$("#ddlSCPhone1").val("");
        //$("#ddlSCPhone2").val("");
        //$("#ddlSCCode").val("");
        //$("#ddlSCEmail").val("");
        //$("#ddlSCWorkONo").val("");
        //$("#ddlSCNOW").val("");
        //$("#ddlVdate").val("");
      
        
        
        $scope.SubContractorModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), Prefix: "", SubContractorId: "", ContractorId: "", SubCName: "", SubCCompanyName: "", SubCRegistrationNo: "", SubCGstNo: "", SubCOfficeAddress: "", SubCPhoneNo: "", ContractorPhoneNo1: "", EmailId: "", Code: "", WorkOrderNo: "", NatureOfWork: "", ValidUpTo: "" };
    }

    $scope.PageSizeList = [5, 10, 15, 20];
    $scope.PlantsubcontractorList = [];

    $scope.Save = function () {
         if ($scope.Validate()) {
             var objShowCustomAlert = new ShowCustomAlert({
                 Title: "Error",
                 Message: "Are You Want To Save This Record",
                 Type: "confirm",
                 OnOKClick: function () {
            
               
        $scope.SubContractorModel.ContractorId = $("#ddlMconId").val();
                
        $scope.SubContractorModel.ValidUpTo = $("#ddlVdate").val();
        ShowLoader();
        $http({
            method: 'post',
            beforeSend: function (request) {
                request.setRequestHeader("Token", getToken());
            },
            url: $scope.urlBase + '/SubContractor/Save',
            data: $scope.SubContractorModel,
        }).then(function (response) {
            HideLoader();
            if (response.data.Status == 0) {
                var objShowCustomAlert = new ShowCustomAlert({
                    Title: "Error",
                    Message: "This Record Is All Ready Exist",
                    Type: "alert"
                });
                objShowCustomAlert.ShowCustomAlertBox();
            }
            else {
                var objShowCustomAlert = new ShowCustomAlert({
                    Title: "Success",
                    Message: "Record Seved Successfully",
                    Type: "alert"
                });
                objShowCustomAlert.ShowCustomAlertBox();
            }
            $scope.CancelClick();
            $scope.GetsubcontractorList();
            GetMasterDataList();
        }, function (error) {
            HideLoader();
            console.log(error);
        });
                 }
             });
             objShowCustomAlert.ShowCustomAlertBox();

         }
    }
        

        //Edit 
    
        //update
    $scope.Update1 = function () {
        if (nowork == $("#ddlSCNOW").val() && workorno == $("#ddlSCWorkONo").val()) {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "Error",
                Message: "Please Change At Least One Field",
                Type: "alert"
            });
            objShowCustomAlert.ShowCustomAlertBox();
        }
        else {
            
            if ($scope.Validate()) {
                var objShowCustomAlert = new ShowCustomAlert({
                    Title: "Error",
                    Message: "Are You Want To Save This Record",
                    Type: "confirm",
                    OnOKClick: function () {


                        $scope.SubContractorModel.ContractorId = $("#ddlMconId").val();

                        $scope.SubContractorModel.ValidUpTo = $("#ddlVdate").val();
                        ShowLoader();
                        $http({
                            method: 'post',
                            beforeSend: function (request) {
                                request.setRequestHeader("Token", getToken());
                            },
                            url: $scope.urlBase + '/SubContractor/Save',
                            data: $scope.SubContractorModel,
                        }).then(function (response) {
                            HideLoader();
                            if (response.data.Status == 0) {
                                var objShowCustomAlert = new ShowCustomAlert({
                                    Title: "Error",
                                    Message: "This Record Is All Ready Exist",
                                    Type: "alert"
                                });
                                objShowCustomAlert.ShowCustomAlertBox();
                            }
                            else {
                                var objShowCustomAlert = new ShowCustomAlert({
                                    Title: "Success",
                                    Message: "Record Seved Successfully",
                                    Type: "alert"
                                });
                                objShowCustomAlert.ShowCustomAlertBox();
                            }

                            $scope.CancelClick();
                            // GetMasterDataList();
                            $scope.GetsubcontractorList();
                        }, function (error) {
                            HideLoader();
                            console.log(error);
                        });
                    }
                });
                objShowCustomAlert.ShowCustomAlertBox();

            }
        }
    }
   
    
    //update
    var workorno;
    var nowork;
     var objdatehelper = new datehelper({ format: "dd/MM/yyyy", cdate: new Date() });
    $scope.Edit = function (subcontractor) {
        $scope.Details = false;
        $scope.AddNew = true; 
        $scope.Update = true;
        $("#ddlMconId").val(subcontractor.ContractorId);
        workorno = subcontractor.WorkOrderNo;
         nowork = subcontractor.NatureOfWork;
        //var workorno = $("#ddlSCWorkONo").val();
        //$("#ddlSCWorkONo").val("");
        //$("#ddlSCNOW").val("");
        //$("#ddlVdate").val("");
        //$("#ddlVdate").val(objdatehelper.getFormatteddate($filter('mydate')(subcontractor.ValidUpTo), "dd/MM/yyyy"));

        $scope.SubContractorModel = { PageNo: 1, PageSize: $("#ddlPageSize").val(), Prefix: "", WorkOrderNo: subcontractor.WorkOrderNo, NatureOfWork: subcontractor.NatureOfWork, SubContractorId: subcontractor.SubContractorId, SubCName: subcontractor.SubCName, SubCCompanyName: subcontractor.SubCCompanyName, SubCRegistrationNo: subcontractor.SubCRegistrationNo, SubCGstNo: subcontractor.SubCGstNo, SubCOfficeAddress: subcontractor.SubCOfficeAddress, SubCPhoneNo: subcontractor.SubCPhoneNo, ContractorPhoneNo1: subcontractor.ContractorPhoneNo1, EmailId: subcontractor.EmailId, Code: subcontractor.Code };
       
    }
    //Edit

    $scope.GetsubcontractorList = function () {
        ShowLoader();
        $http({
            method: 'post',
            beforeSend: function (request) {
                request.setRequestHeader("Token", getToken());
            },
            url: $scope.urlBase + '/SubContractor/GetSubContractor',
            data: $scope.SubContractorModel,
        }).then(function (response) {
            HideLoader();
           
            $scope.SubContractorList = response.data;
            if (response.data.length > 0) {
                $scope.TotalRecords = response.data[0].TotalRecords;
                $scope.TotalPages = parseInt($scope.TotalRecords / $scope.SubContractorModel.PageSize);
                var reminder = $scope.TotalRecords % $scope.SubContractorModel.PageSize;
                if (reminder > 0) {
                    $scope.TotalPages++;
                }


            }
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }
    //
    $scope.Prev = function () {
        if ($scope.SubContractorModel.PageNo > 1) {
            $scope.SubContractorModel.PageNo--;
            $scope.GetsubcontractorList();
        }
    }

    $scope.Next = function () {
        if ($scope.SubContractorModel.PageNo < $scope.TotalPages) {
            $scope.SubContractorModel.PageNo++;
            $scope.GetsubcontractorList();
        }
        if ($scope.SubContractorModel.PageNo == $scope.TotalPages)
        {
            $scope.next = true;
            $scope.prev = true;
        }
    }


    
    $scope.FilterList = function () {
       
        $scope.GetsubcontractorList();
        
        $scope.First();
    }
    $scope.Reset = function () {
        $scope.SubContractorList = $scope.SubContractorList;
        $scope.SearchSubContractorList = $scope.SubContractorList;
        $scope.First();
    }

   
    $scope.ErrorModel = {
        ContractorId: false, ErrorSelectMainContractor: "", SubCName: false, ErrorEnterSubContractor: "",
        SubCCompanyName: false, ErrorEnterSubCCName: "",
        SubCRegistrationNo: false, ErrorEnterSubCRNo: "", SubCGstNo: false, ErrorEnterSubGSTNo: "",
        SubCOfficeAddress: false, ErrorEnterSubOAdd: "", SubCPhoneNo: false, ErrorSubCPhon1: "",
        ContractorPhoneNo1: false, ErrorSubCPhon2: "",
        EmailId: false, ErrorSubCEmail: "", Code: false, ErrorSubCCode: "", WorkOrderNo: false,
        ErrorSubCWorkONO: "", NatureOfWork: false, ErrorSubCNOW: "",
         ValidUpTo: false, ErrorEnterVDate: ""
    };
    $scope.Validate = function () {
        var valid = true;
       
      
        if ($("#ddlMconId").val()<=0) {
            $scope.ErrorModel.ContractorId = true;
            $scope.ErrorModel.ErrorSelectMainContractor = "Please Select MainContractor.";
            valid = false;
        }
        else {
            $scope.ErrorModel.ContractorId = false;

            valid = true;

        }
        if (valid) {
            if ($scope.SubContractorModel.SubCName == "") {
                $scope.ErrorModel.SubCName = true;
                $scope.ErrorModel.ErrorEnterSubContractor = "Please Enter Sub Contractor.";
                valid = false;
            }
            else {
                $scope.ErrorModel.SubCName = false;

                valid = true;

            }
        }
        if (valid) {
            if ($scope.SubContractorModel.SubCCompanyName == "") {
                $scope.ErrorModel.SubCCompanyName = true;
                $scope.ErrorModel.ErrorEnterSubCCName = "Please Select Sub Contractor Name.";
                valid = false;
            }
            else {
                $scope.ErrorModel.SubCCompanyName = false;

                valid = true;

            }
        }
        if (valid) {
            if ($scope.SubContractorModel.SubCRegistrationNo == "") {
                $scope.ErrorModel.SubCRegistrationNo = true;
                $scope.ErrorModel.ErrorEnterSubCRNo = "Sub Contractor Registration No.";
                valid = false;
            }
            else {
                $scope.ErrorModel.SubCRegistrationNo = false;

                valid = true;

            }
        }
        if (valid) {
            if ($scope.SubContractorModel.SubCGstNo == "") {
                $scope.ErrorModel.SubCGstNo = true;
                $scope.ErrorModel.ErrorEnterSubGSTNo = " Sub Contractor GST NO.";
                valid = false;
            }
            else {
                $scope.ErrorModel.SubCGstNo = false;

                valid = true;

            }
        }
        if (valid) {
            if ($scope.SubContractorModel.SubCOfficeAddress == "") {
                $scope.ErrorModel.SubCOfficeAddress = true;
                $scope.ErrorModel.ErrorEnterSubOAdd = "Sub Contractor Office Address.";
                valid = false;
            }
            else {
                $scope.ErrorModel.SubCOfficeAddress = false;

                valid = true;

            }
        }
        var no1 = this.Phone($scope.SubContractorModel.SubCPhoneNo);
        if (valid) {
            if (no1 == false) {
                $scope.ErrorModel.SubCPhoneNo = true;
                $scope.ErrorModel.ErrorSubCPhon1 = "Sub Contractor Phone No 1.";
                valid = false;
            }
            else {
                $scope.ErrorModel.SubCPhoneNo = false;

                valid = true;

            }
        }
        var no2 = this.Phone($scope.SubContractorModel.ContractorPhoneNo1);
        if (valid) {
            if (no2 == false) {
                $scope.ErrorModel.ContractorPhoneNo1 = true;
                $scope.ErrorModel.ErrorSubCPhon2 = "Sub Contractor Phone No 2.";
                valid = false;
            }
            else {
                $scope.ErrorModel.ContractorPhoneNo1 = false;

                valid = true;

            }
        }
        var email = this.validateEmail($scope.SubContractorModel.EmailId);
        if (valid) {
            if (email == false) {

                $scope.ErrorModel.EmailId = true;
                $scope.ErrorModel.ErrorSubCEmail = " please Enter Proper Sub Contractor Email ID.";
                valid = false;
                //}
            }
            else {
                $scope.ErrorModel.EmailId = false;

                valid = true;

            }
        }
        if (valid) {
            if ($scope.SubContractorModel.Code == "") {
                $scope.ErrorModel.Code = true;
                $scope.ErrorModel.ErrorSubCCode = "Sub Contractor Vendor Code.";
                valid = false;
            }
            else {
                $scope.ErrorModel.Code = false;

                valid = true;

            }
        }
        if (valid) {
            if ($scope.SubContractorModel.WorkOrderNo == "") {
                $scope.ErrorModel.WorkOrderNo = true;
                $scope.ErrorModel.ErrorSubCWorkONO = "Sub Contractor Work Order No.";
                valid = false;
            }
            else {
                $scope.ErrorModel.WorkOrderNo = false;
                valid = true;

            }
        }
        if (valid) {
            if ($scope.SubContractorModel.NatureOfWork == "") {
                $scope.ErrorModel.NatureOfWork = true;
                $scope.ErrorModel.ErrorSubCNOW = "Sub Contractor Nature Of Work.";
                valid = false;
            }
            else {
                $scope.ErrorModel.NatureOfWork = false;

                valid = true;

            }
        }
        if (valid == true) {
            if ($("#ddlVdate").val() == "") {
                $scope.ErrorModel.ValidUpTo = true;
                $scope.ErrorModel.ErrorEnterVDate = "Sub Contractor Valid UPTO Date.";
                valid = false;
            }
            else {
                $scope.ErrorModel.ValidUpTo = false;
                valid = true;

            }
        }
        return valid;
    }
   

    $scope.init = function () {
        setCookie("Token", $('#hdnToken').val());
        checkToken();
        
        $scope.SubContractorModel.PageSize = $("#ddlPageSize").val();
        GetMasterDataList();
        $scope.GetsubcontractorList();
    }

    $scope.init();
}]);