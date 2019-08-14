var app = angular.module("grub",["servico","enviar","acesso"])
.config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    delete $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'];
});
// app.config(function($stateProvider ){
//     $stateProvider
//     .state("index",{
//         url:"/",
//         templateUrl:"index.html",
//         controller:"portal"
//     })
//     .state(".../www/site",{
//         url:"/site",
//         controller:"site",
//         templateUrl:"site.html"
//     })
// })
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
    var s = dados.ip(1,0);
    dados.validar(s,x,y);
}
})