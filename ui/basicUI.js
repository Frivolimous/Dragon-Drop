function uiElement_constructor(_properties){
	//required: width, height
	//optional: bgColor, label, 
	//optional: clickFunction, clickRemove
	var m=new PIXI.Sprite();
	m.graphics=new PIXI.Graphics();
	m.addChild(m.graphics);
	if (_properties.bgColor==null){
		m.graphics.beginFill(0x808080);
	}else{
		m.graphics.beginFill(_properties.bgColor);
	}
	
	m.graphics.drawRect(0,0,_properties.width,_properties.height);
	if (_properties.label!=null){
		m.label=new PIXI.Text(_properties.label,{fill:0xffffff});
		m.label.x=_properties.width/15;
		m.label.y=_properties.height/15;
		m.addChild(m.label);
	}

	if (_properties.clickFunction!=null){
		m.interactive=true;
		m.clickFunction=_properties.clickFunction;
		m.on("pointerdown",m.clickFunction);
	}
	if (_properties.x!=null) m.x=_properties.x;
	if (_properties.y!=null) m.y=_properties.y;
	if (_properties.alpha!=null) m.alpha=_properties.alpha;
	return m;
}