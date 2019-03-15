const Graph = require('./model/Graph');
const GraphCanvasView = require('./view/GraphCanvasView');
const GraphHtmlTableView = require('./view/GraphHtmlTableView');
const VerticesTraversingAnimation = require('./VerticesTraversingAnimation');
const GraphConverter = require('./model/GraphConverter');

const graph = new Graph();
const graphHtmlTableView = new GraphHtmlTableView(graph, new GraphConverter());
import * as d3 from 'd3';
d3.select('#root')
  .append('h5')
  .append('text')
  .text(`D3 version: ${d3.version}`)
const square = d3.selectAll("rect");
square.style("fill", "orange");


window.addEventListener('load', function () {
    const graphCanvasView = new GraphCanvasView(graph, document.getElementById('canvas'));
    const verticesTraversingAnimation = new VerticesTraversingAnimation(
        graphCanvasView,
        document.getElementById('start-search'),
        document.getElementById('depth-first-search'),
        document.getElementById('upload-start'),
        document.getElementById('download-start')

        
    );
});