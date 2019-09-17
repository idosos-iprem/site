class alasqlprograma{
    constructor(){
        alasql("create database if not exists exemplo")
       alasql("Create table if not exists teste2(id number , nome string,  chamada string, nome_turma string);");
    }
    insert(nome,chamada, nome_turmas){
        const id  = Math.floor(Math.random()*10001);
        var insert = "insert into teste2 values(";
        var valores = insert + id +','+'"'+nome + '"'+','
        var resultado =  valores + '"'+chamada +'"'+','+'"'+nome_turmas+'"'+');';
       var a = alasql(resultado);
       console.log(a);
    }

    
}
class date_hora_inicial{
    constructor(a,x,y){
        this.http = a;
        this.resource = x;
        this.http_alasql = y
        
    }
    salvar_date(i,f, urls){
        var inicial = this.tratar_data(i);
        var final = this.tratar_data(f);
        var dias_da_semana = this.pegar_dias();
        var classe_dados =  new this.http_alasql.classe();
        try{
            classe_dados.get_json_raiz(urls).then(resp=>{

                var datas_dias = urls + resp.datas;
    
                this.http.get(datas_dias).then(r=>{
                    r.data.data_inicial = inicial;
                    r.data.data_final = final;
                    for(var i = 0;i<dias_da_semana.length;i++){
                        r.data.dias_semanas.push(dias_da_semana[i]);
                    }
                    var url =  datas_dias + "/:dados";
                    var servico = this.resource(url,{dados:"@dados"},{
                        update:{method:"Put",params:{dados:"@dados"}}
                    });
                    var dados = JSON.stringify(r.data);
                    servico.update({dados:dados},r=>{
    
                    })
                    console.log("ok");
                })
              
        });
        }catch(e){
            console.log("erro em lança as datas");
        }
       
        
    }
    tratar_data(x){
        var formato =  x.getUTCDate().toString() + "/" +(x.getMonth()+1).toString().padStart(2, '0') + "/" + x.getFullYear().toString();
        return formato;
    }
    pegar_dias(){
        var select = document.getElementsByClassName("dias");
        var numero = select.length;
        if(numero >0){
            var array = [];
            for(var i = 0;i<numero;i++){
              array.push(select[i].value);
            }
            return array;
        }else return alert("preeenchar o(s) campo(s) do(s) dia(s)");
    }
    existe_data(url){
        return new Promise(Response=>{
            var classe =  new this.http_alasql.classe();
            classe.get_json_raiz(url).then(resp=>{
                var datas_dias = url + resp.datas;
                this.http.get(datas_dias).then(r=>{
                    if(r.data.data_inicial =="" && r.data.data_final == "" 
                    &&  r.data.dias_semanas.length == 0){
                        Response("não existe");
                    }
                    else{
                        Response("existe");
                    }
                });
            });
        })
       
    }

}
var servico = angular.module("servico",['enviar'])
servico.factory("servicos",function($http,$resource,http_alasql){
    var alasql = new alasqlprograma();
    var date_hora = new date_hora_inicial($http,$resource,http_alasql);
    function insert(nome,chamada,modulo_turmas){
        alasql.insert(nome,chamada,modulo_turmas);
    }
    return{
        adiconar:function(nome,chamada, modulo_turmas){
                insert(nome,chamada,modulo_turmas);
        },
        salvar:function(i,f,string){
            var urls = "http:"+string + ":"+8080;
               date_hora.salvar_date(i,f,urls);
               
        },
        verificar_data:function(string){
            var urls = "http:"+string + ":"+8080;
           return date_hora.existe_data(urls);
        },
        deletar_dados:function(data,id){
            var formato =  date_hora.tratar_data(data);
            
        }
    }
})
