CRAdminApp.controller("RollFormMappingController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();

    $scope.RollList = [];
    $scope.FormList = [];
    $scope.RollFormMappingList = [];
    $scope.SearchFormRollList = [];
    $scope.FormIdList = [];
    $scope.TotalRecords = 0;
    $scope.TotalPages = 0
    $scope.Prefix = "";
    var formlist = "";
    var discon1 = "conti";
    $scope.FormList1 = [];
    $scope.group1 = [];

    function GetMasterDataList() {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/RollFormMapping/GetMasterDataforAssign',
            data: $scope.LoginModal,
        }).then(function (response) {
            HideLoader();
            if (response.data.Status == 1) {
                $scope.RollList = response.data.RollList;
                $scope.FormList = response.data.FormList;


                $scope.RollList.splice(0, 0, { RollId: 0, RollDescription: "---Select Roll---" });


                var html = "";
                angular.forEach($scope.RollList, function (value, key) {
                    html += "<option value='" + value.RollId + "'>" + value.RollDescription + "</option>";
                });
                $("#ddlRoll").html(html);
               
                var j = 0;
                var k = 0;
                for (j = 0; j < $scope.FormList.length; j++) {
                    var i = 0;
                    for (i; i < 3; i++) {
                        if (k == $scope.FormList.length) {
                            break;
                        }
                        $scope.FormList1.push($scope.FormList[k]);
                        k++;
                    }
                    $scope.group1[j] = $scope.FormList1;
                    if (k == $scope.FormList.length) {
                        break;
                    }
                    $scope.FormList1 = [];

                }
            }
            else {
                // window.location = $scope.urlBase + "/RollFormMapping/index";
            }
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }
    var FormId;
    var selected = [];
    $scope.selectedForm = [];
    $scope.selectedItem = {};
    var i = 0;
    function selectedform() {
        if ($scope.selectedItem.length == 0) {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "Error",
                Message: "Please select at list One Form for Assign To roll ",
                Type: "alert"
            });
            objShowCustomAlert.ShowCustomAlertBox();

        }
        for (i in $scope.selectedItem) {
            selected.push(i);
        }
        formlist = selected.join(',');
        selected = [];
    }

    $scope.AddNew = false;
    $scope.Details = true;
    $scope.Update = false;
    $scope.next = true;
    $scope.prev = true;


    $scope.FormToRollModel = { PageNo: 1, PageSize: 4, Prefix: "", AuthorisedBy: "", RollId: null, FormId: 0, RollDescription: "", FormTitle: "", RollFormMappingId: "", EntryBy: 1, EntryDate: null, AllFormId: "", discontinew: discon1 };

    $scope.AddNewClick = function () {
       
        $scope.AddNew = true;
        $scope.Details = false;
        $scope.Update = false;
        
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
       
    }

    $scope.PageSizeList = [5, 10, 15, 20];


    $scope.Save = function () {
        selectedform();

        $scope.FormToRollModel.RollId = $("#ddlRoll").val();
        $scope.FormToRollModel.discontinew = "naresh";
        $scope.FormToRollModel.RollFormMappingId = null;
        $scope.FormToRollModel.AllFormId = formlist;
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/RollFormMapping/Save',
            data: $scope.FormToRollModel,
        }).then(function (response) {
            HideLoader();
            if (response.data.Status == 0) {
                var objShowCustomAlert = new ShowCustomAlert({
                    Title: "Error",
                    Message: "This Record Is All Ready Exist",
                    Type: "alert"
                });
                objShowCustomAlert.ShowCustomAlertBox();
                $scope.selectedItem = {};
            }
            else {
                var objShowCustomAlert = new ShowCustomAlert({
                    Title: "Success",
                    Message: "Record Seved Successfully",
                    Type: "alert"
                });
                objShowCustomAlert.ShowCustomAlertBox();
                $scope.selectedItem = {};
            }
            $scope.CancelClick();
            $scope.GetFormToRollList();
        }, function (error) {
            HideLoader();
            console.log(error);
        });

    }
    //Edit 

    //update
   
    //update
    // discontinew
    $scope.Discontinew = function (FormToRoll) {

       
        $scope.FormToRollModel = { AllFormId:"", RollFormMappingId: FormToRoll.RollFormMappingId, RollDescription: FormToRoll.RollDescription, FormTitle: FormToRoll.FormTitle, AuthorisedBy: FormToRoll.AuthorisedBy, FormId: FormToRoll.FormId, RollId: FormToRoll.RollId, EntryDate: FormToRoll.EntryDate, };
        $scope.FormToRollModel.discontinew = 'Discon';


        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/RollFormMapping/Discontinew',
            data: $scope.FormToRollModel,
        }).then(function (response) {
            HideLoader();
            if (response.data.Status == 0) {
                var objShowCustomAlert = new ShowCustomAlert({
                    Title: "Error",
                    Message: "Technical Error for Discontinuation",
                    Type: "alert"
                });
                objShowCustomAlert.ShowCustomAlertBox();
                $scope.GetFormToRollList();
            }
            else {
                var objShowCustomAlert = new ShowCustomAlert({
                    Title: "Success",
                    Message: " This Form Successfully Discontinew",
                    Type: "alert"
                });
                objShowCustomAlert.ShowCustomAlertBox();
                $scope.GetFormToRollList();
            }
           
            
        }, function (error) {
            HideLoader();
            console.log(error);
        });
       
    }
    //discontinew
    var objdatehelper = new datehelper({ format: "dd/MM/yyyy", cdate: new Date() });
    $scope.Edit = function (FormToRoll) {
        $scope.Details = false;
        $scope.AddNew = true;
        $scope.Update = true;
        $("#ddlRoll").val(FormToRoll.RollId);
        $scope.FormToRollModel = { RollFormMappingId: FormToRoll.RollFormMappingId, RollDescription: FormToRoll.RollDescription, FormTitle: FormToRoll.FormTitle, AuthorisedBy: FormToRoll.AuthorisedBy, FormId: FormToRoll.FormId, RollId: FormToRoll.RollId, EntryDate: FormToRoll.EntryDate, };
    }
    //Edit

    $scope.GetFormToRollList = function () {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/RollFormMapping/GetFormToRoll',
            data: $scope.FormToRollModel,
        }).then(function (response) {
            HideLoader();

            $scope.RollFormMappingList = response.data;
            if (response.data.length > 0) {
                $scope.TotalRecords = response.data[0].TotalRecords;
                $scope.TotalPages = parseInt($scope.TotalRecords / $scope.FormToRollModel.PageSize);
                var reminder = $scope.TotalRecords % $scope.FormToRollModel.PageSize;
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
        if ($scope.FormToRollModel.PageNo > 1) {
            $scope.FormToRollModel.PageNo--;
            $scope.GetFormToRollList();
        }
    }

    $scope.Next = function () {
        if ($scope.FormToRollModel.PageNo < $scope.TotalPages) {
            $scope.FormToRollModel.PageNo++;
            $scope.GetFormToRollList();
        }
        if ($scope.FormToRollModel.PageNo == $scope.TotalPages) {
            $scope.next = true;
            $scope.prev = true;
        }
    }



    $scope.FilterList = function () {

        $scope.GetFormToRollList();

        $scope.First();
    }
    $scope.Reset = function () {
        $scope.RollFormMappingList = $scope.RollFormMappingList;
        $scope.SearchFormRollList = $scope.RollFormMappingList;
        $scope.First();
    }


    $scope.init = function () {
        checkToken();
        $("#ddlPageSize").val(5);
        $scope.FormToRollModel.PageSize = $("#ddlPageSize").val();
        GetMasterDataList();
        $scope.GetFormToRollList();
    }

    $scope.init();
}]);