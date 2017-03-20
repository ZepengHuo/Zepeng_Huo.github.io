//Parts that can be changed

// male list ['backs','faceshape','clothes','hair','ears','eyebrows','eyesback','eyesiris','eyesfront','glasses','mouth','mustache','beard','nose']

// female list ['backs','faceshape','clothes','hair','ears','eyebrows','eyesback','eyesiris','eyesfront','glasses','mouth','nose'];

//########## DATA GETTERS ################

//Input: avatar part (string)
//Returns: array of all the available shape options for the part
function getPartOptions(part){
    $("#draw_functions").triggerHandler('getZoneShapes',part);
    var options = $("#draw_functions").data("zoneShapes");
    return options;
}

//Input: avatar part (string)
//Returns: bounding box for that part (left part if two)
// TODO: DOES NOT WORK
function getBoundingBox(part){
    $("#draw_functions").triggerHandler('getBoundingBox',part);
    var bb = $("#draw_functions").data("BB");
    return bb;
}

//returns true if they have selected boy or girl
function hasStarted(){
    return $("#draw_functions").data("start");
}

//returns picked gender (boys or girls)
function getGender(){
    return $("#draw_functions").data("gender");
}

//returns PNG of present avatar
function getPNG(){
    $('#svga-canvas').attr({width: 400, height: 400});
	var svg = $('#svga-svgmain').html();
	svg = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="400px" height="400px" xlink="http://www.w3.org/1999/xlink" style="overflow:hidden!important;"><g id="svga-group-wrapper" transform="scale(' + 400/200 + ' ' + 400/200 + ')">' + svg.replace(/<svg(.*?)>/, '').replace(/<g id(.*?)>/, '').replace(/data-(.*?)\"(.*?)\"/g, '').replace(/   /g, ' ').replace(/  /g, ' ').replace(/  /g, ' ');
	var canvas = document.getElementById('svga-canvas');
	canvg(canvas, svg, { ignoreMouse: true, ignoreDimensions: true });
    var img = canvas.toDataURL("image/png");
    
    return img;
}

///######### DRAW FUNCTIONS ##############

//Input: avatar part (string) (ex: "Mouth","Nose","etc")
//       and give it which index (integer) out of the options to draw 
//       (ex: index 0,1,2,... from getPartOptions(...))
//Redraws entire face with new feature
function drawFeature(part, part_number){
    $("#draw_functions").trigger('drawFeature',[part, part_number]);
}

//Input: avatar part (string)
//Changes the part which is active (color and other transformations affect this area)
function changeActivePart(part){
    $("#draw_functions").trigger('changeZone',part);
}

//Input: part from avatar_recognition.js (maps to svg-avatar)
//Returns list from above to draw right color palette
function getSketchPart(face_part){
    if(face_part == "Face"){
        return 'faceshape'
    }else if(face_part == "Nose"){  
        return 'nose'
    }else if(face_part == "Eyebrows"){  
        return 'eyebrows'
    }else if(face_part == "Eyes"){  
        return 'eyesiris'
    }else if(face_part == "Mouth"){  
        return 'mouth'
    }else if(face_part == "Ears"){  
        return 'ears'
    }else if(face_part == "Hair"){  
        return 'hair'
    }else if(face_part == "Mustache"){  
        return 'mustache'
    }else if(face_part == "Beard"){  
        return 'beard'
    }else if(face_part == "Glasses"){  
        return 'glasses'
    }else if(face_part == "Clothes"){  
        return 'clothes'
    }else if(face_part == "Background"){  
        return 'backs'
    }else if(face_part == "Other Lines"){  
        return 'NOT VALID'
    }
}

//Randomly draws a avatar of selected gender
function randomAvatar(){
    $("#draw_functions").trigger('randomAvatar');
}

//@@@ TRANSLATE TRANSFORMATIONS

//Input: avatar part (string)
//Moves this part Down one jump
function moveDown(part){
    $("#draw_functions").trigger('moveDown',part);
}

//Input: avatar part (string)
//Moves this part Up
function moveUp(part){
    $("#draw_functions").trigger('moveUp',part);
}

//Input: avatar part (string)
//Moves this part Left
function moveLeft(part){
    $("#draw_functions").trigger('moveLeft',part);
}

//Input: avatar part (string)
//Moves this part Right
function moveRight(part){
    $("#draw_functions").trigger('moveRight',part);
}

//@@@ SCALING TRANSFORMATIONS

//Input: avatar part (string)
//Expands this part (x and y)
function expand(part){
    $("#draw_functions").trigger('zoomIn',part);
}

//Input: avatar part (string)
//Shrinks this part (x and y)
function shrink(part){
    $("#draw_functions").trigger('zoomOut',part);
}

//Input: avatar part (string)
//Widens this part along x-axis
function widen(part){
    $("#draw_functions").trigger('widen',part);
}

//Input: avatar part (string)
//Shrinks this part along x-axis
function tighten(part){
    $("#draw_functions").trigger('tighten',part);
}

//@@@ EYEBROW SPECIFIC CODE

//Input: integer from 0-4
//Rotates Eyebrows to show different affect:
//  0: default (flat)
//  1: both rotated clockwise
//  2: both rotated counter-clockwise
//  3: tilted towards nose (angry-like)
//  4: tilted away from nose 
function eyebrows_transform(n){
    console.log("Eyebrow configuration: "+n);
    switch(n){
        case 0:
            $("#draw_functions").trigger('eyebrows_cancel');
            break;
        case 1:
            $("#draw_functions").trigger('eyebrows_1');
            break;
        case 2:
            $("#draw_functions").trigger('eyebrows_2');
            break;
        case 3:
            $("#draw_functions").trigger('eyebrows_3');
            break;
        case 4:
            $("#draw_functions").trigger('eyebrows_4');
            break; 
    }
}

//@@ TRANSFORM ENTIRE AVATAR

function tiltHeadLeft(){
    $("#draw_functions").trigger('tiltHeadLeft');
}
function tiltHeadRight(){
    $("#draw_functions").trigger('tiltHeadRight');
}

// can add:
//  zoom
//  shift left/right up/down
//  ask if you want these
