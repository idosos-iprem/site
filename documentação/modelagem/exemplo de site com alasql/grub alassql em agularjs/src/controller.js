var app = angular.module("grub",["servico","enviar","acesso","rsa"])
app.config(function($httpProvider) {
    
    $httpProvider.defaults.useXDomain = true;

    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
  });
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
                    var caminho = $window.location.href.replace("www/site.html","www/index.html");
                     $window.location.replace(caminho);
                }
                else{
                    
                    var valores = JSON.parse(chave);
                    $window.localStorage.clear();
                    $scope.ip = http_alasql.numeros_criptograficos(valores.chave,valores.chave2,valores.mod);
    
                }
            }catch(e)
            {
                $window.localStorage.clear();
            }
        },50)
       
       
       
    }

});
app.controller("portal",function($scope,dados,criptografia){
    $scope.disabled = false;
    $scope.count = 1;
$scope.enviar = function(x,y){
   
    var s = dados.ip(1,0);
   criptografia.validar(s,x,y)
  
    if($scope.count ==3){
        $scope.disabled =true;
        $scope.alerta = "Atulize-se a pagina novamente";
    } 
    else{
        $scope.count++;
        $scope.alerta = "Login ou senha invalidos"; 

    } 
}
})