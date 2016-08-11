/*jshint esnext: true*/
/*jslint es6*/

var FaceBook = null;
/**
 * Begin initializing the facebook asynchronous load
 */
window.fbAsyncInit = function () {
    FB.init({
        appId   :   CONFIG.AppId,
        xfbml   :   CONFIG.Xfbml,
        version :   CONFIG.Version,
        status  :   CONFIG.Status
    });

    initializeApiWithLoginState(FB);
};

/**
 * Asynchronous load of the facebook sdk
 *
 */
(function(d, s, id)
{
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


/**
 * Validates the login status response
 *
 * @param facebook
 * @param response
 */
function LoginIsValid(facebook, response)
{
    if (response.status === 'connected')
    {
        console.log('login successful');
        return true;
    }

    return false;
}
function displayWelcome(html = new Date())
{
    var body = document.body;
    var header = document.createElement("div");
    var welcome = document.createTextNode("Welcome to the Facebook time tracker");
    header.appendChild(welcome);
    body.appendChild(header);
    console.log('%o:', html);
    if (html == '') { return; }

    //body.appendChild(html);
}
function updatedTimeCallback(response)
{
    console.log('ISO 8601 TIME %o: ', response);
    var updated_time = response.updated_time;
    if (updated_time == null) { return; }

    var date = new Date(updated_time);
    if (date == null) { return; }

    var body = document.body;
    var date_html = document.createElement('div');
    var local_time_html = document.createElement('div');

    date_html.innerHTML =
                    "<p id='date-time'>" + date + "</p>";
    var hour_offset = date.getTimezoneOffset() / 60;
    var local_time = date.getHours();
    /*if (local_time > -1)
    {
      var local_time = date.getUTCHours() - hour_offset;
    } */
    local_time_html.innerHTML =
                    "<p id='local-time'>" + local_time + "</p>";

    body.appendChild(date_html);
    body.appendChild(local_time_html);

    console.log('DATE_TIME: ', date);
    console.log('LOCAL TIME ', date.getTimezoneOffset());
    console.log('updatedTimeCallback %o:', response);
}
/**
 * Check the login status of facebook cookies
 *
 * @param facebook
 */
function initializeApiWithLoginState(facebook)
{
    facebook.getLoginStatus(function (response)
    {
        if (LoginIsValid(facebook, response))
        {
            // Main
            getUpdatedTime(facebook, updatedTimeCallback);
            return;
        }
        var body = document.body;

        var loginLink = document.createElement('div');
        loginLink.id = 'status';
        loginLink.innerHTML = "<input type='button' value='Login to Facebook'/>";
        loginLink.onclick = function(e) {
            loginEvent(facebook);
        }

        var message = document.createTextNode('Please login to facebook first');
        body.appendChild(message);
        body.appendChild(loginLink);

        console.log('status object: %o', response.status);
    });
}
