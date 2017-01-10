angular.module('ui', []);

angular.module('ui').run(function ($templateCache) {
	//podemos utilizar a biblioteca html2js
	$templateCache.put('view/accordion.html', '<div class="ui-accordion-title" ng-click="open()">{{title}}</div>' + 
		'<div class="ui-accordion-content" ng-transclude ng-show="isOpen"></div> ');
});

angular.module('ui').directive('uiAccordions', function () {
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

angular.module('ui').directive('uiAccordion', function () {
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