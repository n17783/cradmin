CRAdminApp.controller("AssessmentReportController", ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

    $scope.AssessmentReportDetailsList = [];
    $scope.AssessmentReport = true;
    $scope.GetAssessedReportDetails = function () {
        debugger;
        ShowLoader();
        $http({
            method: 'post',
            url: $scope.urlBase + '/CandidatesForValidation/GetAssessedReportDetails',
            data: $scope.ValidationProcessModel,
        }).then(function (response) {
            debugger;
            HideLoader();
            if (response.data.length > 0) {
                $scope.AssessmentReportDetailsList = {
                    SrNo: response.data[0].SrNo,
                    PRN: response.data[0].PRN,
                    Adhar: response.data[0].Adhar,
                    Name: response.data[0].Name,
                    PhotoURL: response.data[0].PhotoURL,
                    TradeCategory: response.data[0].TradeCategory,
                    TradeName: response.data[0].TradeName,
                    ProjectTypeName: response.data[0].ProjectTypeName,
                    EmpDetailsId: response.data[0].EmpDetailsId,
                    EmpValidationId: response.data[0].EmpValidationId,
                    ApplicationID: response.data[0].ApplicationID,
                    AssessmentID: response.data[0].AssessmentID,
                    AssessmentDate: response.data[0].AssessmentDate,
                    JobTitle: response.data[0].JobTitle,
                    MobileNo: response.data[0].MobileNo,
                    EmergencyContactNo: response.data[0].EmergencyContactNo,
                    Contractor: response.data[0].Contractor,
                    PermanentAddress: response.data[0].PermanentAddress,
                    DOB: response.data[0].DOB,
                    TestLocation: response.data[0].TestLocation,
                    City: response.data[0].City,
                    State: response.data[0].State,
                    Pincode: response.data[0].Pincode,
                    VOTotalMarks: response.data[0].VOTotalMarks,
                    VOObtainMarks: response.data[0].VOObtainMarks,
                    VPTotalMarks: response.data[0].VPTotalMarks,
                    VPObtainMarks: response.data[0].VPObtainMarks,
                    VWTotalMarks: response.data[0].VWTotalMarks,
                    VWObtainMarks: response.data[0].VWObtainMarks,
                    SumMarks: response.data[0].VOObtainMarks + response.data[0].VPObtainMarks + response.data[0].VWObtainMarks
                };
                //  $scope.AssessmentReportDetailsList = response.data;
            }
        }, function (error) {
            HideLoader();
            console.log(error);
        });
    }

    $scope.savePdfSample = function () {
        debugger;
        //var pdf = new jsPDF('p', 'pt', 'letter');
       
        //var canvas = pdf.canvas
        //canvas.height = 72 * 15;
        //canvas.width = 72 * 15;
        //var html = $("#AssessmentReportPDFDownload").html();
        //var options = {
        //    pagesplit: true
        //};
       


       // var pdf = new jsPDF({ unit: 'pt', format: 'letter' }), // Infers that units are in mm and page is portrait
       //     pageNum = 1,
       //     margin = 72, // = 1 inch
       //     cursor = { x: margin, y: 18 },
       //     temp;

       // pdf.setFont("arial");
       // /***************** Header *****************/
       // /************* Border *************/
       // pdf.setFontSize(16);
       // temp = 2 * pdf.internal.getLineHeight(); //2 rows at 16
       // pdf.setFontSize(11);
       // temp = temp + (5 * pdf.internal.getLineHeight()); //Roughly 5 rows at 11
       // pdf.setFontSize(12);
       // temp += pdf.internal.getLineHeight(); //1 row at 12
       // pdf.rect(cursor.x, cursor.y + 2, pdf.internal.pageSize.width - (2 * margin), Math.ceil(temp) + 6 /*give a little buffer*/, 'S');
       // /************* Text *************/
       // pdf.setFontSize(16);
       // pdf.setFontStyle("bold");
       // pdf.text("A DESK GUIDE FOR THE REVIEW OF NONPROFIT\nAPPLICATIONS", pdf.internal.pageSize.width / 2, cursor.y + pdf.internal.getLineHeight(), 'center');
       // cursor.y += pdf.internal.getLineHeight() * 2;
       // pdf.setFontSize(11);
       // cursor.y += pdf.internal.getLineHeight();
       // cursor.x = (margin * 2); // Indent for list
       // pdf.circle(cursor.x - (margin / 8), cursor.y + (pdf.internal.getLineHeight() * .75), 2, 'F');
       // pdf.text("DO NOT POST ON THE WEB.", cursor.x + (margin / 8), cursor.y + pdf.internal.getLineHeight());
       // cursor.y += pdf.internal.getLineHeight();
       // pdf.circle(cursor.x - (margin / 8), cursor.y + (pdf.internal.getLineHeight() * .75), 2, 'F');
       // pdf.text("DO NOT DISTRIBUTE TO ANYONE OTHER THAN EMPLOYEES", cursor.x + (margin / 8), cursor.y + pdf.internal.getLineHeight());
       // cursor.y += pdf.internal.getLineHeight();
       // pdf.circle(cursor.x - (margin / 8), cursor.y + (pdf.internal.getLineHeight() * .75), 2, 'F');
       // pdf.text("CONFIDENTIAL - FOR HUD INTERNAL USE ONLY", cursor.x + (margin / 8), cursor.y + pdf.internal.getLineHeight());
       // cursor.y += pdf.internal.getLineHeight();
       // cursor.y += pdf.internal.getLineHeight();
       // pdf.setFontSize(12);
       // pdf.setFontStyle("normal");
       // pdf.text("Revised March 14, 2016", pdf.internal.pageSize.width / 2, cursor.y + pdf.internal.getLineHeight(), 'center');
       // /*************** End Header ***************/

       // var html = $("#AssessmentReportPDFDownload").html();
       // pdf.text(html, pdf.internal.pageSize.width / 2, cursor.y + pdf.internal.getLineHeight(), 'center');
       //// html2pdf(html, pdf, function (pdf) {
       //     pdf.save('AssessmentReport.pdf');
       // //});

        //var pdf = new jsPDF('p', 'pt', [780, 900]);
        //var canvas = pdf.canvas;
        //canvas.height = 72 * 15;
        //canvas.width = 72 * 15;
        //var html = $("#AssessmentReportPDFDownload").html();
        //html2canvas(html, {
        //    canvas: canvas,
        //    onrendered: function (canvas) {
        //        pdf.save('Download.pdf');

        //    }
        //});
       
        let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');

        mywindow.document.write(`<html><head><title></title>`);
        mywindow.document.write('</head><body >');
        mywindow.document.write($("#AssessmentReportPDFDownload").html());
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();

        return true;

    }

    $scope.PublishReport = function (cObj) {
        debugger;
        
        ShowLoader();

        var mValue = SelectedValidaterModel;

        $scope.RequestModel = {           
            EmpValidationId: mValue.EmpValidationId, AssessmentID: $scope.AssessmentReportDetailsList.AssessmentID,
            EmpValidationId: mValue.EmpValidationId, RemartkOne: $('#special_remark').val(), RemartkTwo: $("input[name='comment_checked']:checked").val()
        };

        $http({
            method: 'post',
            url: $scope.urlBase + '/CandidatesForValidation/SaveAssessmentResultStatusDetails',
            data: $scope.RequestModel,
        }).then(function (response) {
            debugger;
            HideLoader();

            $scope.AssessmentReport = false;
        }, function (error) {
            HideLoader();
            console.log(error);
        });

        
    }

    $scope.init = function () {
            debugger;
        $scope.urlBase = GetVirtualDirectory();
        $('body').removeClass('modal-open');
        var mValue = SelectedValidaterModel;

        $scope.ValidationProcessModel = {
            Name: mValue.Name, PRN: mValue.PRN, SrNo: mValue.SrNo,
            EmpDetailsId: mValue.EmpDetailsId, TradeName: mValue.TradeName, TradeCName: mValue.TradeCategory,
            EmpValidationId:mValue.EmpValidationId
        };
        $scope.AssessmentReport = true;
        $scope.GetAssessedReportDetails();
    }

    $scope.init();


}]);