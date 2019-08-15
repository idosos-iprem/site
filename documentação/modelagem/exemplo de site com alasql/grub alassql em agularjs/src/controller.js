var app = angular.module("grub",["servico","enviar","acesso","rsa",'ui.router'])
// app.config(function($stateProvider){
//     var index = {
//         name: 'index',
//         url: '/index',
//         templateUrl: window.location.pathname,
//         controller:"portal",
//       }
    
//       var site = {
//         name: '/sites',
//         url:"/sites",
//         params: {
//             chave1: null,
//             mod:null,
//             chave2:null,
//         },   
//         templateUrl:document.location.href.replace("www/index.html","www/site.html"),  
//         controller:"site",
//         controllerAs:"vm"
//       }
    
//       $stateProvider.state(index);
//       $stateProvider.state(site);
// });
app.controller("site",function($scope,servicos,http_alasql,$state,$rootScope){
    var vm = this;
    $scope.insert = function(nome,chamada,modulo){
        // console.log($rootScope.$on);
        // $rootScope.$on('$stateChangeSuccess', 
        // function(event, unfoundState, fromState, fromParams){ 
        //     console.log(unfoundState.to); // "lazy.state"
        //     console.log(unfoundState.toParams); // {a:1, b:2}
        //     console.log(unfoundState.options); // {inherit:false} + default options
      
        // })
        servicos.adiconar(nome,chamada,modulo);
        http_alasql.enviar(modulo);
        
    }

});
app.controller("portal",function($scope,dados,criptografia){
$scope.enviar = function(x,y){
    var s = dados.ip(1,0);
   var x = criptografia.validar(s,x,y);
    console.log(x);
}
})