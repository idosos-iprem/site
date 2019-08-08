var app = angular.module("grub",["servico"])
app.controller("programa2",function($scope,servicos){
    $scope.listar = function(){
        servicos.select();
    }
    $scope.insert = function(){
        servicos.adiconar();
    }
});