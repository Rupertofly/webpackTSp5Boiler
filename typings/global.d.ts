declare class CCapture {
  constructor( {} );
  public start();
}
declare const fBufffer: p5.Graphics;
declare const bBufffer: p5.Graphics;

declare namespace dat {

}

// tslint:disable
declare module 'ccapture.js' {
  export default class CCapture {
    constructor( {} );
    public start();
  }
}

declare const fBufffer: p5.Graphics;
declare const bBufffer: p5.Graphics;
declare const drawingContext: CanvasRenderingContext2D;
declare interface CanvasRenderingContext2D {
  filter: string;
}
declare module 'polygon-offset' {
  export default class Offset {
    constructor( vert?: any[], arc?: number );

    public data( sites: any[] ): this;
    public padding( dist: number ): any[][];
    public offsetLine( dist: number ): any[][];
  }
}
declare interface Window extends p5 {
  qw: () => void;
}
declare namespace p5 {
  export interface Graphics extends p5.Renderer {}
}
