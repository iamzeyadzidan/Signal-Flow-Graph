export class path
{
    v: number;
    adjList: any;
    vertices: any;
    forwardPaths: any;
    edgesVal: any;
    constructor(n: number, vList: String[])
    {
        this.v = n;
        this.vertices = vList;
        this.edgesVal = new Map<String, String>();
        this.forwardPaths = [];
        this.initAdjList();
    }
    initAdjList()
    {
        this.adjList = new Map<String, String[]>();    
        for (let i = 0; i < this.v; i++)
        {
            this.adjList.set(this.vertices[i], []);
            // console.log("EEEEE   " + this.vertices[i])
        }
        // console.log("Hoooo:   " + this.adjList.keys());
    }
    addEdge(u: string, v: string, weight: String)
    {
        this.adjList.get(u).push(v);
        let temp = u.concat(v);
        this.edgesVal.set(temp, weight);
        // console.log("GG:    " + this.edgesVal.get(temp))
    }
    // isVisited.set(u, true);
    // for (let i = 0; i < this.adjList.get(u).length; i++) {
    //   if (!isVisited.get(this.adjList.get(u)[i])) {
    //     localPathList.push(this.adjList.get(u)[i]);
    //     this.findAllPathsUtil(
    //       this.adjList.get(u)[i],
    //       d,
    //       isVisited,
    //       localPathList
    //     );
    //     localPathList.splice(
    //       localPathList.indexOf(this.adjList.get(u)[i]),
    //       this.adjList.get(u)[i].length
    //     );
    //   }
    // }
    printAllPaths(s: string,d: string)
    {
        let isVisited = new Map<String, boolean>();
        for(let i = 0; i < this.v; i++)
        {
            isVisited.set(this.vertices[i], false);
        }
        let pathList = [];
        pathList.push(s);
        this.findAllPathsUtil(s, d, isVisited, pathList);
    }
    findAllPathsUtil(u: string,d: string, isVisited,localPathList)
    {
        if (u == d)
        {
            let h = []
            for(let i = 0; i < localPathList.length; i++)
            {
                h.push(localPathList[i]);
            }
            this.forwardPaths.push(h);
            console.log("found");
            // console.log(this.adjList)
            return;
        }
            isVisited.set(u, true);
            for (let i = 0; i < this.adjList.get(u).length;i++) 
            {
                if (!isVisited.get(this.adjList.get(u)[i]))
                {
                    // console.log("hiiii:   "+ u +"  TO "+this.adjList.get(u)[i])
                    localPathList.push(this.adjList.get(u)[i]);
                    this.findAllPathsUtil(this.adjList.get(u)[i], d, isVisited, localPathList);
                    localPathList.splice(localPathList.indexOf(this.adjList.get(u)[i]), 1);
                }
            }
            isVisited.set(u, false);
    }
    getPaths()
    {
        return this.forwardPaths;
    }
    getPathValue(path: any, isNum: boolean)
    {
        let ans;
        let u: string;
        let v: string;
        if(isNum)
        {
            ans = 0;
        }
        else
        {
            ans = "";
        }
        for(let i = 0; i < path.length - 1; i++)
        {
            u = path[i];
            v = path[i + 1];
            if(isNum)
            {
                ans = ans * Number(this.edgesVal.get(u + v));
            }
            else
            {
                if(i != path.length - 2)
                {
                    ans = ans + this.edgesVal.get(u + v) + " * ";
                }
                else
                {
                    ans = ans + this.edgesVal.get(u + v);
                }
            }
        }
        return ans;
    }
}
