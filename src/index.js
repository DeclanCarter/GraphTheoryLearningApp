import React from 'react';
 import ReactDOM from 'react-dom';

 const Graph = require('./model/Graph');
 const GraphCanvasView = require('./view/GraphCanvasView');
 const GraphHtmlTableView = require('./view/GraphHtmlTableView');
 const VerticesTraversingAnimation = require('./VerticesTraversingAnimation');
 const GraphConverter = require('./model/GraphConverter');
 
 const graph = new Graph();
 const graphHtmlTableView = new GraphHtmlTableView(graph, new GraphConverter());
 
 window.addEventListener('load', function () {
     const graphCanvasView = new GraphCanvasView(graph, document.getElementById('canvas'));
     const verticesTraversingAnimation = new VerticesTraversingAnimation(
         graphCanvasView,
         document.getElementById('start-search'),
         document.getElementById('depth-first-search')
     );
 });
















/*  const App = () => (
   <div>
      <h1>Hello world!!</h1>
   </div>
 )
 ReactDOM.render(<App/>, document.getElementById('root')); */