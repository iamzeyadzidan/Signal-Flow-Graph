import Konva from "Konva";
import Arrow from "./arrow";
import Factory from "./Factory" ;
import Machine from "./Machine";
class Queue implements Factory{
    layer: Konva.Layer
    arrows: Arrow[] = []
    machineGroup: Konva.Group
    ID!:string
    inn: string[] =[]
    out: string[]= []
    color = 'lightblue'
    contain:number=0

    constructor(layer: Konva.Layer, shift:number, q:number){
        this.layer = layer  
        var shp = new Konva.Group({        
            x: 150+shift, 
            y: 150+shift, 
            width: 130,
            height: 25,
            rotation: 0, 
            draggable: true,
            name:"Queue",
            id: "q"+q
          })

          shp.add(new Konva.Rect({
        
            width: 75,
            height: 75,
            stroke: "rgb(0,0,0)",
            strokeWidth: 3,
            fill: this.color,
            name:"Queue",
    
        }));
        shp.add(new Konva.Text({
          x:15,
          y:5,
          text:"Q"+q,
          fontFamily: 'Calibri',
          fontSize: 30,
          fontStyle:('bold'),
          fill: '#000',
          padding: 5,
          align: 'center',
          name:"Queue"

        }));
        shp.add(new Konva.Text({
            x:20,
            y:30,
            text:this.contain.toString(),
            fontFamily: 'Calibri',
            fontSize: 30,
            fontStyle:('bold'),
            fill: '#000',
            padding: 5,
            align: 'center',
            name:"Queue",
            id:"contain"
          }));
        shp.add(new Konva.Rect({
            x:0,
            y:75/2,
            width:0,
            height: 0,
            name:"1"

        }))
        shp.add(new Konva.Rect({
            x:75,
            y:75/2,
            width:0,
            height: 0,
            name:"2"

        }))
        shp.add(new Konva.Rect({
            x:75/2,
            y:0,
            width:0,
            height: 0,
            name:"3"

        }))
        shp.add(new Konva.Rect({
            x:75/2,
            y:75,
            width:0,
            height: 0,
            name:"4"

        }))

          this.ID = "q"+q
          this.machineGroup = shp
          this.layer.add(this.machineGroup)
          this.layer.draw();

     
    }

    update(x:string): void {
        var TXT= new Konva.Text({
            x:20,
            text:"+1",
            fontFamily: 'Calibri',
            fontSize: 30,
            fontStyle:('bold'),
            fill: '#000',
            padding: 5,
            align: 'center',
          }) 
          this.machineGroup.add(TXT)
          TXT.moveToBottom()

        if(x=="inc"){
            this.contain++
            var anim = new Konva.Animation(function (frame) {
                var scale = (frame.time)%1012
                console.log(frame.time+" , "+scale)
                // scale x and y
                if(frame.time<1012){
                TXT.y((-30)-Math.ceil(scale/6));
                if((Math.ceil(1000-scale)/1011)>=0)
                TXT.opacity( Math.ceil(1000-scale)/1011)
                else
                TXT.opacity(0)
                }
                else {
                  anim.stop()
                  TXT.destroy()
                }
                // scale only y
              }, this.layer);
              anim.start();
              
            }
        
        if(x=="dec"){
            this.contain--
            TXT.text("-1")
            var anim = new Konva.Animation(function (frame) {
                var scale = (frame.time)%1012
                console.log(frame.time+" , "+scale)
                // scale x and y
                if(frame.time<1012){
                TXT.y((40)+Math.ceil(scale/6));
                if((Math.ceil(1000-scale)/1011)>=0)
                TXT.opacity( Math.ceil(1000-scale)/1011)
                else
                TXT.opacity(0)
                }
                else {
                  anim.stop()
                  TXT.destroy()
                }
                // scale only y
              }, this.layer);
              anim.start();

            }
        var xx=this.machineGroup.findOne("#contain")
        console.log("this.contain")
        xx.setAttr("text",this.contain.toString())
        this.layer.add(this.machineGroup)
        this.layer.draw()
    }
    set(x:number):void{
        this.contain=x
        var xx=this.machineGroup.findOne("#contain")
        xx.setAttr("text",this.contain.toString())  
        this.layer.draw()

    }

}
export default Queue;
