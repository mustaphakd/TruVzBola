/**
 * Created by Mustapha on 10/28/2014.
 */

var screenWidth = screen.availWidth;
var screenHeight = screen.availHeight;

chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.html',{
        id: 'WrsftCDMApp',
        outerBounds: {
            width: screenWidth,
            height: screenHeight,
            left: 0,
            top: 0
        },
        minWidth: 800,
        minHeight: 600
    });
});

//"content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'"

// "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'"