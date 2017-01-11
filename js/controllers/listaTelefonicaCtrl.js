angular.module('listaTelefonica').controller("listaTelefonicaCtrl", ['$scope', 'serialGenerator', 'contatos',
		function(scope, serialGenerator, contatos) {
	scope.app = 'Lista Telefonica';
	//scope.contatos = [
		// {nome: filter('uppercase')("Pedro"), data: new Date(), telefone: 99998888, cor: 'blue'},
		// {nome: uppercaseFilter("Ana"), data: new Date(), telefone: 99998877, cor: 'yellow'},
		// {nome: "Maria", data: new Date(), telefone: 99998866, cor: 'red'}
	//];

	var init = function () {
		calcularImpostos(scope.contatos)
		generateSerial(scope.contatos);

	}

	var calcularImpostos = function (contatos) {
		contatos.forEach(function (contato) {
			contato.operadora.precoComImposto = calcularImposto(contato.operadora.preco);
		});
	}

	var calcularImposto = function (preco) {
		var imposto = 1.2;
		return preco * imposto;
	}

	scope.contatos = contatos.data;

	var generateSerial = function (contatos) {
		contatos.forEach(function(contato) {
			contato.serial = serialGenerator.generate();
		});
	}

	scope.adicionarContato = function (contato) {
		contato.data = new Date();
		contatosAPI.save(contato).success(function(data) {
			carregarContatos();
			delete scope.contato;
			scope.contatoForm.$setPristine();
		});
	};

	scope.removerContato = function(contatos){
		scope.contatos = contatos.filter(function (contato) {
			return !contato.done;
		});
		scope.verificarContatoSelecionado(scope.contatos);

	};

	scope.verificarContatoSelecionado = function (contatos) {
		scope.hasContatoSelecionado = contatos.some(function (contato) {
			return contato.done;
		});
	};

	scope.ordernarPor = function(campo) {
		scope.criterioOrdenacao = campo;
		scope.direcaoOrdenacao = !scope.direcaoOrdenacao;
	}

	scope.reset = function () {
		scope.contatos = angular.copy(scope.contatos);
	}

	init();

}]);