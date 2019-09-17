class date{
    constructor(x){
        this.http = x;
    }
    datetime(){
        return new Promise(Response=>{
            this.http.get("http://worldtimeapi.org/api/timezone/America/Sao_Paulo").then(resp=>{
                var x = new Date(resp.data.datetime);
                var formato = x.getUTCDate().toString() + "/" +(x.getMonth()+1).toString().padStart(2, '0') + "/" + x.getFullYear().toString();
                Response(formato);
            })
        });
       
    }
    option(){
        var label = document.getElementById("lista");
            var select = document.createElement("select");
            var dias = ["segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira"];
            dias.forEach((Value,index,array)=>{
                var opt =document.createElement("option");
                opt.text = Value;
                opt.value = Value;
                select.add(opt,null);
            }) 
            select.className ="dias";
            
            label.appendChild(select);
       
    }
    remover_option(){
        var label_remover =  document.getElementsByClassName("dias");
        var numero = label_remover.selectedIndex;
       label_remover.item(numero).remove()

    }

    
}
var datetime = angular.module("datas",[])
datetime.factory("dia",function($http){
    var dias = new date($http);
    return {
        data:function(){
           return dias.datetime();
        },
        criar_elenentos:function(){
            return dias.option();
        },
        remove_elementos:function(){
            return dias.remover_option();
        }
        
        
    }
})