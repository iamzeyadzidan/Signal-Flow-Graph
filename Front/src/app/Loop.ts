export class Loop{
    loops=[];
    finished=[];
    visited=[];
    weight=[[]]
    numberOfNode:number
    constructor(n:number){
        this.numberOfNode=n
        this.visited=Array(n).fill(false);
        this.finished=Array(n).fill(false);
        this.weight = Array(n).fill(null).map(()=>Array(n).fill(100000000))
    }
    getAllLoop(graph:number[][]){
        console.log(graph)
        for(let i=0;i<this.numberOfNode;i++){
            if(graph[i][i]!=0){
                this.loops.push(i.toString())
            }
        }
        console.log(this.loops);
        for(let i=0;i<this.numberOfNode;i++){
            if(!this.finished[i]){
                this.getComplexLoop(graph,i,[]);
                console.log(this.finished)
            }
        }
    }
    getComplexLoop(graph: number[][],current:number,way:string[]) {

        if(current.toString()==way[0]){
            let start=way.indexOf(current.toString())
            let allWay=""
            let weight=0
            for(let i=start;i<way.length;i++){
                // if((i+1)<way.length){
                //     weight+=this.weight[way[i]][way[i+1]]
                // }
                allWay=allWay.concat(way[i])
                // if((i+1)<way.length){
                //     this.weight[way[i]][way[i+1]]=-1
                // }
            }
            weight+=this.weight[way[way.length-1]][current]
            this.weight[way[way.length-1]][current]=-1
            allWay=allWay.concat(current.toString())
            // if(weight>0){
                console.log(this.weight)
                console.log(weight)
                this.loops.push(allWay)
            // }
            return;
        }
        if(this.visited[current]){
            return
        }
        this.visited[current]=true
        way.push(current.toString())
        for(let i=0;i<this.numberOfNode;i++){
            if(current==i){
                continue;
            }
            else{
                if(graph[current][i]!=0){
                    this.getComplexLoop(graph,i,way)
                }
            }
        }
        this.visited[current]=false;
        way.pop()
        if(way.length==0){
            this.finished[current]=true
                    for(let i=0;i<this.numberOfNode;i++){
            graph[i][current]=0;
        }
        }

    }
}