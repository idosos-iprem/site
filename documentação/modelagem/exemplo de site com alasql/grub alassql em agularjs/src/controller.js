var app = angular.module("grub",["servico","enviar","acesso","rsa",])

app.controller("site",function($scope,servicos,http_alasql,$window,$timeout){
    $scope.insert = function(nome,chamada,modulo){

        servicos.adiconar(nome,chamada,modulo);
        http_alasql.enviar(modulo,$scope.ip);
        
    }
    $scope.show = true;
    $scope.dados_recebidos = function(){
        $timeout(resp=>{
            try{
                var chave =$window.localStorage["chaves"];
                if(chave == null ||chave == undefined || chave ==""){
                    $window.localStorage.clear();
                    $scope.show = false;
                }
                else{
                    
                    var valores = JSON.parse(chave);
                    $window.localStorage.clear();
                    $scope.ip = http_alasql.numeros_criptograficos(valores.chave,valores.chave2,valores.mod);
    
                }
            }catch(e)
            {
                console.log(e);
                $window.localStorage.clear();
            }
        },500)
       
       
       
    }

});
app.controller("portal",function($scope,dados,criptografia){
$scope.enviar = function(x,y){
    var s = dados.ip(1,0);
   criptografia.validar(s,x,y);
   
}
})