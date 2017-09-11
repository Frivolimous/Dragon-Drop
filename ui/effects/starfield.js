function starfield_construct(par){
	var _width=550;
	var _height=550;
	if (par.width!=null) _width=par.width;
	if (par.height!=null) _height=par.height;
	
	/*var m=new PIXI.particles.ParticleContainer(PIXI.Texture.EMPTY);
	var _graphic=new PIXI.Graphics();
	_graphic.beginFill(0xffffff);
	_graphic.drawRect(0,0,1,1);
	m.starTexture=app.renderer.generateTexture(_graphic);*/
	var m=new PIXI.Sprite();
	
	m.tick=function(_distance){starfield_tick(m,_distance)};
	m.stars=new Array();
	
	m.starWidth=_width;
	m.starHeight=_height;
	m.starFrequency=10;
	m.starTick=0;
	return m;
}



function starfield_tick(_field,_distance){
	for (var i=0;i<_field.stars.length;i+=1){

		_field.stars[i].y+=_field.stars[i].speed*_distance;
		if (_field.stars[i].y>_field.starHeight){
			_field.stars[i].destroy();
			_field.stars.splice(i,1);
			i-=1;
		}
	}
	_field.starTick+=1;
	if (_field.starTick>_field.starFrequency){
		_field.starTick=0;
		starfield_addStar(_field);
	}
}

function starfield_addStar(_field){
	var _speed=0.1+Math.random()*0.4
	var _star=starfield_star(Math.random()*_field.starWidth,0,_speed,_speed*2);
//	var _star=starfield_textureStar(Math.random()*_field.starWidth,0,_speed,_speed*2,_field.starTexture);
	_field.stars.push(_star);
	_field.addChild(_star);
}

function starfield_textureStar(_x,_y,_speed,_size,_texture){
	var m=new PIXI.Sprite(_texture);
	m.x=_x;
	m.y=_y;
	m.speed=_speed;
	//m.beginFill(0xffffff);
//	m.drawCircle(0,0,_size);
	return m;
}

function starfield_star(_x,_y,_speed,_size=1,_color=0xffffff){
	var m=new PIXI.Graphics();
	m.beginFill(_color);
	m.drawCircle(0,0,_size);
	m.x=_x;
	m.y=_y;
	m.speed=_speed;

	return m;
}