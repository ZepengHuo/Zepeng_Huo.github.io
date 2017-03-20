gender = 'boys';
if (gender === 'boys' ) {
	var color_storage = {
		backs:'#ecf0f1',
		humanbody:'#f0c7b1',
		clothes:'#386e77',
		hair:'#2a232b',
		ears:'#f0c7b1',
		faceshape:'#f0c7b1',
		chinshadow:'#f0c7b1',
		facehighlight:'#f0c7b1',
		eyebrows:'#2a232b',
		eyesback:'#000000',
		eyesfront:'#000000',
		eyesiris:'#4e60a3',
		glasses:'#26120B',
		mustache:'#2a232b',
		beard:'#2a232b',
		mouth:'#da7c87'};
	$('#svga-container').addClass('svga-boys');
} else if (gender === 'girls') {
	var color_storage = {
		backs:'#ecf0f1',
		humanbody:'#F3D4CF',
		clothes:'#09aac5',
		hair:'#2a232b',
		ears:'#F3D4CF',
		faceshape:'#F3D4CF',
		chinshadow:'#F3D4CF',
		facehighlight:'#F3D4CF',
		eyebrows:'#2a232b',
		eyesback:'#000000',
		eyesfront:'#000000',
		eyesiris:'#4e60a3',
		glasses:'#26120B',
		mouth:'#f771a9'};
	$('#svga-container').addClass('svga-girls');
}
    

//Extend SVGJS lib with special methods for controls
SVG.extend(SVG.Element, {
	svgaCenterScale: function(sx, sy) {
		var temp = this.bbox();
		var cx = temp.cx,
			cy = temp.cy;
		if (!sy) {sy = sx};
		return this.transform({
			a: sx,
			b: 0,
			c: 0,
			d: sy,
			e: cx - sx * cx,
			f: cy - sy * cy
		});
	},
	svgaLeft: function(times, step) {
		var times = times ? times : 3,
				step = step ? step : lr_step,
				leftright = this.data('leftright'),
				updown = this.data('updown');
		if ( leftright > -(times*step) ) {
			this.move(leftright-step, updown);
			this.data('leftright', leftright-step-0.0000001);
		};
		return this;
	},
	svgaRight: function(times, step) {
		var times = times ? times : 3,
				step = step ? step : lr_step,
				leftright = this.data('leftright'),
				updown = this.data('updown');
		if ( leftright < times*step ) {
			this.move(leftright+step, updown);
			this.data('leftright', leftright+step+0.0000001);
		};
		return this;
	},
	svgaUp: function(times, step) {
		var times = times ? times : 3,
				step = step ? step : ud_step,
				leftright = this.data('leftright'),
				updown = this.data('updown');
		if ( updown > -(times*step) ) {
			this.move(leftright, updown-step);
			this.data('updown', updown-step-0.0000001);
		};
		return this;
	},
	svgaDown: function(times, step) {
		var times = times ? times : 3,
				step = step ? step : ud_step,
				leftright = this.data('leftright'),
				updown = this.data('updown');
		if ( updown < times*step ) {
			this.move(leftright, updown+step);
			this.data('updown', updown+step+0.0000001);
		};
		return this;
	},
	svgaScaleUp: function(times, stepX, stepY) {
		var times = times ? times : 3,
				stepX = stepX ? stepX : scale_step,
				stepY = stepY ? stepY : stepX,
				scaleX = this.data('scaleX')+0.0000001,
				scaleY = this.data('scaleY')+0.0000001;
		if ( scaleX < 1+times*stepX ) {
			this.svgaCenterScale(scaleX+stepX, scaleY+stepY);
			this.data('scaleX', scaleX+stepX+0.00000011);
			this.data('scaleY', scaleY+stepY+0.00000011);
		};
		return this;
	},
	svgaScaleDown: function(times,stepX,stepY) {
		var times = times ? times : 3,
				stepX = stepX ? stepX : scale_step,
				stepY = stepY ? stepY : stepX,
				scaleX = this.data('scaleX')-0.0000001,
				scaleY = this.data('scaleY')-0.0000001;
		if ( scaleX > 1-times*stepX ) {
			this.svgaCenterScale(scaleX-stepX, scaleY-stepY);
			this.data('scaleX', scaleX-stepX-0.00000011);
			this.data('scaleY', scaleY-stepY-0.00000011);
		};
		return this;
	},
	svgaRotateLeft: function(times, step, cx, cy) {
		var times = times ? times : 2,
				step = step ? step : rotate_step,
				rotate = this.data('rotate');
		if ( rotate > -(times*step) ) {
			this.rotate(rotate-step-0.0000001, cx, cy);
			this.data('rotate', rotate-step);
		};
		return this;
	},
	svgaRotateRight: function(times, step, cx, cy) {
		var times = times ? times : 2,
				step = step ? step : rotate_step,
				rotate = this.data('rotate');
		if ( rotate < times*step ) {
			this.rotate(rotate+step+0.0000001, cx, cy);
			this.data('rotate', rotate+step);
		};
		return this;
	},
	svgaCancelRotate: function() {
		return this.rotate(0.0000001).data('rotate',0.0000001,true);
	}
});
//done extending SVG

//creating svg groups in SVG canvas
var gr, gr1, gr2, gr3, gr4, gr5, draw, headgr, rect, text;
initGroups();
function initGroups () {
	draw = SVG('svga-svgmain').attr({id:'svga-svgcanvas', width:null, height:null, 'class':'svga-svg', viewBox:'0 0 200 200', preserveAspectRatio:'xMinYMin meet'});
	draw = draw.group().attr('id', 'svga-group-wrapper');
	gr = draw.group().attr('id', 'svga-group-backs-single');
	draw = draw.group().attr('id', 'svga-group-subwrapper');
	_addControls(draw);
	gr = draw.group().attr('id', 'svga-group-hair-back');
	_addControls(gr);
	gr = draw.group().attr('id', 'svga-group-humanbody-single');
	gr = draw.group().attr('id', 'svga-group-chinshadow-single');
	gr = draw.group().attr('id', 'svga-group-clothes-single');
	_addControls(gr);
	headgr = draw.group().attr('id', 'svga-group-head');
	_addControls(headgr);
	gr = draw.group().attr('id', 'svga-group-ears-left');
	_addControls(gr);
	headgr.add(gr);
	gr = draw.group().attr('id', 'svga-group-ears-right');
	_addControls(gr);
	headgr.add(gr);
	gr = draw.group().attr('id', 'svga-group-faceshape-wrap');
	gr1 = draw.group().attr('id', 'svga-group-faceshape-single');
	gr.add(gr1);
	_addControls(gr);
	_addControls(gr1);
	headgr.add(gr);
	gr = draw.group().attr('id', 'svga-group-mouth-single');
	_addControls(gr);
	headgr.add(gr);
	gr = draw.group().attr('id', 'svga-group-eyes-left');
	gr1 = draw.group().attr('id', 'svga-group-eyesback-left');
	gr2 = draw.group().attr('id', 'svga-group-eyesiriswrapper-left');
	gr3 = draw.group().attr('id', 'svga-group-eyesiriscontrol-left');
	gr4 = draw.group().attr('id', 'svga-group-eyesiris-left');
	gr5 = draw.group().attr('id', 'svga-group-eyesfront-left');
	gr2.add(gr3);
	gr3.add(gr4);
	gr.add(gr1).add(gr2).add(gr5);
	_addControls(gr);
	_addControls(gr3);
	_addControls(gr4);
	headgr.add(gr);
	gr = draw.group().attr('id', 'svga-group-eyes-right');
	gr1 = draw.group().attr('id', 'svga-group-eyesback-right');
	gr2 = draw.group().attr('id', 'svga-group-eyesiriswrapper-right');
	gr3 = draw.group().attr('id', 'svga-group-eyesiriscontrol-right');
	gr4 = draw.group().attr('id', 'svga-group-eyesiris-right');
	gr5 = draw.group().attr('id', 'svga-group-eyesfront-right');
	gr2.add(gr3);
	gr3.add(gr4);
	gr.add(gr1).add(gr2).add(gr5);
	_addControls(gr);
	_addControls(gr3);
	_addControls(gr4);
	headgr.add(gr);
	gr = draw.group().attr('id', 'svga-group-facehighlight-single');
	_addControls(gr);
	headgr.add(gr);
	gr = draw.group().attr('id', 'svga-group-eyebrows-left');
	_addControls(gr);
	headgr.add(gr);
	gr = draw.group().attr('id', 'svga-group-eyebrows-right');
	_addControls(gr);
	headgr.add(gr);
	gr = draw.group().attr('id', 'svga-group-nose-single');
	_addControls(gr);
	headgr.add(gr);
	if (gender==='boys') {
		gr = draw.group().attr('id', 'svga-group-beardwrap');
		gr1 = draw.group().attr('id', 'svga-group-beard-single');
		gr.add(gr1);
		_addControls(gr);
		_addControls(gr1);
		headgr.add(gr);
		gr = draw.group().attr('id', 'svga-group-mustache-single');
		_addControls(gr);
		headgr.add(gr);
	};
	gr = draw.group().attr('id', 'svga-group-hair-front');
	_addControls(gr);
	headgr.add(gr);
	gr = draw.group().attr('id', 'svga-group-glasses-single');
	_addControls(gr);
	headgr.add(gr);
	function _addControls (gr) {
		for (var i = 0; i < position_names.length; i++) {
			if (position_names[i].match(/scale/)) {
				gr.data(position_names[i],1,true);
			} else {
				gr.data(position_names[i],0,true);
			};
		};
	};
	if (share_credit) {
		draw = SVG.get('svga-group-wrapper');
		rect = draw.rect(200,15).move(0,185).fill('#ecf0f1').opacity(0.5);
		text = draw.text(share_credit).font({
			family: '"Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif',
			size:   '0.84em',
			anchor: 'middle',
			weight: 400 }).fill('#000');
		var w = text.bbox().width;
		text.move( (200-w)/2,185 );
		rect.hide();
		text.hide();
	};
};



function loadJSON(callback, filePath) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', filePath, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

mDD = [];
fDD = [];
function initDrawingData() {
 loadJSON(function(response) {
  // Parse JSON string into object
    mDD = JSON.parse(response);
 },'js/svgavatars-male-data.json');
 loadJSON(function(response) {
  // Parse JSON string into object
    fDD = JSON.parse(response);
 },'js/svgavatars-female-data.json');
}
initDrawingData();


cf = {};
//default to first of each choice in default position
//index 0 > which item is selected
cf['backs'] = [0];
cf['beard'] = [0];
cf['chinshadow'] = [0];
cf['clothes'] = [0];
cf['ears'] = [0];
cf['eyebrows'] = [0];
cf['eyesback'] = [0];
cf['eyesfront'] = [0];
cf['eyesiris'] = [0];
cf['facehighlight'] = [0];
cf['faceshape'] = [0];
cf['glasses'] = [0];
cf['hair'] = [0];
cf['humanbody'] = [0];
cf['mouth'] = [0];
cf['mustache'] = [0];
cf['nose'] = [0];
/*
function draw_avatar(){
    var all = document.getElementsByTagName("*");

    for (var i=0 ; i < all.length; i++) {
        if(all[i].nodeName == "g"){
            var id = all[i].getAttribute('id');
            if(id === null)
                continue;
            key = id.substr(11,999999);
            if(key === null)
                continue;
            key = key.substring(0, key.indexOf('-'));
            if(key in cf){
                all[i].innerHTML = "";
                if('single' in mDD[key].shapes[0])
                    console.log(key);
                
                var paths = "";
                for(j=0;j<mDD[key].shapes.length;j++){
                    if(!('single' in mDD[key].shapes[j]))
                        continue;//TODO: left & right
                    for(k=0;k<mDD[key].shapes[j].single.length;k++){
                        var cur_svg_shape = mDD[key].shapes[j].single[k];
                        var path = mDD[key].shapes[j].single[k].path;
                        
                        paths += "<path ";
                        paths += "d=\""+path+"\" ";
                        paths += "data-colored=\"" +cur_svg_shape.colored.toString()+"\" ";
                        paths += "data-transparence=\"" +cur_svg_shape.transparence+"\" ";
                        paths += "data-filltype=\"" +cur_svg_shape.fill+"\" ";
                        paths += "data-stroketype=\"" +cur_svg_shape.stroke+"\" ";
                        paths += "stroke-width=\"" +cur_svg_shape.strokeWidth+"\" ";
                        paths += "opacity=\"" +cur_svg_shape.opacity+"\" ";
                        paths += "fill=\""+ mDD[key].colors[0] +"\" ";//TODO:figure out colors
                        paths += "></path>";
                    }
                }
                all[i].innerHTML = paths;
            }
        }
    }
}*/

data = [];
var shapes_counter = 0;

function draw_avatar(){
    var block_names = ['face','eyes','hair','clothes','backs'];
    if (gender === 'boys') {
        var body_zone_list = ['backs','faceshape','chinshadow','facehighlight','humanbody','clothes','hair','ears','eyebrows','eyesback','eyesiris','eyesfront','glasses','mouth','mustache','beard','nose'];
        data = mDD;
    } else {
        var body_zone_list = ['backs','faceshape','chinshadow','facehighlight','humanbody','clothes','hair','ears','eyebrows','eyesback','eyesiris','eyesfront','glasses','mouth','nose'];
        data = fDD;
    };
    for (var i = 0; i < body_zone_list.length; i++) {
        if (body_zone_list[i] === 'backs' || body_zone_list[i] === 'hair') {
            shapes_counter = 1;
        };
        for (var shape_side_position in data[body_zone_list[i]].shapes[shapes_counter]) {
            if (data[body_zone_list[i]].shapes[shapes_counter].hasOwnProperty(shape_side_position)) {
                var id = 'svga-group-' + body_zone_list[i] + '-' + shape_side_position;
                console.log(id);
                $('#'+id).empty();
                var cur_group = SVG.get(id);
                on_canvas = true;
                console.log(cur_group, body_zone_list[i],shapes_counter, shape_side_position);
                drawElement(cur_group, body_zone_list[i],shapes_counter, shape_side_position);
            };
        };
        element_storage[body_zone_list[i]] = shapes_counter;
        shapes_counter = 0;
    };
}

//main func for drawing every SVG elements (paths)
function drawElement(cur_group, body_zone, shapes_counter, shape_side_position) {
	var cur_zone_data = data[body_zone],
		cur_element_data = cur_zone_data.shapes[shapes_counter][shape_side_position];
	for (var i = 0; i < cur_element_data.length; i++) {
		var cur_svg_shape = cur_element_data[i],
			path = cur_group.path(cur_svg_shape.path, true);
		path.data('colored', cur_svg_shape.colored, true);
		path.data('transparence', cur_svg_shape.transparence, true);
		path.data('filltype', cur_svg_shape.fill);
		path.data('stroketype', cur_svg_shape.stroke);
		if (cur_svg_shape.fromskin) {
			path.data('fromskin', cur_svg_shape.fromskin, true);
		};
		if (path.data('colored') === true) {
			if (cur_svg_shape.fromskin) {
				var color_zone = 'faceshape';
			} else {
				var color_zone = body_zone;
			};
			var filltype = path.data('filltype'),
				ifgrad = false;
			var cur_fill = colorTones(filltype, color_zone, ifgrad);
			path.attr('fill',cur_fill);
			
			var stroketype = path.data('stroketype');
			var cur_stroke = colorTones(stroketype, color_zone, ifgrad);
			path.attr({
				'stroke': cur_stroke,
				'stroke-width': cur_svg_shape.strokeWidth,
				'stroke-linecap': cur_svg_shape.strokeLinecap,
				'stroke-linejoin': cur_svg_shape.strokeLinejoin,
				'stroke-miterlimit': cur_svg_shape.strokeMiterlimit
			});
		} else {
			if (cur_svg_shape.fill === 'gradient') {
				if (on_canvas) {
					removeElementsByClass('svga-on-canvas-'+body_zone+'-gradient-'+shape_side_position+'-'+i);
				} else {
					var cur_grad = document.getElementById('svga-'+body_zone+'-gradient-'+shape_side_position+'-'+shapes_counter+'-'+i);
					if (cur_grad) {removeElement(cur_grad);};
				};
				var gradient = cur_group.gradient(cur_svg_shape.type, function(stop) {
					for (var j = 0; j < cur_svg_shape.gradientStops.length; j++) {
						var stopcolor = cur_svg_shape.gradientStops[j].color;
						ifgrad = true;
						if (cur_svg_shape.fromskin) {
							var color_zone = 'faceshape';
						} else {
							var color_zone = body_zone;
						};
						var cur_stopcolor = colorTones(stopcolor, color_zone, ifgrad);
						var s = stop.at(cur_svg_shape.gradientStops[j]);
						s.update({color: cur_stopcolor});
						s.data('stoptype', stopcolor);
					};
				});
				if (cur_svg_shape.x1) {
					gradient.attr({x1:cur_svg_shape.x1});
				};
				if (cur_svg_shape.y1) {
					gradient.attr({y1:cur_svg_shape.y1});
				};
				if (cur_svg_shape.x2) {
					gradient.attr({x2:cur_svg_shape.x2});
				};
				if (cur_svg_shape.y2) {
					gradient.attr({y2:cur_svg_shape.y2});
				};
				if (cur_svg_shape.cx) {
					gradient.attr({cx:cur_svg_shape.cx});
				};
				if (cur_svg_shape.cy) {
					gradient.attr({cy:cur_svg_shape.cy});
				};
				if (cur_svg_shape.fx) {
					gradient.attr({fx:cur_svg_shape.fx});
				};
				if (cur_svg_shape.fy) {
					gradient.attr({fy:cur_svg_shape.fy});
				};
				if (cur_svg_shape.r) {
					gradient.attr({r:cur_svg_shape.r});
				};
				if (cur_svg_shape.gradientTransform) {
					gradient.attr({gradientTransform:cur_svg_shape.gradientTransform});
				};
				if (cur_svg_shape.gradientUnits) {
					gradient.attr({gradientUnits:cur_svg_shape.gradientUnits});
				};
				if (on_canvas) {
					gradient.attr('class','svga-on-canvas-'+body_zone+'-gradient-'+shape_side_position+'-'+i);
				} else {
					gradient.attr('id','svga-'+body_zone+'-gradient-'+shape_side_position+'-'+shapes_counter+'-'+i);
				};
				path.attr({fill: gradient});
			} else {
				path.attr({fill: cur_svg_shape.fill});
				path.attr({
					'stroke': cur_svg_shape.stroke,
					'stroke-width': cur_svg_shape.strokeWidth,
					'stroke-linecap': cur_svg_shape.strokeLinecap,
					'stroke-linejoin': cur_svg_shape.strokeLinejoin,
					'stroke-miterlimit': cur_svg_shape.strokeMiterlimit
				});
			};
		};
		if (cur_svg_shape.opacity) {
			path.attr({opacity: cur_svg_shape.opacity});
		};
		if (on_canvas) {
			if (cur_svg_shape.id) {
				path.attr('id', cur_svg_shape.id+ '-' + shape_side_position);
			};
			if (body_zone=='eyesback') {
				SVG.get('svga-group-eyesiriswrapper-' + shape_side_position).transform({x:0,y:0});
			};
			if (cur_svg_shape.irisx || cur_svg_shape.irisy) {
				SVG.get('svga-group-eyesiriswrapper-' + shape_side_position).move(cur_svg_shape.irisx, cur_svg_shape.irisy);
			};
			if (body_zone === 'hair' && cur_svg_shape.hideears) {
				SVG.get('svga-group-ears-left').hide();
				SVG.get('svga-group-ears-right').hide();
			} else if (body_zone === 'hair') {
				SVG.get('svga-group-ears-left').show();
				SVG.get('svga-group-ears-right').show();
			};
		};
		if (!on_canvas && cur_svg_shape.hideonthumbs) {
			path.remove();
		};
		if (on_canvas && cur_svg_shape.hideoncanvas) {
			path.remove();
		};
	};
};//end draw element