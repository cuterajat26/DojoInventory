define(["dijit/form/TextBox","dijit/form/SimpleTextarea","dijit/form/CheckBox"],
	function(TextBox,TextArea,CheckBox){

		var AutogenPropertyTypeMap = function(){

		};

	var config = {
		"string":[TextBox,TextArea],
		"number":[TextBox,TextArea],
		"boolean":[CheckBox],
		"image":["Image"]

	};
	AutogenPropertyTypeMap.getDijitForType = function(type){

		return config[type];
	};

	return AutogenPropertyTypeMap;
	});




