var box1;
var background;
var score;
var running;
var obstacles;
var obstacleSpeed;
var spawnTick;
var scoreCount;

var game_drag;
var game_drag_offX;
var starfield;


//== Initialize Game Elements==\\
function game_init(){
	box1=box_gameBox();

	background=box_construct(stageBorders.right,stageBorders.bot,0x060606);
	//background=ImageBitmap.createImageBitmap();
	starfield=starfield_construct({width:stageBorders.right,height:stageBorders.bot});
	score=new PIXI.Text("v1.2",{
			fill:"0xffffff"
		});

	obstacles=new Array();

	app.stage.addChild(background);
	app.stage.addChild(starfield);

	app.stage.addChild(box1);
	app.stage.addChild(score);

	app.ticker.add(game_onTick);

	running=false;
	app.stage.addChild(window_construct_start(startGame));

	//var _button=button_constructBasic("spawn",function(){NO_SPAWN=!NO_SPAWN});
	var _button=button_clearButton(function(){NO_SPAWN=!NO_SPAWN});
	_button.x=50;
	_button.y=0;
	app.stage.addChild(_button);
	_button=button_clearButton(function(){NO_STARS=!NO_STARS});
	//_button=button_constructBasic("stars",function(){NO_STARS=!NO_STARS});
	_button.x=260;
	_button.y=0;
	app.stage.addChild(_button);
	//_button=button_constructBasic("engine",function(){NO_FIREWORKS=!NO_FIREWORKS});
	_button=button_clearButton(function(){NO_FIREWORKS=!NO_FIREWORKS});
	_button.x=470;
	_button.y=0;
	app.stage.addChild(_button);
}

//== Start/Stop the Game ==\\
function restartGame(){
	startGame();
}

function startGame(){
	box1.y=stageBorders.bot*3/4;
	box1.x=stageBorders.right/2-box1.width/2;
	box1.visible=true;
	running=true;
	obstacleSpeed=OBSTACLE_SPEED_START;
	spawnTick=OBSTACLE_SPAWN;
	scoreCount=0;
	while(obstacles.length>0){
		game_removeObstacle(0);
	}
}

function game_lose(){
	running=false;
	app.stage.addChild(window_construct_lose(startGame));
	box1.visible=false;
	if (!NO_FIREWORKS) firework_constructor({x:box1.x+box1.width/2,y:box1.y+box1.height/2,color:0x3366ff});
}

//==Primary Game Loop==\\
function game_onTick(){
	if (!running) return;

	obstacleSpeed+=OBSTACLE_SPEED_TICK;
	
	game_tickSpawner(obstacleSpeed);
	game_updateScore(obstacleSpeed);
	game_updateMovement(obstacleSpeed);
	game_updateSprites(obstacleSpeed);
	if (!NO_STARS) starfield.tick(obstacleSpeed);
}

function game_updateMovement(_tick){
	//box1.pullTo(mouse.x,DRIFT_TO_Y); // Mouse Controls
	/*if (interactionMode=="mobile"){
		if (mouse.down){
			if (mouse.x<stageBorders.right/2){
				box1.vX-=PHYSICS_ACCEL*50;
			}else{
				box1.vX+=PHYSICS_ACCEL*50;
			}
		}
		box1.vY+=PHYSICS_ACCEL*(DRIFT_TO_Y-box1.y-box1.height/2);*/
	//}else{
		if (keyStates.left){
			box1.vX-=PHYSICS_ACCEL*50;
		}else if (keyStates.right){
			box1.vX+=PHYSICS_ACCEL*50;
		}
		box1.vY+=PHYSICS_ACCEL*(DRIFT_TO_Y-box1.y-box1.height/2);
//	}
	
}

function game_updateSprites(_tick){
	box1.update();
	game_makeTrail(box1);

	for (var i=0;i<obstacles.length;i+=1){
		obstacles[i].y+=obstacleSpeed;
		obstacles[i].x+=obstacles[i].vX;
		obstacles[i].vX*=PHYSICS_FRICTION;
		if (obstacles[i].y>stageBorders.bot){
			game_removeObstacle(i);
		}else{
			box1.hitTestAndStop(obstacles[i]);
		}
	}

	var _collision=box1.hitTestBorders(stageBorders);
	if (_collision!=null && _collision.direction==3){
		 game_lose();
	}

	if (game_drag!=null){

		//game_drag.x=mouse.x+game_drag_offX;
		game_drag.vX+=PHYSICS_OBS_ACCEL*(mouse.x+game_drag_offX-game_drag.x);
		game_drag.vX=Math.min(PHYSICS_OBS_MAX_V,Math.max(-PHYSICS_OBS_MAX_V,game_drag.vX));

		if (!mouse.down) game_drag=null;
	}
}

function game_makeTrail(_obj){
	var _tColor=0x33+Math.floor(0x66*Math.random());
	if (!NO_FIREWORKS) firework_constructor({
		x:_obj.x+_obj.width/2-2,
		y:_obj.y+_obj.height,
		numParts:1,
		startVY:-2,
		fade:0.05,
		gravity:0,
		color:0x0000ff+_tColor*0x000100+_tColor*0x010000,
	});
}

function game_updateScore(_tick){
	scoreCount+=obstacleSpeed;
	scoreCount=Math.round(scoreCount)
	score.text=scoreCount;
}

function game_tickSpawner(_tick){
	spawnTick+=_tick;
	if (spawnTick>=OBSTACLE_SPAWN){
		spawnTick=0;
		game_addObstacle();
	}
}

//== Object Functions ==\\

function game_addObstacle(){
	if (NO_SPAWN) return; 
	switch(Math.floor(Math.random()*5)){
		case 0: _obstacle=box_obstacleBox(game_tilesToPixels(Math.floor((1+Math.random())*TILES_ACROSS)/2),0x00ff00);
				game_makeObstacleDraggable(_obstacle);
				break;

		default: var _obstacle=box_obstacleBox(game_tilesToPixels(Math.floor((1+Math.random())/2*TILES_ACROSS)/2));
	}

	switch(Math.floor(Math.random()*6)){
		case 0: _obstacle.x=0; break;
		case 1: _obstacle.x=stageBorders.right-_obstacle.width; break;

		default: _obstacle.x=Math.floor(Math.random()*(stageBorders.right-_obstacle.width)/TILE_WIDTH*2)*TILE_WIDTH/2;
	}
	
	app.stage.addChild(_obstacle);
	obstacles.push(_obstacle);
}

function game_removeObstacle(i){
	if (game_drag===obstacles[i]) game_drag=null;
	obstacles[i].destroy();
	obstacles.splice(i,1);
}

function game_makeObstacleDraggable(_obstacle){
	_obstacle.interactive=true;
	_obstacle.buttonMode=true;
	_obstacle.on("pointerdown",function(){
		if (mouse.x<_obstacle.x+_obstacle.width/2){
			_obstacle.vX=30;
		}else{
			_obstacle.vX=-30;
		}
		//game_drag=_obstacle;
		//game_drag_offX=game_drag.x-mouse.x;
	})
	_obstacle.on("pointerup",function(){
		//if (game_drag===_obstacle) game_drag=null
	})
}

function game_tilesToPixels(i){
	return i*TILE_WIDTH;
}