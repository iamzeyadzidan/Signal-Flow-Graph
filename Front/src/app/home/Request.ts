import Factory from "./Factory";
import { HttpClient } from '@angular/common/http';

class Requests{

    playRequest(MQmap: Map<string,Factory>,prod:number){
        let q = {}
        let m = {}
        for(let key of MQmap.keys()) {
            let oneq ={
                "in": MQmap.get(key)!.inn,
                "out": MQmap.get(key)!.out
            }
            if(key.charAt(0)=="q"){
                q[key]= oneq
            }else{
                m[key]= oneq
            }
        }
        console.log(q)
        let strq=JSON.stringify(q)
        let strm=JSON.stringify(m)
        console.log(strq)
        console.log(strm)

        this.http.get('http://localhost:8080/input',{
            responseType:'text',
            params:{ 
                frontq:strq,
                frontm:strm,
                products:prod.toString()
            },
            observe:'response'
          }).subscribe(response=>{
            console.log(response.body!)
          })

    }
    constructor(public http: HttpClient){ 
    }


}
export default Requests;
