CRAdminApp.controller("MainContractorController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();
    $scope.AddNew = false;
    $scope.Details = true;

    $scope.TotalRecords = 0;
    $scope.TotalPages = 0

    $scope.ContractorModel = { PageNo: 1, PageSize: 5, ContractorId: 0,ContractorName:"",ContractorCompanyName:"",
        ContractorRegistrationNo: "", ContractorGstNo: "", ContractorOfficeAddress: "", ContractorPhoneNo: ""
    };

    $scope.PageSizeList = [5, 10, 15, 20];
    $scope.ContractorList = [];

    $scope.AddNewClick = function () {
        $scope.AddNew = true;
        $scope.Details = false;
        $scope.ErrorModel.ContractorName = false;
        $scope.ErrorModel.ContractorCompanyName = false;
        $scope.ErrorModel.ContractorRegistrationNo = false;
        $scope.ErrorModel.ContractorGstNo = false;
        $scope.ErrorModel.ContractorOfficeAddress = false;
        $scope.ErrorModel.ContractorPhoneNo = false;
        valid = true;
        $scope.ContractorModel = {
            PageNo: 1, PageSize: $("#ddlPageSize").val(), ContractorId: 0, ContractorName: "", ContractorCompanyName: "",
            ContractorRegistrationNo: "", ContractorGstNo: "", ContractorOfficeAddress: "", ContractorPhoneNo: ""
        };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.ContractorModel = {
            PageNo: 1, PageSize: $("#ddlPageSize").val(), ContractorId: 0, ContractorName: "", ContractorCompanyName: "",
            ContractorRegistrationNo: "", ContractorGstNo: "", ContractorOfficeAddress: "", ContractorPhoneNo: ""
        };
    }

    $scope.Save = function () {
        if ($scope.Validate()) {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "Error",
                Message: "Are You Want To Save This Record",
                Type: "confirm",
                OnOKClick: function () {
                    ShowLoader();
                    $http({
                        method: 'post',
                        beforeSend: function (request) {
                            request.setRequestHeader("Token", getToken());
                        },
                        url: $scope.urlBase + '/Contractor/Save',
                        data: $scope.ContractorModel,
                    }).then(function (response) {
                        HideLoader();
                        $scope.CancelClick();
                        $scope.GetContractorList();
                    }, function (error) {
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
                        console.log(error);
                    });
                }
            });
            objShowCustomAlert.ShowCustomAlertBox();
        }
    }
    $scope.Prev = function () {
        if ($scope.ContractorModel.PageNo > 1) {
            $scope.ContractorModel.PageNo--;
            $scope.GetContractorList();
        }
    }

    $scope.Next = function () {
        if ($scope.ContractorModel.PageNo < $scope.TotalPages) {
            $scope.ContractorModel.PageNo++;
            $scope.GetContractorList();
        }
    }

    $scope.GetContractorList = function () {
        ShowLoader();
        $http({
            method: 'post',
            beforeSend: function (request) {
                request.setRequestHeader("Token", getToken());
            },
            url: $scope.urlBase + '/Contractor/GetContractorList',
            data: $scope.ContractorModel,
        }).then(function (response) {
            HideLoader();
            $scope.ContractorList = response.data;
            if (response.data.length > 0) {
                $scope.TotalRecords = response.data[0].TotalRecords;
                $scope.TotalPages = parseInt($scope.TotalRecords / $scope.ContractorModel.PageSize);
                var reminder = $scope.TotalRecords % $scope.ContractorModel.PageSize;
                if (reminder > 0) {
                    $scope.TotalPages++;
                }
            }
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }
    $scope.Validate = function () {
        var valid = true;
       
      
        if ($scope.ContractorModel.ContractorName == "") {
            $scope.ErrorModel.ContractorName = true;
            $scope.ErrorModel.ErrorSelectContractor = "Please Enter MainContractor.";
            valid = false;
        }
        else {
            $scope.ErrorModel.ContractorName = false;
          
            valid = true;
        }
        if (valid) {
            if ($scope.ContractorModel.ContractorCompanyName == "") {
                $scope.ErrorModel.ContractorCompanyName = true;
                $scope.ErrorModel.ErrorSelectMainCCoyName = "Please Enter Contractor Company Name.";
                valid = false;
            }
            else {
                $scope.ErrorModel.ContractorCompanyName = false;
                valid = true;
            }
        }
        if (valid) {
            if ($scope.ContractorModel.ContractorRegistrationNo == "") {
                $scope.ErrorModel.ContractorRegistrationNo = true;
                $scope.ErrorModel.ErrorSelectMainCRegt = "Please Enter REGT NO .";
                valid = false;
            }
            else {
                $scope.ErrorModel.ContractorRegistrationNo = false;
                valid = true;
            }
        }
        if (valid) {
            if ($scope.ContractorModel.ContractorGstNo == "") {
                $scope.ErrorModel.ContractorGstNo = true;
                $scope.ErrorModel.ErrorSelectMainCGst = "Please Enter GST No.";
                valid = false;
            }
            else {
                $scope.ErrorModel.ContractorGstNo = false;
                valid = true;
            }
        }
        if (valid) {
            if ($scope.ContractorModel.ContractorOfficeAddress == "") {
                $scope.ErrorModel.ContractorOfficeAddress = true;
                $scope.ErrorModel.ErrorSelectMainCAdd = "Please Enter Contractor Office Address.";
                valid = false;
            }
            else {
                $scope.ErrorModel.ContractorOfficeAddress = false;
                valid = true;
            }
        }
        var phonev = this.Phone($scope.ContractorModel.ContractorPhoneNo);
        if(valid==true){
            if (phonev == false) {
            $scope.ErrorModel.ContractorPhoneNo = true;
            $scope.ErrorModel.ErrorSelectMainCPh = "Contractor Phone No .";
            valid = false;
        }
        else {
           
            $scope.ErrorModel.ContractorPhoneNo = false;
            valid = true;
            
           
        }
    }
        return valid;
    }

    $scope.ErrorModel = {
        ContractorId: false, ErrorSelectContractor: "", ContractorCompanyName: false, ErrorSelectMainCCoyName: "", ContractorRegistrationNo: false, ErrorSelectMainCRegt: "",
        ContractorGstNo: false, ErrorSelectMainCGst: "", ContractorOfficeAddress: false, ErrorSelectMainCAdd: "",
        ContractorPhoneNo: false, ErrorSelectMainCPh: ""
    };
    $scope.init = function () {
        setCookie("Token", $('#hdnToken').val());
        checkToken();
        $("#ddlPageSize").val(5);
        $scope.ContractorModel.PageSize = $("#ddlPageSize").val();
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.GetContractorList();

    }

    $scope.init();


}]);