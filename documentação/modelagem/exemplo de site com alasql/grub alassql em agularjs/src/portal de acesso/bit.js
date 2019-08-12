class bit{
    constructor(){

    }
        // var r3 =  String.fromCharCode(parseInt(a,2));
    enderenço_ip(valor1,valor2){
        // valor2 = 0;
        // valor1 = 1;
        var enderenço={
      mais_repetir:function(){
            numero_repete = "" + valor2;
            numero_repete += valor1 ^valor1;//0
            numero_repete += valor1 ^valor2;//1
            numero_repete += valor1 ^valor2;//1
            return numero_repete;
            },
            enderenço:function(){
                bits = this.mais_repetir();
                //1
                numero1 =  "" + valor2;
                numero1 +=  valor1 ^valor1;//0
                numero1 +=  valor1 ^valor1;//0
                numero1 += valor1 ^valor2;//1
                //2
                numero2 =  "" + valor2;
                numero2 +=  valor1 ^valor1;//0
                numero2 += valor1 ^valor2;//1
                numero2 +=  valor1 ^valor1;//0
                //7
                numero3 = "" + valor2;
                numero3 += valor1 ^valor1;//0
                numero3 += valor1 ^valor2;//1
                numero3 += valor1 ^valor2;//1
                //0
                numero4 = "" + valor2;
                numero4 += valor1 ^valor1;//0
                numero4 += valor1 ^valor1;//0
                numero4 += valor1 ^valor1;//0
                array = [bits+numero1,bits+numero2,bits+numero3,bits+numero4]
                return array;
            }
        }
        
    }
}