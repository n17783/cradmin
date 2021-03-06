USE [CRAsia]
GO
/****** Object:  StoredProcedure [dbo].[InsertValidationAgency]    Script Date: 06/16/2019 14:16:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[InsertValidationAgency]	
@AgencyDescription NVARCHAR(200),
@AgencyAddress NVARCHAR(300),
@AgencyContactNo NVARCHAR(12),
@isContinew bit =1
AS
BEGIN
	insert into dbo.tblValidationAgencyMaster
	(AgencyDescription,AgencyAddress,AgencyContactNo,isContinew)
	values(@AgencyDescription,@AgencyAddress,@AgencyContactNo,@isContinew)
END
