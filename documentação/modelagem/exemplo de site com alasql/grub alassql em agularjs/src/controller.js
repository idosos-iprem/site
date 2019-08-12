var app = angular.module("grub",["servico","enviar","enviar_acesso"])
app.controller("site",function($scope,servicos,http_alasql){
    
    $scope.insert = function(nome,chamada,modulo){
        servicos.adiconar(nome,chamada,modulo);
        http_alasql.enviar(modulo);
    }
});
app.controller("acesso",function($scope){

})