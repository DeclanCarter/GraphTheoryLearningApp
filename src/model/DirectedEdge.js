"use strict";

const UndirectedEdge = require('./UndirectedEdge');

/**
 * Represents a one-way edge
 */
class DirectedEdge extends UndirectedEdge {
    /**
     * 
     */
    startsWith(vertex) {
    	return this.fromVertex === vertex;
    }

    /**
     * 
     */
    endsWith(vertex) {
    	return this.toVertex === vertex;
    }
}

module.exports = DirectedEdge;
