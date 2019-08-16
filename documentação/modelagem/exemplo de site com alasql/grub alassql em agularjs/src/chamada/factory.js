class alasqlprograma{
    constructor(){
        alasql("create database if not exists exemplo")
       alasql("Create table if not exists teste2(id number , nome string,  chamada string, nome_turma string);");
    }
    insert(nome,chamada, nome_turmas){
        const id  = 1;
        var insert = "insert into teste2 values(";
        var valores = insert + id +','+'"'+nome + '"'+','
        var resultado =  valores + '"'+chamada +'"'+','+'"'+nome_turmas+'"'+');';
       var a = alasql(resultado);
       console.log(a);
    }
    
}
var servico = angular.module("servico",[])
servico.factory("servicos",function(){
    var alasql = new alasqlprograma();
    function insert(nome,chamada,modulo_turmas){
        alasql.insert(nome,chamada,modulo_turmas);
    }
    return{
        adiconar:function(nome,chamada, modulo_turmas){
                insert(nome,chamada,modulo_turmas);
        }
    }
})
