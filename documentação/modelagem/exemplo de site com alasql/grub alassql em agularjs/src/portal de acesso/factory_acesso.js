class bit{
    constructor(){

    }
    enderenço_ip(valor1,valor2){
        // valor1 = 1
        //valor2 = 0
        var enderenço={
            parte_parcipal: ""+valor2 + (valor1 ^valor1) + (valor1 ^valor2) + (valor1 ^valor2),
            parte_1:""+valor2 + (valor1 ^valor1) +  (valor1 ^valor1) + (valor1 ^valor2),//1
            parte_2:""+valor2 + (valor1 ^valor1) + (valor1 ^valor2)+ (valor1 ^valor1),//2
            parte_3:""+valor2 + (valor1 ^valor2) + (valor1 ^valor2) + (valor1 ^valor2) ,//7
            parte_4:function(){
                return ""+valor2 + (valor1^ valor1 ) + (valor1 ^valor2) + (valor1^ valor1 )+
                (valor1 ^valor2) +(valor1 ^valor2)+ (valor1 ^valor2) +(valor1^ valor1 )

            },
            parte_5:""+valor2  + (valor1 ^valor1) + (valor1 ^valor1) + (valor1 ^valor1)//0
        }
        var array = {principal:enderenço.parte_parcipal,um:enderenço.parte_1,dois:enderenço.parte_2,tres:enderenço.parte_3,
            quarto:enderenço.parte_4(),cinco:enderenço.parte_5};
        return array;
    }
    Rsa(conjunto, http){
        var mensagem = String.fromCharCode(parseInt(conjunto.principal+conjunto.um,2)) +  
        String.fromCharCode(parseInt(conjunto.principal+conjunto.dois,2))+
        String.fromCharCode(parseInt(conjunto.principal+conjunto.tres,2))
         +  String.fromCharCode(parseInt(conjunto.quarto,2))+
        String.fromCharCode(parseInt(conjunto.principal+conjunto.cinco,2)) + 
         String.fromCharCode(parseInt(conjunto.quarto,2))+
        String.fromCharCode(parseInt(conjunto.principal+conjunto.cinco,2)) +
        String.fromCharCode(parseInt(conjunto.quarto,2))
        + String.fromCharCode(parseInt(conjunto.principal+conjunto.um,2)); //127.0.0.1

        var b =  String.fromCharCode(parseInt(conjunto.principal+conjunto.um,2)) +  String.fromCharCode(parseInt(conjunto.principal+conjunto.um,2));//11
        var c = String.fromCharCode(parseInt(conjunto.principal+conjunto.um,2)) + String.fromCharCode(parseInt(conjunto.principal+conjunto.tres,2));//17
        
        var d = parseInt(b) + parseInt(c) + parseInt(String.fromCharCode(parseInt(conjunto.principal+conjunto.um,2)));
        var n = b * c;
        var phi = (b-1)*(c-1);
        var e = 0;
        for(var i = 0;i<phi;i++){
            if(i > 1 && i<phi && phi /1&& phi/phi){
                e = i;
                break;
            }
        }
        var texto = (mensagem.length *e)% n;
        var url = mensagem+":"+8000+"//idosos";
        http.get(url).then(resp=>{
            console.log(resp);
          //  window.location.assign("/www/site.html");
        },error=>{
            console.log(error);
        });
        // http.post(,{mensagem:texto,numero_primo:d, mod:n}).then(resp=>{
        //     console.log(resp);
        // },error=>{
        //     console.log(error);
        // });
    }
}
var servico = angular.module("acesso",[])
servico.factory("dados",function($http){
    var bits = new bit();
    function binario(v1,v2)
    {
       return bits.enderenço_ip(v1,v2);
    }
    function cripotografia(x){
        bits.Rsa(x,$http);
    }
    return{
        ip:function(valor1,valor2){

           var x = binario(valor1,valor2);
            cripotografia(x);
        }
    }
})