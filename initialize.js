//== Main Initialization ==\\
var app = new PIXI.Application(STAGE_WIDTH,STAGE_HEIGHT,{backgroundColor:0x000000});
document.getElementById("game-canvas").append(app.view);

//== Initialize Variables for use ==\\
var mouse=app.renderer.plugins.interaction.mouse;
var stageBorders=collision_rect(0,0,STAGE_WIDTH,STAGE_HEIGHT);
var mouseDown;

//== Initialize Supporting Structures ==\\
app.stage.interactive=true;
/*app.stage.on("mousedown",onMouseDown);
app.stage.on("mouseup",onMouseUp);
*///app.ticker.add(resetMouse);
/*window.addEventListener("keydown",onKeyDown)
window.addEventListener("keyup",onKeyUp)*/
window.addEventListener("mousedown",onMouseDown);
window.addEventListener("mouseup",onMouseUp);

//== Initialize the game after everything is setup ==\\
game_init();


//== Utility Functions ==\\
// (Call These)
function trace(_text){
	console.log(_text);
}

//== Support Functions ==\\
// (Don't Call These)

function resetMouse(){
	//mouseDown=false;
}
function onMouseDown(){
	mouseDown=true;
}

function onMouseUp(){
	mouseDown=false;
}

function onKeyDown(){

	//trace("key pressed")
}

function onKeyUp(){

}

//var key={};
//key.code=keyCode;