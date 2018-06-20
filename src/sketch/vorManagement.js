import * as d3 from 'd3';
import { hash } from './helperFuncs.js';
/**
 *
 *
 * @export
 * @class VorManagement
 */
export default class VorManagement {
  /**
   *Creates an instance of VorManagement.
   * @param {*} opts
   * @memberof VorManagement
   */
  constructor( opts ) {
    this.updatePolygons = () => {
      this.relaxLikeLloyd();
      this.regenerateMesh();
      return this.outerPolys;
    };
    this.width = opts.width;
    this.height = opts.height;
    this.fillPC = opts.fillPC;
    this.exisDA = opts.exisDA || undefined;
    this.activePoints = [];
    this.boundryPoints = [];
    this.fillerPoints = [];
    this.innerPolys = [];
    this.outerPolys = [];
    this.activeEdgeGroups = [];
    this.fSim = d3.forceSimulation( this.activePoints );
    this.fSim.alphaDecay( 0.1 );
    this.fSim.alphaTarget( 0.3 );
    this.fSim.velocityDecay( 0.6 );
    this.fSim.force(
      'repel',
      d3
        .forceManyBody()
        .strength( -50 )
        .distanceMax( 100 )
    );
    let fr = d3
      .forceManyBody()
      .strength( 50 )
      .distanceMin( 30 );
    this.fSim.force( 'charge', fr );
    let xForce = d3
      .forceX()
      .x( function( d ) {
        return d.cx;
      } )
      .strength( 0.1 );
    this.fSim.force( 'xforce', xForce );
    this.fSim.force(
      'yforce',
      d3
        .forceY()
        .y( d => d.cy )
        .strength( 0.1 )
    );
    this.fSim.stop();
    this.fSim.alphaTarget( 0.05 );
    // Create begining graphs
    this.innerMap = d3.voronoi().size( [this.width, this.height] );
    this.outerMap = this.innerMap.extent( [
      [-50, -50],
      [this.width + 50, this.height + 50]
    ] );
    this.generateRandMesh();
  }
  /** Generates a seed random mesh */
  generateRandMesh() {
    let graph = this;
    this.fillerPoints = d3.range( this.fillPC ).map( () => {
      let point = {
        0: Math.random() * graph.width,
        1: Math.random() * graph.height,
        class: 0,
        filler: true
      };
      return point;
    } );
    this.boundryPoints = this.generateBoundryPoints(
      this.width,
      this.height,
      20
    );
    this.activePoints = [];
    this.regenerateMesh();
  }
  generateBoundryPoints( width, height, offset ) {
    let output = [];
    let xCount = Math.floor( width / offset );
    d3.range( xCount + 2 ).map( i => {
      output.push( {
        0: i / xCount * width,
        1: height + 50,
        class: 1
      } );
    } );
    d3.range( xCount + 2 ).map( i => {
      output.push( {
        0: i / xCount * width,
        1: 0 - 50,
        class: 1
      } );
    } );
    let yCount = Math.floor( height / offset );
    d3.range( yCount + 2 ).map( i => {
      output.push( {
        0: width + 50,
        1: i / yCount * height,
        class: 1
      } );
    } );
    d3.range( yCount + 2 ).map( i => {
      output.push( {
        0: 0 - 50,
        1: i / yCount * height,
        class: 1
      } );
    } );
    return output;
  }
  getActiveEdges() {
    this.activeEdgeGroups = [];
    let aEdges = [];
    if ( this.activePoints.length <= 1 ) return;
    this.outerMesh.edges.map( edge => {
      if ( !edge.left || !edge.right ) return;

      let leftIs = this.activePoints.includes( edge.left.data );
      let rightIs = this.activePoints.includes( edge.right.data );
      if ( leftIs ? !rightIs : rightIs ) {
        if ( !aEdges.includes( edge[0] ) ) {
          aEdges.push( edge[0] );
          edge[0].n = [];
          edge[0].n.push( edge[1] );
        } else if ( !edge[0].n.includes( edge[1] ) ) edge[0].n.push( edge[1] );
        if ( !aEdges.includes( edge[1] ) ) {
          aEdges.push( edge[1] );
          edge[1].n = [];
          edge[1].n.push( edge[0] );
        } else if ( !edge[1].n.includes( edge[0] ) ) edge[1].n.push( edge[0] );
      }
    } );
    let fakeOutCount = 0;
    while ( aEdges.length > 1 && fakeOutCount < 12 ) {
      let outputGroup = [];
      let sortP = ( point, out ) => {
        out.push( point );
        if ( !out.includes( point.n[0] ) ) sortP( point.n[0], out );
        if ( !out.includes( point.n[1] ) ) sortP( point.n[1], out );
      };
      sortP( aEdges[0], outputGroup );
      this.activeEdgeGroups.push( outputGroup );
      outputGroup.map( point => {
        aEdges.splice( aEdges.indexOf( point ), 1 );
      } );
      fakeOutCount++;
    }
    console.log( this.activeEdgeGroups );
  }
  regenerateMesh() {
    // @ts-ignore
    this.innerMesh = this.innerMap( this.activePoints.concat( this.fillerPoints ) );
    this.outerMesh = this.outerMap(
      // @ts-ignore
      this.activePoints.concat( this.fillerPoints, this.boundryPoints )
    );
    this.innerPolys = this.innerMesh.polygons();
    this.outerPolys = this.outerMesh.polygons();
    this.getActiveEdges();
  }
  relaxLikeLloyd() {
    this.activePoints.map( ( p, i ) => {
      let centroid = d3.polygonCentroid( this.innerPolys[i] );
      p.cx = centroid[0];
      p.cy = centroid[1];
      p[0] = ( p[0] + p.x ) / 2;
      p[1] = ( p[1] + p.y ) / 2;
    } );
    this.fillerPoints.map( ( p, i ) => {
      let centroid = d3.polygonCentroid(
        this.innerPolys[i + this.activePoints.length]
      );
      p[0] = centroid[0];
      p[1] = centroid[1];
    } );
  }
  addActivePoint( x, y, cl, dat ) {
    this.activePoints.push( {
      0: x,
      1: y,
      class: cl,
      x: x,
      y: y,
      cx: x,
      cy: y,
      id: hash( Math.random() * 100 )
    } );
    this.fSim.nodes( this.activePoints );
    this.getActiveEdges();
  }
}
