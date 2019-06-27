alter PROCEDURE Insert_CourseMaster
@CourseTitle nvarchar(200),
@CourseDescription nvarchar(500),

@CourseCreatedBy nvarchar(150),
@CourseSanctionDate datetime,
@EntryBy int



AS
BEGIN
	 if(exists(select * from tblCourseMaster where CourseTitle=@CourseTitle))
    begin
		select 0 as SuccessFailed
    end
    else
    begin
		insert into tblCourseMaster
		(CourseTitle,CourseDescription,CourseCreatedBy,CourseSanctionDate,EntryDate,EntryBy)
		values(@CourseTitle,@CourseDescription,@CourseCreatedBy,@CourseSanctionDate,GETDATE(),@EntryBy)
		
		select 1 as SuccessFailed
    end
END