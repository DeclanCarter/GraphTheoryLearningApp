

const EventManagerMixin = require('./EventManagerMixin');
const Vertex = require('./Vertex');

class Graph {
    /**
     * 
     */
    constructor(generateVertexId, verticesList, edgesList) {
        EventManagerMixin.call(this);
        this.generateVertexId = generateVertexId || getVertexIdGenerator();
        this.edgesList = edgesList || [];
        this.verticesList = verticesList || [];
    }

    /**
     * 
     */
    containsVertex(vertex) {
        return this.verticesList.includes(vertex);
    }

    /**
     * 
     */
    addEdge(edge) {
        this.edgesList.push(edge);
        this.trigger(Graph.EVENT_EDGE_ADDED);
    }

    /**
     * 
     */
    createVertexWithPosition(position) {
        const vertex = new Vertex(this.generateVertexId(), position);
        this.verticesList.push(vertex);
        this.trigger(Graph.EVENT_VERTEX_CREATED, vertex);
        return vertex;
    }

    /**
     *
     */
    getVerticesList() {
        return this.verticesList;
    }

    /**
     *
     */
    getEdgesList() {
        return this.edgesList;
    }

    /**
     * 
     */
    deleteVertex(vertex) {
        if (!(vertex instanceof Vertex)) {
            throw new TypeError('Argument must be of type Vertex');
        }

        const doesNotContainVertex = (edge) => !edge.containsVertex(vertex);

        for (let i = 0; i < this.verticesList.length; i++) {
            const currentVertex = this.verticesList[i];
            currentVertex.filterEdges(doesNotContainVertex);
            if (currentVertex === vertex) {
                this.verticesList.splice(i--, 1);
                this.edgesList = this.edgesList.filter(doesNotContainVertex);
            }
        }

        this.trigger(Graph.EVENT_VERTEX_DELETED);
    }
}

Graph.EVENT_VERTEX_CREATED = 'vertexCreated';
Graph.EVENT_VERTEX_DELETED = 'vertexDeleted';
Graph.EVENT_EDGE_ADDED = 'edgeAdded';

/**
 *
 */
function getVertexIdGenerator() {
    let current = 65;
    return function () {
        return String.fromCharCode(current++);
    }
}

module.exports = Graph;
