//// JavaScript source code

var CRAdminApp = angular.module('CRAdminApp', []).run(['$rootScope', function ($rootScope) {
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

