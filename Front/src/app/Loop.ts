export class Loop {
  loops = [];
  //place 0 mean 2 non touch place 1 mean 3
  nonTouchedloop = [[]];
  // weight = [[]];
  constructor() {
  }
  //function to find all possible loops in givien graph by doing dfs 
  //around graph
  getAllLoop(graph:Map<string, []>) {
    console.log(graph);
    let isVisited = new Map<string, boolean>();
    let isFinished = new Map<string, boolean>();
    for (let i of graph.keys()) {
      isVisited.set(i, false);
      isFinished.set(i, false);
    }
    console.log(this.loops);
    for (let i of graph.keys()) {
      if (!isFinished.get(i)) {
        this.getComplexLoop(graph, i, [],isVisited,isFinished);
        console.log(isFinished);
      }
    }
    this.nonTouched()
    console.log("0                           0       "+this.loops)
  }
  getComplexLoop(graph:Map<String, []>, current: string, way: string[],isVisited:  Map<string, boolean>,isFinished:  Map<string, boolean>) {
    if (current.toString() == way[0]) {
      let start = way.indexOf(current.toString());
      let allWay = "";
      let weight = 0;
      for (let i = start; i < way.length; i++) {
        allWay = allWay.concat(way[i]);
      }
      allWay = allWay.concat(current.toString());
      this.loops.push(allWay);
      return;
    }
    if (isVisited.get(current)) {
      return;
    }
    isVisited.set(current,true)
    way.push(current.toString());
    for (let i of graph.get(current)) {
      if (current == i&&i==way[0]) {
        this.loops.push(current)
      } else {
          if (isFinished.get(i)) {
            continue;
          }
          this.getComplexLoop(graph, i, way,isVisited,isFinished);
      }
    }
    isVisited.set(current, false);
    way.pop();
    if (way.length == 0) {
      isFinished.set(current, true);
    }
  }
  /*
  that function find every possible combination
  */
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
      console.log(allPossibleCombination[i]);
      console.log(allPossibleCombination.length);
      for (let j of allPossibleCombination[i]) {
        console.log(j);
        //flag to  check if loop neded 
        let flag = false;
        /*
        add all nodes to combination 
        if loop only existance once then the two loops not touched
        */ 
        for (let k = 0; k < (<string>j).length ; k++) {
          if(k==j.length-1&&j.length!=1){
            continue;
          }
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
    console.log("alllllllllllllllll ")
    this.nonTouchedloop=allPossibleCombination
    console.log(this.nonTouchedloop );
    return allPossibleCombination
  }
}
