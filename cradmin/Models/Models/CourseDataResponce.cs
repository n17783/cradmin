using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace cradmin.Models.Models
{
    public class CourseDataResponce:Error
    {
    }

    public class CourseMasterResponse :Error
    {
        public int CourseId { get; set; }
        public string CourseTitle { get; set; }
        public string CourseDescription { get; set; }
        public string CourseCreatedBy { get; set; }
        public int EntryBy { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime CourseSanctionDate { get; set; }
    }
}