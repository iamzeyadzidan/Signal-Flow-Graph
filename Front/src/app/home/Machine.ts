import Konva from "Konva";
import Arrow from "./arrow";
import Factory from "./Factory";

class Machine implements Factory{
    layer: Konva.Layer
    arrows: Arrow[] = []
    machineGroup: Konva.Group
    ID!:string 
    inn: string[] =[]
    out: string[]= []
    color = 'red'

    constructor(layer: Konva.Layer, shift:number, m:number){
        this.layer = layer  
        var shp = new Konva.Group({        
            x: 150+shift, 
            y: 150+shift, 
            width: 130,
            height: 25,
            rotation: 0, 
            draggable: true,
            name:"Machine",
            id: "m"+m

          })

          shp.add(new Konva.Circle({
            
            radius:40/2,
            stroke: "rgb(0,0,0)",
            strokeWidth: 3,
            fill: this.color,
            name:"Machine",
            id:"Cir"
        }));
          shp.add(new Konva.Text({
            x:-25/2,
            y:-20,
            text:m.toString(),
            fontSize: 30,
            fontStyle:('bold'),
            fontFamily: 'Calibri',
            fill: '#000',
            padding: 5,
            align: 'center',
            name:"Machine"
          }));
          shp.add(new Konva.Rect({
            x:0,
            y:40/2,
            width:0,
            height: 0,
            name:"1"

        }))
        shp.add(new Konva.Rect({
            x:0,
            y:-40/2,
            width:0,
            height: 0,
            name:"2"

        }))
        shp.add(new Konva.Rect({
            x:40/2,
            y:0,
            width:0,
            height: 0,
            name:"3"

        }))
        shp.add(new Konva.Rect({
            x:-40/2,
            y:0,
            width:0,
            height: 0,
            name:"4"

        }))
          this.ID = "m"+m
          this.machineGroup = shp
          this.layer.add(this.machineGroup)
          this.layer.draw();
          return this
     
    }

    //fill:   "#"+(Math.floor(Math.random()*16777215).toString(16)),
      //Konva.Util.getRandomColor()
    update(color:string){
      var x=this.machineGroup.findOne("#Cir")
      x.setAttr("fill",color)
      if(color=="red"){
        var anim = new Konva.Animation(function (frame) {
          var scale = Math.abs(Math.sin((frame.time * 2 * Math.PI) / 2000)) /4+ 1;
          console.log(frame.time+" , "+scale)
          // scale x and y
          if(frame.time<1012)
          x.scale({ x: scale, y: scale });
          // scale only y
          else anim.stop()
        }, this.layer);
        anim.start();
        
      }
    }
set(x: number): void {
    
}
}
export default Machine;
