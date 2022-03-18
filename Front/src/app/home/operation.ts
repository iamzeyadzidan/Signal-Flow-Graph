import { Component, OnInit } from '@angular/core';
import Konva from 'Konva';

class Operation{
    shift: number = 0


    checkForShift(layer: Konva.Layer, name:string){
        var children = layer.getChildren();
        let n:number = 0 
        this.shift = 0
        let done: boolean = false
        while(!done){
            done = true
            for(let i=0 ; i<children.length ; i++){
                if(children[i].getClassName() != 'Line' && name != 'line'){
                    if(children[i].x() == 150 + this.shift && children[i].y() == 150 + this.shift){
                        this.shift += 10
                        done = false
                    }
                }else if(children[i].getClassName() == 'Line' && name == 'line'){
                    var line = children[i] as Konva.Line
                    if(line.points()[0] - line.x() == 150+this.shift && line.points()[1] - line.y() == 150+this.shift ){
                        this.shift += 10
                        done = false
                    }
                }
            }
        }

        return this.shift
    }




}
export default Operation;

