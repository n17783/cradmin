USE [CRAsia]
GO
/****** Object:  StoredProcedure [dbo].[Get_ProjectType]    Script Date: 06/08/2019 16:12:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetMainContractorList]
	@PageNo int=1,
	@PageSize int=2
AS
BEGIN
	select ROW_NUMBER() OVER(ORDER BY ContractorId DESC) as RowNum,* into #TmpMainContractorMaster
	from tblMainContractorMaster WITH(NOLOCK)
	
	declare @TotalRecords int
	
	select @TotalRecords=COUNT(1) from #TmpMainContractorMaster
	
	select *,@TotalRecords as TotalRecords from #TmpMainContractorMaster
	where RowNum BETWEEN ( @PageNo - 1 ) * @PageSize + 1 AND
	@PageNo * @PageSize
	
	drop table #TmpMainContractorMaster
END
