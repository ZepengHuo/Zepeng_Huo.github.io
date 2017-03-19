function onMouseDown(event) {
    // PaperJS add a new Path object and initial starting point
    path = new Path();
    path.strokeColor = 'black';
    path.strokeWidth = 2;
    path.add(event.point);

    // SRLlib add a new Stroke object and initial starting point
    stroke = new srlib.core.data.container.Stroke();
    point = new srlib.core.data.container.Point(event.point.x,event.point.y)
    if (typeof sketch == "undefined") {
	sketch = new srlib.core.data.container.Sketch();
    }
    sketch.addStroke(stroke);
    sketch.addPoint(point);
    stroke.addPoint(point);
}

function onMouseDrag(event) {
    // PaperJS add points to Path object on mouse drag
    path.add(event.point);

    // SRLlib add points to Stroke on mouse drag
    point = new srlib.core.data.container.Point(event.point.x,event.point.y)
    sketch.addPoint(point);
    stroke.addPoint(point);
}

function onMouseUp(event) {

    // Add evaluation / recognition functions or whatever you want here!

}
