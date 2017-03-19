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

function max_min(sk1, sk2) {
	var maxD = 0;
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

function avg_atan_min(sk1, sk2) {
	var avg = 0;
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

/**Returns the square of actual euclidean distance - reducing computation*/
function eucDistance(p1, p2) {
	return Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2);
}