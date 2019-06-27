USE [CRAsia]
GO

/****** Object:  Table [dbo].[PlantTradeTracking]    Script Date: 06/26/2019 09:45:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PlantTradeTracking](
	[PlantTradeTrackingId] [int] IDENTITY(1,1) NOT NULL,
	[TradeId] [int] NULL,
	[AuthorizedStrenth] [nvarchar](10) NULL,
	[AuthorizedBy] [nvarchar](150) NULL,
	[AuthorizedDate] [datetime] NULL,
	[ExitEntryDate] [datetime] NULL,
	[EntryDate] [datetime] NULL,
	[IsContinew] [bit] NULL,
	[ExitEntryBy] [int] NULL,
	[UnAuthorizedBy] [nvarchar](150) NULL,
	[UnAuthorizedDate] [datetime] NULL,
	[PlantId] [int] NULL,
 CONSTRAINT [PK_PlantTradeTracking] PRIMARY KEY CLUSTERED 
(
	[PlantTradeTrackingId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


