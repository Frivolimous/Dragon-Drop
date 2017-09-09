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