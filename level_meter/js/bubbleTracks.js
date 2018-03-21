/*
 * offsetBubble(x, y, bubbleId)
 *     This function will position the bubble with ID 'bubbleId' at an
 *     offset of (x, y) pixels from its original position in centre of
 *     the track.
 *
 *     The coordinate system's origin (0, 0) is the original bubble position.
 *     x increases to the right and y increases to the top of the view.
 *     
 *     Parameters:
 *         x, y:     Numbers in pixels. 
 *                   Negative values offset bubble in opposite direction.
 *         bubbleId: ID of bubble to be moved.
*/
function offsetBubble(x, y, bubbleId)
{
    // Position the bubble relative to starting position.
    var bubble = document.getElementById(bubbleId);
    if (bubble)
    {
        var transform = "translate(" + x + "px," + y + "px)";
        bubble.style.transform = transform;
        bubble.style.webkitTransform = transform;
        bubble.style.mozTransform = transform;
        bubble.style.msTransform = transform;
        bubble.style.oTransform = transform;
    }
    else
    {
        console.log("Error: Bubble with id \"" + bubbleId + "\" not found.");
    }
}
    

/*
 * bubbleTrackLengthV() and bubbleTrackLengthH()
 *     Returns the length of corresponding bubble track in pixels.
 * 
 *     Return value:
 *         Returns an Number of pixels representing the length.
*/
function bubbleTrackLengthH()
{
    var track = document.getElementById("horizontal-track")
    return track.offsetWidth;
}

function bubbleTrackLengthV()
{
	var track = document.getElementById("vertical-track")
    return track.offsetHeight;
}

/* 
 * removeMarkerStyles()
 *     Removes all JavaScript-created style changes from all track markers.
*/
function removeMarkerStyles()
{
    var markers = ["vertical-25", "vertical-50", "vertical-75",
                   "horizontal-25", "horizontal-50", "horizontal-75"];
    
    for (var i = 0; i < markers.length; i++)
    {
        var marker = document.getElementById(markers[i]);
        if (marker)
        {
            marker.removeAttribute("style");
        }
    }
}

/*
 * deviceMotionNormalisedAccelerationIncludingGravity(event)
 *     Given a DeviceMotionEvent object, returns a normalised version
 *     of the accelerationIncludingGravity property object with values
 *     matching Android, since Safari on iOS reports negated values.
 *     This is only useful if you want to test/run your app on iOS.
 *
 *     Parameters:
 *         event:    A devicemotion event object.
 *     Return value:
 *         Returns an object with same properties as the 
 *         event.accelerationIncludingGravity object.
*/
function deviceMotionNormalisedAccelerationIncludingGravity(event)
{
    if ((typeof event === 'object') && (event.type !== "devicemotion"))
    {
        console.log("Error: Non-DeviceMotionEvent passed to deviceMotionNormalisedAccelerationIncludingGravity.");
        return null;
    }
    
    var accelIncludingGravity = {
        x: event.accelerationIncludingGravity.x,
        y: event.accelerationIncludingGravity.y,
        z: event.accelerationIncludingGravity.z
    };
    
    // Detect Safari (iOS).  isSafari code from
    // http://stackoverflow.com/questions/12625876/how-to-detect-chrome-and-safari-browser-webkit
    var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

    // Safari (iOS) uses negated values when reporting
    // accelerationIncludingGravity, so negate if iOS.
    if (isSafari)
    {
        accelIncludingGravity.x = -accelIncludingGravity.x;
        accelIncludingGravity.y = -accelIncludingGravity.y;
        accelIncludingGravity.z = -accelIncludingGravity.z;
    }

    return accelIncludingGravity;
}

// This function displays the given message String as a "toast" message at
// the bottom of the screen.  It will be displayed for 2 second, or if the
// number of milliseconds given by the timeout argument if specified.
function displayMessage(message, timeout)
{
    if (timeout === undefined)
    {
        // Timeout argument not specifed, use default.
        timeout = 2000;
    }

    if (typeof(message) == 'number')
    {
        // If argument is a number, convert to a string.
        message = message.toString();
    }

    if (typeof(message) != 'string')
    {
        console.log("displayMessage: Argument is not a string.");
        return;
    }

    if (message.length == 0)
    {
        console.log("displayMessage: Given an empty string.");
        return;
    }

    var snackbarContainer = document.getElementById('toast');
    var data = {
        message: message,
        timeout: timeout
    };
    if (snackbarContainer && snackbarContainer.hasOwnProperty("MaterialSnackbar"))
    {
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }
}
