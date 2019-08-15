var app = angular.module("grub",["servico","enviar","acesso","rsa","ngRoute"])
.config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    delete $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'];
});
app.config(function($routeProvider ){
    $routeProvider.when("/index",{
        templateUrl:"index.html",
        controller:"portal"
    }).when("/index:token",{
        templateUrl:"site.html",
        controller:"site"
    }).otherwise({
        redirecto:"/index"
    })
})
app.controller("site",function($scope,servicos,http_alasql,$routeParamas){
    
    $scope.insert = function(nome,chamada,modulo){
        $scope.x = "ok";
        servicos.adiconar(nome,chamada,modulo);
        http_alasql.enviar(modulo);
    }
    $scope.respota = function(){
        var paramentro = $routeParamas;
        if(paramentro != null){
            
        }
        else{

        }
    }

});
app.controller("portal",function($scope,dados,criptografia,$location){
$scope.enviar = function(x,y){
    var s = dados.ip(1,0);
    criptografia.validar(s,x,y);
    var a = $location;
    console.log(a);
}
})