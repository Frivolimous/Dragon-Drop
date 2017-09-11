function button_constructBasic(_label,_function){
	var m=uiElement_constructor({
		label:_label,
		width:200,
		height:50,
		clickFunction:_function,
		//x:50,
		//y:50,
		bgColor:0x8080ff
	});
	m.buttonMode=true;
	return m;
}

function button_clearButton(_function){
	var m=uiElement_constructor({
		bgColor:0x00ff00,
		clickFunction:_function,
		alpha:0.05,
		width:190,
		height:50
	});
	m.buttonMode=true;
	return m;
}