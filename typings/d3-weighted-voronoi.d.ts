// tslint:disable
export as namespace d3WeightedVoronoi;
export interface weightedVoronoi {
  // tslint:disable
  (): weightedVoronoiCell[];
  x(): (d: any) => number;
  x(x: (d: any) => number): this;
  y(y: (d: any) => number): this;
  extent(): [[number, number], [number, number]] | null;
  extent(extent: [[number, number], [number, number]]): this;
  size(): [number, number] | null;
  size(size: [number, number]): this;
}
export interface weightedVoronoiCell extends Array<[number, number]> {
  vertex: any;
}
/**
 * Creates a new weightedVoronoi with the default x-, y-, weight- accessors, and clip, extent, size configuration values.
 */
