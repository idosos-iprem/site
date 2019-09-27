var app = angular.module("grub",["servico","enviar","acesso","rsa","datas"])
app.config(function($httpProvider) {
    
    $httpProvider.defaults.useXDomain = true;

    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
  });
app.controller("site",function($scope,servicos,http_alasql,$window,$timeout,dia){
    $scope.sair = function(){
        var caminho = $window.location.href.replace("www/site.html","www/index.html");
        $window.location.replace(caminho);
    }
    $scope.insert = function(nome,chamada,modulo){
       
        servicos.adiconar(nome,chamada,modulo);
        http_alasql.enviar(modulo,$scope.ip);
        $scope.nome = null;
        $scope.chamada = null;
        $scope.tipo_turma = null;
        
    }
    $scope.enable_lista = function(){
        $scope.lista = true;
        $scope.Adicionar = false;
        $scope.Pesquisar = false;
        $scope.date = false;
        $scope.canvas = false;
        $scope.texto = false;

    }
    $scope.enable_adicionar = function(){
        $scope.lista = false;
        $scope.Adicionar = true;
        $scope.Pesquisar = false;
        $scope.date = false;
        $scope.canvas = false;
        $scope.texto = false;
        
    }
    $scope.date = false;
    $scope.canvas = false;
    $scope.enable_Pesquisar = function(){
        $scope.lista = false;
        $scope.Adicionar = false;
        $scope.Pesquisar = true;
        $scope.date = false;
        $scope.canvas = true;
        $scope.texto = true;
        servicos.exiber_dados($scope.ip,"Primeiro_modulo_primeiro").then(r=>{
            var presente  = r.presente;
            var falta = r.falta;
            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    label: ["Primeiro_modulo_primeiro"],
                    datasets: [{
                        data: [
                            presente,
                            falta
                        ],
                        backgroundColor: [
                            window.chartColors.blue,
                            window.chartColors.red
                        ],
                       }],
                        labels:["presente:","falta:"]},
                options: {
                            title:{
                                display: true,
                                text:"Primeiro_modulo_primeiro",
                                 position: 'top'
                            }
                        }
                })
            })
            servicos.exiber_dados($scope.ip,"Primeiro_modulo_segundo").then(r=>{
                var presente  = r.presente;
                var falta = r.falta;
                var ctx = document.getElementById('myChart2').getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        label: ["Primeiro_modulo_segundo"],
                        datasets: [{
                            data: [
                                presente,
                                falta
                            ],
                            backgroundColor: [
                                window.chartColors.blue,
                                window.chartColors.red
                            ],
                           }],
                            labels:["presente:","falta:"]},
                    options: {
                                title:{
                                    display: true,
                                    text:"Primeiro_modulo_segundo",
                                     position: 'top'
                                }
                            }
                         
                    })
                })
                servicos.exiber_dados($scope.ip,"segundo_modulo").then(r=>{
                    var presente  = r.presente;
                    var falta = r.falta;
                    var ctx = document.getElementById('myChart3').getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'pie',
                        data: {
                            label: ["segundo_modulo"],
                            datasets: [{
                                data: [
                                    presente,
                                    falta
                                ],
                                backgroundColor: [
                                    window.chartColors.blue,
                                    window.chartColors.red
                                ],
                               }],
                                labels:["presente:","falta:"]},
                        options: {
                                    title:{
                                        display: true,
                                        text:"segundo_modulo",
                                         position: 'top'
                                    }
                                }
                             
                        })
                    })

        }

    $scope.date = false;
    $scope.visualizar = function(){
        $scope.date = true;
        $scope.data_informata = null;
        $scope.numero = null;
        $scope.escolher_turma = null; 
    }
    $scope.adicionar_elemento = function(){
        $scope.remover = true;
        dia.criar_elenentos();
    }
    $scope.salvar_inicial_final = function(inical,final){
        servicos.salvar(inical,final,$scope.ip);
        $scope.link_adicionar = false;
        $scope.Adicionar = false;
        $scope.inicial = null;
        $scope.final = null;
    }
    $scope.remover = false;
    $scope.remover_elemento = function(){
        dia.remove_elementos();
    }
    $scope.deletar = function(data,id,turma){
        servicos.deletar_dados(data,id,turma,$scope.ip);
        $scope.data_informata = null;
        $scope.numero = null;
        $scope.escolher_turma = null; 
    }
    $scope.link_adicionar = true;
    $scope.listar_por_escolha =  function(){
        servicos.listar_data($scope.escolher_data,$scope.ip,$scope.turma_escolhida);
    }
    $scope.dados_recebidos = function(){
        $timeout(resp=>{
            try{
                
                var chave =$window.localStorage["chaves"];
                if(chave == null ||chave == undefined || chave ==""){
                    $window.localStorage.clear();
                    
                    var caminho = $window.location.href.replace("www/site.html","www/index.html");
                     $window.location.replace(caminho);
                }
                else{
                    
                    var valores = JSON.parse(chave);
                    $window.localStorage.clear();
                    $scope.ip = http_alasql.numeros_criptograficos(valores.chave,valores.chave2,valores.mod);
                    servicos.verificar_data($scope.ip).then(p=>{
                        if(p != "não existe")
                        {
                             document.getElementsByClassName("aulas")[0].remove();

                        }
                    })
                    
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