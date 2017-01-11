angular.module('listaTelefonica').factory('contatosAPI', function($http, config, serialGenerator) {

	console.log(serialGenerator.generate());
	
	var _getContatos = function() {
		return $http.get(config.baseUrl + '/contatos');
	}

	var _getContato = function(id) {
		return $http.get(config.baseUrl + '/contatos/' + id);
	}

	var _save = function (contato) {
		return $http.post(config.baseUrl + '/contatos', contato);
	}

	return {
		getContatos: _getContatos,
		getContato: _getContato,
		save: _save
	}
});