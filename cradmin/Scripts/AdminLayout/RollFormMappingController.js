CRAdminApp.controller("RollFormMappingController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.urlBase = GetVirtualDirectory();

    $scope.RollList = [];
    $scope.FormList = [];
    $scope.RollFormMappingList = [];
    $scope.SearchFormRollList = [];
    $scope.TotalRecords = 0;
    $scope.TotalPages = 0
    $scope.Prefix = "";
   

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


                $scope.RollList.splice(0, 0, { RoleID: 0, RoleDescription: "---Select Roll---" });
             

                var html = "";
                angular.forEach($scope.RollList, function (value, key) {
                    html += "<option value='" + value.RoleID + "'>" + value.RoleDescription + "</option>";
                });
                $("#ddlRoll").html(html);
                
                $scope.FormList1 = [];
                $scope.FormList2 = []; 
                $scope.FormList3 = [];
                var list1,list2,list3;
                var group =[];//[ $scope.FormList1,$scope.FormList2, $scope.FormList3 ];
                var myarray = {};
                var groupsize= $scope.FormList.length / 3;
                var groupsize1 = groupsize;
                if ((groupsize1%3)>0) {
                    groupsize1++;
                }
               
                var i = 0;
                for (i; i < groupsize1; i++) {
                    $scope.FormList1.push($scope.FormList[i]);
                   
                }
                group.push($scope.FormList1);
                groupsize = i + groupsize;
                for (i; i < groupsize; i++) {
                    $scope.FormList2.push($scope.FormList[i]);
                    
                }
                group.push($scope.FormList2);
                groupsize = i + groupsize;
                for (i; i < groupsize; i++) {
                    $scope.FormList3.push($scope.FormList[i]);
                   
                }
                group.push($scope.FormList3);
                
               
            }
          

            else {
                window.location = $scope.urlBase + "/RollFormMapping/index";
            }
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }


    $scope.FormList1 = [];
    $scope.FormList2 = [];
    $scope.FormList3 = [];

    //

    $scope.AddNew = false;
    $scope.Details = true;
    $scope.Update = false;
    $scope.next = true;
    $scope.prev = true;


    $scope.FormToRollModel = { PageNo: 1, PageSize: 4, Prefix: "", AuthorizedBy: "", RoleID: "", FormID: "", RoleDescription: "", FormTitle: "", RollFormMappingId: "", EntryBy: 1, EntryDate: null };

    $scope.AddNewClick = function () {
        $scope.AddNew = true;
        $scope.Details = false;
        $scope.Update = false;
        $scope.FormToRollModel = null;
        // $scope.FormToRollModel = { PageNo: 1, PageSize: 2, AuthorizedStrenth: "", AuthorizedBy: "", AuthorizedDate: "", PlantId: "", TradeId: "", TradDescription: "", PlantTitle: "", PlantTradeTrackingId: "" };
    }

    $scope.CancelClick = function () {
        $scope.AddNew = false;
        $scope.Details = true;
        $scope.FormToRollModel = null;
        //$scope.FormToRollModel = { PageNo: 1, PageSize: FormToRollModel.PageSize, Prefix: "", AuthorizedStrenth: "", AuthorizedBy: "", AuthorizedDate: "", PlantId: "", TradeId: "", TradDescription: "", PlantTitle: "", PlantTradeTrackingId: "" };
    }

    $scope.PageSizeList = [5, 10, 15, 20];
    $scope.PlantTradeTrackingList = [];

    $scope.Save = function () {
        $scope.FormToRollModel.RoleID = $("#ddlRoll").val();
        $scope.FormToRollModel.RoleID = $("#ddlForm").val();
       // $scope.FormToRollModel.AuthorizedBy = $("#ddlAAuthority").val();
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
            $scope.GetFormToRollList();
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }
    //Edit 

    //update
    $scope.Update = function () {
        $scope.FormToRollModel.RoleID = $("#ddlRoll").val();
        $scope.FormToRollModel.FormId = $("#ddlForm").val();

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
            }
            else {
                var objShowCustomAlert = new ShowCustomAlert({
                    Title: "Success",
                    Message: "Record  Successfully",
                    Type: "alert"
                });
                objShowCustomAlert.ShowCustomAlertBox();
            }
            $scope.CancelClick();
            $scope.GetFormToRollList();
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }
    //update
    var objdatehelper = new datehelper({ format: "dd/MM/yyyy", cdate: new Date() });
    $scope.Edit = function (FormToRoll) {
        $scope.Details = false;
        $scope.AddNew = true;
        $scope.Update = true;
        $("#ddlRoll").val(FormToRoll.RoleID)
        $("#ddlForm").val(FormToRoll.FormId);
       // $("#ddlAdate").val(objdatehelper.getFormatteddate($filter('mydate')(TradeTracking.AuthorizedDate), "dd/mm/yyyy"));

        
        $scope.FormToRollModel = { RollFormMappingId: FormToRoll.RollFormMappingId, RoleDescription: FormToRoll.RoleDescription, FormTitle: FormToRoll.FormTitle, AuthorizedBy: FormToRoll.AuthorizedBy, FormId: FormToRoll.FormId, RoleID: FormToRoll.RoleID, EntryDate:FormToRoll.EntryDate };
        

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
        GetMasterDataList();
        $scope.GetFormToRollList();
    }

    $scope.init();
}]);