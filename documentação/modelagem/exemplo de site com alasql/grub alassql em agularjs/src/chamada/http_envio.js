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
            this.http.get(x+"//idosos").then(resp=>{
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
     mdc( a,b)
    {
        var bool = true;			
        while(bool){
            var r = b%a;
            b = a;
            a = r;
            if(b>0 && a>0)bool =false;
        }
        return b;
    }
 async   post_dados(turma,string){
    return new Promise(response=>{
                try{
                this.get_json_raiz(string).then(resp=>{
                    var lista_caminhos = resp.lista;
                        switch(turma){
                            case "Primeira_turma_da_primeira_modulo":
                                var dados_arquivos =  JSON.parse(this.enviar.select());
                                var url = string +lista_caminhos[0];
                                var servico = this.resource(url ,{}, {
                                    update: { method: 'post'},
                                    get:{method:"get"}
                                  });
                                  servico.get({},resp=>{
                                      var data = resp.aulas;
                                  })
                                   
                                  
                                    //data.$save();
                                // this.http.get(url).then(ler=>{
                                //     var alertar;
                                //    var visulizar = JSON.stringify(ler.data[0],(key,valor)=>{
                                //     alertar = [valor.aulas];                                  
                                //        console.log(valor)
                                //    });//receber dados
                                //    alertar[0].index = {id:dados_arquivos[0].id,
                                //     nome:dados_arquivos[0].nome
                                //     };

                                   //response(alertar[0]);
                               // })
                                
                            break;
                            case "Segunda_turma_da_primeira_modulo":
                                var json =  this.enviar.select();
                                var url = "http://"+string +":8080"+lista_caminhos[1];
                                this.http.post(url,json).then(resp=>{
                                    console.log(resp)
                                    this.enviar.delete();
                                },erro=>{
                                    this.enviar.delete(); 
                                })
                            break;
                            case "Primeira_turma_da_segunda_modulo":
                                var json =  this.enviar.select();
                                var url = "http://"+string + ":8080"+lista_caminhos[2];
                                this.http.post(url,json).then(resp=>{
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

var enivio_alasql = angular.module("enviar",['ngResource'])
enivio_alasql.factory("http_alasql",function($http,$resource){
    var dados = new pegar_json($http,$resource);
    function http_enviar(tipo_turma,string){
        try
        {
            string = "http://"+string +":8080";
                dados.post_dados(tipo_turma,string).then(r=>{
                  
                },error=>{
                dados.enviar.delete();
                })
        }catch(erro){
            dados.enviar.delete();
        }
       
    }
    return{
        enviar:function(tipo,string,resource){
            http_enviar(tipo,string);
        },
        numeros_criptograficos(texto,key,mod)
        { 
            var valor = [texto.um,texto.dois,texto.tres,texto.quarto,texto.cinco];
            var descriptografia = [];
            for(var i = 0;i<valor.length;i++){
                descriptografia.push( PowerMod(valor[i],mod,key));
            }
            var mensagem = String.fromCharCode( parseInt(descriptografia[0].toString(2),2)) + //1
            String.fromCharCode( parseInt(descriptografia[1].toString(2),2)) + //2
            String.fromCharCode( parseInt(descriptografia[2].toString(2),2)) + //7
            String.fromCharCode( parseInt(descriptografia[3].toString(2),2)) + //.
            String.fromCharCode( parseInt(descriptografia[4].toString(2),2)) + //0
            String.fromCharCode( parseInt(descriptografia[3].toString(2),2)) + //.
            String.fromCharCode( parseInt(descriptografia[4].toString(2),2)) + //0
            String.fromCharCode( parseInt(descriptografia[3].toString(2),2)) + //.
            String.fromCharCode( parseInt(descriptografia[0].toString(2),2)); //1
            return mensagem;
        }
    }
})