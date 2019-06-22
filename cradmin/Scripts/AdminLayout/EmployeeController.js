﻿CRAdminApp.controller("EmployeeController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {
    
    $scope.urlBase = GetVirtualDirectory();
    $scope.ZoneList = [];
    $scope.TradeCategoryList = [];
    $scope.ValidationAgencyList = [];
    $scope.EmployeeTypeList = [];
    $scope.ContractorList = [];
    $scope.EmployeeModal = { PageNo: 1, PageSize: 2 ,AdhaarNo : ""};
    
    function GetMasterDataList()
    {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/Dashboard/GetMasterDataforRegister',
            data: $scope.EmployeeModal,
        }).then(function (response) {
            HideLoader();
            if (response.data.Status == 1) {
                $scope.ZoneList = response.data.ZoneList;
                $scope.TradeCategoryList = response.data.TradeCategoryList;
                $scope.ValidationAgencyList = response.data.ValidationAgencyList;
                $scope.EmployeeTypeList = response.data.EmployeeTypeList;
                $scope.ContractorList = response.data.ContractorList;
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
            }
            else {
                window.location = $scope.urlBase + "/dashboard/index";
            }
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }

    $scope.CheckAdhaarExist = function () {
        if ($scope.EmployeeModal.AdhaarNo.length==12) {
            ShowLoader();
            $http({
                method: 'post',
                url: $scope.urlBase + '/Dashboard/CheckAdhaarExist',
                data: $scope.EmployeeModal,
            }).then(function (response) {
                HideLoader();
            }, function (error) {
                HideLoader();
                console.log(error);
            })
        }
    }

    $scope.init = function () {
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
            $("#AdhaarImagehidden").val(response)
            HideLoader();
        },
        error: function (er) {
            alert(er.responseText);
        }
    });
}