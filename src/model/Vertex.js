
const DirectedEdge = require('./DirectedEdge');
const UndirectedEdge = require('./UndirectedEdge');
const Position = require('./Position');

/**
 * 
 */
class Vertex {
    /**
     *
     */
    constructor(id, position) {
        this.id = id;
        this.edges = [];
        this.position = (position instanceof Position) ? position : null;
    }

    /**
     *
     */
    getPosition() {
        return this.position;
    }

    /**
     *
     */
    setPosition(position) {
        this.position = position;
    }

    /**
     *
     */
    getId() {
        return this.id;
    }

    /**
     *
     */
    filterEdges(callback) {
        this.edges = this.edges.filter(callback);
    }

    /**
     * 
     */
    getEdges() {
        return this.edges;
    }

    /**
     *
     */
    addEdge(edge) {
        this.edges.push(edge);
    }

    /**
     *
     */
    createDirectedEdgeTo(vertex) {
        return new DirectedEdge(this, vertex);
    }

    /**
     * 
     */
    createUndirectedEdgeTo(vertex) {
        return new UndirectedEdge(this, vertex);
    }

    /**
     * 
     */
    getAdjacentVertices() {
        return this.edges.reduce((adjacent, edge) => {
            return edge.startsWith(this)
                ? adjacent.concat(edge.getIncidentVertexTo(this))
                : adjacent;
        }, []);
    }

    /**
     *
     */
    getInDegree() {
        return this.edges.reduce((inDegree, edge) => {
            return edge.endsWith(this) ? inDegree + 1 : inDegree;
        }, 0);
    }

    /**
     * 
     */
    getOutDegree() {
        return this.getAdjacentVertices().length;
    }
}

module.exports = Vertex;
