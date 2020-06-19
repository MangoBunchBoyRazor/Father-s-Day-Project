//Functions for creating the dad creation screen
function saveDrawing(){
    let inp = elements[2];
    if(inp.value()){
        database.ref('drawings/'+inp.value()).set({
            name: inp.value(),
            drawing: drawingArr
        });
    }
}
function create(){
    let inp = createInput();
    let canvas2 = createGraphics(350,350);
    let saveBtn = createButton('Save');
    let clearBtn = createButton('Clear');
    let colorPicker = createColorPicker('black');
    let slider = createSlider(1,20,3,1);
    inp.position(350,150);
    saveBtn.position(50,335);
    clearBtn.position(50,385);
    colorPicker.position(50,265);
    slider.position(50,310);
    inp.class('inpClass');
    inp.style('width','135');
    inp.input(searchKeysForDad);
    canvas2.background(0);
    clearBtn.class('button');
    saveBtn.class('button');
    clearBtn.mouseClicked(function(){drawingArr = [];});
    saveBtn.mouseClicked(saveDrawing);
    drawingArr = [];
    drawingArr2 = []
    currentPath = [];
    isDrawing = false;
    elements.push(inp,canvas2,clearBtn,saveBtn,colorPicker,slider);
}
function update(){
    let canvas2 = elements[3];
    image(canvas2,width/2-175,225);
    if(isDrawing)
        currentPath.points.push({x:mouseX-225,y:mouseY-225});
    canvas2.background(200,200,200);
    canvas2.noFill();
    for(i = 0; i < drawingArr.length; i++){
        canvas2.beginShape();
        for(j = 0; j < drawingArr[i].points.length; j++){
            let color = drawingArr[i].color.levels;
            canvas2.stroke(color[0],color[1],color[2]);
            canvas2.strokeWeight(drawingArr[i].strokeWeight);
            canvas2.vertex(drawingArr[i].points[j].x,drawingArr[i].points[j].y);
        }
        canvas2.endShape();
    }
}
function drawPath() {
    isDrawing = true;
    currentPath = {
        color: elements[6].color(),
        strokeWeight: elements[7].value(),
        points: []
    };
    drawingArr.push(currentPath);
}
function getDrawingData(data){
    drawingData = data;
    if(data.val())
        drawingKeys = Object.keys(data.val());
    if(gameState == "start")
        elements[2].elt.disabled = false;
}
function searchKeysForDad(){
    let inp = elements[2];
    drawingArr = [];
    for(i = 0; i < drawingKeys.length; i++){
        if(inp.value() == drawingKeys[i]){
            drawingArr = (drawingData.val()[drawingKeys[i]].drawing);
            return true;
        }
    }
    return false;
}