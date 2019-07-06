

function LoadViews(UserControl)
{
    var url = GetVirtualDirectory();
    console.log(url);
    switch (UserControl) {
        case "Contact":
            $("#divUserControls").load(url + "/Content/ContactUsWang.html");
            break
        default:

    }
}

function Logout() {
    window.location = GetVirtualDirectory() + '/Account/LogOff';
}

function baseUrl() {
    var pathname = window.location.href;
    return pathname;
}

function validateEmail(element)
{
    var isvalid = true;
    var reg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (reg.test($(element).val()) == false) {
        isvalid= false;
    }
    return isvalid;
}

function ShowLoader()
{
    $("#rclLoader").show();
}

function HideLoader() {
    $("#rclLoader").hide();
}

function LogOff()
{
    var token=getCookie("Token");
    $.ajax({
        type: "POST",
        url: GetVirtualDirectory() + "/Account/LogOff",
        data: { Token: token },
        success: function (students) {
            //window.location = GetVirtualDirectory() + "/Home/Index";
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error during process: \n' + xhr.responseText);
        }
    });
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function SendMessage()
{
    var touserid = $("#touserid").attr("data");
    if (touserid===undefined) {
        touserid = $("#UserId").val();
    }
    $.ajax({
        cache: false,
        type: "GET",
        async: false,
        url: GetVirtualDirectory() + "/Message/SendMessage?fromUserId=" + $("#ActiveUserId").val() + "&toUserId=" + touserid + "&msg=" + $("#status_message").val(),
        dataType: "json",
        success: function (students) {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "",
                Message: "Your message has been send.",
                Type: "alert",
                OnOKClick: function () {
                    window.location = GetVirtualDirectory() + "/UserProfile/Index";
                },
            });
            objShowCustomAlert.ShowCustomAlertBox();
            
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Error during process: \n' + xhr.responseText);
        }
    });
}

function ReadMessgesByUser() {
    setInterval(function () {
        if (document.getElementById("ActiveUserId") != null) {
            $.ajax({
                cache: false,
                type: "GET",
                async: false,
                url: GetVirtualDirectory() + "/Home/ReadMessage?toUserId=" + $("#ActiveUserId").val(),
                dataType: "json",
                success: function (students) {
                    bindUserMessage(students, $("#ActiveUserId").val());
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    
                }
            });
        }
    }, 15000);
}

function GetAllMessgaes(userid, touserid)
{
    setInterval(function () {
        $.ajax({
            cache: false,
            type: "GET",
            async: false,
            url: GetVirtualDirectory() + "/Home/GetAllMessgaes?UserId=" + userid + "&ToUserId=" + touserid,
            dataType: "json",
            success: function (students) {
                bindUserMessges(students);
            },
            error: function (xhr, ajaxOptions, thrownError) {

            }
        });
    }, 15000);
}

function parseJsonDate(jsondate) {
    var date = new Date(parseInt(jsondate.substr(6)));
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);

    return date.getFullYear() + "-" + (month) + "-" + (day);
}

function bindUserMessges(students)
{
    var htmlin = "";
    $("#msguser").html(htmlin);
    for (var i = 0; i < students.length; i++) {
        var date = new Date(parseInt(students[i].MessageDate.substr(6)));
        htmlin += '<div class="chat-box-single-line"><abbr class="timestamp">' + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + '</abbr></div>';
        htmlin += '<div class="direct-chat-msg doted-border"><div class="direct-chat-info clearfix"><span class="direct-chat-name pull-left">';
        if (students[i].FromUserId == $("#ActiveUserId").val()) {
            htmlin += 'me';
        }
        else {
            htmlin += $("#" + students[i].FromUserId + ">strong").html();
        }
        htmlin += '</span></div><div class="direct-chat-text">' + students[i].MessageText + '</div></div>';
    }
    $("#msguser").html(htmlin);
}

function bindUserMessage(respnse,userid)
{
    $("#inmsg").html("");
    var htmlin = "";
    for (var i = 0; i < respnse.length; i++) {
        htmlin += '<li class="dropdown-menu-header text-center" id="' + respnse[i].Id + '" onclick="ShowChat(this)"><strong>' + respnse[i].FirstName + " " + respnse[i].LName + '</strong></li>';
    }
    $("#inmsg").html(htmlin);
}

function ShowChat(liuser)
{
    $('#qnimate').addClass('popup-box-on');
    var touserid = $(liuser).attr("id");
    $("#touserid").attr("data", touserid);
    var userid = $("#ActiveUserId").val();
    $("#chatuser").html(liuser.fir);
    GetAllMessgaes(userid, touserid);
}


function GetVirtualDirectory() {

    var result = "";
    var url = window.location.href;

    var url_parts = url.split('/');
    var index = 0;
    for (var i = 0; i < url_parts.length; i++) {
        if (url_parts[i] != "") {
            if (i > 2) {
                break;
            }
            result = result + url_parts[i];
        }
        if (i == 1) {
            result = result + "//";
        }
    }
    return result + "/cradmin";
}
function SetActiveTab(tabname) {
    switch (tabname) {
        case "register":
            $("#lihome").removeClass("active");
            $("#liSearch").removeClass("active")
            $("#liMarriageHall").removeClass("active");
            $("#liOther").removeClass("active");
            $("#licontact").removeClass("contact");
            $("#lireg").addClass("active");
            break
        case "search":
            $("#lihome").removeClass("active");
            $("#liSearch").addClass("active")
            $("#liMarriageHall").removeClass("active");
            $("#liOther").removeClass("active");
            $("#licontact").removeClass("contact");
            $("#lireg").removeClass("active");
            break
        case "contact":
            $("#lihome").removeClass("active");
            $("#liSearch").removeClass("active")
            $("#liMarriageHall").removeClass("active");
            $("#liOther").removeClass("active");
            $("#lireg").removeClass("active");
            $("#licontact").addClass("active");
            break
        default:
            $("#lihome").addClass("active");
            $("#liSearch").removeClass("active")
            $("#liMarriageHall").removeClass("active");
            $("#liOther").removeClass("active");
            $("#lireg").removeClass("active");
            break;

    }
}