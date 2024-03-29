USE [CRAsia]
GO
/****** Object:  StoredProcedure [dbo].[GetMainContractorList]    Script Date: 06/16/2019 14:11:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[GetMainContractorList]
	@PageNo int=1,
	@PageSize int=2
AS
BEGIN
	select ROW_NUMBER() OVER(ORDER BY ContractorId DESC) as RowNum,* into #TmpMainContractorMaster
	from tblMainContractorMaster WITH(NOLOCK)
	
	declare @TotalRecords int
	
	select @TotalRecords=COUNT(1) from #TmpMainContractorMaster
	
	if(@PageNo is null and @PageSize is null)
	begin
		select *,@TotalRecords as TotalRecords from #TmpMainContractorMaster
	end
	else
	begin
		select *,@TotalRecords as TotalRecords from #TmpMainContractorMaster
		where RowNum BETWEEN ( @PageNo - 1 ) * @PageSize + 1 AND
		@PageNo * @PageSize
	end
	
	
	drop table #TmpMainContractorMaster
END
