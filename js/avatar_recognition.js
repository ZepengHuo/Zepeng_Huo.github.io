drawing_order = ["Face", "Nose","Eyebrows","Eyes","Mouth","Ears","Hair","Facial Hair","Other Lines"];
sketches = [];
for(d in drawing_order){
    sketches[drawing_order[d]] = [];
}



//called whenever user clicks next button
function submitElement(){
    sketches[drawing_order[present_sketch]] = sketch;//storing data
    
    face_part = drawing_order[present_sketch];
    face_part_sketch = sketches[face_part];
    console.log("SUBMITTED: "+face_part);
    

    if(face_part == "Face"){
 /*       //Example: draw smiley face (comment-out/delete in your version: this is just an example)
        var avatar_canvas = document.getElementById('avatar');//canvas for avatar
        var ctx = avatar_canvas.getContext('2d');
        
        var sketch_canvas=document.getElementById('canvas');
        //console.log(sketch_canvas.width);
        //console.log(sketch_canvas.height);
        
        ctx.beginPath();
        ctx.arc(240,180,120,0,Math.PI*2,true); // Outer circle
        //ctx.moveTo(110,75);
        //ctx.arc(75,75,35,0,Math.PI,false);  // Mouth (clockwise)
        //ctx.moveTo(65,65);
        //ctx.arc(60,65,5,0,Math.PI*2,true);  // Left eye
        //ctx.moveTo(95,65);
        //ctx.arc(90,65,5,0,Math.PI*2,true);  // Right eye
        ctx.stroke();
        console.log(convexHull(sketches[face_part]));
*/
        var points=[]
        for (var key in sketches[face_part].getPoints()){
            var onePoint=[sketches[face_part].getPoints()[key].getX(), sketches[face_part].getPoints()[key].getY()];
            points.push(onePoint);
        }
        
        var hull_sketch=concaveHull(points);
        var avatar_canvas = document.getElementById('avatar');//canvas for avatar
        var ctx = avatar_canvas.getContext('2d');
        ctx.beginPath();
        for (var pointer_new=0; pointer_new<hull_sketch.getPoints().length-1; pointer_new++){
            ctx.moveTo(hull_sketch.getPoints()[pointer_new].getX(),hull_sketch.getPoints()[pointer_new].getY());
            ctx.lineTo(hull_sketch.getPoints()[pointer_new+1].getX(),hull_sketch.getPoints()[pointer_new+1].getY());
        }
        ctx.stroke();
    /*    
        var points=[]
        for (var key in sketches[face_part].getPoints()){
            var onePoint=[sketches[face_part].getPoints()[key].getX(), sketches[face_part].getPoints()[key].getY()];
            points.push(onePoint);
        }
        var pts=hull(points, 30);
        
        var avatar_canvas = document.getElementById('avatar');//canvas for avatar
        var ctx = avatar_canvas.getContext('2d');
        ctx.beginPath();
        for (var pointer_new=0; pointer_new<pts.length-1; pointer_new++){
            ctx.moveTo(pts[pointer_new][0],pts[pointer_new][1]);
            ctx.lineTo(pts[pointer_new+1][0],pts[pointer_new+1][1]);
        }
        ctx.stroke();
    */    
        
    }else if(face_part == "Nose"){  
        var avatar_canvas = document.getElementById('avatar');//canvas for avatar
        var ctx = avatar_canvas.getContext('2d');

        ctx.beginPath();
        ctx.moveTo(240,180);
        ctx.lineTo(240,220); 
        ctx.moveTo(240,220);
        ctx.lineTo(250,220)
        ctx.stroke();
        
    }else if(face_part == "Eyebrows"){  
        var avatar_canvas = document.getElementById('avatar');//canvas for avatar
        var ctx = avatar_canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(180,140);
        ctx.lineTo(220,140);  //left eyebrow
        ctx.moveTo(260,140);
        ctx.lineTo(300,140);   //right eyebrow
        ctx.stroke();
        
        
    }else if(face_part == "Eyes"){  
        var avatar_canvas = document.getElementById('avatar');//canvas for avatar
        var ctx = avatar_canvas.getContext('2d');
        ctx.moveTo(210,170);
        ctx.arc(200,170,10,0,Math.PI*2,true);  // Left eye
        ctx.moveTo(280,170);
        ctx.moveTo(290,170);
        ctx.arc(280,170,10,0,Math.PI*2,true);  // Right eye
        ctx.stroke();
        
    }else if(face_part == "Mouth"){  
        var avatar_canvas = document.getElementById('avatar');//canvas for avatar
        var ctx = avatar_canvas.getContext('2d');

        ctx.beginPath();
        ctx.moveTo(280,230);
        ctx.arc(240,230,40,0,Math.PI,false);  // Mouth (clockwise)
        ctx.stroke();
        
    }else if(face_part == "Ears"){  
        var points_OnePart=[];
        for(var point_key in sketches[face_part].getPoints()){
            var One_point = [sketches[face_part].getPoints()[point_key].getX(), sketches[face_part].getPoints()[point_key].getY()];
            points_OnePart.push(One_point);
        }
        
       
        
        //var hull=convexHull(points_OnePart);
        //var hull=concaveman(points_OnePart);
        //var hull=window.hull(points_OnePart,20);
        //console.log(hull);
        /*var clusters,
        dbscan = new DBSCAN(),
        pointset = points_OnePart;
        
        var allStrokes = [];
        for (var key in sketches[face_part].getStrokes()){
            allStrokes.push(sketches[face_part].getStrokes()[key]);
        }
        var BB = new srlib.core.data.container.BoundingBox(allStrokes);
        console.log(Math.round((BB.getMaxX()-BB.getMinX())/5));
        clusters = dbscan.run(pointset, Math.round((BB.getMaxX()-BB.getMinX())/5), 20);
        clusters = clusters.map(function(cluster) {
            return cluster.map(function(i) {
                return pointset[i]; // map index to point
            });
        });
        

        //console.log(clusters);
        
                
        for (var cluster_key=0; cluster_key < clusters.length; cluster_key++){
            
            var avatar_canvas = document.getElementById('avatar');//canvas for avatar
            var ctx = avatar_canvas.getContext('2d');
            ctx.beginPath();
            
            
            
            //put hull to each cluster
            var pts=hull(clusters[cluster_key], 10);
            //console.log(pts);
            var pts_in_srlibformat=[];
            for (var k = 0; k < pts.length; k++){
                pts_in_srlibformat.push(new srlib.core.data.container.Point(pts[k][0],pts[k][1]));
            }
            console.log(pts_in_srlibformat);
            
            
            for (var point_key=0; point_key < pts.length-1; point_key++){
                
               
                ctx.moveTo(pts[point_key][0],pts[point_key][1]);
                ctx.lineTo(pts[point_key+1][0],pts[point_key+1][1]);
                
            }
            
            ctx.stroke();    
            
        }
        */
        console.log(concaveHull(points_OnePart));
        
        
        /*clusters.forEach(function(pointset) {
            var pts = window.hull(pointset, 30);
            for(var point_key=0; point_key < pts.length-1; point_key++){
                ctx.moveTo(pts[point_key][0],pts[point_key][1]);
                ctx.lineTo(pts[point_key+1][0],pts[point_key+1][1]);
            }
        });
        */
        
        
    }else if(face_part == "Hair"){  
        
    }else if(face_part == "Facial Hair"){  

    }else if(face_part == "Other Lines"){  
        
        //problem is: determine the lines of relative location in original hand-drawn sketch. Find the relative location in the new created avatar 
        //need to find the centroid of created avatar
        //relative location need to calculate proportionally on canvas (usually it's smaller than drawn sketch)
        
        var allStrokes = [];
        for (var key in sketches["Face"].getStrokes()){
            allStrokes.push(sketches["Face"].getStrokes()[key]);
        }
        var BB = new srlib.core.data.container.BoundingBox(allStrokes);

        var Center_ofBB_X=((BB.getMaxX()-BB.getMinX()) / 2 ) + BB.getMinX();
        var Center_ofBB_Y=((BB.getMaxY()-BB.getMinY()) / 2 ) + BB.getMinY();
        for (var key in sketches[face_part].getStrokes()){
            var one__stroke=sketches[face_part].getStrokes()[key];
            var one_stroke=smoothing(one__stroke);
            var points_inOneStroke=one_stroke.getPoints();
            var avatar_canvas = document.getElementById('avatar');//canvas for avatar
            var ctx = avatar_canvas.getContext('2d');
            ctx.beginPath();
            var relative_X=(points_inOneStroke[0].getX() - Center_ofBB_X);
            var relative_Y=(points_inOneStroke[0].getY() - Center_ofBB_Y);
            ctx.moveTo(240+relative_X,180+relative_Y);
            for (var point_index=1; point_index < points_inOneStroke.length; point_index++){
                var relative_X=points_inOneStroke[point_index].getX() - Center_ofBB_X;
                var relative_Y=points_inOneStroke[point_index].getY() - Center_ofBB_Y;
                console.log(relative_X);
                console.log(relative_Y);
                ctx.lineTo(240+relative_X,180+relative_Y);
                ctx.stroke();
                ctx.moveTo(240+relative_X,180+relative_Y);
            }
            
        }
        
        ctx.stroke();
       
        
        
        
        
        
        
    }
}

function smoothing(stroke){
    var pointsInStorke=stroke.getPoints();
    for (var point_index=2; point_index < pointsInStorke.length-2; point_index++){
        pointsInStorke[point_index].setX((pointsInStorke[point_index-2].getX()+pointsInStorke[point_index-1].getX()+pointsInStorke[point_index].getX()+pointsInStorke[point_index+1].getX()+pointsInStorke[point_index+2].getX())/5);
        pointsInStorke[point_index].setY((pointsInStorke[point_index-2].getY()+pointsInStorke[point_index-1].getY()+pointsInStorke[point_index].getY()+pointsInStorke[point_index+1].getY()+pointsInStorke[point_index+2].getY())/5);
    }
    var new_stroke=new srlib.core.data.container.Stroke();
    new_stroke.addPoint(pointsInStorke);
    return new_stroke;
}


//input: sketch object    output: sketch object
function convexHull(one_sketch) {
        var points=[]
        for (var key in one_sketch.getPoints()){
            var onePoint={x:one_sketch.getPoints()[key].getX(), y:one_sketch.getPoints()[key].getY()};
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

function concaveHull(points) {
    var clusters,
    dbscan = new DBSCAN(),
    pointset = points;
    var allStrokes = [];
    for (var key in sketches[face_part].getStrokes()){
        allStrokes.push(sketches[face_part].getStrokes()[key]);
    }
    var BB = new srlib.core.data.container.BoundingBox(allStrokes);
    
    clusters = dbscan.run(pointset, Math.round((BB.getMaxX()-BB.getMinX())/5), 20);
    clusters = clusters.map(function(cluster) {
        return cluster.map(function(i) {
            return pointset[i]; // map index to point
        });
    });
    //console.log(clusters.length);
    if (clusters.length > 1){
        var pts=hull(clusters[1], 10);
        var pts_in_srlibformat=[];
        for (var k = 0; k < pts.length; k++){
            pts_in_srlibformat.push(new srlib.core.data.container.Point(pts[k][0],pts[k][1]));
        }
        var hull_sketch=new srlib.core.data.container.Sketch();
        hull_sketch.setPoints(pts_in_srlibformat);    
    } else if(clusters.length == 1){
        var pts=hull(clusters[0], 10);
        var pts_in_srlibformat=[];
        for (var k = 0; k < pts.length; k++){
            pts_in_srlibformat.push(new srlib.core.data.container.Point(pts[k][0],pts[k][1]));
        }
        var hull_sketch=new srlib.core.data.container.Sketch();
        hull_sketch.setPoints(pts_in_srlibformat);    
        /*
        for (var pts_pointer=0; pts_pointer < pts_in_srlibformat.length; pts_pointer++){
            hull_sketch.addPoint(pts_in_srlibformat[pts_pointer]);
        }
        */  
    }
    
    
    //just try to figure out how does it look like
    var avatar_canvas = document.getElementById('avatar');//canvas for avatar
    var ctx = avatar_canvas.getContext('2d');
    ctx.beginPath();
    for (var pointer_new=0; pointer_new<hull_sketch.getPoints().length-1; pointer_new++){
        ctx.moveTo(hull_sketch.getPoints()[pointer_new].getX()+30,hull_sketch.getPoints()[pointer_new].getY()+40);
        ctx.lineTo(hull_sketch.getPoints()[pointer_new+1].getX()+30,hull_sketch.getPoints()[pointer_new+1].getY()+40);
    }
    //ctx.stroke();
    
    return hull_sketch;
    
    
}



//called when pen is lifted (on each stroke completion)
function penMouseUp(){
    sketches[drawing_order[present_sketch]] = sketch;//storing data
    
    face_part = drawing_order[present_sketch];
    face_part_sketch = sketches[face_part];
    console.log("PEN UP: "+face_part);

    if(face_part == "Face"){

    }else if(face_part == "Nose"){  

    }else if(face_part == "Eyebrows"){  

    }else if(face_part == "Eyes"){  

    }else if(face_part == "Mouth"){  

    }else if(face_part == "Ears"){  

    }else if(face_part == "Hair"){  

    }else if(face_part == "Facial Hair"){  

    }else if(face_part == "Other Lines"){  

    }
}
















