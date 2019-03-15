
module.exports = {
    bfs: breadthFirstSearch,
    dfs: depthFirstSearch
};

/**
 * 
 */
function depthFirstSearch(vertex) {
    const stack = [vertex],
        visitedVertices = [];

    while (stack.length) {
        const currentVertex = stack.pop();
        
        if (visitedVertices.includes(currentVertex)) {
            continue;
        }

        visitedVertices.push(currentVertex);
        stack.push(...currentVertex.getAdjacentVertices());
    }

    return visitedVertices;
}

/**
 * 
 */
function breadthFirstSearch(vertex) {
    const queue = [vertex],
        visitedVertices = [];

    while (queue.length) {
        const currentVertex = queue.shift();
        
        if (visitedVertices.includes(currentVertex)) {
            continue;
        }
        
        visitedVertices.push(currentVertex);
        queue.push(...currentVertex.getAdjacentVertices());
    }

    return visitedVertices;
}
