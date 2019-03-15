
const CanvasHelper = require('../CanvasHelper');
const Graph = require('../model/Graph');
const Position = require('../model/Position');

class GraphCanvasView {
    /**
     * 
     */
    constructor(graph, canvas) {
        this.graph = graph;
        this.canvas = canvas;
        this.canvasHelper = new CanvasHelper(canvas);
        this.dragVertex = null;
        this.uncompletedEdge = null;
        this.selectedVertex = null;
        this.canvas.addEventListener('click', this.onClickListener.bind(this));
        this.canvas.addEventListener('contextmenu', this.onContextMenuListener.bind(this));
        this.canvas.addEventListener('mousemove', this.onMousemoveListener.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseupListener.bind(this));
        this.canvas.addEventListener('mousedown', this.onMousedownListener.bind(this));
        this.graph.on(Graph.EVENT_VERTEX_CREATED, this.drawVertex.bind(this));
        this.selectedVertexColor = '#0f0';
        this.vertexRadius = 20;
    }

    /**
     *
     */
    setVertexAsSelected(vertex) {
        if (!this.graph.containsVertex(vertex)) {
            throw new Error('Attempt to select not added vertex');
        }

        this.selectedVertex = vertex;
        this.redraw();
    };

    /**
     *
     */
    getSelectedVertex() {
        return this.selectedVertex;
    }

    discardSelectedVertex() {
        this.selectedVertex = null;
    }

    /**
     * 
     */
    getVertexByPosition(position) {
        return this.graph.getVerticesList().find((vertex) => {
            return checkPositionIsInCircle(position, vertex.getPosition(), this.vertexRadius);
        });
    }

    redraw() {
        this.canvasHelper.clearCanvas();
        const groupedEdges = groupEdgesByVertices(this.graph.getEdgesList());
        groupedEdges.forEach((edges) => this.canvasHelper.drawEdges(edges));

        this.graph.getVerticesList().forEach((vertex) => {
            const color = (vertex === this.selectedVertex) ? this.selectedVertexColor : null;
            this.canvasHelper.drawCircle(vertex.getPosition(), this.vertexRadius, vertex.getId(), color);
        });
    }

    /**
     * 
     */
    getVertexRadius() {
        return this.vertexRadius;
    }

    /**
     *
     */
    onClickListener(event) {
        const clickPosition = this.getEventPosition(event);
        const vertex = this.getVertexByPosition(clickPosition);

        if (!this.dragVertex && !vertex) {
            this.graph.createVertexWithPosition(clickPosition);
        } else if (vertex && ctrlKeyIsPressed(event)) {
            this.setVertexAsSelected(vertex);
        }
    }

    /**
     * 
     */
    onContextMenuListener(event) {
        event.preventDefault();
        const clickPosition = this.getEventPosition(event);
        const vertex = this.getVertexByPosition(clickPosition);

        if (ctrlKeyIsPressed(event) && vertex) {
            this.graph.deleteVertex(vertex);
        } else if (vertex) {
            if (this.uncompletedEdge) {
                const vertexFrom = this.getVertexByPosition(this.uncompletedEdge);
                if (document.getElementById('directed-edge').checked) {
                    this.graph.addEdge(vertexFrom.createDirectedEdgeTo(vertex));
                } else {
                    this.graph.addEdge(vertexFrom.createUndirectedEdgeTo(vertex));
                }
                this.uncompletedEdge = null;
                this.redraw();
            } else if (vertex) {
                this.uncompletedEdge = vertex.getPosition();
            }
        } else if (this.uncompletedEdge && !vertex) {
            this.uncompletedEdge = null;
            this.redraw();
        }
    }

    /**
     * 
     */
    onMousemoveListener(event) {
        const mousePosition = this.getEventPosition(event);

        if (this.uncompletedEdge) {
            this.redraw();
            const isEdgeDirected = document.getElementById('directed-edge').checked;
            if (isEdgeDirected) {
                this.canvasHelper.drawDirectedLine(this.uncompletedEdge, mousePosition);
            } else {
                this.canvasHelper.drawUndirectedLine(this.uncompletedEdge, mousePosition);
            }
        } else if (this.dragVertex) {
            this.dragVertex.setPosition(mousePosition);
            this.redraw();
        }
    }

    onMouseupListener() {
        if (this.dragVertex) {
            this.dragVertex = null;
            this.redraw();
        }
    }

    /**
     * 
     */
    onMousedownListener(event) {
        const vertex = this.getVertexByPosition(this.getEventPosition(event));

        if (!vertex) {
            return false;
        }

        this.dragVertex = vertex;
    }

    /**
     * 
     */
    getEventPosition(event) {
        const boundingClientRect = this.canvas.getBoundingClientRect();

        return new Position(
            parseInt(event.clientX - boundingClientRect.left),
            parseInt(event.clientY - boundingClientRect.top)
        );
    }

    /**
     * 
     */
    drawVertex(vertex) {
        this.canvasHelper.drawCircle(vertex.getPosition(), this.vertexRadius, vertex.getId());
    }
}

/**
 * 
 */
function checkPositionIsInCircle(position, circlePosition, circleRadius) {
    return Math.pow(position.getX() - circlePosition.getX(), 2)
        + Math.pow(position.getY() - circlePosition.getY(), 2)
        <= Math.pow(circleRadius, 2);
}

/**
 * 
 */
function groupEdgesByVertices(edges) {
    const hashMap = [];

    edges.forEach(function (edge) {
        const getId = (vertex) => vertex.getId();
        const hash = edge.getVertices().map(getId).sort().join('');

        if (hashMap[hash]) {
            hashMap[hash].push(edge);
        } else {
            hashMap[hash] = [edge];
        }
    });

    const withoutHash = [];

    for (let i in hashMap) {
        withoutHash.push(hashMap[i]);
    }

    return withoutHash;
}


/**
 * 
 */
function ctrlKeyIsPressed(event) {
    return event.ctrlKey || event.metaKey;
}

module.exports = GraphCanvasView;
