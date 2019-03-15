
const Graph = require('./../model/Graph');
const DirectedEdge = require('./../model/DirectedEdge');
const Handlebars = require('handlebars');

class GraphHtmlTableView {
    /**
     * 
     */
    constructor(graph, graphConverter) {
        this.graph = graph;
        this.graphConverter = graphConverter;
        this.setUpEventListeners();
    }

    /**
     * 
     */
    setUpEventListeners() {
        this.graph.on(Graph.EVENT_VERTEX_CREATED,
            /* this.rebuildAdjacencyListAction.bind(this), */
            this.rebuildAdjacencyMatrixAction.bind(this)/* ,
            this.rebuildDegreesTable.bind(this) */
        );
        this.graph.on(Graph.EVENT_EDGE_ADDED,
            /* this.rebuildIncidenceMatrixAction.bind(this), */
            /* this.rebuildAdjacencyListAction.bind(this), */
            this.rebuildAdjacencyMatrixAction.bind(this)/* ,
            this.rebuildDegreesTable.bind(this) */
        );
        this.graph.on(Graph.EVENT_VERTEX_DELETED,
            /* this.rebuildAdjacencyListAction.bind(this), */
            this.rebuildAdjacencyMatrixAction.bind(this)/* ,
            this.rebuildIncidenceMatrixAction.bind(this) *//* ,
            this.rebuildDegreesTable.bind(this) */
        );
    }

    /* rebuildIncidenceMatrixAction() {
        const incidenceMatrix = this.graphConverter.toIncidenceMatrix(this.graph);
        document.getElementById('incidence-matrix-representation')
            .innerHTML = this.incidenceMatrixToHtmlTable(incidenceMatrix);
    } */

    rebuildAdjacencyMatrixAction() {
        const adjacencyMatrix = this.graphConverter.toAdjacencyMatrix(this.graph);
        document.getElementById('adjacency-matrix-representation')
            .innerHTML = this.adjacencyMatrixToHtmlTable(adjacencyMatrix, this.graph.getVerticesList());
    }

    /* rebuildAdjacencyListAction() {
        document.getElementById('adjacency-list-representation')
            .innerHTML = this.buildHtml(this.graph.getVerticesList());
    } */

    /* rebuildDegreesTable() {
        document.getElementById('degrees-representation')
            .innerHTML = this.buildDegreesTable(this.graph.getVerticesList());
    } */

    /**
     * 
     */
   /*  buildAdjacencyListHtml(vertices) {
        if (!vertices.length) {
            return '';
        }

        const source = `<table>
            <tr>
                <th>Vertex</th>
                <th>Adjacent vertices</th>
            </tr>
            {{#each vertices}}
                <tr>
                    <td>{{ getId }}</td>
                    <td>
                        {{#each this.getAdjacentVertices}}
                            {{ getId }}{{#unless @last}},{{/unless}}
                        {{/each}}
                    </td>
                </tr>
            {{/each}}
        </table>`;

        const template = Handlebars.compile(source);

        return template({vertices});
    } */

    /**
     * 
     */
    adjacencyMatrixToHtmlTable(adjacencyMatrix, vertices) {
        if (!vertices.length) {
            return '';
        }

        const adjacencyTable = adjacencyMatrix.map((row, i) => [vertices[i].id].concat(row));

        const source = `<table>
            <tr>
                <th></th>
                {{#each vertices}}
                    <th>{{ getId }}</th>
                {{/each}}
            </tr>
            
            {{#each adjacencyTable}}
                <tr>
                {{#each this}}
                    <td>{{ this }}</td>
                {{/each}}
                </tr>
            {{/each}}
        </table>`;

        const template = Handlebars.compile(source);

        return template({vertices, adjacencyTable});
    }

    /**
     * 
     */
    /* incidenceMatrixToHtmlTable(incidenceMatrix) {
        if (!incidenceMatrix.length || incidenceMatrix.every(row => row.length === 0)) {
            return '';
        }

        const source = `<table>
            <tr>
                <th colspan='100%'>Incidence Matrix</th>
            </tr>
            {{#each incidenceMatrix}}
                <tr>
                    {{#each this}}
                        <td>{{ this }}</td>
                    {{/each}}
                </tr>
            {{/each}}
        </table>`;

        const template = Handlebars.compile(source);

        return template({incidenceMatrix});
    } */

    /**
     * 
     */
 /*    buildDegreesTable(vertices) {
        const source = `<table>
            <tr>
                <th></th>
                <th>In degree</th>
                <th>Out degree</th>
            </tr>
            {{#each vertices}}
            <tr>
                <td>{{ getId }}</td>
                <td>{{ getInDegree }}</td>
                <td>{{ getOutDegree }}</td>
            </tr>
            {{/each}}
        </table>`;

        const template = Handlebars.compile(source);

        return template({vertices});
    } */
}

module.exports = GraphHtmlTableView;
