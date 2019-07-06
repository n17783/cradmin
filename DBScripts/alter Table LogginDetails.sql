USE [CRAsia]
GO

/****** Object:  Table [dbo].[tblLoginDetails]    Script Date: 07/06/2019 06:41:41 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

create TABLE [dbo].[tblLoginDetails](
	[LoginId] [int] IDENTITY(1,1) NOT NULL,
	Token uniqueidentifier,
	[UserId] [int] NULL,
	[LoginTime] [datetime] NULL,
	[LogOutTime] [datetime] NULL,
	[IsContinew] [bit] NULL,
	[UnexpecteError] [varchar](200) NULL,
	[LastRequestTime] [datetime] NULL,
	[IdleSessionTimeOut] [int] NULL,
 CONSTRAINT [PK_tblLoginDetails] PRIMARY KEY CLUSTERED 
(
	[LoginId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


