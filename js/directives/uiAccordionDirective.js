angular.module('listaTelefonica').directive('uiAccordions', function () {
	return {
		controller: function ($scope, $element, $attrs) {
			var accordions = [];

			this.registerAccordion = function (accordion) {
				accordions.push(accordion);
			}

			this.closeAll = function () {
				accordions.forEach(function (accordion) {
					accordion.isOpen = false;
				});
			}	
		}
	}
});

angular.module('listaTelefonica').directive('uiAccordion', function () {
	return {
		templateUrl: 'view/accordion.html',
		scope: {
			title: '@',
		},
		transclude: true,
		require:'^uiAccordions',
		link: function (scope, element, attr, ctrl) {
			//definindo comportamento associando a lógica da diretiva
			ctrl.registerAccordion(scope)
			scope.open = function() {
				ctrl.closeAll();
				scope.isOpen = !scope.isOpen;
			}
		}
	}
});