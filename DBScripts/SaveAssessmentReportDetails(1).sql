USE [CRAsia29July19]
GO
/****** Object:  StoredProcedure [dbo].[SaveAssessmentReportDetails]    Script Date: 08/25/2019 14:33:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[SaveAssessmentReportDetails] 
		@EmpValidationId	int=0,
	@LoginEmployeeId	int,
	@VAssRemarkOne		varchar(MAX),
	@VAssRemarkTow	varchar(MAX),	
	@VAssessmentNo	varchar(MAX)
AS
BEGIN

	SET NOCOUNT ON;
	
	

		UPDATE tblValidationDetails 
			SET VAssessmentDate=GETDATE()
			, VAssRemarkOne	=@VAssRemarkOne
			, VAssRemarkTow	=@VAssRemarkTow
			, VAssTekenBy	=@LoginEmployeeId
			, VAssessmentNo=@VAssessmentNo
		WHERE EmpValidationId=@EmpValidationId

	
SELECT 'Saved' Result

END
