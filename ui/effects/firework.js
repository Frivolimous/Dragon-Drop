var FIREWORK_GRAVITY=0.01;
var FIREWORK_FADE=0.01;
var FIREWORK_START_V_Y=1;
var FIREWORK_START_V_X=1;
var FIREWORK_NUM_PARTS=50;


var firework_particles=new Array();
var initialized=false;

function firework_init(div){
	if (div!=null){
		if (div.gravity!=null) FIREWORK_GRAVITY=div.gravity;
		if (div.fade!=null) FIREWORK_FADE=div.fade;
		if (div.startVY!=null) FIREWORK_START_V_Y=div.startVY;
		if (div.startVX!=null) FIREWORK_START_V_X=div.startVX;
		if (div.numParts!=null) FIREWORK_NUM_PARTS=div.numParts;
	}
	app.ticker.add(firework_fade);
	initialized=true;
}

function firework_constructor(div){
	if (!initialized) firework_init();

	if (div==null) div={};
	

	if (div.x==null) div.x=0;
	if (div.y==null) div.y=0;
	if (div.color==null) div.color=0xffffff;
	if (div.gravity==null) div.gravity=FIREWORK_GRAVITY;
	if (div.fade==null) div.fade=FIREWORK_FADE;
	if (div.startVX==null) div.startVX=FIREWORK_START_V_X;
	if (div.startVY==null) div.startVY=FIREWORK_START_V_Y;
	if (div.numParts==null) div.numParts=FIREWORK_NUM_PARTS;
	for (var i=0;i<div.numParts;i+=1){
		firework_particle(div);
	}
}

function firework_fade(){
	for (var i=0;i<firework_particles.length;i+=1){
		firework_particles[i].x+=firework_particles[i].vX;
		firework_particles[i].y+=firework_particles[i].vY;
		firework_particles[i].vY+=firework_particles[i].gravity;
		firework_particles[i].alpha-=firework_particles[i].fade;
		if (firework_particles[i].alpha<0.1){
			firework_particles[i].destroy();
			firework_particles.splice(i,1);
			i-=1;
		}
	}
}

function firework_particle(div){
	var m=new PIXI.Graphics();
	//m.beginFill(div.color);
	m.lineStyle(1,div.color);
	m.drawCircle(div.x,div.y,1+Math.random()*2);
	m.gravity=div.gravity;
	m.fade=div.fade;
	m.vX=Math.random()*div.startVX-div.startVX/2;
	m.vY=0-Math.random()*div.startVY;
//	m.alpha=0.7+0.3*Math.random();
	firework_particles.push(m);
	app.stage.addChild(m);
	return m;
}