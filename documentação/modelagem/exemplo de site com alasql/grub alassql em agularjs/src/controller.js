var app = angular.module("grub",["servico","enviar","acesso","rsa"])
app.controller("site",function($scope,servicos,http_alasql,$window){
    $scope.insert = function(nome,chamada,modulo){

        servicos.adiconar(nome,chamada,modulo);
        http_alasql.enviar(modulo,$scope.ip);
        
    }
    $scope.show = true;
    $scope.dados_recebidos = function(){
        var chave =$window.localStorage["chaves"];
        if(chave == null ||chave == undefined || chave ==""){
            $window.localStorage.clear();
            $scope.show = false;
        }
        else{
            
            var valores = JSON.parse(chave);
            $window.localStorage.clear();
            $scope.ip = http_alasql.descriptografia(valores.chave,valores.mod,valores.chave2)
        }
       
    }

});
app.controller("portal",function($scope,dados,criptografia){
$scope.enviar = function(x,y){
    var s = dados.ip(1,0);
   criptografia.validar(s,x,y);
   
}
})