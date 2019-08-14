var app = angular.module("grub",["servico","enviar","acesso","rsa","ngRoute"])
.config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    delete $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'];
});
// app.config(function($routeProvider ){
//     $routeProvider.when("/",{
//         templateUrl:"index.html"
//     }).when("/site",{
//         templateUrl:"site.html"
//     })
// })
app.controller("site",function($scope,servicos,http_alasql){
    
    $scope.insert = function(nome,chamada,modulo){
        $scope.x = "ok";
        servicos.adiconar(nome,chamada,modulo);
        http_alasql.enviar(modulo);
    }
    $scope.respota = function(){
        if($scope.x != null){
            
        }
    }
});
app.controller("portal",function($scope,dados,criptografia){
$scope.enviar = function(x,y){
    var s = dados.ip(1,0);
    criptografia.validar(s,x,y);
}
})