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

                var d,e = 0;
                var valor = false;
                    do{  
                    d = this.primo(z); 
                    e = this.primo(z);
                    valor = (d * e)%z;
                    if(valor == 1)valor = true;
                    else valor = false;
                    
                }while( valor==false|| d==e);
                while(d>e){
                    d = this.primo(z); 
                }
               

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
                        um:Math.pow(texto.um,e),
                        dois:Math.pow(texto.dois,e),
                        tres:Math.pow(texto.tres,e),
                        quarto:Math.pow(texto.quarto,e),
                        cinco:Math.pow(texto.cinco,e)
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
    fatorial_primo(z){
        var r = 1;
        var e = 0;
                while(r<=z){
                    e = r * z;
                    if(e % z ==1){
                        break;
                    }
                    else e = 0;
                    r++;
                }
        
        return r;
    }
    primo(z){
        var c = 0;
        var x = 0;
        var b = 0;
        c =Math.floor(Math.random() *50);
        b = this.fatorial_primo(c,z);
                for(var i = 1;i<=b;i++){
                    if(this.Divisaoexata(b,i)){
                        x++;
                    }
                }
        if(x ==2){
            return b;
        }
        else return 0;
    }
    Divisaoexata(num,i){
        return (num % i) ==0;
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