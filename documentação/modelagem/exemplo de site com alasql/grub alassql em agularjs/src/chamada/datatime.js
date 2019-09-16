class date{
    constructor(x){
        this.http = x;
    }
    datetime(){
        return new Promise(Response=>{
            this.http.get("http://worldtimeapi.org/api/timezone/America/Sao_Paulo").then(resp=>{
                var datas = new Date(resp.data.datetime);
                var formato = datas.getDay() + "/" + datas.getMonth() + "/ " +datas.getFullYear();
                Response(formato);
            })
        });
       
    }
    option(){
        // var div  = document.getElementById("lista");
        //     var select = document.createElement("select");
        //     var dias = ["segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira"];
        //     dias.forEach((Value,index,array)=>{
        //         var opt =document.createElement("option");
        //         opt.text = Value;
        //         opt.value = Value;
        //         select.add(opt,null);
        //     }) 
        //     select.id ="dias";
        //     div.appendChild(select);
       
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
        }
        
    }
})