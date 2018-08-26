declare class CCapture {
    constructor( {} );
    public start();
}
declare module 'b-spline' {
    function interpolate(
        t,
        degree,
        points,
        knots?,
        weights?,
        result?
    ): pt;
    export = interpolate;
}
declare const fBufffer: p5.Graphics;
declare const bBufffer: p5.Graphics;
declare type pgonA = pgon[];
declare module 'polygon-clipping' {
    export const union: (
        poly1: pgonA,
        ...polyN: pgonA
    ) => pgonA;
    export const difference: (
        poly1: pgonA,
        ...polyN: pgonA
    ) => pgonA;
    export const intersection: (
        poly1: pgonA,
        ...polyN: pgonA
    ) => pgonA;
    export const xor: (
        poly1: pgonA,
        ...polyN: pgonA
    ) => pgonA;
}
declare module 'dat.gui' {
    interface Controller {
        onChange( func: ( value ) => void );
        onFinishChange( func: ( value ) => void );
        listen(): void;
        getValue(): any;
        setValue( value: any ): void;
        updateDisplay(): this;
        options( options: {} ): this;
        name( name: string ): this;
    }
    class GUI {
        constructor();
        public add(
            object: object,
            prop: string
        ): Controller;
        public add(
            object: object,
            prop: string,
            min: number,
            max: number
        ): Controller;
        public add(
            object: object,
            prop: string,
            min: number,
            max: number,
            step: number
        ): Controller;
        public add(
            object: object,
            prop: string,
            choices: any[]
        ): Controller;
        public add(
            object: object,
            prop: string,
            choices: object
        ): Controller;
    }
}

// tslint:disable
declare module 'ccapture.js' {
    export default class CCapture {
        constructor({});
        public start();
    }
}

declare const drawingContext: CanvasRenderingContext2D;
declare interface CanvasRenderingContext2D {
    filter: string;
}
declare module 'polygon' {
    interface vec2 {
        x: number;
        y: number;
    }
    class Polygon {
        constructor(pgon);
        // returns the point at index idx. note: this will wrap in both directions
        public point(idx: number): vec2;

        // ensure all of the points are unique
        public dedupe(returnNew: boolean): this;

        // insert vec2 at the specified index
        public insert(vec2, index): this;

        // remove the specified vec2 or numeric index from this polygon
        public remove(vecOrIndex): this;

        // removes contiguous points that are the same
        public clean(returnNew: boolean): this;

        // returns the direction in which a polygon is wound (true === clockwise)
        public winding(): boolean;

        // rewinds the polygon in the specified direction (true === clockwise)
        public rewind(bool: boolean): this;
        public pruneSelfIntersections(): Polygon[];

        // computes the area of the polygon
        public area(): number;

        // finds the closest point in this polygon to vec2
        public closestPointTo(vec2: vec2): vec2;

        // returns a Vec2 at the center of the AABB
        public center(): vec2;

        // scales this polygon around origin (default is this.center()) and will return a new polygon if requested with returnNew: boolean
        public scale(
            amount: number,
            origin: vec2,
            returnNew: boolean
        ): this;

        // returns true if vec2 is inside the polygon
        public containsPoint(vec2: vec2): true;

        // returns true if poly is completely contained in this polygon
        public containsPolygon(
            poly: Polygon
        ): true;

        // returns an object {x:_, y:_, w:_, h:_} representing the axis-aligned bounding box of this polygyon
        public aabb(): {
            x: number;
            y: number;
            w: number;
            h: number;
        };

        // performs an offset/buffering operation on this polygon and returns a new one
        public offset(amount: number): this;

        // return an array [startpoint, endpoint] representing the line at the specified index
        public line(index: number): [vec2, vec2];

        // iterate over the lines in this polygon
        public lines(
            func: (
                start: vec2,
                end: vec2,
                index: number
            ) => any
        ): void;
        // rotate by origin vec2 (default this.center()) by radians rads and return a clone if returnNew: boolean is specified
        public rotate(
            rads: number,
            vec2: vec2,
            returnNew: boolean
        ): this;

        // translate by vec2 and return a clone if returnNew: boolean is specified
        public translate(
            vec2: vec2,
            returnNew: boolean
        ): this;

        // return true if this polygon has the same components and the incoming poly
        public equal(poly: Polygon): boolean;

        // works with an array of vec2's, an object containing a .position and .radius, an object populated with x1,y1,x2,y2, an object populated with x,y,w,h, and an object populated with x,y,width,height. See the tests for more info
        public contains(thing: {}): boolean;

        // returns a new polygon representing the boolean union of this and the incoming polygon
        public union(polygon: Polygon): Polygon;

        // returns a new polygon representing the boolean cut of polygon from this
        public cut(polygon): Polygon;

        // convert this polygon into an array of arrays ([[x, y]])
        public toArray(): pt[];
    }
    export = Polygon;
}
declare module 'polygon-offset' {
    export default class Offset {
        constructor(vert?: any[], arc?: number);

        public data(sites: any[]): this;
        public padding(dist: number): any[][];
        public offset(dist: number): any[][];
        public offsetLine(dist: number): any[][];
    }
}
declare interface Window extends p5 {
    qw: () => void;
}
declare namespace p5 {
    export interface Graphics
        extends p5.Renderer {}
}
declare module 'greiner-hormann' {
    var x: any;
    export = x;
}
