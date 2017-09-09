const FIREWORK_GRAVITY=0.01;
const FIREWORK_FADE=0.01;
const FIREWORK_START_V_Y=1;
const FIREWORK_START_V_X=1;


var firework_particles=new Array();
var initialized=false;

function init(){
	app.ticker.add(firework_fade);
	initialized=true;
}

function firework_constructor(_x,_y,_color=0xf1abab){
	if (!initialized) init();
	var _par={
		x:_x,
		y:_y,
		color:_color
	}

	for (var i=0;i<Math.floor(Math.random()*300)+50;i+=1){
		firework_particle(_par);
	}
}

function firework_fade(){
	for (var i=0;i<firework_particles.length;i+=1){
		firework_particles[i].x+=firework_particles[i].vX;
		firework_particles[i].y+=firework_particles[i].vY;
		firework_particles[i].vY+=FIREWORK_GRAVITY;
		firework_particles[i].alpha-=FIREWORK_FADE;
		if (firework_particles[i].alpha<0.2){
			firework_particles[i].destroy();
			firework_particles.splice(i,1);
			i-=1;
		}
	}
}

function firework_particle(_par){
	var m=new PIXI.Graphics();
	m.beginFill(_par.color);
	m.drawCircle(_par.x,_par.y,Math.random()*3);
	m.vX=Math.random()*FIREWORK_START_V_X-FIREWORK_START_V_X/2;
	m.vY=0-Math.random()*FIREWORK_START_V_Y;
	firework_particles.push(m);
	app.stage.addChild(m);
	return m;
}