// Takes in a json from Lee's Muse function
// Outputs a Tuple
// The zeroth element in the tuple is an integer
// which represents how much the user, overall, enjoyed the article.
// The next element in the tuple is a triple which contains
// the int values r, g, and b to display a color for the article.
//
// As per Richard's suggestion, returning a numerical representation
// of overall enjoyment will allow Jon to sort the wiki Titles by enjoyment.

var colorCreate = function(json){
	var engagement = json["concentration"];
	var interest   = json["interest"];
	if (engagement < 0){
		engagement = 0;
	}
	if (engagement > 100){
		engagement = 100;
	}
	if (interest < 0){
		interest = 0;
	}
	if (interest > 120){
		interest = 120;
	}
	var hue = Math.round(interest);
	var sat = Math.round(engagement);
	var val = 100;

	rgbTriple = hsvToRgb(hue, sat, val);

	var colorID = hue * sat;

	return (colorID, rgbTriple);

}

/**
* HSV to RGB color conversion
*
* H runs from 0 to 360 degrees
* S and V run from 0 to 100
*
* Ported from the excellent java algorithm by Eugene Vishnevsky at:
* http://www.cs.rit.edu/~ncs/color/t_convert.html
*/
function hsvToRgb(h, s, v) {
    var r, g, b;
    var i;
    var f, p, q, t;
     
    // Make sure our arguments stay in-range
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));
     
    // We accept saturation and value arguments from 0 to 100 because that's
    // how Photoshop represents those values. Internally, however, the
    // saturation and value are calculated from a range of 0 to 1. We make
    // That conversion here.
    s /= 100;
    v /= 100;
     
    if(s == 0) {
        // Achromatic (grey)
        r = g = b = v;
        return [
            Math.round(r * 255), 
            Math.round(g * 255), 
            Math.round(b * 255)
        ];
    }
     
    h /= 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));
     
    switch(i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
     
        case 1:
            r = q;
            g = v;
            b = p;
            break;
     
        case 2:
            r = p;
            g = v;
            b = t;
            break;
     
        case 3:
            r = p;
            g = q;
            b = v;
            break;
     
        case 4:
            r = t;
            g = p;
            b = v;
            break;
     
        default: // case 5:
            r = v;
            g = p;
            b = q;
    }
     
    return (Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
}