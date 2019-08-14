class bit{
    constructor(){

    }
    enderenço_ip(valor1,valor2){
        try{
        var enderenço={
            parte_parcipal: ""+valor2 + (valor1 ^valor1) + (valor1 ^valor2) + (valor1 ^valor2),
            parte_1:""+valor2 + (valor1 ^valor1) +  (valor1 ^valor1) + (valor1 ^valor2),
            parte_2:""+valor2 + (valor1 ^valor1) + (valor1 ^valor2)+ (valor1 ^valor1),
            parte_3:""+valor2 + (valor1 ^valor2) + (valor1 ^valor2) + (valor1 ^valor2) ,
            parte_4:function(){
                return ""+valor2 + (valor1^ valor1 ) + (valor1 ^valor2) + (valor1^ valor1 )+
                (valor1 ^valor2) +(valor1 ^valor2)+ (valor1 ^valor2) +(valor1^ valor1 )

            },
            parte_5:""+valor2  + (valor1 ^valor1) + (valor1 ^valor1) + (valor1 ^valor1)
        }
        var array = {principal:enderenço.parte_parcipal,um:enderenço.parte_1,dois:enderenço.parte_2,tres:enderenço.parte_3,
            quarto:enderenço.parte_4(),cinco:enderenço.parte_5};
        return array;
        }catch(e){
            window.close();
        }
        
    }
}
var servico = angular.module("acesso",[])
servico.factory("dados",function($http){
    var bits = new bit();
    function binario(v1,v2)
    {
       return bits.enderenço_ip(v1,v2);
    }
    return{
        ip:function(valor1,valor2){

           var x = binario(valor1,valor2);
          return x;
        }
    }
})