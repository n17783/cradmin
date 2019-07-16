using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace cradmin.Models.Models
{
    public class PlantTradeStreanth:Error
    {

        public PlantTradeStreanth()
        { 
             PlantList = new List<PlantModel>();
            TradeList = new List<TradeType>();
            PlantTradeTrackingList = new List<PlantTradeTracking>();
            }

        public List<PlantTradeTracking> PlantTradeTrackingList { get; set; }
        public List<PlantModel> PlantList { get; set; }
        public List<TradeType> TradeList { get; set; }

    }
   

}