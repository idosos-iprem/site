class dados_alasql{
    constructor(){

    }
    select(){
        try{
            var lista = alasql("SELECT * FROM teste2");
            var listar = [lista];
            var json = JSON.stringify(listar[0]);
            return json;
        }catch(e){
            this.delete();
        }
        
    }
    delete()
    {
        try
        {
            var confirmar = alasql("delete from  teste2");
            if(confirmar == 1)console.log("deletado");
        }
        catch(e){
            window.close();
        }
    }
}
class  pegar_json{
    constructor(x,y){
        this.enviar = new dados_alasql();
        this.http = x;
        this.resource = y;
    }
    // rais dos arquivos json
   get_json_raiz(x){
       try{
        return new Promise(response=>{
            this.http.get(x+"/idosos").then(resp=>{
            response(resp.data);
            },error=>{
                console.clear();
                console.log("erro");
                this.enviar.delete();
            });
        })
       }
       catch(erro){
        this.enviar.delete();
       }
      
    }
    async get(x)
    {
        return new Promise(resp=>{
            this.http.get(x).then(r=>{
                resp(r);
            },erro=>{
                console.clear();
                console.log("erro");
                this.enviar.delete();
            })
        })
    }
post_dados(turma,string,dia){
                try{
                this.get_json_raiz(string).then(resp=>{
                    var lista_caminhos = resp.lista;
                        switch(turma){
                            case "Primeira_turma_da_primeira_modulo":
                                var dados_arquivos =  JSON.parse(this.enviar.select());
                                var url = string +lista_caminhos[0]+"/:aulas";
                                var servico = this.resource(url,{aulas:"@aulas"},{
                                    update:{method:"Put",params:{aulas:"@aulas"}}
                                });
                                this.get(url).then(r=>{
                                    var numero = r.data.length;
                                    if(numero == 0){
                                            var dados = "";
                                           
                                                r.data = {aulas:[{id:dados_arquivos[0].id,
                                                    chamada:dados_arquivos[0].chamada,
                                                    nome:dados_arquivos[0].nome,
                                                    nome_turma: dados_arquivos[0].nome_turma,
                                                    presensa:"presente",
                                                    datatime:dia}]};
                                                    dados  = JSON.stringify(r.data);
                                }
                                else{
                                    var dados = "";
                                            r.data.aulas.push({id:dados_arquivos[0].id,
                                                chamada:dados_arquivos[0].chamada,
                                                nome:dados_arquivos[0].nome,
                                                nome_turma: dados_arquivos[0].nome_turma,
                                                presensa:"presente",
                                                datatime:dia});
                                                dados  = JSON.stringify(r.data);
                                }
                                servico.update({aulas:dados},function(r){
                                   
                                })
                                this.enviar.delete();
                            });
                                
                            break;
                            case "Segunda_turma_da_primeira_modulo":
                                var dados_arquivos =  JSON.parse(this.enviar.select());
                                var url = string +lista_caminhos[1]+"/:aulas";
                                var servico = this.resource(url,{aulas:"@aulas"},{
                                    update:{method:"Put",params:{aulas:"@aulas"}}
                                });
                                this.get(url).then(r=>{
                                    var numero = r.data.length;
                                    if(numero == 0){
                                            var dados = "";
                                           
                                                r.data = {aulas:[{id:dados_arquivos[0].id,
                                                    chamada:dados_arquivos[0].chamada,
                                                    nome:dados_arquivos[0].nome,
                                                    nome_turma: dados_arquivos[0].nome_turma,
                                                    presensa:"presente",
                                                    datatime:dia}]};
                                                    dados  = JSON.stringify(r.data);
                                }
                                else{
                                    var dados = "";
                                            r.data.aulas.push({id:dados_arquivos[0].id,
                                                chamada:dados_arquivos[0].chamada,
                                                nome:dados_arquivos[0].nome,
                                                nome_turma: dados_arquivos[0].nome_turma,
                                                presensa:"presente",
                                                datatime:dia});
                                                dados  = JSON.stringify(r.data);
                                }
                                servico.update({aulas:dados},function(r){
                                   
                                })
                                this.enviar.delete();
                            });
                            break;
                            case "Primeira_turma_da_segunda_modulo":
                                var dados_arquivos =  JSON.parse(this.enviar.select());
                                var url = string +lista_caminhos[2]+"/:aulas";
                                var servico = this.resource(url,{aulas:"@aulas"},{
                                    update:{method:"Put",params:{aulas:"@aulas"}}
                                });
                                this.get(url).then(r=>{
                                    var numero = r.data.length;
                                    if(numero == 0){
                                            var dados = "";
                                           
                                                r.data = {aulas:[{id:dados_arquivos[0].id,
                                                    chamada:dados_arquivos[0].chamada,
                                                    nome:dados_arquivos[0].nome,
                                                    nome_turma: dados_arquivos[0].nome_turma,
                                                    presensa:"presente",
                                                datatime:dia}]};
                                                    dados  = JSON.stringify(r.data);
                                }
                                else{
                                    var dados = "";
                                            r.data.aulas.push({id:dados_arquivos[0].id,
                                                chamada:dados_arquivos[0].chamada,
                                                nome:dados_arquivos[0].nome,
                                                nome_turma: dados_arquivos[0].nome_turma,
                                                presensa:"presente",
                                                datatime:dia});
                                                dados  = JSON.stringify(r.data);
                                }
                                servico.update({aulas:dados},function(r){
                                   
                                })
                                this.enviar.delete();
                            });
                            break;
                        }
                  
                       
                    },error=>{
                        this.enviar.delete();
                    })
            }
            catch(erro){
                 this.enviar.delete();
            }
            
   
    
    }
    excluir(id,data,string){
        try{
            this.get_json_raiz(string).then(r=>{
                var lista_caminhos = r.lista;
               var i = 0;
               while(lista_caminhos.length >=i){
                   var url = lista_caminhos[i];
                   var servico = this.resource(url,{aulas:"@aulas"},{
                    remove: {method:'DELETE',params:{aulas:"@aulas"}}
                });
                this.get(url).then(resp=>{
                    for(var c = 0;c<resp.data.aulas.length;c++){
    
                            if(resp.data.aulas[c].id == id && resp.data.aulas[c].datatime == data)
                            {
                                servico.remove({aulas:resp.data.aulas[c]},function(r){
    
                                })
                                this.enviar.delete();
                            }
    
                    }
                })
               }
            },erro=>{
                this.enviar.delete();
            })
        }
        catch(e){
            this.enviar.delete();
        }
    }

}

var enviar_alasql = angular.module("enviar",['ngResource','datas'])
enviar_alasql.factory("http_alasql",function($http,$resource,dia){
    var dados = new pegar_json($http,$resource);
    function http_enviar(tipo_turma,string){
        try
        {
            var urls = "http:"+string + ":"+8080;
            dia.data().then(resp=>
                {

                dados.post_dados(tipo_turma,urls,resp);
            })
                
                   
        }catch(erro){
            dados.enviar.delete();
        }
       
    }
    function  http_delete(id,data,string){
        try{
            var urls = "http:"+string + ":"+8080;
            dados.excluir(id,data,urls);
        }catch(erro){
            dados.enviar.delete();
        }
    }
    return{
        enviar:function(tipo,string){
            http_enviar(tipo,string);
        },
        deletar:function(id,data,string){
                http_delete(id,data,string);
        },
        numeros_criptograficos(texto,key,mod)
        { 
            var valor = [texto.um,texto.dois,texto.tres,texto.quarto,texto.cinco];
            var descriptografia = [];
            for(var i = 0;i<valor.length;i++){
                descriptografia.push( PowerMod(valor[i],mod,key));
            }
            var mensagem = String.fromCharCode( parseInt(descriptografia[0].toString(2),2)) + 
            String.fromCharCode( parseInt(descriptografia[1].toString(2),2)) + 
            String.fromCharCode( parseInt(descriptografia[2].toString(2),2)) + 
            String.fromCharCode( parseInt(descriptografia[3].toString(2),2)) + 
            String.fromCharCode( parseInt(descriptografia[4].toString(2),2)) + 
            String.fromCharCode( parseInt(descriptografia[3].toString(2),2)) + 
            String.fromCharCode( parseInt(descriptografia[4].toString(2),2)) + 
            String.fromCharCode( parseInt(descriptografia[3].toString(2),2)) + 
            String.fromCharCode( parseInt(descriptografia[0].toString(2),2)); 
            return mensagem;
        }
    }
})