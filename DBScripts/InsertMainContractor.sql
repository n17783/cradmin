USE [CRAsia]
GO
/****** Object:  StoredProcedure [dbo].[Insert_ProjectType]    Script Date: 06/08/2019 16:41:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
create PROCEDURE [dbo].[InsertMainContractor]
	@ContractorName nvarchar(100),
	@ContractorCompanyName nvarchar(100),
	@ContractorRegistrationNo nvarchar(20),
	@ContractorGstNo nvarchar(15),
	@ContractorOfficeAddress nvarchar(200),
	@ContractorPhoneNo nvarchar(20)
AS
BEGIN
	insert into tblMainContractorMaster
	(ContractorName,ContractorCompanyName,ContractorRegistrationNo,ContractorGstNo,ContractorOfficeAddress,ContractorPhoneNo)
	values(@ContractorName,@ContractorCompanyName,@ContractorRegistrationNo,@ContractorGstNo,@ContractorOfficeAddress,@ContractorPhoneNo)
END
