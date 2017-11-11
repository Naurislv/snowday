var fs = require('fs');
var async = require('async');
var path = './pic';
var sys = require('util')
var exec = require('child_process').exec;
var calls = [];

fs.readdir(path, function(err, items) {
	for (var i = 0; i < items.length - 1; i++) {
		var first = items[i];
		var second = items[i + 1];
		(function(first, second) {
			var play = function(callback) {
				exec("convert ./pic/" + first + " ./pic/" + second + " -compose difference -composite -colorspace Gray ./temp/diff.png", function(error1, stdout1, stderr1) {
					exec("convert ./temp/diff.png -resize 1x1\\!     -format \"%[fx:int(255*r+.5)]\" info:-", function(error2, stdout2, stderr2) {
						console.log(stdout2/255);
						callback();
					});
				});
			}
			calls.push(play);
		})(first, second);
	}
	async.series(calls, function(err, results) {
	});
});
