/*jshint esnext: true*/
/*jslint es6*/
const whitespace = ' ';
function testApi(facebook)
{
    console.log('Welcome!');
    facebook.api('/me', function(response) {

        console.log('successful login for: ' + response.name);

        document.getElementById('status').innerHTML =
          'Thanks for logging in,' + whitespace + response.name + '!';
    });
}
function getUpdatedTime(facebook, updatedTimeDoCallBack)
{
    //console.log('updated time:' + whitespace);
    facebook.api
    (
        "/me",
        {
            fields : "updated_time",
            parameters : "date_format=U"
        },
        function (response)
        {
            if (response && !response.error)
            {
                var updated_time = response.updated_time;
                if (updated_time)
                {
                    var d = new Date(updated_time);
                    updatedTimeDoCallBack(response);
                }
            }
            else
            {
                console.log(response.error);
            }
        }
    );
}
function onLoginSuccess(response)
{
    window.location.href = 'http://localhost:8888';
}
function loginEvent(fb)
{
    fb.login(function(response) {
        if (response.authResponse) {
            console.log('Welcome! fetching your information... ');
            fb.api('/me', function(response) {
                console.log('Good to see you, ' + response.name + '.');
                onLoginSuccess(response);
            });

        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    });
}
