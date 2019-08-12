USE [CRAsia]
GO

/****** Object:  Table [dbo].[tblProjectType]    Script Date: 08/08/2019 19:40:41 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblProjectType](
	[ProjectTypeId] [int] IDENTITY(1,1) NOT NULL,
	[ProjectTypeDescription] [nvarchar](50) NULL,
 CONSTRAINT [PK_tblProjectType] PRIMARY KEY CLUSTERED 
(
	[ProjectTypeId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


