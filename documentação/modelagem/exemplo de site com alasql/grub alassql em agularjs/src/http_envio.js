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
   get_json_raiz(http){
       try{
        return new Promise(response=>{
            http.get("C:/Users/kevin.guimaraes/Desktop/banco/idosos.json").then(resp=>{
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
    post_dados(http,turma){
     
            return new Promise(response=>{
                try{
                this.get_json_raiz(http).then(resp=>{
                    var lista_caminhos = resp;
                        switch(turma){
                            case "Primeira_turma_da_primeira_modulo":
                            
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
    function http_enviar(tipo_turma){
        try
        {
                dados.post_dados($http,tipo_turma).then(r=>{

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
        enviar:function(tipo){
            http_enviar(tipo);
        }
    }
})