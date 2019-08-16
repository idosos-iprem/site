class dados_alasql{
    constructor(){

    }
    select(){
        try{
            var lista = alasql("SELECT * FROM teste2");
            var json = JSON.stringify(lista);
            return json;
        }catch(e){
            this.delete();
        }
        
    }
    delete()
    {
        try{
            var confirmar = alasql("delete from  teste2");
            if(confirmar == 1)console.log("deletado");
        }
        catch(e){
            window.close();
        }
    }
}
class  pegar_json{
    constructor(){
        this.enviar = new dados_alasql();
    }
    
    // rais dos arquivos json
   get_json_raiz(http,x){
       try{
        return new Promise(response=>{
            http.get("http://"+x+":8080//idosos").then(resp=>{
            response(resp.data.lista_presença);
            },error=>{
                console.log(error);
                this.enviar.delete();
            });
        })
       }
       catch(erro){
        console.log(erro);
        this.enviar.delete();
       }
      
    }
 async   post_dados(http,turma,string){
    return new Promise(response=>{
                try{
                this.get_json_raiz(http,string).then(resp=>{
                    var lista_caminhos = resp;
                    
                        switch(turma){
                            case "Primeira_turma_da_primeira_modulo":
                                var json =  this.enviar.select();
                                console.log(json);
                                http.post("http://"+string + ":8080"+lista_caminhos[0],json).then(resp=>{
                                    console.log(resp)
                                    this.enviar.delete();
                                },erro=>{
                                    console.log(erro)
                                    this.enviar.delete(); 
                                })
                            break;
                            case "Segunda_turma_da_primeira_modulo":
                                var json =  this.enviar.select();
                                console.log(json);
                                var url = "http://"+string + ":8080"+lista_caminhos[1];
                                http.post(url,json).then(resp=>{
                                    console.log(resp)
                                    this.enviar.delete();
                                },erro=>{
                                    console.log(erro)
                                    this.enviar.delete(); 
                                })
                            break;
                            case "Primeira_turma_da_segunda_modulo":
                                var json =  this.enviar.select();
                                console.log(json);
                                http.post("http://"+string + ":8080"+lista_caminhos[2],json).then(resp=>{
                                    console.log(resp)
                                    this.enviar.delete();
                                },erro=>{
                                    console.log(erro)
                                    this.enviar.delete(); 
                                })
                            break;
                        }
                  
                       
                    },error=>{
                        console.log(error);
                        this.enviar.delete();
                    })
            }
            catch(erro){
                console.log(erro);
                 this.enviar.delete();
            }
            
        })
   
    
    }

}

var enivio_alasql = angular.module("enviar",[])
enivio_alasql.factory("http_alasql",function($http){
    var dados = new pegar_json();
    function http_enviar(tipo_turma,string){
        try
        {
                dados.post_dados($http,tipo_turma,string).then(r=>{

                },error=>{
                console.log(error);
                dados.enviar.delete();
                })
        }catch(erro){
            console.log(erro);
            dados.enviar.delete();
        }
       
    }

    return{
        enviar:function(tipo,string){
            http_enviar(tipo,string);
        }
    }
})