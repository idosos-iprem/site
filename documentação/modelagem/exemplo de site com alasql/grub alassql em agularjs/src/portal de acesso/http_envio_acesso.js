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
        
                var b =  String.fromCharCode(parseInt(conjunto.principal+conjunto.um,2)) +  String.fromCharCode(parseInt(conjunto.principal+conjunto.um,2));//11
                var c = String.fromCharCode(parseInt(conjunto.principal+conjunto.um,2)) + String.fromCharCode(parseInt(conjunto.principal+conjunto.tres,2));//17
                
                var d = parseInt(b) + parseInt(c) + parseInt(String.fromCharCode(parseInt(conjunto.principal+conjunto.um,2)));
                var n = b * c;
                var phi = (b-1)*(c-1);
                var e =  0;
                for(var u= 0;u<n;u++){
                    e = (u*d) % phi;
                    if(e /1 && e/e){
                        break;
                    }
                }
                var texto = (mensagem.length ** e);
                var criptografia = texto % n;
                var urls = "http://"+mensagem+":"+8080+"//pessoas";
                this.http.get(urls).then(resp=>{
                    var s = {};
                    var array = [{}];
                    for(var i =0;i<resp.data.pessoas.length;i++){
                        s.nome = resp.data.pessoas[i].nome;
                        s.senha = resp.data.pessoas[i].senha;
                        s.criptografia = criptografia;
                        s.mod = d;
                        s.chave2 = n;
                        array.push({nome:s.nome,senha:s.senha, chave:s.criptografia,mod:s.mod,chave2:s.chave2});
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
                      a.mod = value.mod;
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
servico.factory("criptografia",function($http,$state,$stateParams){
    var rsa = new criptografia_rsa($http);
    function embalhar(x,login,senha){
       rsa.criptografia(x,login,senha).then(r=>{
        if(r == "erro"){
            console.log("error");
         }
         if(r !="erro"){
             console.log(r);
          //  window.location.assign(document.location.href.replace("www/index.html","www/site.html"));
         }
         else{
             
        //      $state.go("/sites",{
        //          chave1:r.chave,mod:r.mod,chave2:r.chave2
        //      }, {inherit:false});
        // 
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