import Konva from "Konva";
import Factory from "./Factory";

class Arrow{
    shape1!: Factory
    shape2!: Factory
    layer!: Konva.Layer
    arrow!: Konva.Group

    sh1!: Konva.Group
    sh2!: Konva.Group


    constructor(layer: Konva.Layer, shape1: Factory , shape2: Factory){
        var id1 = shape1.ID
        var id2 = shape2.ID
        console.log(id1.charAt(0) == id2.charAt(0))
        console.log(shape1.inn.find(x=>x==id2))

        if( shape1.inn.find(x=>x==id2)!=undefined ||shape1.out.find(x=>x==id2) !=undefined ){
            alert("Invalid Arrow")
            return
        }
        
        shape1.out.push(id2)
        shape2.inn.push(id1)

        this.shape1 = shape1
        this.shape2 = shape2
        this.layer = layer 
        if(id1.charAt(1)>id2.charAt(1))
        this.arrow=this.Arrow2()
        else
        this.arrow = this.Arrow()
        layer.add(this.arrow)
        this.arrow.moveToBottom()
        this.layer.draw();

        shape1.arrows.push(this)
        shape2.arrows.push(this)
        console.log(shape1.out)

    }

    Arrow(){
        this.sh1 = this.shape1.machineGroup
        this.sh2 = this.shape2.machineGroup
        let pos = this.getShorterBath()
        let pos1 = pos[0]
        let pos2 = pos[1]

        console.log(this.sh1,this.sh2)
        var shp=new Konva.Group({})
        var arrow = new Konva.Arrow({
            points: [pos1.x , pos1.y  , pos2.x , pos2.y ],
            pointerLength: 10,
            pointerWidth: 10,
            fill: 'black',
            stroke: 'black',
            strokeWidth: 4
        });
        shp.add(arrow)
        return shp 


    }

    getShorterBath(){
        let pos1 = this.sh1.getAbsolutePosition()
        let pos2 = this.sh2.getAbsolutePosition()
        let short = 10000
        for(let i=1 ; i<=4 ; i++){
            for(let j=1 ; j<=4 ; j++){
                var s="."+i
                var k="."+j
                let p1 = this.sh1.findOne(s).getAbsolutePosition()
                let p2 = this.sh2.findOne(k).getAbsolutePosition()
                var d = Math.sqrt( (p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y))
                if(d<short){
                    pos1 = p1
                    pos2 = p2
                    short = d
                }
            
            }   
        }
        return [pos1,pos2]
    }
/*
    public update(){
        let pos = this.getShorterBath()
        console.log(pos[0].x+","+pos[0].y+"    "+pos[1].x+","+pos[1].y)
        let pos1 = pos[0]
        let pos2 = pos[1]
        var p=[pos1.x , pos1.y  , pos2.x , pos2.y ];
        
        this.arrow.setAttr("points", p) ;
        this.layer.draw();

    }*/



    Arrow2(){
        this.sh1 = this.shape1.machineGroup
        this.sh2 = this.shape2.machineGroup
        let pos = this.getShorterBath()
        let pos1 = pos[0]
        let pos2 = pos[1]
        let x=(pos1.x+pos2.x)/2
        let y=-100
        console.log(this.sh1,this.sh2)
        var shp=new Konva.Group({})
        shp.add(new Konva.Arrow({
            points: [x , pos1.y+y  , pos2.x , pos2.y ],
            pointerLength: 10,
            pointerWidth: 10,
            fill: 'black',
            stroke: 'black',
            strokeWidth: 4
        }))
        shp.add(new Konva.Line({
            points: [pos1.x , pos1.y  , x , pos1.y+y ],
            pointerLength: 10,
            pointerWidth: 10,
            fill: 'black',
            stroke: 'black',
            strokeWidth: 4
        }))
        shp.add(new Konva.Text({
            x:x-30, 
            y:pos1.y+y-40,
            text:"Hello",
            fontSize: 30,
            fontStyle:('bold'),
            fontFamily: 'Calibri',
            fill: '#000',
            padding: 5,
            align: 'center',
            name:"Machine"
          }));
        return shp 


    }
    
    public update(){
        let pos = this.getShorterBath()
        console.log ("mawhoom")
        let pos1 = pos[0]
        let pos2 = pos[1]
        var p1=[pos1.x , pos1.y  , (pos1.x+pos2.x)/2, pos1.y-100 ];
        var p2=[(pos1.x+pos2.x)/2 , pos1.y-100  , pos2.x , pos2.y ];
        var arrow = this.arrow.getChildren(function(node){
            return node.getClassName() === 'Arrow';
         });
         var line = this.arrow.getChildren(function(node){
            return node.getClassName() === 'Line';
         });
         var text = this.arrow.getChildren(function(node){
            return node.getClassName() === 'Text';
         });
         line[0].setAttr("points", p1) ;
        arrow[0].setAttr("points", p2) ;
        text[0].setAttr("x",((pos1.x+pos2.x)/2)-30)
        text[0].setAttr("y",pos1.y-140)
        this.layer.draw();

    }
    


}
export default Arrow;
