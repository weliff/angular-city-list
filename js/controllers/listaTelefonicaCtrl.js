angular.module('listaTelefonica').controller("listaTelefonicaCtrl", ['$scope', '$filter', 'uppercaseFilter', '$http', function(scope, filter, uppercaseFilter, http){
	scope.app = 'Lista Telefonica';
	scope.contatos = [
		// {nome: filter('uppercase')("Pedro"), data: new Date(), telefone: 99998888, cor: 'blue'},
		// {nome: uppercaseFilter("Ana"), data: new Date(), telefone: 99998877, cor: 'yellow'},
		// {nome: "Maria", data: new Date(), telefone: 99998866, cor: 'red'}
	];

	scope.operadoras = [];

	var carregarContatos = function () {
		scope.contatos = http.get('http://localhost:3412/contatos').success(function(data, status) {
			scope.contatos = data;
		});
	}

	var carregarOperadoras = function() {
		http.get('http://localhost:3412/operadoras').success(function (data, status) {
			scope.operadoras = data;
		}).error(function (data, status) {
			scope.message = 'Ocorreu um erro: ' + data;
		});
	}

	scope.adicionarContato = function (contato) {
		contato.data = new Date();
		http.post('http://localhost:3412/contatos', contato).success(function(data) {
			carregarContatos();
			delete scope.contato;
			scope.contatoForm.$setPristine();
		});
	};

	scope.removerContato = function(contatos){
		scope.contatos = contatos.filter(function (contato) {
			return !contato.done;
		});
	};

	scope.isContatoSelecionado = function (contatos) {
		return contatos.some(function (contato) {
			return contato.done;
		});
	};

	scope.ordernarPor = function(campo) {
		scope.criterioOrdenacao = campo;
		scope.direcaoOrdenacao = !scope.direcaoOrdenacao;
	}

	carregarContatos();
	carregarOperadoras();

}]);