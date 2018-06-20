import { getC } from './pallete';

export function setup() {
  createCanvas(300, 300);
  background(0);
  console.log('hey boi');
  background(getC(3, 3).hex);
}

export function draw() {}

export function mousePressed() {}

console.log('hey boi');
