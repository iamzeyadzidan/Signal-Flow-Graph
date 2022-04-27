import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import Konva from "Konva";
import Operation from "./operation";
import Arrow from "./arrow";

import Selecting from "./selecting";

import Machine from "./Machine";
import Factory from "./Factory";
import { Loop } from "../loop";
import { path } from "../path";
import { MasonCalculator } from "../MasonCalculator";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class homecomponent implements OnInit {
  m: any;
  b: any;
  arrowArray:string[][]
  a:any;
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
            this.arrowArray.push([this.shape1.getAttr("id"),this.shape2.getAttr("id"),this.arrTEXT])
            console.log(this.arrowArray)
            console.log(this.a)
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
    let lloo=new Loop();
    // var multi:number[][] = [[0,1,0,0],[0,1,1,0],[1,0,0,1],[0,0,1,0]]
    let vertex = ["0", "1", "2", "3", "4", "5", "6", "7"];
    let fPath = new path(8, vertex);
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
    // var multi:number[][] = [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]

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
    console.log(fPath.adjList)
    lloo.getAllLoop(fPath.adjList);
    // lloo.nonTouched();
    console.log(lloo.loops);
    fPath.printAllPaths("0", "3");
    let hhh = fPath.getPaths();
    console.log(hhh);
    console.log(fPath.getPathValue(hhh[0]));
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
  play(){
    // var adj:number[][]=new Array(this.m).fill(new Array(this.m).fill(0));
    var adj = [];
    for(let i = 0; i < this.m; i++) {
      adj[i] = [];
        for(let j = 0; j <this.m; j++) {
          adj[i][j] = 0;
        }
    }
    for(let i =1;i<this.arrowArray.length;i++){
      if(isNaN(+this.arrowArray[i][2]))
      adj[+(this.arrowArray[i][0].slice(1))][+(this.arrowArray[i][1].slice(1))]=this.arrowArray[i][2]
      else
      adj[+(this.arrowArray[i][0].slice(1))][+(this.arrowArray[i][1].slice(1))]=+this.arrowArray[i][2]

    }
    console.log("Hellllllo")
    console.log(adj)
    let vertices = []
    for(let i = 0; i < adj[0].length; i++)
    {
      vertices.push(String(i))
    }
    let numVertices  = vertices.length
    let fPath = new path(numVertices, vertices)
    for(let i = 0; i < numVertices; i++)
    {
      for(let j = 0; j < numVertices; j++)
      {
        if(adj[i][j])
        {
          fPath.addEdge(vertices[i], vertices[j], adj[i][j])
        }
      }
    }
    fPath.printAllPaths(vertices[0], vertices[numVertices - 1])
    let loops =new Loop()
    loops.getAllLoop(fPath.adjList)
    //printing forward paths
    let forwardPaths = fPath.getPaths();
    console.log(forwardPaths)
    let masonCalculator = new MasonCalculator(fPath, loops)
    masonCalculator.calculateUsingMasonFormula();
    console.log("Result = " + masonCalculator.masonResult.toString());
    let result = "Forward Paths:\n"
    for(let i = 0; i < forwardPaths.length; i++)
    {
      let temp = "path " + String(i - 1) + ": {" + forwardPaths[i].join(", ")+ "} its weigth = " + String(fPath.getPathValue(forwardPaths[i]))
      result += "\t" + temp + "\n"
    }
    console.log(result)
  }
  constructor() {
    this.m = 0;
    this.arrowArray=[[]]
    this.a = 0;
  }
}
