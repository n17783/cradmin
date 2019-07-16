using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace cradmin.Models.Models
{
    public class RollFormMappingResponce:Error
    {
        public RollFormMappingResponce()
        {
             RollFormMappingList = new List<RollFormMappResponce>();
             FormList = new List<FormResponce>();
             RollList = new List<RollResponce>();

        }
        public List<RollFormMappResponce> RollFormMappingList { get; set; }
        public List<FormResponce> FormList { get; set; }
        public List<RollResponce> RollList { get; set; }

    }

    public class RollFormMappResponce:Error 
    {
        public int RollFormMappingId { get; set; }
        public int RollId { get; set; }
        public int FormId { get; set; }
        public int EntryBy { get; set; }
        public int ExitBy { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime ExitDate { get; set; }
        public bool IsContinew { get; set; }
        public string AuthorisedBy { get; set; }
        public string UnAuthorisedBy { get; set; }
    }
    public class FormResponce : Error
    {
        public int FormId { get; set; }
        public string FormName { get; set; }
        public string FormTitle { get; set; }
        public bool IsDelete { get; set; }

    }
    public class RollResponce : Error
    {
        public int      RoleID { get; set; }
        public string   RoleDescription  { get; set; }
        public int      DeptId { get; set; }
        public DateTime RoleEntryDate { get; set; }
        public int        RoleEntryBy { get; set; }
    }

}