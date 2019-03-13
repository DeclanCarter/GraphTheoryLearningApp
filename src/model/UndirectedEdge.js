

/**
 * Represents a two-way edge
 */
class UndirectedEdge {
    /**
     * @param {Vertex} fromVertex
     * @param {Vertex} toVertex
     */
    constructor(fromVertex, toVertex) {
        this.fromVertex = fromVertex;
        this.toVertex = toVertex;
        fromVertex.addEdge(this);
        toVertex.addEdge(this);
    }

    /**
     *
     */
    getVertices() {
        return [this.fromVertex, this.toVertex];
    }

    /**
     * 
     */
    containsVertex(vertex) {
        return this.getVertices().includes(vertex);
    }

    /**
     *
     */
    getIncidentVertexTo(vertex) {
        switch (vertex) {
            case this.fromVertex: return this.toVertex;
            case this.toVertex: return this.fromVertex;
            default: throw new Error('Invalid vertex: ' + vertex);
        }
    }

    /**
     * 
     */
    startsWith(vertex) {
        return this.containsVertex(vertex);
    }

    /**
     *
     */
    endsWith(vertex) {
        return this.containsVertex(vertex);
    }
}

module.exports = UndirectedEdge;
