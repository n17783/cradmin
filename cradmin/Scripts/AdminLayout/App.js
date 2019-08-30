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
    },
     {
        //name: 'ProjectType', 1
        name: $scope.domainpath + '/Content/Views/ProjectType.html',
        url: $scope.domainpath + '/Content/Views/ProjectType.html'
    },
    {
        //name: 'Contractor', 2
        name: $scope.domainpath + '/Content/Views/Contractor.html',
        url: $scope.domainpath + '/Content/Views/Contractor.html'
    },
     {
         //name: 'Sub Contractor', 3
         name: $scope.domainpath + '/Content/Views/SubContractor.html',
         url: $scope.domainpath + '/Content/Views/SubContractor.html'
     },
     {
         //name: 'DeptZone', 4
         name: $scope.domainpath + '/Content/Views/DeptZone.html',
         url: $scope.domainpath + '/Content/Views/DeptZone.html'
     },
      //name: ' Sub Department', 5
      {
          name: $scope.domainpath + '/Content/Views/Department.html',
          url: $scope.domainpath + '/Content/Views/Department.html'

      },
       {
           //name: 'Plant', 6
           name: $scope.domainpath + '/Content/Views/Plant.html',
           url: $scope.domainpath + '/Content/Views/Plant.html'
       },
    {
        //name: 'PlantTradeTracking', 7
        name: $scope.domainpath + '/Content/Views/PlantTradeTracking.html',
        url: $scope.domainpath + '/Content/Views/PlantTradeTracking.html'
    },
    {
        //TradeCategory 8
        name: $scope.domainpath + '/Content/Views/TradeCategory.html',
        url: $scope.domainpath + '/Content/Views/TradeCategory.html'
    },
     {
         //name: 'Trade', 9
         name: $scope.domainpath + '/Content/Views/Trade.html',
         url: $scope.domainpath + '/Content/Views/Trade.html'
     },
    {
        //name: 'EmployeeType', 10
        name: $scope.domainpath + '/Content/Views/EmplooyeeType.html',
        url: $scope.domainpath + '/Content/Views/EmplooyeeType.html'
    },
   
    {
        //name: 'Role', 11
        name: $scope.domainpath + '/Content/Views/Role.html',
        url: $scope.domainpath + '/Content/Views/Role.html'
    },
     {
         //name: 'Role Form Mapping', 12
         name: $scope.domainpath + '/Content/Views/RollFormMapping.html',
         url: $scope.domainpath + '/Content/Views/RollFormMapping.html'
     },
      {
        //name: 'CourseMaster', 13
        name: $scope.domainpath + '/Content/Views/CourseMaster.html',
        url: $scope.domainpath + '/Content/Views/CourseMaster.html'
    },
    {
        //name: 'ValidationAgency', 14
        name:$scope.domainpath + '/Content/Views/ValidationAgency.html',
        url: $scope.domainpath + '/Content/Views/ValidationAgency.html'
    },
   
     {
         //name: 'Validation Test Master', 15
         name: $scope.domainpath + '/Content/Views/ValidationTest.html',
         url: $scope.domainpath + '/Content/Views/ValidationTest.html'
     },
   
   {
       //name: 'quetion Master for Validation', 16
       name: $scope.domainpath + '/Content/Views/ValidationTestQuetion.html',
       url: $scope.domainpath + '/Content/Views/ValidationTestQuetion.html'
   },
   
   
    {
        //name: 'CandidatesForValidation', 17
        name: $scope.domainpath + '/Content/Views/CandidatesForValidation.html',
        url: $scope.domainpath + '/Content/Views/CandidatesForValidation.html'
    },
     {
         //name: ' Validate Candidates', 18
         name: $scope.domainpath + '/Content/Views/ValidatedCandidates.html',
         url: $scope.domainpath + '/Content/Views/ValidatedCandidates.html'
     },
    {
        //name: 'Validation Process', 19
        name: $scope.domainpath + '/Content/Views/ValidationProcess.html',
        url: $scope.domainpath + '/Content/Views/ValidationProcess.html'
    },
    {
        //name: 'Validation Process', 20
        name: $scope.domainpath + '/Content/Views/SkillMaster.html',
        url: $scope.domainpath + '/Content/Views/SkillMaster.html'
    },
    {
        //name: 'Validation Process', 21
        name: $scope.domainpath + '/Content/Views/SkillCreation.html',
        url: $scope.domainpath + '/Content/Views/SkillCreation.html'
    },
    {
        //name: 'CandidatesForValidation', 22
        name: $scope.domainpath + '/Content/Views/ValidatedCandidates.html',
        url: $scope.domainpath + '/Content/Views/ValidatedCandidates.html'
    },
    {
        //name: 'CandidatesForAssesment', 23
        name: $scope.domainpath + '/Content/Views/CandidatesForAssesment.html',
        url: $scope.domainpath + '/Content/Views/CandidatesForAssesment.html'
    },
    {
        //name: 'AssessedCandidates', 24
        name: $scope.domainpath + '/Content/Views/AssessedCandidates.html',
        url: $scope.domainpath + '/Content/Views/AssessedCandidates.html'
    },
     {
         //name: 'AssessedCandidates', 25
         name: $scope.domainpath + '/Content/Views/AssessmentReport.html',
         url: $scope.domainpath + '/Content/Views/AssessmentReport.html'
     },
     {
         //name: 'AssessedCandidates', 26
         name: $scope.domainpath + '/Content/Views/CandidatesForTraining.html',
         url: $scope.domainpath + '/Content/Views/CandidatesForTraining.html'
     },
     {
         //name: 'AssessedCandidates', 27
         name: $scope.domainpath + '/Content/Views/TrainedCandidates.html',
         url: $scope.domainpath + '/Content/Views/TrainedCandidates.html'
     },
     {
         //name: 'AssessedCandidates', 28
         name: $scope.domainpath + '/Content/Views/TrainingProcess.html',
         url: $scope.domainpath + '/Content/Views/TrainingProcess.html'
     },
     {
         //name: 'AssessedCandidates', 29
         name: $scope.domainpath + '/Content/Views/UserRoleMapping.html',
         url: $scope.domainpath + '/Content/Views/UserRoleMapping.html'
     }, 
     {
         //name: 'AssessedCandidates', 29
         name: $scope.domainpath + '/Content/Views/ValidationEntryForm.html',
         url: $scope.domainpath + '/Content/Views/ValidationEntryForm.html'
     }];
    
    $scope.validateEmail=function (element) {
        var isvalid = true;
        var reg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        isvalid = reg.test(element);
       
        return isvalid;
    }
    $scope.NumericAadhar = function ($event, aadhar) {
        if (isNaN(String.fromCharCode($event.keyCode))) {
            $event.preventDefault();
        }
        if (aadhar.length > 11) {
            $event.preventDefault();
        }
         if(no.length<11)
        {
           return valid=false

        }
    }
    $scope.NumericPhone = function ($event, no) {
        var valid = true;
        if (isNaN(String.fromCharCode($event.keyCode))) {
            $event.preventDefault();
        }
        if (no.length > 9) {
            $event.preventDefault();
        }
        if(no.length<9)
        {
           return valid=false

        }
    }

    $scope.Phone = function (no) {
        var no1 = true;
        
        if (no.toString().length < 10 || isNaN(no)) {
            return no1 = false;
        }
    }
    $scope.aadhar = function (no) {
        var no1 = true;

        if (no.toString().length < 11 || isNaN(no)) {
            return no1 = false;
        }
    }
    




    $scope.LoadUserControls = function (tname) {
        switch (tname) {
            case "ValidationEntryForm":
                $scope.template = $scope.templates[30];
        break
            case "UserRollMapping":
                $scope.template = $scope.templates[29];
                break
            case "TrainingProcess":
                $scope.template = $scope.templates[28];
                break
            case "TrainedCandidates":
                $scope.template = $scope.templates[27];
                break
            case "CandidatesForTraining":
                $scope.template = $scope.templates[26];
                break
            case "AssessmentReport":
                $scope.template = $scope.templates[25];
                break
            case "AssessedCandidates":
                $scope.template = $scope.templates[24];
                break
            case "CandidatesForAssesment":
                $scope.template = $scope.templates[23];
                break
             case "SkillCreationMaster":
                $scope.template = $scope.templates[21];
            break
            case "SkillMaster":
                $scope.template = $scope.templates[20];
                break
            case "ValidationProcess":
                $scope.template = $scope.templates[19];
                break
            case "ValidatedCandidates":               
                $scope.template = $scope.templates[18];
                break
            case "CandidatesForValidation":              
                $scope.template = $scope.templates[17];
                break
           
             case "ValidationTestQuetion":
                $scope.template = $scope.templates[16];
                break
          
            case "ValidationTest":
                $scope.template = $scope.templates[15];
                break
            case "ValidationAgency":
                $scope.template = $scope.templates[14];
                break
                 case "CourseMaster":
                $scope.template = $scope.templates[13];
                break
           
                 case "RollFormMapping":
                $scope.template = $scope.templates[12];
                break
            case "Role":
                $scope.template = $scope.templates[11];
                break
           
            case "EmployeeType":
                $scope.template = $scope.templates[10];
                break
            case "Trade":
                $scope.template = $scope.templates[9];
                break
            case "TradeCategory":
                $scope.template = $scope.templates[8];
                break
            case "PlantTradeTracking":
                $scope.template = $scope.templates[7];
                break
            case "Plant":
                $scope.template = $scope.templates[6];
                break
            case "Department":
                $scope.template = $scope.templates[5];
                break
            case "DeptZone":
                $scope.template = $scope.templates[4];
                break
            case "SubContractor":
                $scope.template = $scope.templates[3];
                break
            case "Contractor":
                $scope.template = $scope.templates[2];
                break
                 case "ProjectType":
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
