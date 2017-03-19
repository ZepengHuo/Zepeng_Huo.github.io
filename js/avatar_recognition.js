function showLoading() {
    document.getElementById('loadingmsg').style.display = 'block';
    document.getElementById('loadingover').style.display = 'block';
}
showLoading();
function stopLoading(){
    if(m_loaded && f_loaded){
        document.getElementById('loadingmsg').style.display = 'none';
        document.getElementById('loadingover').style.display = 'none';
    }
}

function fetchJSONFile(path, callback) {
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4) {
			if (httpRequest.status === 200) {
				var data = JSON.parse(httpRequest.responseText);
				if (callback) callback(data);
			}
		}
	};
	httpRequest.open('GET', path);
	httpRequest.send();
}

var m_loaded = false;
var templates_male = {};
fetchJSONFile('js/templates_male.json', function (data) {
	// do something with your data
	templates_male = data;
	// templates_male[].sketches is an array of object (sketches) that needed to be sent to hausdorff method
	console.log('loaded templates_male data');
    process_template(templates_male);
    m_loaded = true;
    stopLoading();
});

var f_loaded = false;
var templates_female = {};
fetchJSONFile('js/templates_female.json', function (data) {
	// do something with your data
	templates_female = data;
	// templates_female[].sketches is an array of object (sketches) that needed to be sent to hausdorff method
	console.log('loaded templates_female data');
    process_template(templates_female);
    f_loaded = true;
    stopLoading();
});

function process_template(template){
    keys = Object.keys(template);
    for(key in keys){
        //add reflection of each template
        var part = template[keys[key]].sketches;
        for(n in part){
            var mean = 0;
            for(pt in part[n].points){
                mean += part[n].points[pt];
            }
            mean /= part[n].points.length;

            var new_nose = new srlib.core.data.container.Sketch();
            for(pt in part[n].points){
                var p = part[n].points[pt];
                var np = new srlib.core.data.container.Point(p.x,p.y);
                if(np.x > mean){
                    np.x -= mean*2;
                }else{
                    np.x += mean*2;
                }
                new_nose.addPoint(np);
            }
            part.push(new_nose);
        }
        //done adding reflection
        
        //getting convex hull of each template
        template[keys[key]].hulls = [];
        for(n in part){
            template[keys[key]]['hulls'].push(convexHull(part[n]));
        }
        //done with convex hulls
    }
}

drawing_order = ["Face", "Nose","Eyebrows","Eyes","Mouth","Ears","Hair","Mustache","Beard","Glasses","Clothes","Background"];
function setDrawingOrderGirls(){
    drawing_order = ["Face", "Nose","Eyebrows","Eyes","Mouth","Ears","Hair","Glasses","Clothes","Background"];
}

template_keys = {
	"Face": "faceshape",
	"Nose": "nose",
	"Eyebrows": "eyebrows",
	"Eyes": "eyesfront",
	"Mouth": "mouth",
	"Ears": "ears",
	"Hair": "hair",
	"Mustache": "mustache",
    "Beard": "beard",
    "Glasses": "glasses",
    "Background": "backs",
    "Clothes": "clothes",
	"Glasses": "glasses",
    "Other Lines": "Error"
};

sketches = [];
for (d in drawing_order) {
	sketches[drawing_order[d]] = [];
}


//called whenever user clicks next button
function submitElement() {
	
	/*var points_OnePart=[];
	for(var point_key in sketches[face_part].getPoints()){
		var One_point = [sketches[face_part].getPoints()[point_key].getX(), sketches[face_part].getPoints()[point_key].getY()];
		points_OnePart.push(One_point);
		
	}
	face_part_sketch = concaveHull(points_OnePart);*/
	
	if (face_part == "Face") {
		
		
	} else if (face_part == "Nose") {

		
	} else if (face_part == "Eyebrows") {

		
		
	} else if (face_part == "Eyes") {

		
	} else if (face_part == "Mouth") {

		
	} else if (face_part == "Ears") {

		
	} else if (face_part == "Hair") {
		
	} else if (face_part == "Facial Hair") {
		
	} else if (face_part == "Other Lines") {
		
		//problem is: determine the lines of relative location in original hand-drawn sketch. Find the relative location in the new created avatar
		//need to find the centroid of created avatar
		//relative location need to calculate proportionally on canvas (usually it's smaller than drawn sketch)
		
		var allStrokes = [];
		for (var key in sketches["Face"].getStrokes()) {
			allStrokes.push(sketches["Face"].getStrokes()[key]);
		}
		var BB = new srlib.core.data.container.BoundingBox(allStrokes);
		
		var Center_ofBB_X = ((BB.getMaxX() - BB.getMinX()) / 2 ) + BB.getMinX();
		var Center_ofBB_Y = ((BB.getMaxY() - BB.getMinY()) / 2 ) + BB.getMinY();
		for (var key in sketches[face_part].getStrokes()) {
			var one__stroke = sketches[face_part].strokes[key];
			var one_stroke = smoothing(one__stroke);
			var points_inOneStroke = one_stroke.points;
			//var avatar_canvas = document.getElementById('avatar');//canvas for avatar
			//var ctx = avatar_canvas.getContext('2d');
			//ctx.beginPath();
			var relative_X = (points_inOneStroke[0].x - Center_ofBB_X);
			var relative_Y = (points_inOneStroke[0].y - Center_ofBB_Y);
			///ctx.moveTo(240 + relative_X, 180 + relative_Y);
			for (var point_index = 1; point_index < points_inOneStroke.length; point_index++) {
				var relative_X = points_inOneStroke[point_index].x - Center_ofBB_X;
				var relative_Y = points_inOneStroke[point_index].y - Center_ofBB_Y;
				console.log(relative_X);
				console.log(relative_Y);
				//ctx.lineTo(240 + relative_X, 180 + relative_Y);
				//ctx.stroke();
				//ctx.moveTo(240 + relative_X, 180 + relative_Y);
			}
			
		}
		
		//ctx.stroke();
	}
}

function smoothing(stroke) {
	var pointsInStorke = stroke.points;
	for (var point_index = 2; point_index < pointsInStorke.length - 2; point_index++) {
		pointsInStorke[point_index].setX((pointsInStorke[point_index - 2].getX() + pointsInStorke[point_index - 1].getX() + pointsInStorke[point_index].getX() + pointsInStorke[point_index + 1].getX() + pointsInStorke[point_index + 2].getX()) / 5);
		pointsInStorke[point_index].setY((pointsInStorke[point_index - 2].getY() + pointsInStorke[point_index - 1].getY() + pointsInStorke[point_index].getY() + pointsInStorke[point_index + 1].getY() + pointsInStorke[point_index + 2].getY()) / 5);
	}
	var new_stroke = new srlib.core.data.container.Stroke();
	new_stroke.addPoint(pointsInStorke);
	return new_stroke;
}

function concaveHull(points) {
	var clusters,
		dbscan = new DBSCAN(),
		pointset = points;
	var allStrokes = [];
	for (var key in sketches[face_part].strokes) {
		allStrokes.push(sketches[face_part].strokes[key]);
	}
	var BB = new srlib.core.data.container.BoundingBox(allStrokes);
	
	clusters = dbscan.run(pointset, Math.round((BB.getMaxX() - BB.getMinX()) / 5), 20);
    if(clusters.length==0){
        console.log("NO HULL FOUND");
        clusters = points;
    }
	clusters = clusters.map(function (cluster) {
		return cluster.map(function (i) {
			return pointset[i]; // map index to point
		});
	});
	//console.log(clusters.length);
	if (clusters.length > 1) {
		var pts = hull(clusters[1], 10);
		var pts_in_srlibformat = [];
		for (var k = 0; k < pts.length; k++) {
			pts_in_srlibformat.push(new srlib.core.data.container.Point(pts[k][0], pts[k][1]));
		}
		var hull_sketch = new srlib.core.data.container.Sketch();
		hull_sketch.setPoints(pts_in_srlibformat);
	} else if (clusters.length == 1) {
		var pts = hull(clusters[0], 10);
		var pts_in_srlibformat = [];
		for (var k = 0; k < pts.length; k++) {
			pts_in_srlibformat.push(new srlib.core.data.container.Point(pts[k][0], pts[k][1]));
		}
		var hull_sketch = new srlib.core.data.container.Sketch();
		hull_sketch.setPoints(pts_in_srlibformat);
	}
	
	
	//just try to figure out how does it look like
	/*var avatar_canvas = document.getElementById('avatar');//canvas for avatar
	var ctx = avatar_canvas.getContext('2d');
	ctx.beginPath();
	for (var pointer_new = 0; pointer_new < hull_sketch.getPoints().length - 1; pointer_new++) {
		ctx.moveTo(hull_sketch.getPoints()[pointer_new].getX() + 30, hull_sketch.getPoints()[pointer_new].getY() + 40);
		ctx.lineTo(hull_sketch.getPoints()[pointer_new + 1].getX() + 30, hull_sketch.getPoints()[pointer_new + 1].getY() + 40);
	}*/
	//ctx.stroke();
	return hull_sketch;
}

noseCenter = new srlib.core.data.container.Point(0, 0);
function getNoseCenter(){
    var avg_x = 0,
        avg_y = 0;
    for(p_i in sketches["Nose"].points){
        avg_x += sketches["Nose"].points[p_i].x;
        avg_y += sketches["Nose"].points[p_i].y;
    }
    var p_len = Object.keys(sketches["Nose"].points).length
    noseCenter = new srlib.core.data.container.Point(avg_x/p_len, avg_y/p_len);
    console.log("Nose Center: "+noseCenter.x);
    return noseCenter;
}

//uses noseCenter to seperate strokes
//returns [left sketch, right sketch]
function seperateSides(sketch){
    var left =  new srlib.core.data.container.Sketch(),
        right = new srlib.core.data.container.Sketch();
    var left_pts =  [],
        right_pts = [];
    var key = 0;
    for(str_i in sketch.strokes){
        key += 1;
        stroke = sketch.strokes[str_i];
        var left_right = 0;//negative if left
        for(pt_i in stroke.points){
            if(stroke.points[pt_i].x > noseCenter.x)
                left_right +=1;
            else
                left_right -=1;
        }
        if(left_right<0){
            for(pt_i in stroke.points){
                left_pts.push(stroke.points[pt_i]);
            }
        }else{
            for(pt_i in stroke.points){
                right_pts.push(stroke.points[pt_i]);
            }
        }
    }
    left.setPoints(left_pts);
    right.setPoints(right_pts);
    return [left,right];
}

//returns line of best fit (regression) for points
function getSlope(points){
    var n = points.length;
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;
    var sum_yy = 0;

    for (var i = 0; i < points.length; i++) {
        sum_x += points[i].x;
        sum_y += points[i].y;
        sum_xy += (points[i].x*points[i].y);
        sum_xx += (points[i].x*points[i].x);
        sum_yy += (points[i].y*points[i].y);
    } 
    return (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
}

function getEyebrowConfig(){
    var eyebrows = seperateSides(sketches["Eyebrows"]);
    console.log("Eyebrow seperation points: "+eyebrows[0].points.length+" , "+eyebrows[1].points.length);
    if(eyebrows[0].points.length==0 || eyebrows[1].points.length==0){
        eyebrows_transform(0);//cant see both, do default
        return;
    }
         
    //getting slopes from line of best fit (linear regression)
    eyebrowSlopes = [];
    for(lr in eyebrows){
        eyebrowSlopes.push(getSlope(eyebrows[lr].points));
    }
    var avg_slope = (eyebrowSlopes[0]+eyebrowSlopes[1])/2.0;
    var diff_slope = Math.abs(eyebrowSlopes[0]-eyebrowSlopes[1]);
    console.log("Eyebrow slopes: "+eyebrowSlopes[0]+" , "+eyebrowSlopes[1]);
    console.log("Eyebrow avg slope: "+avg_slope+"  diff: "+diff_slope);
    
    //arrange eyebrows according to respective slopes
    //  0: default (flat)
    //  1: both rotated clockwise
    //  2: both rotated counter-clockwise
    //  3: tilted towards nose (angry-like)
    //  4: tilted away from nose 
    if(eyebrowSlopes[0]>0 && eyebrowSlopes[1]>0){
        //1
        eyebrows_transform(1);
    }else if(eyebrowSlopes[0]<0 && eyebrowSlopes[1]<0){
        //2
        eyebrows_transform(2);
    }else if(eyebrowSlopes[1]<-0.5 && eyebrowSlopes[0]>0.5){
        //3
        eyebrows_transform(3);
    }else if(eyebrowSlopes[1]>0.5 && eyebrowSlopes[0]<-0.5){
        //4
        eyebrows_transform(4);
    }else{
        //0: default
        eyebrows_transform(0);
    }
}

function removeTopHalfY(points){
    var avgY = 0;
    for (var i = 0; i < points.length; i++) {
        avgY += points[i].y;
    }
    avgY /= points.length;
    
    var new_points = [];
    for (var i = 0; i < points.length; i++) {
        if(points[i].y > avgY){
            new_points.push(points[i]);
        }
    }
    console.log("avg y: "+avgY);
    console.log("cut off from top: "+new_points.length+" / "+points.length);
    return new_points;
}

//called when pen is lifted (on each stroke completion)
function penMouseUp() {
	sketches[drawing_order[present_sketch]] = sketch;//storing data
	
	face_part = drawing_order[present_sketch];
	console.log("PEN UP: " + face_part);
    
	var templates = getGender() == "boys" ? templates_male : templates_female;
	
    var hull = [];
    
    if(face_part == "Eyebrows" || face_part == "Eyes" || face_part == "Ears"){
        //only use right if available
        var sides = seperateSides(sketches[drawing_order[present_sketch]]);
        if(sides[1].points.length>0 && sides[0].points.length==0){
            hull = convexHull(sides[1]);
        }else if(sides[0].points.length>0 && sides[1].points.length>0){
            //random 
            var randBool = parseInt(Math.random() * 2) ?  true : false;
            if(randBool)
                hull = convexHull(sides[0]);
            else
                hull = convexHull(sides[1]);
        }else{
            hull = convexHull(sides[0]);
        }
    }else{
        hull = convexHull(sketch);
    }
    
    var match = "ERROR NOT FOUND";
	if (face_part == "Face" ) {
        var new_points = removeTopHalfY(hull.points);
        hull.setPoints(new_points);
		match = hausdorff(hull, templates[template_keys[face_part]].hulls); 
    }else if(face_part == "Eyebrows"){
        match = hausdorff_atan(hull, templates[template_keys[face_part]].hulls); 
        getEyebrowConfig();
	}else if(face_part == "Nose"){
        match = hausdorff(hull, templates[template_keys[face_part]].hulls); 
        getNoseCenter();
    }else if(face_part == "Mustache"){
        //use raw sketches for mustache
        match = hausdorff(sketch, templates[template_keys[face_part]].sketches.slice(1)); 
        match += 1;
    }else if(face_part == "Hair"){
        match = hausdorff_atan(hull, templates[template_keys[face_part]].hulls.slice(1)); 
        match += 1;
    }else if(face_part == "Beard"){
        match = hausdorff(hull, templates[template_keys[face_part]].hulls.slice(1)); 
        match += 1;
    }else if(face_part == "Mouth"){
        var ts = templates[template_keys[face_part]].hulls;
        if(getGender()=="boys")
            ts = templates[template_keys[face_part]].hulls.slice(0,11);
        else
            ts = templates[template_keys[face_part]].hulls.slice(0,5).concat(templates[template_keys[face_part]].hulls.slice(7,16));
        match = hausdorff_atan(hull, ts);
        if(getGender()!="boys"){
            if(match == 6)
                match +=1;
            else if(match ==7)
                match +=2;
        }
    }else{
        match = hausdorff(hull, templates[template_keys[face_part]].hulls); 
    }
    match = match % getPartOptions(template_keys[face_part]).length;//get index from reflections
    drawFeature(template_keys[face_part], match);
    console.log("MATCH "+template_keys[face_part]+" : "+match);
}


function convexHull(one_sketch) {
    var points=[]
    for (var key in one_sketch.points){
        var onePoint={x:one_sketch.points[key].x, y:one_sketch.points[key].y};
        points.push(onePoint);
    }
    points.sort(function (a, b) {
        return a.x != b.x ? a.x - b.x : a.y - b.y;
    });

    var n = points.length;
    var hull = [];

    for (var i = 0; i < 2 * n; i++) {
        var j = i < n ? i : 2 * n - 1 - i;
        while (hull.length >= 2 && removeMiddle(hull[hull.length - 2], hull[hull.length - 1], points[j]))
            hull.pop();
        hull.push(points[j]);
    }

    //hull.pop();
    var pts_in_srlibformat=[];
    for (var k = 0; k < hull.length; k++){
        pts_in_srlibformat.push(new srlib.core.data.container.Point(hull[k].x, hull[k].y));
    }
    var hull_sketch=new srlib.core.data.container.Sketch();
    hull_sketch.setPoints(pts_in_srlibformat);  
    return hull_sketch;



}

function removeMiddle(a, b, c) {
    var cross = (a.x - b.x) * (c.y - b.y) - (a.y - b.y) * (c.x - b.x);
    var dot = (a.x - b.x) * (c.x - b.x) + (a.y - b.y) * (c.y - b.y);
    return cross < 0 || cross == 0 && dot <= 0;
}













