angular.module('listaTelefonica').controller("novoContatoCtrl", ['$scope', 'contatosAPI', 'serialGenerator', 
		'$location', 'operadoras', function(scope, contatosAPI, serialGenerator, location, operadoras) {

	//operadoras é um objeto de transporte que o resultado do resolve com informaçoes de status, dados, etc
	scope.operadoras = operadoras.data;

	scope.adicionarContato = function (contato) {
		contato.data = new Date();
		contato.serial = serialGenerator.generate();
		contatosAPI.save(contato).success(function(data) {
			delete scope.contato;
			scope.contatoForm.$setPristine();
			location.path('/contatos')
		});
	};

}]);