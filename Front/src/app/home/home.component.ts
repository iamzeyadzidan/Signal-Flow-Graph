import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import Konva from "Konva";
import Operation from "./operation";
import Arrow from "./arrow";

import Selecting from "./selecting";

import Machine from "./Machine";
import Factory from "./Factory";
import { Loop } from "../loop";
import { path } from "../path";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class homecomponent implements OnInit {
  m: any;
  b: any;
  repDis: boolean = false;
  lastM: any;
  arrTEXT: string;
  products = NaN;
  operations: any = new Operation();
  Selecting: any = new Selecting();
  MQmap: Map<string, Factory> = new Map();

  stage!: Konva.Stage;
  layer!: Konva.Layer;

  drawingArrow: boolean = false;
  arrowMode: boolean = false;
  shape1!: Konva.Group;
  shape2!: Konva.Group;

  playMode: boolean = false;

  color: string = "black";
  stroke: number = 3;

  ngOnInit(): void {
    this.stage = new Konva.Stage({
      //create the stage
      container: "container",
      width: window.innerWidth,
      height: window.innerHeight,
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    this.Selecting.initiate();
    var inn = false;
    this.stage.on("mousedown", (e) => {
      if (e.target !== this.stage) {
        inn = true;
        return;
      }
      this.Selecting.mouseDown(e, this.stage);
    });
    this.stage.on("dragmove", (e) => {
      inn = false;
      if (this.Selecting.selectedShapes.length != 0) {
        for (var group of this.Selecting.selectedShapes) {
          let f = this.MQmap.get(group.getAttr("id"))!;
          for (let i = 0; i < f.arrows.length; i++) {
            f.arrows[i].update();
          }
        }
      }
    });

    this.stage.on("mouseup", (e) => {
      this.Selecting.mouseUp(e, this.stage);
    });

    this.stage.on("click", (e) => {
      this.Selecting.click(e, this.stage, this.layer);

      if (this.arrowMode) {
        if (this.Selecting.selectedShapes.length != 0) {
          if (!this.drawingArrow) {
            this.shape1 = this.Selecting.selectedShapes[0];
            console.log(
              this.shape1.getAbsolutePosition().x +
                "," +
                this.shape1.getAbsolutePosition().y
            );

            this.drawingArrow = true;
          } else {
            this.shape2 = this.Selecting.selectedShapes[0];
            console.log(
              this.shape2.getAbsolutePosition().x +
                "," +
                this.shape2.getAbsolutePosition().y
            );
            if (this.arrTEXT == null) {
              this.arrTEXT = "1";
              console.log(this.arrTEXT);
            }
            let arr = new Arrow(
              this.layer,
              this.MQmap.get(this.shape1.getAttr("id"))!,
              this.MQmap.get(this.shape2.getAttr("id"))!,
              this.arrTEXT
            );
            this.arrTEXT = null;
            this.drawingArrow = false;
          }
        }
      }
    });
  }

  /*
    sendMessage(){
      this.webSocketAPI._send(this.name);
    }
    */

  //for doing the event

  create(name: string) {
    var shift = this.operations.checkForShift(this.layer, name);
    switch (name) {
      case "Machine":
        var M = new Machine(this.layer, shift, this.m);
        this.MQmap.set(M.ID, M);
        this.m++;
        this.lastM = M;

        break;
    }
    if (this.arrowMode) {
      this.arrowButton();
    }
    // let lloo=new Loop(6);
    // var multi:number[][] = [[1,1,0,0,0,1],[0,1,1,0,0,0],[1,0,0,1,0,0],[0,0,1,0,1,1],[0,0,0,0,0,1],[1,0,0,1,1,0]]
    // let lloo=new Loop(4);
    // var multi:number[][] = [[0,1,0,0],[0,1,1,0],[1,0,0,1],[0,0,1,0]]
    let vertex = ["0", "1", "2", "3", "4", "5", "6", "7"];
    let fPath = new path(8, ["0", "1", "2", "3", "4", "5", "6", "7"]);
    var multi: number[][] = [
      [0, 1, 0, 0, 0, 0, 0, 1],
      [0, 0, 1, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 1, 0, 1],
      [0, 0, 0, 0, 0, 0, 1, 0],
    ];
    for(let i = 0; i < 8; i++)
    {
      for(let j = 0; j < 8; j++)
      {
        if(multi[i][j])
        {
          fPath.addEdge(vertex[i], vertex[j], "2");
        }
      }
    }
    // lloo.getAllLoop(multi);
    // lloo.nonTouched();
    // console.log(lloo.loops);
    fPath.printAllPaths("0", "4");
    let hhh = fPath.getPaths();
    console.log(hhh);
    console.log(fPath.getPathValue(hhh[0], false));
  }

  arrowButton() {
    if (this.arrowMode) {
      this.arrowMode = false;
      document.getElementById("arrow")!.style.backgroundColor =
        "rgb(255, 255, 255)";
      document.getElementById("arrTEXT")!.style.display = "none";
    } else {
      this.arrowMode = true;
      document.getElementById("arrTEXT")!.style.display = "block";
      document.getElementById("arrow")!.style.backgroundColor = "#777777";
    }
    this.drawingArrow = false;
    this.Selecting.emptytr();
  }

  constructor() {
    this.m = 0;
  }
}
