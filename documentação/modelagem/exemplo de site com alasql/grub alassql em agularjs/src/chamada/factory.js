class alasqlprograma{
    constructor(){
        alasql("create database if not exists exemplo")
       alasql("Create table if not exists teste2(id number , nome string,  chamada string, nome_turma string);");
    }
    insert(nome,chamada, nome_turmas){
        const id  = Math.floor(Math.random()*10001);
        var insert = "insert into teste2 values(";
        var valores = insert + id +','+'"'+nome + '"'+','
        var resultado =  valores + '"'+chamada +'"'+','+'"'+nome_turmas+'"'+');';
       var a = alasql(resultado);
       console.log(a);
    }

    
}
class date_hora_inicial{
    constructor(a,x,y){
        this.http = a;
        this.resource = x;
        this.http_alasql = y
        this.dados_grafico = null;
    }
    salvar_date(i,f, urls){
        var inicial = this.tratar_data(i);
        var final = this.tratar_data(f);
        var dias_da_semana = this.pegar_dias();
        var classe_dados =  new this.http_alasql.classe();
        try{
            classe_dados.get_json_raiz(urls).then(resp=>{

                var datas_dias = urls + resp.datas;
    
                this.http.get(datas_dias).then(r=>{
                    r.data.data_inicial = inicial;
                    r.data.data_final = final;
                    for(var i = 0;i<dias_da_semana.length;i++){
                        r.data.dias_semanas.push(dias_da_semana[i]);
                    }
                    var url =  datas_dias + "/:dados";
                    var servico = this.resource(url,{dados:"@dados"},{
                        update:{method:"Put",params:{dados:"@dados"}}
                    });
                    var dados = JSON.stringify(r.data);
                    servico.update({dados:dados},r=>{
    
                    })
                    console.log("ok");
                })
              
        });
        }catch(e){
            console.log("erro em lança as datas");
        }
       
        
    }
    tratar_data(x){
        var formato =  x.getUTCDate().toString() + "/" +(x.getMonth()+1).toString().padStart(2, '0') + "/" + x.getFullYear().toString();
        return formato;
    }
    pegar_dias(){
        var select = document.getElementsByClassName("dias");
        var numero = select.length;
        if(numero >0){
            var array = [];
            for(var i = 0;i<numero;i++){
              array.push(select[i].value);
            }
            return array;
        }else return alert("preeenchar o(s) campo(s) do(s) dia(s)");
    }
    existe_data(url){
        return new Promise(Response=>{
            var classe =  new this.http_alasql.classe();
            classe.get_json_raiz(url).then(resp=>{
                var datas_dias = url + resp.datas;
                this.http.get(datas_dias).then(r=>{
                    if(r.data.data_inicial =="" && r.data.data_final == "" 
                    &&  r.data.dias_semanas.length == 0){
                        Response("não existe");
                    }
                    else{
                        Response("existe");
                    }
                });
            });
        })
       
    }
    verificar_se_dados(url, v){
        return new Promise(R=>{
            var classe =  new this.http_alasql.classe();
            classe.get_json_raiz(url).then(resp=>{
                var lista_caminhos = resp.lista;
                var i = 0;
               
                while(lista_caminhos.length >i){
                    var resposta =lista_caminhos[i];
                    var r = resposta.replace("/","").replace(".json","");
                    if(r == v){
                        var lista =  url+lista_caminhos[i];
                        classe.get(lista).then(res=>{
                            if(res.data.aulas ==undefined||res.data.aulas==null){
                                R("vazio");
                            }
                            else R("tem dados");
                        })
                    }
                    
                    i++;
                }
                
            });
        })
    }
    grafico_pizza(x,t){
        var presente_exibir = 0;
        var falta_exibir = 0;
        var classe = new this.http_alasql.classe();
        var resposta = x +"/"+t + ".json";
        return new Promise(resp=>{
            classe.get(resposta).then(res=>{
                  
                res.data.aulas.forEach((value,index,array)=>{
                    if(value.chamada == "falta"){
                        falta_exibir++;
                        
                    }
                    if(value.chamada == "presente"){
                        presente_exibir++;
                    }
                    if(array.length -1 == index){
                        var array = {
                            falta:falta_exibir,
                            presente:presente_exibir
                        }
                        resp(array);
                    }
                })
                
            });

        });
    }
    listar_pela_data(x,string,turma)
    {
        var classe = new this.http_alasql.classe();
        var arrays = [];
        return new Promise(resp=>{
                    var urls =  string +"/"+ turma + ".json";
                    classe.get(urls).then(response=>{
                        response.data.aulas.forEach((value,index,array)=>{
                            if(value.datatime == x && value.nome_turma == turma){

                                arrays.push({nome:value.nome,
                                chamada:value.chamada});
                            }
                            else if(array.length -1 == index){
                                resp(arrays);
                            }
                        });
                    })
                });
    }
}
var servico = angular.module("servico",['enviar'])
servico.factory("servicos",function($http,$resource,http_alasql){
    var alasql = new alasqlprograma();
    var date_hora = new date_hora_inicial($http,$resource,http_alasql);
    function insert(nome,chamada,modulo_turmas){
        alasql.insert(nome,chamada,modulo_turmas);
    }
    return{
        adiconar:function(nome,chamada, modulo_turmas){
                insert(nome,chamada,modulo_turmas);
        },
        salvar:function(i,f,string){
            var urls = "http:"+string + ":"+8080;
               date_hora.salvar_date(i,f,urls);
               
        },
        verificar_data:function(string){
            var urls = "http:"+string + ":"+8080;
           return date_hora.existe_data(urls);
        },
        deletar_dados:function(data,id,turma,string){
            var urls = "http:"+string + ":"+8080;
            var formato =  date_hora.tratar_data(data);
           var excluir = new  http_alasql.classe();
           date_hora.verificar_se_dados(urls,turma).then(r=>{
               console.log(r);
               if(r != "vazio")
               {
                excluir.excluir(id,formato,turma,urls);
               }
               else alert("adicione os dados dos idosos");
           })
          
        },
        exiber_dados:function(string,turma){
                var urls = "http:"+string + ":"+8080;
                    return new Promise(p=>{
                        date_hora.verificar_se_dados(urls,turma).then(r=>{
                            if(r != "vazio")
                            {
                               date_hora.grafico_pizza(urls,turma).then(s=>{
                                p(s);
                                
                               })
                                
                            }
                            else alert("adicione os dados das turmas");
                        })
                    })     
    },
    listar_data:function(x,string,turma){
        var date = date_hora.tratar_data(x);
        
        var urls = "http:"+string + ":"+8080;
        
            date_hora.verificar_se_dados(urls,turma).then(r=>{
                if(r != "vazio")
                {
                    date_hora.listar_pela_data(date,urls,turma).then(ps=>{
                        var id = document.getElementById("table");
                        var table = document.createElement("table");
                        var coluna = document.createElement("tr");
                        
                        coluna.className = "Alunos";
                        for(var i = 0;i<ps.length;i++){
                           
                            var linha = document.createElement("th");
                            linha.innerText =" index: "+ i+ "\n" + " Nome:"+" "+ps[i].nome +"\n"+ " "+"Chamada: " + 
                            ps[i].chamada +"\n"+ " " + "Turma: "+turma + "    ";
                            coluna.append(linha);
                        }
                        table.append(coluna);
                        id.append(table);
                    });
                }
            });
    }
    
}
})
