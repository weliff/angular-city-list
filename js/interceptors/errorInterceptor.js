angular.module('listaTelefonica').factory('errorInterceptor', function ($q, $location) {
	return {
		responseError: function (rejection) {
			if(rejection.status === 404) {
				$location.path('/error');
			}
			//$q trabalha com promises/deffered. Aqui estou rejeitando minha promise http
			return $q.reject(rejection);
		}
	}
});