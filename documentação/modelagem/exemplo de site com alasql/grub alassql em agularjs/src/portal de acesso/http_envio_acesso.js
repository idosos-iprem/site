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
                var q = String.fromCharCode(parseInt(conjunto.principal+conjunto.um,2)) +  String.fromCharCode(parseInt(conjunto.principal+conjunto.um,2));//11
                var p = String.fromCharCode(parseInt(conjunto.principal+conjunto.um,2)) +  String.fromCharCode(parseInt(conjunto.principal+conjunto.tres,2));//17
                var n = p * q;
                var z = (p-1)*(q-1);
                    var d = this.primo();
                    var bool = true;
                    var numero = 0;
                    do{
                        var numero= this.primo();
                       if(numero %z==1)bool = false;
                    }while(bool);
                   var e = numero; 
                   
                
                var texto = {
                    um:parseInt(conjunto.principal+conjunto.um,2),
                    dois:parseInt(conjunto.principal+conjunto.dois,2),
                    tres:parseInt(conjunto.principal+conjunto.tres,2),
                    quarto:parseInt(conjunto.quarto,2),
                    cinco:parseInt(conjunto.principal+conjunto.cinco,2)
                }
                var resto = [];
                var  criptografia = [];
                resto.push({
                    um:texto.um**e,
                    dois:texto.dois**e,
                    tres:texto.tres**e,
                    quarto:texto.quarto**e,
                    cinco:texto.cinco**e
                });
                criptografia.push({
                    um:resto[0].um %n,
                    dois:resto[0].dois %n,
                    tres:resto[0].tres %n,
                    quarto:resto[0].quarto %n,
                    cinco:resto[0].cinco %n
                })
                var urls = "http://"+mensagem+":"+8080+"//pessoas";
                this.http.get(urls).then(resp=>{
                    var s = {};
                    var array = [{}];
                    for(var i =0;i<resp.data.pessoas.length;i++){
                        s.nome = resp.data.pessoas[i].nome;
                        s.senha = resp.data.pessoas[i].senha;
                        s.criptografia = criptografia[0];
                        s.chave2 = n;
                        s.mod = d;
                        array.push({nome:s.nome,senha:s.senha, mod:s.mod,chave:s.criptografia,chave2:s.chave2});
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
    primo(operador){
        var bool = true;
        var b;
        var c = 0;
        var i = 2;
       
            while(bool)
            {
                b =  Math.floor(Math.random() *10);
                c = Math.floor(Math.random() *10);
                var r = c% b;
                b = c;
                c = r;
                
                switch(c){
                    case 2:
                        c = 1;
                        bool = false;
                        break;
                        default:
                                if(c% i ==0)
                                {
                                    c = i;
                                    bool = false;
                                }
                        break;
                }
                i++;
            }
            i = 2;
            return c;
        

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