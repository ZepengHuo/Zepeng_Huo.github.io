/**
 * Created by Krishna G. on 02-Dec-16.
 */

/**
 * @param {number[]} sketch - points(array of size 2) of the sketch drawn by user
 * @param {number[]} templates - array of all related templates in DB. Each template is an array of points
 *
 * @returns {number} index in the templates which is the closest match - which has less hausdorff distance
 * */
function hausdorff(sketch, templates) {
	/*max(max(min))*/
	var index = 0;
	var match_value = Number.MAX_VALUE;
	for (var i = 0; i < templates.length; i++) {
		var d1 = max_min(sketch, templates[i]);
		var d2 = max_min(templates[i], sketch);
		var d = d1 > d2 ? d1 : d2;
		if (d < match_value) {
			match_value = d;
			index = i;
		}
	}
	return index;
}

function hausdorff_atan(sketch, templates) {
	/*max(avg(atan())*/
	var index = 0;
	var match_value = Number.MAX_VALUE;
	for (var i = 0; i < templates.length; i++) {
		var d1 = avg_atan_min(sketch, templates[i]);
		var d2 = avg_atan_min(templates[i], sketch);
		var d = d1 > d2 ? d1 : d2;
		if (d < match_value) {
			match_value = d;
			index = i;
		}
	}
	return index;
}

function hausdorff_ori(sketch, templates) {
	/*avg(avg(atan())*/
	var index = 0;
	var match_value = Number.MAX_VALUE;
	for (var i = 0; i < templates.length; i++) {
		var d = avg_atan(sketch, templates[i]);
		if (d < match_value) {
			match_value = d;
			index = i;
		}
	}
	return index;
}

function max_min(s1, s2) {
	var maxD = 0;
	var sk1 = getPointsFromJSON(s1);
	var sk2 = getPointsFromJSON(s2);
	for (var i =0; i< sk1.length; i++){
		var minD = Number.MAX_VALUE;
		for (var j =0; j<sk2.length; j++){
			var dis = eucDistance(sk1[i], sk2[j]);
			if (dis < minD)
				minD = dis;
		}
		if (minD > maxD)
			maxD = minD
	}
	return maxD
}

function avg_atan_min(s1, s2) {
	var avg = 0;
	var sk1 = getPointsFromJSON(s1);
	var sk2 = getPointsFromJSON(s2);
	for (var i =0; i< sk1.length; i++){
		var minD = Number.MAX_VALUE;
		for (var j =0; j<sk2.length; j++){
			var dis = eucDistance(sk1[i], sk2[j]);
			if (dis < minD)
				minD = dis;
		}
		avg += Math.atan(Math.sqrt(minD));
	}
	return avg/sk1.length
}

function avg_atan(s1, s2) {
	var avg = 0;
	var dis = 0;
	var sk1 = getPointsFromJSON(s1);
	var sk2 = getPointsFromJSON(s2);
	for (var i =0; i< sk1.length; i++){
		var minD = 0;
		for (var j =0; j<sk2.length; j++){
			dis = eucDistance(sk1[i], sk2[j]);
			minD += dis;
		}
		avg += Math.atan(Math.sqrt(minD/sk2.length));
	}
	return avg/sk1.length
}

/**Returns the square of actual euclidean distance - reducing computation*/
function eucDistance(p1, p2) {
	return Math.pow(p1["x"] - p2["x"], 2) + Math.pow(p1["y"] - p2["y"], 2);
}

function getPointsFromJSON(sketch) {
	var keys = Object.keys(sketch.points);
	var points = [];
	for(var key in keys)
		points.push(sketch.points[keys[key]]);
	return points;
}