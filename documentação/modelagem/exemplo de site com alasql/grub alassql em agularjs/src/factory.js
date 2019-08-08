class alasqlprograma{
    constructor(){
        alasql("create database if not exists exemplo")
       alasql("Create table if not exists teste1(number id ,string nome, number idade);");
    }
    listar_tabela(){
        var lista = alasql("select * from teste1");
       console.log(lista);
    }
    
    insert(){
       var a = alasql("insert into teste1 values(1,'kevin',12)");
       console.log(a);
    }
    
}
var servico = angular.module("servico",[])
servico.factory("servicos",function(){
    var alasql = new alasqlprograma();
    function listar_tudo(){
        alasql.listar_tabela();
    }
    function insert(){
        alasql.insert();
    }
   
    return{
        select:function(){
            listar_tudo();
        },
        adiconar:function(){
                insert();
        }
    }
})