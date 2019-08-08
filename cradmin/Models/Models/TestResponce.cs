using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace cradmin.Models.Models
{
    public class TestResponce : Error
    {
       public TestResponce()
        {
            TestList = new List<TestCategory>();
            TradeCList = new List<TradeCategory>();
            TestQueCategoryList = new List<TestQueCategory>();
            TradeList = new List<TradeType>();

        }
        public List<TestCategory> TestList { get; set; }
        public List<TestQueCategory> TestQueCategoryList { get; set; }
       public List<TradeCategory> TradeCList { get; set; }
        public List<TradeType> TradeList { get; set; }

    }

        public class TestCategory :Error
        {
            public int TestId { get; set; }
            public string TestDescription { get; set; }

        }

        public class TestQueCategory : Error
        {
            public int TestQuetionCatagoryId { get; set; }
            public int TestId { get; set; }
            public string TestQCategory { get; set; }
            public string TestDescription { get; set; }
            public int TradeId { get; set; }
            public string TestQDescription { get; set; }
            public string TradDescription { get; set; }
            public string TradCDescription { get; set; }
            public int TradeCId { get; set; }
    }

       
    }
