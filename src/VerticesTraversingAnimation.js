
const EventManagerMixin = require('./model/EventManagerMixin');
const breadFirstSearch = require('./model/traversing-algorithms').bfs;
const depthFirstSearch = require('./model/traversing-algorithms').dfs;

class VerticesTraversingAnimation {
    /**
     * 
     */
    constructor(graphCanvasView, animationStartButton, dfsButton) {
        EventManagerMixin.call(this);
        this.graphCanvasView = graphCanvasView;
        this.canvasHelper = graphCanvasView.canvasHelper;
        this.animationStartButton = animationStartButton;
        this.vertexVisitDelay = 500;
        this.visitedVertexColor = "#f00";
        this.animationStartButton.addEventListener('click', this.onAnimationButtonClick.bind(this, dfsButton.checked));
    }

    /**
     * 
     */
    onAnimationButtonClick(isDfsButtonChecked) {
        const traversingAlgo = (isDfsButtonChecked) ? depthFirstSearch : breadFirstSearch;
        this.startAnimation(traversingAlgo);
    }

    /**
     * 
     */
    startAnimation(traversingAlgo) {
        const startFromVertex = this.graphCanvasView.getSelectedVertex();

        if (!startFromVertex) {
            return alert('Select start vertex using Ctrl + left mouse click');
        }

        const visitedVertices = traversingAlgo(startFromVertex);
        this.animateVisited(visitedVertices);
        this.graphCanvasView.discardSelectedVertex();
    }

    /**
     * 
     */
    animateVisited(visitedVertices) {
        const currentVertex = visitedVertices.shift();

        if (currentVertex) {
            this.trigger(VerticesTraversingAnimation.EVENT_VERTEX_VISITED);
            this.canvasHelper.drawCircle(
                currentVertex.getPosition(),
                this.graphCanvasView.getVertexRadius() + 10,
                currentVertex.getId(),
                this.visitedVertexColor
            );
            setTimeout(this.animateVisited.bind(this, visitedVertices), this.vertexVisitDelay);
        } else {
            /* alert('Animation completed'); */
        }
    }
}

VerticesTraversingAnimation.EVENT_VERTEX_VISITED = 'vertexVisited';

module.exports = VerticesTraversingAnimation;
