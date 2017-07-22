function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    //var req = new XMLHttpRequest();
    //req.open('GET', url);
    var req = createCORSRequest('GET', url);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}

$(function() {
  get('http://data.one-wolf.com/images/logo/350.html').then(function(data) {
    $('.roundmenu .dot').each(function(index) {
      $(this).prepend(data);
    });
  }, function(error) {
    console.log('' + error);
  })
});

function rotj(p, angle) {
  return [
    p[0] * Math.cos(angle) - p[1] * Math.sin(angle),
    p[0] * Math.sin(angle) + p[1] * Math.cos(angle)
  ];
}

function b_points(c, s, p, angle) {
  var ps = rotj(p, angle);
  return [
    c[0] + s[0] * ps[0],
    c[1] - s[1] * ps[1]
  ];
}

function b_to(c, s, t, p, angle) {
  var ps = b_points(c, s, p, angle);
  return t + ps[0] + ',' + ps[1];
}

function arc_points(c, s, theta, phi) {
  var ps = [
    [-Math.sin(theta),
      Math.cos(theta)
    ],
    [
      ((Math.cos(theta) - 1) * (3 - Math.cos(theta))) / (3 * Math.sin(theta)),
      (4 - Math.cos(theta)) / 3
    ]
  ];
  return [
    rotj(ps[0], phi),
    rotj(ps[1], phi),
    rotj([-ps[1][0], ps[1][1]], phi),
    rotj([-ps[0][0], ps[0][1]], phi)
  ];
}

function arc_to(c, s, theta, phi) {
  var psr = arc_points(c, s, theta, phi);
  return 'C' + (c[0] + s[0] * psr[1][0]) + ',' + (c[1] - s[1] * psr[1][1]) +
    ' ' + (c[0] + s[0] * psr[2][0]) + ',' + (c[1] - s[1] * psr[2][1]) +
    ' ' + (c[0] + s[0] * psr[3][0]) + ',' + (c[1] - s[1] * psr[3][1]);
}
$(function() {

  var items = [{
    id: 'home'
  }, {
    id: 'about'
  }, {
    id: 'contact'
  }, {
    id: 'news'
  }, {
    id: 'gallery'
  }, {
    id: 'games'
  }, {
    id: 'links'
  }, {
    id: 'subscribe'
  }, {
    id: 'account'
  }];
  var wedge_size = 500;
  var wedge_radius = wedge_size / 2;
  var dot_size = 350;
  var dot_radius = dot_size / 2;
  var n = 9;
  var outer_radius = wedge_radius - 10;
  var inner_radius = dot_radius;
  var c = [wedge_radius, wedge_radius];
  var s1 = [outer_radius, outer_radius];
  var s2 = [inner_radius, inner_radius];
  var tol = .02;
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var id = "#wedge-" + item['id'];
    var wid = "#svg-" + item['id'];
    //console.log(wid);
    var tid = "#tool-" + item['id'] + " p";
    var fill = item['fill'];
    var stroke = item['stroke'];
    //var wedge = $(id);
    /*
    wedge.hover(function() {
      $(tid).css('top','0');
      console.log(wid+'.hoverIn => '+tid+'.top = 120px');
    }, function() {
      $(tid).css('top','120px');
      console.log(wid+'.hoverOut => '+tid+'.top = 0');
    });
    */
    var svg = Snap(wid);
    var v = 0;
    var c1 = b_to(c, s1, 'M', [0, 1], ((v + .5 - tol) * 2 * Math.PI / n));
    var c2 = b_to(c, s2, 'L', [0, 1], ((v - .5 + tol) * 2 * Math.PI / n));
    var a1 = arc_to(c, s1, ((1 - 2 * tol) * Math.PI / n), (v * 2 * Math.PI / n));
    var a2 = arc_to(c, s2, (-(1 - 2 * tol) * Math.PI / n), (v * 2 * Math.PI / n));
    var path = c1 + ' ' + a1 + ' ' + c2 + ' ' + a2 + ' Z';
    //console.log(path);
    //svg.circle(200,200,100);
    svg.path(path);
  }

});