import { Component, OnInit } from '@angular/core';
import Konva from 'Konva';

class Selecting{

    tr:any   // transformar the square aroud the selected shape
    selected:any  //the big rectange on multible shape selection

    selectedShapes: Konva.Group[] = []
    move:boolean = false
    // for vertices of the selected rectangle
    x1:any
    x2:any
    y1:any
    y2:any


    initiate(){
        this.tr= new Konva.Transformer();
        this.selected = new Konva.Rect({
          height:75,
          width:75,
          fill: 'rgba(0,0,55,0.5)',
          visible: false,
        });
    }

    mouseDown(e:any , stage: Konva.Stage){

        e.evt.preventDefault();
        this.x1 = stage.getPointerPosition().x;
        this.y1 = stage.getPointerPosition().y;
        this.x2 = stage.getPointerPosition().x;
        this.y2 = stage.getPointerPosition().y;
        this.selected.visible(true);
        this.selected.width(0);
        this.selected.height(0);
    }
     
    mouseMove(e:any , stage: Konva.Stage){
        if (!this.selected.visible()) {
            this.move = true
            return;
          }
          e.evt.preventDefault();
          this.x2 = stage.getPointerPosition().x
          this.y2 = stage.getPointerPosition().y
          this.selected.setAttrs({
            x: Math.min(this.x1, this.x2),
            y: Math.min(this.y1, this.y2),
            width: Math.abs(this.x2 - this.x1),
            height: Math.abs(this.y2 - this.y1),
        });
        this.move = false
    }

    mouseUp(e:any , stage: Konva.Stage){
        if (!this.selected.visible()) {
            return;
          }
          e.evt.preventDefault();
          setTimeout(() => {this.selected.visible(false);});
          var shapes = stage.find('.Machine');
          if(shapes== null){
            shapes = stage.find('.Queue');
          }
          var box = this.selected.getClientRect();
          var select = shapes.filter((shape) =>
            Konva.Util.haveIntersection(box, shape.getClientRect())
          );
          this.tr.nodes(select);
          //this.selectedShapes = select
          console.log(this.selectedShapes.length)
    }

    click(e:any , stage: Konva.Stage , layer :Konva.Layer){
          if (this.selected.visible()) {
            console.log("a")
            return;
          }
          if (e.target === stage) {
            console.log("b")

            this.emptytr()
            return
          }
          if(e.target.hasName('Machine')){
            var group =e.target.findAncestor('.Machine')
            console.log("ss")
          }
          else if (e.target.hasName('Queue')){
            var group = e.target.findAncestor('.Queue')
          }else{
            return 
          }
          console.log(group.getAttr('id'))
          /*
          if (!group.hasName('Machine') && !group.hasName('Queue')) {
            console.log("c")
            return;
          }
          */

  
          var shape = group.findOne( (node: Konva.Node) => {
            return node.getType() === 'Shape'
           })
           console.log(shape)

          const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
          const isSelected = this.tr.nodes().indexOf(shape) >= 0;
          if (!metaPressed && !isSelected) {
            this.tr.nodes([shape]);
            console.log("aa")
            
          } else if (metaPressed && isSelected) {
            const nodes = this.tr.nodes().slice(); 
            nodes.splice(nodes.indexOf(shape), 1);
            this.tr.nodes(nodes);
            console.log("bb")

          } else if (metaPressed && !isSelected) {
            const nodes = this.tr.nodes().concat([shape]);
            this.tr.nodes(nodes);
            console.log("cc")
          }
          this.selectedShapes= [group]
          
          console.log(this.tr.visible())
          console.log(this.tr)
          console.log(this.selected)
          console.log(e.target)
          layer.add(this.tr)
          layer.add(this.selected)
          layer.draw()
    }

    emptytr(){
        this.tr.nodes([]);
    }
    



}
export default Selecting;
