/*
	INTERCEPTOR PARA BURLAR MECANISMOS DE CAST
*/
angular.module('listaTelefonica').factory('timestampInterceptor', function () {
	return {
		request: function (config) {
			var url = config.url;
			if(url.indexOf('view') > -1) return config
			config.url = url + '?timestamp=' + new Date().getTime(); 
			return config;
		}
	}
});