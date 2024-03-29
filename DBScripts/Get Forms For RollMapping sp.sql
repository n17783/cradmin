USE [CRAsia]
GO
/****** Object:  StoredProcedure [dbo].[Get_FormMappingToRoll]    Script Date: 07/15/2019 17:40:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Get_FormMappingToRoll]
	@PageNo int=null,
	@PageSize int=null,
	@Prefix nvarchar(100)=null
	

As
begin

select rfm.RollFormMappingId,rfm.RollId,rfm.FormId,rm.RollDescription,fm.FormTitle,rfm.AuthorisedBy,
rfm.EntryDate, ROW_NUMBER() OVER(ORDER BY RollFormMappingId DESC) as RowNum into #TmpFormToRoll
	from tblRollAndFormMapping rfm  inner join tblRollMaster rm on rfm.RollId=rm.RollId inner join tblFormMaster fm on
	 fm.FormId=rfm.FormId
	 where rfm.IsContinew=1  
	 and rm.RollDescription like (case when @Prefix is null then '%' + rm.RollDescription + '%' else '%'+ @Prefix + '%' end)
	
	
	declare @TotalRecords int
	
	select @TotalRecords=COUNT(1) from #TmpFormToRoll
	
	if(@PageNo is null and @PageSize is null)
	begin
		select *,@TotalRecords as TotalRecords from #TmpFormToRoll
	end
	else
	begin
		select *,@TotalRecords as TotalRecords from #TmpFormToRoll
		where RowNum BETWEEN ( @PageNo - 1 ) * @PageSize + 1 AND
		@PageNo * @PageSize
	end
	drop table #TmpFormToRoll
	
	
END