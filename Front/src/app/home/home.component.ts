import { Component, OnInit ,ViewChild,ElementRef } from '@angular/core';
import Konva from 'Konva';
import Operation from "./operation";
import Arrow from "./arrow";

import Selecting from "./selecting"
import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs';
import Machine from './Machine';
import Queue from './Queue';
import Factory from './Factory';
import Requests from './Request';
import { WebSocketAPI } from '../WebSocketAPI';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })

  export class homecomponent implements OnInit {
    m:any
    q:any
    b:any
    repDis:boolean=false
    lastQ:any
    lastM:any
    arrTEXT:string
    products=NaN
    operations: any = new Operation
    Selecting: any = new Selecting
    webSocketAPI: WebSocketAPI;
    MQmap: Map<string,Factory> = new Map

    stage!: Konva.Stage;
    layer!: Konva.Layer;

    drawingArrow : boolean = false
    arrowMode: boolean = false
    shape1!: Konva.Group
    shape2!: Konva.Group

    playMode: boolean = false

    color: string = 'black'
   stroke:number=3
   contextMenu(e:any)
   {
     console.log(e.pageX)
     console.log(e.pageY)
     e.preventDefault()
   }

    ngOnInit(): void {  
      this.webSocketAPI = new WebSocketAPI(this);
      
      this.stage = new Konva.Stage({  //create the stage
        container: 'container',
        width: window.innerWidth,
        height: window.innerHeight
      });
      
      this.layer = new Konva.Layer;
      this.stage.add(this.layer);
      this.Selecting.initiate() 
      var inn=false
      this.stage.on('mousedown', (e) => {
        if (e.target !==this.stage){
          inn = true
         return
         
       }
        this.Selecting.mouseDown(e , this.stage)

      });
      this.stage.on('dragmove', (e) => {
        inn= false
        if(this.Selecting.selectedShapes.length !=0){
          for(var group of this.Selecting.selectedShapes){
            let f = this.MQmap.get(group.getAttr("id"))!
            for(let i=0 ; i<f.arrows.length ; i++){
              f.arrows[i].update()
            }

          }
        }

      });

      this.stage.on('mouseup', (e) => {
        this.Selecting.mouseUp(e , this.stage)


      });

      this.stage.on('click',  (e)=> {
        this.Selecting.click(e , this.stage,this.layer)

        if(this.arrowMode){
          if(this.Selecting.selectedShapes.length !=0){
            if(!this.drawingArrow){
              this.shape1 = this.Selecting.selectedShapes[0]
              console.log(this.shape1.getAbsolutePosition().x+","+this.shape1.getAbsolutePosition().y)
    
              this.drawingArrow = true
            }else{
              this.shape2 = this.Selecting.selectedShapes[0]
              console.log(this.shape2.getAbsolutePosition().x+","+this.shape2.getAbsolutePosition().y)
              if(this.arrTEXT==null){
                this.arrTEXT="1"
                console.log(this.arrTEXT)
              }
              let arr = new Arrow(this.layer, this.MQmap.get(this.shape1.getAttr("id"))! , this.MQmap.get(this.shape2.getAttr("id"))!,this.arrTEXT)
              this.arrTEXT=""
              this.drawingArrow=false
            }
          }
        }

      }); 
      
      
    }
    connect(){
      this.webSocketAPI._connect();

    }

    disconnect(){
      this.webSocketAPI._disconnect();
    }
    /*
    sendMessage(){
      this.webSocketAPI._send(this.name);
    }
    */
    handleMessage(message){
      var x=JSON.parse(message)
      var P=x.product
      var IN=x.in
      var OUT=x.out
      if (IN[0]=='m'){
        this.coloring(P,IN)
        this.queueDec(OUT)
      }
      else if (IN=="q0"){
        this.queueInc(IN)
      }
      
      else{
        for(let i ; i<this.m;i++){
          var s="m"+i
          if(this.MQmap.get(s)!.out.length==0){
            alert ("please finsh each Machine with a Queue")
          }
        }
        this.colorReset(OUT)
        this.queueInc(IN)
        if (this.lastQ.ID==IN&&this.lastQ.contain==this.products){
          this.disconnect()
          this.playMode=false
          document.getElementById('start')!.style.backgroundColor ="rgb(255, 255, 255)";
          for(let key of this.MQmap.keys()) {
            this.MQmap.get(key)!.machineGroup.draggable(true)
        }
        this.repDis=true
        }
      }
    }

    //for doing the event
    Colormap: Map<string,string> = new Map
    colorAssign(num:number){
      for (let i=0 ;i<num;i++){
      var x="p"+i
      this.Colormap.set(x,Konva.Util.getRandomColor())
      }
    }

    coloring(Pid:string,Mid:string){
      this.MQmap.get(Mid)!.update(this.Colormap.get(Pid)!)
      console.log(this.Colormap.get(Pid))
    }
    colorReset(Mid:string){
      this.MQmap.get(Mid)!.update("red")
    }
    queueInc(Qid:string){
      this.MQmap.get(Qid)!.update("inc")
    }
    queueDec(Qid:string){
      this.MQmap.get(Qid)!.update("dec")
    }

    create(name:string)
    {

      var shift = this.operations.checkForShift(this.layer , name)
      switch(name)  {
        case "Machine":
          var M=new Machine(this.layer,shift,this.m)
          this.MQmap.set(M.ID,M)
          this.m++;
          this.lastM=M

          break;  
        case "Queue":
          var Q=new Queue(this.layer,shift,this.q)
          this.MQmap.set(Q.ID,Q)
          this.q++;
          this.lastQ=Q
          break;
      }
      if(this.arrowMode){
        this.arrowButton()
      }
    
  }

  arrowButton(){
    if(this.arrowMode){
      this.arrowMode=false
      document.getElementById('arrow')!.style.backgroundColor ="rgb(255, 255, 255)";
      document.getElementById('arrTEXT')!.style.display ="none";

    }else{
      this.arrowMode = true
      document.getElementById('arrTEXT')!.style.display ="block";
      document.getElementById('arrow')!.style.backgroundColor ="#777777";

    }
    this.drawingArrow =false
    this.Selecting.emptytr()


  }
 



  constructor(public http: HttpClient){ 
      this.q=0
      this.m=0

  }
}