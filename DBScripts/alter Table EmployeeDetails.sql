USE [CRAsia]
GO

/****** Object:  Table [dbo].[tblEmployeeDetails]    Script Date: 07/06/2019 06:32:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblEmployeeDetails](
	[EmpDetailsId] [int] IDENTITY(1,1) NOT NULL,
	[PkId] [int] NULL,
	[EmpTypeId] [int] NULL,
	[JoiningStatus] [bit] NULL,
	[DateOfReport] [datetime] NULL,
	[ContractorId] [int] NULL,
	[ContactNo] [nvarchar](11) NULL,
	[EmrContactNo] [nvarchar](11) NULL,
	[IdProofType] [nvarchar](50) NULL,
	[IdProofNo] [nvarchar](50) NULL,
	[IdProofImage] [nvarchar](150) NULL,
	[PHouseNo] [nvarchar](50) NULL,
	[PVillageId] [nvarchar](150) NULL,
	[PDisticId] [int] NULL,
	[PTalukaId] [nvarchar](150) NULL,
	[PStateId] [int] NULL,
	[PCountryId] [int] NULL,
	[PPincodeId] [nvarchar](150) NULL,
	[THouseNo] [nvarchar](50) NULL,
	[TVillageId] [nvarchar](150) NULL,
	[TDisticId] [int] NULL,
	[TTalukaId] [nvarchar](150) NULL,
	[TStateId] [int] NULL,
	[TCountryId] [int] NULL,
	[TPincode] [nvarchar](150) NULL,
	[ReJoineOrNewJoin] [bit] NULL,
	[DeptZoneId] [int] NULL,
	[RegistrationDate] [datetime] NULL,
	[EntryBy] [int] NULL,
	[EnteryDate] [datetime] NULL,
	[ValidationAgencyId] [int] NULL,
	[IsAlreadyValidated] [bit] NULL,
	[TradeId] [int] NULL,
	[AdhaarImage] [nvarchar](500) NULL,
	[IsDMorStaff] [bit] NULL,
 CONSTRAINT [PK_tblEmployeeDetails] PRIMARY KEY CLUSTERED 
(
	[EmpDetailsId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]