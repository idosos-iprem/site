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
}
var datetime = angular.module("datas",[])
datetime.factory("dia",function($http){
    var dias = new date($http);
    return {
        data:function(){
           return dias.datetime();
        }
    }
})