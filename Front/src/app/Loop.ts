export class Loop {
  loops = [];
  finished = [];
  visited = [];
  //place 0 mean 2 non touch place 1 mean 3
  nonTouchedloop = [[]];
  // weight = [[]];
  numberOfNode: number;
  constructor(n: number) {
    this.numberOfNode = n;
    this.visited = Array(n).fill(false);
    this.finished = Array(n).fill(false);
    // this.weight = Array(n)
      // .fill(null)
      // .map(() => Array(n).fill(100000000));
  }
  getAllLoop(graph: number[][]) {
    console.log(graph);
    for (let i = 0; i < this.numberOfNode; i++) {
      if (graph[i][i] != 0) {
        this.loops.push(i.toString());
      }
    }
    console.log(this.loops);
    for (let i = 0; i < this.numberOfNode; i++) {
      if (!this.finished[i]) {
        this.getComplexLoop(graph, i, []);
        console.log(this.finished);
      }
    }
  }
  getComplexLoop(graph: number[][], current: number, way: string[]) {
    if (current.toString() == way[0]) {
      let start = way.indexOf(current.toString());
      let allWay = "";
      let weight = 0;
      for (let i = start; i < way.length; i++) {
        // if((i+1)<way.length){
        //     weight+=this.weight[way[i]][way[i+1]]
        // }
        allWay = allWay.concat(way[i]);
        // if((i+1)<way.length){
        //     this.weight[way[i]][way[i+1]]=-1
        // }
      }
      // weight += this.weight[way[way.length - 1]][current];
      // this.weight[way[way.length - 1]][current] = -1;
      allWay = allWay.concat(current.toString());
      // if(weight>0){
      // console.log(this.weight);
      // console.log(weight);
      this.loops.push(allWay);
      // }
      return;
    }
    if (this.visited[current]) {
      return;
    }
    this.visited[current] = true;
    way.push(current.toString());
    for (let i = 0; i < this.numberOfNode; i++) {
      if (current == i) {
        continue;
      } else {
        if (graph[current][i] != 0) {
          if (this.finished[i]) {
            continue;
          }
          this.getComplexLoop(graph, i, way);
        }
      }
    }
    this.visited[current] = false;
    way.pop();
    if (way.length == 0) {
      this.finished[current] = true;
      //             for(let i=0;i<this.numberOfNode;i++){
      //     graph[i][current]=0;
      // }
    }
  }
  // getNonTouchedLoop(graph:number[][]){
  //     //make all loops non touching
  //     let noneTouched=[]
  //     for(let i=0;i<this.loops.length;i++){
  //         noneTouched[i]=[]
  //         for(let j=0;j<this.loops.length;j++){
  //             if(i!=j){
  //                 noneTouched[i].push(j)
  //             }
  //         }
  //     }
  //     let path = new Map<number, number[]>();
  // for(let i=0;i<graph.length;i++){
  //     for(let j=0;j<this.loops.length;j++){
  //         if(this.loops[j].includes(i)){
  //             if(!path.has(i)){
  //                 path.set(i,[]);
  //             }
  //             path.get(i).push(j);
  //         }
  //     }
  // }
  // for(let k of path.keys()){
  //     let pathsThrowNode=path.get(k)
  //     for(let j of pathsThrowNode){
  //         for(let i of pathsThrowNode){
  //             if(j!=i){
  //                 var itemToRemove = i;
  //                 var index = noneTouched[j].indexOf(itemToRemove);
  //                 console.log(index)
  //                 console.log(i+" willll "+j)
  //                 console.log(pathsThrowNode)
  //                 var removedItems = noneTouched[j].splice(index, 1);
  //                 console.log(removedItems+ " is removed ")
  //             }
  //         }
  //     }
  // }
  // console.log(path)
  //     console.log(noneTouched)
  // }
  getCombinations(valuesArray: String[]) {
    var combi = [];
    var temp = [];
    var slent = Math.pow(2, valuesArray.length);

    for (var i = 0; i < slent; i++) {
      temp = [];
      for (var j = 0; j < valuesArray.length; j++) {
        if (i & Math.pow(2, j)) {
          temp.push(valuesArray[j]);
        }
      }
      if (temp.length > 0) {
        combi.push(temp);
      }
    }

    combi.sort((a, b) => a.length - b.length);
    console.log(combi.join("\n"));
    return combi;
  }
  nonTouched() {
    let allPossibleCombination = this.getCombinations(this.loops);
    //check all possible combination
    var removedItems = allPossibleCombination.splice(0, this.loops.length);
    console.log(allPossibleCombination);
    for (let i = 0; i < allPossibleCombination.length; i++) {
      //map to map each key to value and check if it exist or not if exist then there atleast two non touched loops
      // and remove it from all comination
      let path = [];
      // for(let j=0;j<allPossibleCombination[i].length;j++){
      console.log(allPossibleCombination[i]);
      console.log(allPossibleCombination.length);
      for (let j of allPossibleCombination[i]) {
        console.log(j);
        //flag to  check if loop
        let flag = false;
        for (let k = 0; k < (<string>j).length - 1; k++) {
          console.log(path);
          console.log((<string>j).charAt(k));

          console.log(path.indexOf((<string>j).charAt(k)));
          if (path.indexOf((<string>j).charAt(k)) > -1) {
            console.log(allPossibleCombination.splice(i, 1));
            // console.log(allPossibleCombination.splice(0))
            i--;
            flag = true;
            break;
          }
          path.push(j.charAt(k));
        }
        if (flag) {
          break;
        }
      }
    }
    console.log(allPossibleCombination);
  }
}
