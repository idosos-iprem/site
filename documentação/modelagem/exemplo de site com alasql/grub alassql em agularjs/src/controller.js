var app = angular.module("grub",["servico","enviar","acesso","rsa"])
app.controller("site",function($scope,servicos,http_alasql,$window){
    $scope.insert = function(nome,chamada,modulo){

        console.log(a);
        // servicos.adiconar(nome,chamada,modulo);
        // http_alasql.enviar(modulo,"127.0.0.1");
        
    }
    $scope.show = true;
    $scope.dados_recebidos = function(){
        var chave =$window.localStorage["chaves"];
        if(chave == null ||chave == undefined || chave ==""){
            $scope.show = false;
        }
        else{
            var valores = JSON.parse(chave);
            http_alasql.descriptografia(valores.chave,valores.mod,valores.chave2)
        }
       
    }

});
app.controller("portal",function($scope,dados,criptografia){
$scope.enviar = function(x,y){
    var s = dados.ip(1,0);
   criptografia.validar(s,x,y);
   
}
})