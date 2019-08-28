CRAdminApp.controller("UserRollMappingController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {
    $scope.urlBase = GetVirtualDirectory();
    $scope.RoleList = [];
    $scope.Staff = { PageNo: 1, PageSize: 5 };
    $scope.UserList = [];

    function GetRoleList() {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/Dashboard/Get_UserRoles',
            beforeSend: function (request) {
                request.setRequestHeader("Token", getToken());
            }
        }).then(function (response) {
            HideLoader();
            if (response.data.Status == 1) {
                $scope.RoleList = response.data.RoleList;
                $scope.RoleList.splice(0, 0, { RollId: 0, RollDescription: "---Select Role---" });
                var html6 = "";
                angular.forEach($scope.RoleList, function (value, key) {
                    html6 += "<option value='" + value.RollId + "'>" + value.RollDescription + "</option>";
                });
                $("#ddlRole").html(html6);
            }
            else {
                window.location = $scope.urlBase + "/dashboard/index";
            }
        }, function (error) {
            HideLoader();
        })
    }
    $scope.TotalRecords = 0;
    $scope.TotalPages = 0;

    $scope.AssignRole = function () {
        $scope.Staff.RollId = $("#ddlRole").val();
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/Dashboard/Assign_Role',
            beforeSend: function (request) {
                request.setRequestHeader("Token", getToken());
            },
            data: $scope.Staff,
        }).then(function (response) {
            HideLoader();
            if (response.data.Status == 1) {
                var objShowCustomAlert = new ShowCustomAlert({
                    Title: "Success",
                    Message: "Role Assigned to user Successfully",
                    Type: "alert",
                    OnOKClick: function () {
                        GetUserList();
                    },
                });
                objShowCustomAlert.ShowCustomAlertBox();
                
            }
            else {
                window.location = $scope.urlBase + "/dashboard/index";
            }
        }, function (error) {
            HideLoader();
        })
    }

    $scope.SetUser = function (user) {
        $scope.Staff = user;
    }

    $scope.Prev = function () {
        if ($scope.Staff.PageNo > 1) {
            $scope.Staff.PageNo--;
            $scope.GetUserList();
        }
    }

    $scope.Next = function () {
        if ($scope.Staff.PageNo < $scope.TotalPages) {
            $scope.Staff.PageNo++;
            $scope.GetUserList();
        }
    }

    function GetUserList() {
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/Dashboard/Get_StaffDetails',
            beforeSend: function (request) {
                request.setRequestHeader("Token", getToken());
            },
            data:$scope.Staff,
        }).then(function (response) {
            HideLoader();
            if (response.data.Status == 1) {
                $scope.TotalRecords = response.data.StaffList[0].TotalRecords;
                $scope.TotalPages = parseInt($scope.TotalRecords / $scope.Staff.PageSize);
                $scope.UserList = response.data.StaffList;
            }
            else {
                window.location = $scope.urlBase + "/dashboard/index";
            }
        }, function (error) {
            HideLoader();
        })
    }

    $scope.init = function () {
        $("#ddlPageSize").val(5);
        $scope.Staff = { PageNo: 1, PageSize: $("#ddlPageSize").val() };
        GetRoleList();
        GetUserList();
    }

    $scope.init();
}]);