angular.module("serialGenerator", []);

angular.module('serialGenerator').provider('serialGenerator', function () {

	var _length = 20;

	this.setLength = function (length) {
		_length = length;
	}

	//é o que realmente será invocado(criado)
	this.$get = function () {
		return {
			generate: function() {
				var serial = '';
				while (serial.length < _length) {
					serial += String.fromCharCode(Math.floor(Math.random() * 64) + 32);
				}
				return serial;
			}
		}
	}	
});