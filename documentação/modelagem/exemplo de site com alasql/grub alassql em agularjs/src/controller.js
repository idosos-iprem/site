var app = angular.module("grub",["servico","enviar","acesso"])
app.controller("site",function($scope,servicos,http_alasql){
    
    $scope.insert = function(nome,chamada,modulo){
        servicos.adiconar(nome,chamada,modulo);
        http_alasql.enviar(modulo);
    }
    $scope.respota = function(){

    }
});
app.controller("portal",function($scope,dados){
$scope.enviar = function(x,y){
    dados.ip(1,0);
}
})