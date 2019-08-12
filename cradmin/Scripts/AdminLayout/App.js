//// JavaScript source code

var CRAdminApp = angular.module('CRAdminApp',[]).run(['$rootScope', function ($rootScope) {
    $rootScope.Branding = $("#branding").val();
    $rootScope.CheckBranding = function ()
    {
        var IsBranding = false;
        if ($rootScope.Branding=="SINDHI" || $rootScope.Branding=="WANG") {
            IsBranding = true;
        }
        return IsBranding;
    }


    
}]).filter("mydate", function () {
    var re = /\/Date\(([0-9]*)\)\//;
    return function (x) {
        if (x != null && x !== undefined) {
            var m = x.match(re);
            if (m) return new Date(parseInt(m[1]));
            else return null;
        }
        else return null;
    };
}).directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
}).directive('ngFocusOut', function( $timeout ) {
    return function( $scope, elem, attrs ) {
        $scope.$watch(attrs.ngFocusOut, function( newval ) {
            if ( newval ) {
                $timeout(function() {
                    elem[0].focusout();
                }, 0, false);
            }
        });
    };
});


CRAdminApp.controller("TemplateController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {
    
    $scope.domainpath = GetVirtualDirectory();
   
    $scope.templates = [
    //name: "employee",0
        {name: $scope.domainpath + '/Content/Views/employee.html',
        url: $scope.domainpath + '/Content/Views/employee.html'
    }, {
        //name: 'Contractor', 1
        name: $scope.domainpath + '/Content/Views/Contractor.html',
        url: $scope.domainpath + '/Content/Views/Contractor.html'
    }, {
        //TradeCategory 2
        name: $scope.domainpath + '/Content/Views/TradeCategory.html',
        url: $scope.domainpath + '/Content/Views/TradeCategory.html'
    },
    {
        //name: 'EmployeeType', 3
        name: $scope.domainpath + '/Content/Views/EmplooyeeType.html',
        url: $scope.domainpath + '/Content/Views/EmplooyeeType.html'
    },
    {
        //name: 'Trade', 4
        name: $scope.domainpath + '/Content/Views/Trade.html',
        url: $scope.domainpath + '/Content/Views/Trade.html'
    },
    {
        //name: 'Role', 5
        name: $scope.domainpath + '/Content/Views/Role.html',
        url: $scope.domainpath + '/Content/Views/Role.html'
    },
    {
        //name: 'ValidationAgency', 6
        name:$scope.domainpath + '/Content/Views/ValidationAgency.html',
        url: $scope.domainpath + '/Content/Views/ValidationAgency.html'
    },
    {
        //name: 'ProjectType', 7
        name: $scope.domainpath + '/Content/Views/ProjectType.html',
        url: $scope.domainpath + '/Content/Views/ProjectType.html'
    },
    {
        //name: 'CourseMaster', 8
        name: $scope.domainpath + '/Content/Views/CourseMaster.html',
        url: $scope.domainpath + '/Content/Views/CourseMaster.html'
    },
    {
        //name: 'Plant', 9
        name: $scope.domainpath + '/Content/Views/Plant.html',
        url: $scope.domainpath + '/Content/Views/Plant.html'
    },
    {
        //name: 'PlantTradeTracking', 10
        name: $scope.domainpath + '/Content/Views/PlantTradeTracking.html',
        url: $scope.domainpath + '/Content/Views/PlantTradeTracking.html'
    },
    {
        //name: 'DeptZone', 11
        name: $scope.domainpath + '/Content/Views/DeptZone.html',
        url: $scope.domainpath + '/Content/Views/DeptZone.html'
    },
    {
        //name: 'DeptZone', 11
        name: $scope.domainpath + '/Content/Views/RollFormMapping.html',
        url: $scope.domainpath + '/Content/Views/RollFormMapping.html'
    },
    {
        name: $scope.domainpath + '/Content/Views/Department.html',
        url: $scope.domainpath + '/Content/Views/Department.html'

    },
     {
        name: $scope.domainpath + '/Content/Views/SubContractor.html',
        url: $scope.domainpath + '/Content/Views/SubContractor.html'

     },
    {
        name: $scope.domainpath + '/Content/Views/ValidationTest.html',
        url: $scope.domainpath + '/Content/Views/ValidationTest.html'

    },
    {
        name: $scope.domainpath + '/Content/Views/ValidationTestQuetion.html',
        url: $scope.domainpath + '/Content/Views/ValidationTestQuetion.html'

    }];
    
    $scope.NumericAadhar = function ($event, aadhar) {
        if (isNaN(String.fromCharCode($event.keyCode))) {
            $event.preventDefault();
        }
        if (aadhar.length > 11)
        {
            $event.preventDefault();
        }
    }
    $scope.NumericPhone = function ($event, no) {
        if (isNaN(String.fromCharCode($event.keyCode))) {
            $event.preventDefault();
        }
        if (no.length > 9) {
            $event.preventDefault();
        }
    }

    $scope.Phone = function ($event,no) {
       
        if (no.toString().length > 9) {
            $event.preventDefault();
        }
    }

    $scope.LoadUserControls = function (tname) {
        switch (tname) {
             
             case "ValidationTestQuetion":
                $scope.template = $scope.templates[16];
        break
            case "ValidationTest":
                $scope.template = $scope.templates[15];
                break
            case "SubContractor":
                $scope.template = $scope.templates[14];
                break
            case "Department":
                $scope.template = $scope.templates[13];
                break
            case "RollFormMapping":
                $scope.template = $scope.templates[12];
                break
            case "DeptZone":
                $scope.template=$scope.templates[11];
                break
            case "PlantTradeTracking":
                $scope.template = $scope.templates[10];
                break
            case "Plant":
                $scope.template = $scope.templates[9];
                break
            case "CourseMaster":
                $scope.template = $scope.templates[8];
                break
            case "ProjectType":
                $scope.template = $scope.templates[7];
                break
            case "ValidationAgency":
                $scope.template = $scope.templates[6];
                break
            case "Role":
                $scope.template = $scope.templates[5];
                break
            case "Trade":
                $scope.template = $scope.templates[4];
                break
            case "EmployeeType":
                $scope.template = $scope.templates[3];
                break
            case "TradeCategory":
                $scope.template = $scope.templates[2];
                break
            case "Contractor":
                $scope.template = $scope.templates[1];
                break
            case "employee":
                $scope.template = $scope.templates[0];
                break

        }
    }

    $scope.init = function () {
        $scope.template = $scope.templates[0];
    }

    $scope.init();
}]);
