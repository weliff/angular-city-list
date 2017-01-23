angular.module('listaTelefonica').controller("detalhesContatoCtrl", ['$scope', 'contato', 
	
	//$routeParams.id para pegar o param
	
	function (scope, contato) {
		scope.contato = contato.data;
	}


]);