angular.module('ui').directive('uiTelefone', function () {
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, ctrlNgModel) {
			var _formatTelefone = function(value) {
				value = value.replace(/[^0-9]+/g, '');
				if (value.length > 4) {
					if(value.length < 9){
						value = value.substring(0, 4) + '-' + value.substring(4);
					} else {
						value = value.substring(0, 5) + '-' + value.substring(5, 9);
					}
				}
				return value;
			}

			element.bind('keyup', function() {
				ctrlNgModel.$setViewValue(_formatTelefone(ctrlNgModel.$viewValue));
				ctrlNgModel.$render();
			});
		}
	}		
});