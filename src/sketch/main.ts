import { voronoi, polygonCentroid } from 'd3';
import * as _ from 'lodash';
import { interp } from './helperFuncs';
// @ts-ignore
import { getC } from './pallete';
// @ts-ignore
import * as dat from 'dat.gui/build/dat.gui.js';
import * as moment from '../../node_modules/moment/moment';
console.log(moment());
export let preAvgDist = 1000;
export let gui = new dat.GUI();
export let coolProps = {
  avgDist: '',
  estTimeLeft: '',
  exponent: -1
};

const sites = [];
let diagram: d3.VoronoiDiagram<site>;
let vFunc: d3.VoronoiLayout<site>;
class site extends Object {
  x: number;
  y: number;
  tx: number;
  ty: number;
  colour: string;
  neighbours: site[];
}
export function setup() {
  let dist = min(window.innerWidth, window.innerHeight);
  gui.add(coolProps, 'avgDist').listen();
  gui.add(coolProps, 'estTimeLeft').listen();
  gui.add(coolProps, 'exponent', -3, 1);
  // Create Canvas and Draw Background
  createCanvas(dist, dist);
  background(getC(4, 3).hex);

  // define voronoi function, size and accessors
  vFunc = vorFunc();

  _.range(256).map(i => {
    let x = new site();
    let ix = i % 16;
    let iy = _.floor(i / 16);
    let hue = _.floor(interp(ix, 0, 16, 3, 15));
    let shade = _.floor(interp(iy, 0, 16, 0, 7));
    x.colour = getC(hue, shade).hex;
    x.x = _.clamp(randomGaussian(width / 2, width / 4), 0, width);
    x.y = _.clamp(randomGaussian(width / 2, width / 4), 0, height);
    x.tx = interp(ix, 0, 16, 0, dist);
    x.ty = interp(iy, 0, 16, 0, dist);
    sites.push(x);
  });
  diagram = vFunc(sites);
  let polys = diagram.polygons();
  drawDiagram(polys);
}

function drawDiagram(polys: d3.VoronoiPolygon<site>[]) {
  polys.map(polygon => {
    fill(polygon.data.colour);
    beginShape();
    polygon.map(point => vertex(point[0], point[1]));
    endShape(CLOSE);
  });
}

export function draw() {
  strokeWeight(3);
  stroke(getC(2, 5).hex);
  const distances: number[] = [];
  diagram.polygons().map(polygon => {
    let c = polygonCentroid(polygon);
    let centroidVector = createVector(...c);
    let currentPos = createVector(polygon.data.x, polygon.data.y);
    let targetPos = createVector(polygon.data.tx, polygon.data.ty);
    distances.push(p5.Vector.dist(currentPos, targetPos));
    let target = createVector();
    p5.Vector.lerp(
      p5.Vector.sub(centroidVector, currentPos).limit(1.1),
      p5.Vector.sub(targetPos, currentPos).div(width / 16),
      0.5,
      target
    );
    target.limit(pow(10, coolProps.exponent));
    target.add(currentPos);
    Object.assign(polygon.data, { x: target.x, y: target.y });
  });
  let average = _.sum(distances) / distances.length;
  let speedPerSecond = (preAvgDist - average) * 60;
  coolProps.estTimeLeft = (average / speedPerSecond).toFixed(2) + ' seconds';
  coolProps.avgDist = String(average);
  preAvgDist = average;
  diagram = vFunc(sites);
  drawDiagram(diagram.polygons());
}

function vorFunc() {
  return voronoi<site>()
    .size([width, height])
    .x(s => {
      return s.x;
    })
    .y(s => {
      return s.y;
    });
}

export function mousePressed() {}

console.log('hey boi');
