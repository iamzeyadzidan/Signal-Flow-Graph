export class path
{
    v: number;
    adjList: any;
    vertices: any;
    forwardPaths: String[];
    edgesVal: any;
    path(n: number, vList: String[])
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
        }
    }
    addEdge(u: string, v: string, weight: String)
    {
        this.adjList.get(u).push(v);
        let temp = u.concat(v);
        this.edgesVal.set(temp, weight);
    }
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
            this.forwardPaths.push(localPathList);
            return;
        }
            isVisited.set(u, true);
            for (let i = 0; i < this.adjList.get(u).length;i++) 
            {
                if (!isVisited.get(this.adjList.get(u)[i]))
                {
                    localPathList.push(this.adjList.get(u)[i]);
                    this.findAllPathsUtil(this.adjList.get(u)[i], d, isVisited, localPathList);
                    localPathList.splice(localPathList.indexOf(this.adjList.get(u)[i]),this.adjList.get(u)[i].length);
                }
            }
            isVisited.set(u, false);
    }
}