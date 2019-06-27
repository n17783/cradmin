USE [CRAsia]
GO

/****** Object:  Table [dbo].[tblTrade]    Script Date: 06/24/2019 20:09:01 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblTrade](
	[TradeId] [int] IDENTITY(1,1) NOT NULL,
	[TradeCId] [int] NULL,
	[TradDescription] [nvarchar](100) NULL,
	[TEntryDate] [datetime] NULL,
	[EntryBy] [int] NULL,
	[CreatedBy] [nvarchar](150) NULL,
	[SanctionDate] [datetime] NULL,
 CONSTRAINT [PK_tblTrade] PRIMARY KEY CLUSTERED 
(
	[TradeId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


