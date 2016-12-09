// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require_self

/*
function pij() {
  return 3.14159265359;
}

function radj(angle) {
  return angle / 180 * pij();
}

function powj(number, exp) {
  var value = 1;
  if (exp > 0) {
    for (var i = 1; i <= exp; i++) {
      value *= number;
    }
  } else if (exp < 0) {
    for (var i = 1; i <= -exp; i++) {
      value /= number;
    }
  }
  return value;
}

function factj(number) {
  var value = 1;
  if (number > 0) {
    for (var i = 1; i <= number; i++) {
      value = value * i;
    }
  }
  return value;
}

function sinj(angle) {
  var out = 0;
  for (var i = 0; i <= 10; i++) {
    out = out + powj(-1, i) * powj(angle, (2 * i + 1)) / factj(2 * i + 1);
  }
  return out;
}

function cosj(angle) {
  var out = 0;
  for (var i = 0; i <= 10; i++) {
    out = out + powj(-1, i) * powj(angle, 2 * i) / factj(2 * i);
  }
  return out;
}

function tanj(angle) {
  return sinj(angle) / cosj(angle);
}
*/

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
    [
      -Math.sin(theta),
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
  var psr = arc_points(c,s,theta,phi);
  return 'C' + (c[0] + s[0] * psr[1][0]) + ',' + (c[1] - s[1] * psr[1][1]) + 
    ' ' + (c[0] + s[0] * psr[2][0]) + ',' + (c[1] - s[1] * psr[2][1]) + 
    ' ' + (c[0] + s[0] * psr[3][0]) + ',' + (c[1] - s[1] * psr[3][1]);
}
$(function() {
  
var items = [
  {
    id: 'home'
  },
  {
    id: 'about'
  },
  {
    id: 'contact'
  },
  {
    id: 'news'
  },
  {
    id: 'gallery'
  },
  {
    id: 'games'
  },
  {
    id: 'links'
  },
  {
    id: 'subscribe'
  },
  {
    id: 'account'
  }
];
var n = 9;
var c = [250,250];
var s1 = [240,240];
var s2 = [170,170];
var tol = .02;
for (var i = 0; i < items.length; i++) {
  var item = items[i];
  var id = "#wedge-"+item['id'];
  var wid = "#wedge-"+item['id']+" svg";
  var tid = "#tool-"+item['id']+" p";
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
  var c1 = b_to(c, s1, 'M', [0,1], ((v+.5-tol)*2*Math.PI/n));
  var c2 = b_to(c, s2, 'L', [0,1], ((v-.5+tol)*2*Math.PI/n));
  var a1 = arc_to(c, s1, ((1-2*tol)*Math.PI/n), (v*2*Math.PI/n));
  var a2 = arc_to(c, s2, (-(1-2*tol)*Math.PI/n), (v*2*Math.PI/n));
  var path = c1+' '+a1+' '+c2+' '+a2 + ' Z';
  //console.log(path);
  //svg.circle(200,200,100);
  var path = svg.path(path);
  path.attr({
    fill: 'black',
    //stroke: stroke,
    strokeWidth: 3
  });
}
  
});