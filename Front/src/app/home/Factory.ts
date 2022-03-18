import Konva from "Konva";
import Arrow from "./arrow";

export interface  Factory{
    layer: Konva.Layer
    arrows: Arrow[]
    machineGroup: Konva.Group
    ID:string 
    inn: string[]
    out: string[]
    color: string 
    update(x:string):void
    set(x:number):void
}
export default Factory;

