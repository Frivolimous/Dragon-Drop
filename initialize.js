
//== Main Initialization ==\\
try{
	document.createEvent("TouchEvent");
	interactionMode="mobile";
	STAGE_WIDTH=window.innerWidth;
	STAGE_HEIGHT=window.innerHeight;
}catch(e){
	interactionMode="keyboard";
}
var app = new PIXI.Application(STAGE_WIDTH,STAGE_HEIGHT,{backgroundColor:0x000000});
document.getElementById("game-canvas").append(app.view);

//== Initialize Variables for use ==\\
var mouseObjects=new Array();

var mouse={x:0,y:0,down:false};
var keyCodes={left:"a",right:"d"};
var keyStates={left:false,right:false};
var NO_SPAWN=false;

//keybard, mobile, mouse

var interactionMode="keyboard";

var stageBorders=collision_rect(0,0,STAGE_WIDTH,STAGE_HEIGHT);

//== Initialize Supporting Structures ==\\

app.stage.interactive=true;
/*app.stage.on("mousedown",onMouseDown);
app.stage.on("mouseup",onMouseUp);
*///app.ticker.add(resetMouse);

window.addEventListener("keydown",onKeyDown)
window.addEventListener("keyup",onKeyUp)
window.addEventListener("pointerdown",onMouseDown);
window.addEventListener("pointerup",onMouseUp);
window.addEventListener("pointermove",onMouseMove);
//== Initialize the game after everything is setup ==\\
game_init();


//== Utility Functions ==\\
// (Call These)
function trace(_text){
	console.log(_text);
}

function traceProperties(obj){
	for (var a in obj){
		trace(a);
	}
}

//== Support Functions ==\\
// (Don't Call These)

function resetMouse(){
	//mouseDown=false;
}
function onMouseDown(e){
	//trace(e.pointerId);
	if (interactionMode=="keyboard") return;
	var mouseObject=mouseObject_constructor();
	mouseObject.id=e.pointerId;
	mouseObject.down=true;
	if (e.x<stageBorders.right/2){
		mouseObject.key="a";
	}else{
		mouseObject.key="d";
	}
	for (var i=0;i<mouseObjects.length;i+=1){
		if (mouseObjects[i].key==mouseObject.key) return;
	}
	onKeyDown(mouseObject);
	mouseObjects.push(mouseObject);
	mouse.down=true;

	//trace(e.target.cursor=="pointer");
//	traceProperties(e);
//	trace(e.type);
}

function onMouseUp(e){
	if (interactionMode=="keyboard") return;
	for (var i=0;i<mouseObjects.length;i+=1){
		if (mouseObjects[i].id==e.pointerId){
			onKeyUp(mouseObjects[i]);
			mouseObjects.splice(i,1);
			return;
		}
	}
	mouse.down=false;
}

function onMouseMove(e){
	mouse.x=e.x;
	mouse.y=e.y;
	//	trace(i);
	
	//trace(e.list);
}

function onKeyDown(e){
	switch(e.key){
		case keyCodes.left: keyStates.left=true; break;
		case keyCodes.right: keyStates.right=true; break;
		case "p": NO_SPAWN=!NO_SPAWN; break;
	}
	//traceProperties(e);
	//trace(e.key);
	//trace("key pressed")
}

function onKeyUp(e){
	switch(e.key){
		case keyCodes.left: keyStates.left=false; break;
		case keyCodes.right: keyStates.right=false; break;
	}
}

function mouseObject_constructor(){
	var m={
		id:0,
		x:0,
		y:0,
		down:false,
		key:0
	}

	return m;
}

//var key={};
//key.code=keyCode;