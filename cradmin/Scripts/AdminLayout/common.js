



function getToken()
{
    var token={
               'Content-Type':'application/x-www-form-urlencoded', 
               'Token':getCookie('Token'),
             };
    return token;
}

function Logout() {
    window.location = GetVirtualDirectory() + '/Account/LogOff';
}

function baseUrl() {
    var pathname = window.location.href;
    return pathname;
}



function checkToken()
{
    var token = getCookie("Token");
    if (token == "") {
        //window.location = GetVirtualDirectory() + "/Home/Index";
    }
}

function checkLoginStatus(response){
    if (response.data.Status == 1) {
        setCookie("Token", "");
        window.location = GetVirtualDirectory() + "/Home/Index";
    }
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
    var token = getCookie("Token");
    if (token=="") {
        token=$("#hdnToken").val();
    }
    $.ajax({
        type: "GET",
        url: GetVirtualDirectory() + '/Account/LogOff?Token=' + token,
        contentType: "application/json;",
        success: function (r) {
            setCookie("Token", "");
            window.location = GetVirtualDirectory() + "/Home/Index";
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
    return $('#hdnToken').val();
}






function parseJsonDate(jsondate) {
    var date = new Date(parseInt(jsondate.substr(6)));
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);

    return date.getFullYear() + "-" + (month) + "-" + (day);
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