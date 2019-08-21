class criptografia_rsa{
    constructor(x){
        this.http = x;
    }
    Fazer_criptografia(conjunto){
        try{
            return new Promise(response=>{
                var mensagem = String.fromCharCode(parseInt(conjunto.principal+conjunto.um,2)) +  
                String.fromCharCode(parseInt(conjunto.principal+conjunto.dois,2))+
                String.fromCharCode(parseInt(conjunto.principal+conjunto.tres,2))
                 +  String.fromCharCode(parseInt(conjunto.quarto,2))+
                String.fromCharCode(parseInt(conjunto.principal+conjunto.cinco,2)) + 
                 String.fromCharCode(parseInt(conjunto.quarto,2))+
                String.fromCharCode(parseInt(conjunto.principal+conjunto.cinco,2)) +
                String.fromCharCode(parseInt(conjunto.quarto,2))
                + String.fromCharCode(parseInt(conjunto.principal+conjunto.um,2));

           var rsa = forge.pki.rsa.generateKeyPair(1024);
            var utf8 =  forge.util.encodeUtf8(mensagem);
            //erro ainda na criptografia
            var ciphertext = rsa.privateKey.sign(utf8);
                var urls = "http://"+mensagem+":"+8080+"//pessoas";
                this.http.get(urls).then(resp=>{
                    var s = {};
                    var array = [{}];
                    for(var i =0;i<resp.data.pessoas.length;i++){
                        s.nome = resp.data.pessoas[i].nome;
                        s.senha = resp.data.pessoas[i].senha;
                        s.criptografia = ciphertext;
                        s.chave2 = rsa;
                        array.push({nome:s.nome,senha:s.senha, chave:s.criptografia,chave2:s.chave2});
                    }
                        response(array);
                    },error=>{
                        console.log(error);
                    });
            })
        }catch(e){
            window.close();
        }
    }
    criptografia(x,l,s){
        try{
            return new Promise(resp=>{
                var a = {};
              this.Fazer_criptografia(x).then(r=>{
                  r.forEach(function(value,index,array){
                     if(value.nome == l && value.senha == s){
                      a.chave = value.chave;
                      a.chave2 = value.chave2;
                      resp(a);
                      
                     }
                     if(index == array.length-1){
                      resp("erro");
                     }
                  });
              });
            })
        }catch(e){
            window.close();
        }
    }
}
var servico = angular.module("rsa",[])

servico.factory("criptografia",function($http,$window){
    var rsa = new criptografia_rsa($http);
    function embalhar(x,login,senha){
       rsa.criptografia(x,login,senha).then(r=>{
        if(r == "erro"){
            console.log("erro");
         }
         else if(r !="erro"|| r != undefined){
             $window.localStorage["chaves"] = JSON.stringify(r);
            var caminho = $window.location.href.replace("www/index.html","www/site.html");
            $window.location.href = caminho;
         }
       },error=>{
        console.log(error);
       })
    }
    return {
        validar:function(b,login, senha){
           return embalhar(b,login,senha);
        }
    }
})