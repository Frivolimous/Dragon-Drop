function window_construct_lose(_closeFunction){
	var m=uiElement_constructor({
		label:"Oh no you lost!\nTry again next time!\n\nFinal Score: "+scoreCount,
		width:400,
		height:400,
		//clickFunction:function(){removeThis(m)},
		x:50,
		y:50
		//bgColor:0x808080,
	});

	window_addCloseButton(m,_closeFunction);
	return m;
}

function window_construct_start(_closeFunction){
	var m=uiElement_constructor({
		label:"             Dragon Drop\n\nMove around but down touch\nthe ground!\nAnd you can drag the\ngreen blocks.",
		width:400,
		height:400,
		//clickFunction:function(){removeThis(m)},
		x:50,
		y:50
		//bgColor:0x808080,
	});

	window_addCloseButton(m,_closeFunction);
	return m;
}

function window_addCloseButton(_window,_closeFunction){
	var _button=button_constructBasic("Continue",function(){removeThis(_window),_closeFunction()})
	_window.addChild(_button);
	_button.x=90;
	_button.y=300;
}

function removeThis(_window){
	if (_window.parent!=null) _window.parent.removeChild(_window);
	_window.destroy();
}
