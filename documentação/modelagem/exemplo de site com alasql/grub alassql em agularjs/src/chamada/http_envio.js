class dados_alasql{
    constructor(){

    }
    select(){

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
            x = "https://"+"127.0.0.1";//para teste
            http.get(x+":8080//idosos").then(resp=>{
            response(response.lista_presença);
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
    post_dados(http,turma,string){
     
            return new Promise(response=>{
                try{
                this.get_json_raiz(http,x).then(resp=>{
                    var lista_caminhos = resp;
                        switch(turma){
                            case "Primeira_turma_da_primeira_modulo":
                                string = "https://"+"127.0.0.1";//para teste;
                                //var json =  
                                $http.post(string + ":8080//dados_primeiro_modulo_primeiro",JSON.stringify())
                            break;
                            case "Segunda_turma_da_primeira_modulo":
    
                            break;
                            case "Primeira_turma_da_sesgunda_modulo":
    
                            break;
                        }
                       
                    },error=>{
                        console.log(error);
                        this.enviar.delete();
                    })
            }
            catch(erro){
                console.log(error);
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