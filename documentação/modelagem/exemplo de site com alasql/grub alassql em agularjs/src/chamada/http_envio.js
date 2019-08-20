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
    constructor(x){
        this.enviar = new dados_alasql();
        this.http = x;
    }
    // rais dos arquivos json
   get_json_raiz(x){
       try{
        return new Promise(response=>{
            this.http.get("http://"+x+":8080//idosos").then(resp=>{
            response(resp.data);
            },error=>{
                this.enviar.delete();
            });
        })
       }
       catch(erro){
        this.enviar.delete();
       }
      
    }
 async   post_dados(turma,string){
    return new Promise(response=>{
                try{
                this.get_json_raiz(string).then(resp=>{
                    var lista_caminhos = resp[1];
                    
                        switch(turma){
                            case "Primeira_turma_da_primeira_modulo":
                                var json =  this.enviar.select();
                                var url = "http://"+string +":8080"+lista_caminhos[0];
                                http.post(url,json).then(resp=>{
                                    this.enviar.delete();
                                },erro=>{
                                    this.enviar.delete(); 
                                })
                            break;
                            case "Segunda_turma_da_primeira_modulo":
                                var json =  this.enviar.select();
                                var url = "http://"+string +":8080"+lista_caminhos[1];
                                http.post(url,json).then(resp=>{
                                    console.log(resp)
                                    this.enviar.delete();
                                },erro=>{
                                    this.enviar.delete(); 
                                })
                            break;
                            case "Primeira_turma_da_segunda_modulo":
                                var json =  this.enviar.select();
                                var url = "http://"+string + ":8080"+lista_caminhos[2];
                                http.post(url,json).then(resp=>{
                                    this.enviar.delete();
                                },erro=>{
                                    this.enviar.delete(); 
                                })
                            break;
                        }
                  
                       
                    },error=>{
                        this.enviar.delete();
                    })
            }
            catch(erro){
                 this.enviar.delete();
            }
            
        })
   
    
    }

}

var enivio_alasql = angular.module("enviar",[])
enivio_alasql.factory("http_alasql",function($http){
    var dados = new pegar_json($http);
    function http_enviar(tipo_turma,string){
        try
        {
                dados.post_dados(tipo_turma,string).then(r=>{

                },error=>{
                dados.enviar.delete();
                })
        }catch(erro){
            dados.enviar.delete();
        }
       
    }

    return{
        enviar:function(tipo,string){
            http_enviar(tipo,string);
        },
        descriptografia(texto,d,chave_privata){
            
            var texto_binario = [];
            for(var i = 0;i<texto.length;i++){
                var texto2 = texto[i].toString(2);
                texto_binario.push(texto2);
            }
            var mensagem = 
            String.fromCharCode(parseInt(texto_binario[0],2))+
            String.fromCharCode(parseInt(texto_binario[1],2)) + 
            String.fromCharCode(parseInt(texto_binario[2],2))+
            String.fromCharCode(parseInt(texto_binario[3],2))+
            String.fromCharCode(parseInt(texto_binario[4],2))+
            String.fromCharCode(parseInt(texto_binario[3],2)) +
            String.fromCharCode(parseInt(texto_binario[4],2))+
            String.fromCharCode(parseInt(texto_binario[3],2)) +
            String.fromCharCode(parseInt(texto_binario[0],2));
            return mensagem;
        }
    }
})