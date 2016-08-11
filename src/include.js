var body = document.body;

// To add new javascript reference add place to this array
var scripts =
  [
      'src/helper/facebookHelper.js',
      'src/facebook_sdk.js'
  ];

for (var i in scripts)
{
    var s = scripts[i];
    var script = document.createElement('script');
    script.src = s;

    // add script source to body tag
    body.appendChild(script);
}
