/* eslint no-unused-vars: 0 */
import { polygonCentroid, range } from 'd3';
if (!Object.entries) {
  Object.entries = function(obj) {
    let ownProps = Object.keys(obj);
    let i = ownProps.length;
    let resArray = new Array(i); // preallocate the Array
    while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];
    return resArray;
  };
}
export function hash(s) {
  /* Simple hash function. */
  let a = 1;
  let c = 0;
  let h;
  let o;
  if (s) {
    a = 0;
    /* jshint plusplus:false bitwise:false */
    for (h = s.length - 1; h >= 0; h--) {
      o = s.charCodeAt(h);
      a = ((a << 6) & 268435455) + o + (o << 14);
      c = a & 266338304;
      a = c !== 0 ? a ^ (c >> 21) : a;
    }
  }
  return a.toString(16).toUpperCase();
}
/**
 * Checks to See if Object contains
 *
 * @param {...any} obj object to see
 * @returns {Boolean} isNested
 */
export function checkNested(obj /*, level1, level2, ... levelN */) {
  var args = Array.prototype.slice.call(arguments, 1);
  for (var i = 0; i < args.length; i++) {
    if (!obj || !obj.hasOwnProperty(args[i])) {
      return false;
    }
    obj = obj[args[i]];
  }
  return true;
}
export var recorder;
export var canvasObject;
export var lastFrame = 180;

// For Recording

/**
 * Adds A frame to the recording and saves if at end
 *
 */
export function recordFrame() {
  if (frameCount <= lastFrame) {
    recorder.capture(canvasObject);
    if (frameCount === lastFrame) {
      recorder.stop();
      recorder.save();
    }
  }
}
/**
 * Set's up Recording
 *
 */
export function recordSetup() {
  recorder = new CCapture({
    format: 'webm',
    framerate: 30,
    verbose: true
  });
  console.log('beginning record');

  canvasObject = document.getElementById('defaultCanvas0');
  recorder.start();
}
function sqr(x) {
  return x * x;
}
function dist2(v, w) {
  return sqr(v[0] - w[0]) + sqr(v[1] - w[1]);
}
function distToSegmentSquared(p, v, w) {
  var l2 = dist2(v, w);
  if (l2 === 0) return dist2(p, v);
  var t = ((p.x - v[0]) * (w[0] - v[0]) + (p.y - v[1]) * (w[1] - v[1])) / l2;
  t = Math.max(0, Math.min(1, t));
  return dist2(p, [v[0] + t * (w[0] - v[0]), v[1] + t * (w[1] - v[1])]);
}
/**
 * Returns Distance betweeen a point and a line
 *
 * @param {[Number,Number]} p origin Point
 * @param {[Number,Number]} v first line vertice
 * @param {[Number,Number]} w second line vertice
 * @returns {Number} Distance
 */
export function distToSegment(p, v, w) {
  return Math.sqrt(distToSegmentSquared(p, v, w));
}
/**
 *
 *
 * @param {[Number, Number][]} poly
 * @returns Number
 */
function getMinDist(poly) {
  let c = polygonCentroid(poly);
  let r = range(poly.length).map(i => {
    let thisP = poly[i];
    let nextP = poly[(i + 1) % poly.length];
    return distToSegment(c, thisP, nextP);
  });
  return min(r);
}
/**
 *
 *
 * @param {Number} min
 * @param {Number} max
 * @returns number
 */
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
}
/**
 * interpolates value from one range to anouther
 * @param {number} value input Val
 * @param {number} inLow lower bound of input
 * @param {number} inHigh upper bound of input
 * @param {number} outLow lower bound of output
 * @param {number} outHigh upper bound of output
 * @return {number} result
 */
export function interp(value, inLow, inHigh, outLow, outHigh) {
  return ((value - inLow) / (inHigh - inLow)) * (outHigh - outLow) + outLow;
}
/**
 * @returns {number} random number yall
 */
export function randomGaussian() {
  do {
    var x1 = random(2) - 1;
    var x2 = random(2) - 1;
    var w = x1 * x1 + x2 * x2;
  } while (w >= 1);
  w = sqrt((-2 * log(w)) / w);
  return x1 * w;
}
