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
                                var dados_arquivos =  this.enviar.select();
                                var url = "http://"+string +":8080"+lista_caminhos[0];
                                this.http.get(url).then(ler=>{
                                   var visulizar =  JSON.stringify(ler.data);//receber dados
                                    var parse_josn = JSON.parse(visulizar);// passar dados em javascript
                                    parse_josn[0].id =  dados_arquivos[0].id;//modificar o di
                                    parse_josn[0].nome =  dados_arquivos[0].nome;//err
                                    visulizar.chamada = parse_josn[0].chamada;
                                    visulizar.nome_turma = parse_josn[0].nome_turma;

                                    this.http.put(url,visulizar).then(resp=>{
                                        this.enviar.delete();
                                    },erro=>{
                                        this.enviar.delete(); 
                                    })
                                })
                                
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