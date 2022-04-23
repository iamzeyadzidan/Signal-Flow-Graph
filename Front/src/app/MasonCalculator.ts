import { path } from "./path";
import { Loop } from "./Loop";

/**
 * Mason Calculator:
 * Calculates deltas of each path and maps each path to its delta.
 * Calculates the delta of the denominator.
 * Stores forward paths, loops, non-touching loops, paths deltas, and denominator delta.
 */

/**
 * To be continued:
 * Get the weights of each path and loop through Paths class.
 * Replace weights within the getDeltaFunctions.
 */

export class MasonCalculator {
  /** Paths Data */
  pathsData: path;
  paths: String[];
  pathTouchingLoops: any[][];
  /** Loops Data */
  loopsData: Loop;
  loops: any[][];
  nonTouchingLoops: any[][];
  /** Weights */
  pathsWeights: Map<any, any>;
  loopsWeights: Map<any, any>;
  /** Deltas */
  pathDeltas: Map<any, any>;
  denominatorDelta: any;

  constructor(pathsData: path, loopsData: Loop) {
    this.pathsData = pathsData;
    this.paths = pathsData.forwardPaths;
    this.loopsData = loopsData;
    this.loops = loopsData.loops;
    this.nonTouchingLoops = loopsData.nonTouchedloop;
  }

  getPathsDeltas() {
    let path_index = 0,
      c_index = 0,
      loop_index = 0;
    let flag = false; // Indicates if a loop is not touching a path.
    let delta = {
      numeric: Number(0),
      alphanumeric: String(""),
    };
    for (
      path_index;
      path_index < this.paths.length;
      path_index++, loop_index = 0
    ) {
      for (loop_index; loop_index < this.loops.length; loop_index++) {
        for (c_index; c_index < this.paths[path_index].length; c_index++) {
          if (
            this.loops[loop_index].includes(this.paths[path_index][c_index])
          ) {
            flag = true; // A loop touches the path
            this.pathTouchingLoops.push(this.loops[loop_index]);
            break;
          }
        }
        /*
         * If a loop is not touching a forward path, we add it to delta.
         * */
        if (!flag) {
          if (isNaN(Number(this.loops[loop_index])))
            delta.alphanumeric += " - " + this.loops[loop_index];
          else delta.numeric -= Number(this.loops[loop_index]);
        }
      }
      let length: number;
      for (let i = 0; i < this.nonTouchingLoops.length; i++) {
        length = this.nonTouchingLoops[i].length;
        if (length % 2 == 0) {
          for (let j = 0; j < length; j++) {
            if (isNaN(Number(this.nonTouchingLoops[i])))
              delta.alphanumeric += " - " + this.nonTouchingLoops[i].toString();
            else delta.numeric -= Number(this.nonTouchingLoops[i]);
          }
        } else {
          for (let j = 0; j < length; j++) {
            if (isNaN(Number(this.nonTouchingLoops[i])))
              delta.alphanumeric += " + " + this.nonTouchingLoops[i].toString();
            else delta.numeric += Number(this.nonTouchingLoops[i]);
          }
        }
      }
      this.pathDeltas.set(path_index, delta);
    }
  }

  getDenominatorDelta() {
    let length: number;
    let delta = {
      numeric: Number(0),
      alphanumeric: String(""),
    };
    for (let i = 0; i < this.nonTouchingLoops.length; i++) {
      length = this.nonTouchingLoops[i].length;
      if (length % 2 == 0) {
        for (let j = 0; j < length; j++) {
          if (isNaN(Number(this.nonTouchingLoops[i])))
            delta.alphanumeric += " - " + this.nonTouchingLoops[i].toString();
          else delta.numeric -= Number(this.nonTouchingLoops[i]);
        }
      } else {
        for (let j = 0; j < length; j++) {
          if (isNaN(Number(this.nonTouchingLoops[i])))
            delta.alphanumeric += " + " + this.nonTouchingLoops[i].toString();
          else delta.numeric += Number(this.nonTouchingLoops[i]);
        }
      }
    }
    this.denominatorDelta = delta;
  }
  /**
   * Left-over weight class
   */

  // weight = 0;
  // array_weights: any[][];
  // loops: Loop;

  // constructor(loops: Loop, array_weights: any[][]) {
  //   this.loops = loops;
  //   this.array_weights = array_weights;
  // }
  // loop_weight() {
  //   let loop = this.loops.loops;
  //   for (let i = 0; i < loop.length; i++) {
  //       for (let j = 0; j < loop[i].length - 1; j++) {

  //       }
  //   }
  // }
}
