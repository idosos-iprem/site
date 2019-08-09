class alasqlprograma{
    constructor(){
        alasql("create database if not exists exemplo")
       alasql("Create table if not exists teste2(number id ,string nome, string chamada,string nome_turma);");
    }
    insert(nome,chamada, nome_turmas){
        const id  = 1;
        var insert = "insert into teste2 values("+id+","+'"'+nome+'"'+","+'"'+chamada+'"'+","+'"'+nome_turmas+'"'+")";
       var a = alasql(insert);
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
