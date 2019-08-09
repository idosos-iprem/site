var app = angular.module("grub",["servico","enviar"])
app.controller("programa2",function($scope,servicos,http_alasql){
    
    $scope.insert = function(nome,chamada,modulo){
        servicos.adiconar(nome,chamada,modulo);
        http_alasql.enviar(modulo);
    }
});