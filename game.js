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



//== Initialize Game Elements==\\
function game_init(){
	box1=box_gameBox(0x0000ff);
	background=box_construct(stageBorders.right,stageBorders.bot,0x060606);

	score=new PIXI.Text("Something",{
			fill:"0xffffff"
		});

	obstacles=new Array();

	app.stage.addChild(background);
	app.stage.addChild(box1);
	app.stage.addChild(score);

	app.ticker.add(game_onTick);

	running=false;
	app.stage.addChild(window_construct_start(startGame));
}

//== Start/Stop the Game ==\\
function restartGame(){
	startGame();
}

function startGame(){
	box1.y=stageBorders.bot*3/4;
	box1.x=stageBorders.right/2-box1.width/2;
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
	firework_constructor(box1.x+box1.width/2,box1.y+box1.height/2);
}

//==Primary Game Loop==\\
function game_onTick(){
	if (!running) return;

	obstacleSpeed+=OBSTACLE_SPEED_TICK;
	
	game_tickSpawner(obstacleSpeed);
	game_updateScore(obstacleSpeed);
	game_updateSprites(obstacleSpeed);	
}

function game_updateSprites(_tick){
	box1.pullTo(mouse.global.x,DRIFT_TO_Y);
	box1.update();

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

		//game_drag.x=mouse.global.x+game_drag_offX;
		game_drag.vX+=PHYSICS_OBS_ACCEL*(mouse.global.x+game_drag_offX-game_drag.x);
		game_drag.vX=Math.min(PHYSICS_OBS_MAX_V,Math.max(-PHYSICS_OBS_MAX_V,game_drag.vX));

		if (!mouseDown) game_drag=null;
	}
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
	_obstacle.on("mousedown",function(){game_drag=_obstacle;game_drag_offX=game_drag.x-mouse.global.x;})
	_obstacle.on("mouseup",function(){if (game_drag===_obstacle) game_drag=null})
}

function game_tilesToPixels(i){
	return i*TILE_WIDTH;
}