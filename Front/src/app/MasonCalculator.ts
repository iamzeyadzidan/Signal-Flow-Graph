import { path } from "./path";
import { Loop } from "./Loop";

/**
 * Mason Calculator:
 * Calculates deltas of each path and maps each path to its delta.
 * Calculates the delta of the denominator.
 * Stores forward paths, loops, non-touching loops, paths deltas, and denominator delta.
 *
 * The function calculates the whole mason formula.
 */

/**
 * Needs to be reviewed
 */

export class MasonCalculator {
  /** Paths Data */
  pathsData: path;
  paths: any[][];
  pathTouchingLoops: Map<any, any>;
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
  /** Numerator */
  numerator: any;
  /** Mason Formula Result */
  masonResult: any;

  constructor(pathsData: path, loopsData: Loop) {
    this.pathsData = pathsData;
    this.paths = pathsData.forwardPaths;
    this.loopsData = loopsData;
    this.loops = loopsData.loops;
    this.nonTouchingLoops = loopsData.nonTouchedloop;
    this.setPathsWeights();
    this.setLoopsWeights();
  }

  setPathsWeights() {
    this.pathsWeights = new Map<any, any>();
    let path_index = 0;
    for (path_index; path_index < this.paths.length; path_index++) {
      let weight = this.pathsData.getPathValue(this.paths[path_index]);
      this.pathsWeights.set(path_index, weight);
    }
    console.warn(this.pathsWeights);
  }

  setLoopsWeights() {
    this.loopsWeights = new Map<any, any>();
    let loop_index = 0;
    for (loop_index; loop_index < this.loops.length; loop_index++) {
      let weight = this.pathsData.getPathValue(this.loops[loop_index]);
      this.loopsWeights.set(loop_index, weight);
    }
    console.warn(this.loopsWeights);
  }

  setPathsDeltas() {
    this.pathDeltas = new Map<any, any>();
    this.pathTouchingLoops = new Map<any, any>();

    /**
     * Declaring index of a path, index of a character (or number) in a path,
     * and index of a loop.
     */
    let path_index = 0,
      c_index = 0,
      loop_index = 0;

    let flag = false; // Indicates if a loop is not touching a path.

    /**
     * Delta object is used to hold the numeric and alphanumeric parts of the result
     */
    let delta = {
      numeric: Number(0),
      alphanumeric: String(""),
      toString() {
        return this.numeric.toString() + " + " + this.alphanumeric.toString();
      },
    };

    /**
     * In the following, we calculate delta for single non-path-touching loops
     */
    for (
      path_index;
      path_index < this.paths.length;
      path_index++, loop_index = 0
    ) {
      for (loop_index; loop_index < this.loops.length; loop_index++) {
        for (c_index; c_index < this.paths[path_index].length; c_index++) {
          if (
            // if a node in the path is a node of a loop, the loop is touching the path.
            this.loops[loop_index].includes(this.paths[path_index][c_index])
          ) {
            flag = true; // A loop touches the path
            this.pathTouchingLoops.set(path_index, this.loops[loop_index]);
            break;
          }
        }
        /*
         * If a loop is not touching a forward path, we add it to delta.
         * */
        if (!flag) {
          let weight = this.loopsWeights.get(loop_index);
          if (isNaN(Number(weight))) delta.alphanumeric += " - " + weight;
          else delta.numeric -= weight;
        }
      }

      /**
       * After calculating the gains of single non-path-touching loops, we do the same for
       * all non-touching non-path-touching loops
       */

      let length: number, index: number;
      for (let i = 0; i < this.nonTouchingLoops.length; i++) {
        length = this.nonTouchingLoops[i].length;
        if (length % 2 == 0) {
          for (let j = 0; j < length; j++) {
            if (this.loops.includes(this.nonTouchingLoops[i][j])) break; // Means one of those 2 non-touching loops is touching the forward path
            index = this.loops.indexOf(this.nonTouchingLoops[i][j]);
            let weight = this.loopsWeights.get(index);
            if (isNaN(Number(weight))) delta.alphanumeric += " + " + weight;
            else delta.numeric += weight;
          }
        } else {
          for (let j = 0; j < length; j++) {
            if (this.loops.includes(this.nonTouchingLoops[i][j])) break; // Means one of those 2 non-touching loops is touching the forward path
            let loop_index = this.loops.indexOf(this.nonTouchingLoops[i]);
            let weight = this.loopsWeights.get(loop_index);
            if (isNaN(Number(weight))) delta.alphanumeric += " - " + weight;
            else delta.numeric -= weight;
          }
        }
      }
      delta.numeric += 1;
      this.pathDeltas.set(path_index, delta);
    }
  }

  setNumerator() {
    let pathIndex: number;

    /**
     * The following numerator object is the same as the previously identified delta.
     */
    let numerator = {
      numeric: Number(0),
      alphanumeric: String(""),
      toString() {
        return this.numeric.toString() + " + " + this.alphanumeric.toString();
      },
    };

    for (pathIndex = 0; pathIndex < this.paths.length; pathIndex++) {
      let weight = this.pathsWeights.get(pathIndex);
      let delta = this.pathDeltas.get(pathIndex);

      /**
       * If weight or delta is alphanumeric, we treat both as alphanumeric,
       * else, we treat them as numbers.
       */
      console.warn(
        "weight = " + weight.toString() + " delta = " + delta.toString()
      );
      // alphanum exists or not
      if (isNaN(Number(weight))) {
        numerator.numeric += delta.numeric;
        numerator.alphanumeric +=
          weight + " * " + " * " + delta.alphanumeric.toString();
      } else {
        numerator.numeric += weight * delta.numeric;
        numerator.alphanumeric += delta.alphanumeric;
      }
    }

    this.numerator = numerator;
  }

  setDenominatorDelta() {
    let length: number;

    let delta = {
      numeric: Number(0),
      alphanumeric: String(""),
      toString() {
        return this.numeric.toString() + " + " + this.alphanumeric.toString();
      },
    };

    console.warn(this.loopsWeights);

    for (let loop_index = 0; loop_index < this.loops.length; loop_index++) {
      let weight = this.loopsWeights.get(loop_index);
      if (isNaN(Number(weight))) delta.alphanumeric += " - " + weight;
      else delta.numeric -= weight;
    }

    for (let i = 0; i < this.nonTouchingLoops.length; i++) {
      length = this.nonTouchingLoops[i].length;

      /**
       * If length is even, then there is an even number loops that are non-touching and we subtract in even number,
       * else, there is an odd number of loops that are non-touching and we add in odd number.
       */
      if (length % 2 == 0) {
        for (let j = 0; j < length; j++) {
          let loop_index = this.loops.indexOf(this.nonTouchingLoops[i][j]);
          let weight = this.loopsWeights.get(loop_index);
          if (isNaN(Number(weight))) delta.alphanumeric += " + " + weight;
          else delta.numeric += weight;
        }
      } else {
        for (let j = 0; j < length; j++) {
          let loop_index = this.loops.indexOf(this.nonTouchingLoops[i][j]);
          let weight = this.loopsWeights.get(loop_index);
          if (isNaN(Number(weight))) delta.alphanumeric += " - " + weight;
          else delta.numeric -= weight;
        }
      }
    }
    delta.numeric += 1;
    this.denominatorDelta = delta;
  }

  calculateUsingMasonFormula() {
    this.setPathsDeltas();
    this.setNumerator();
    this.setDenominatorDelta();

    console.log(this.pathDeltas);
    console.log(this.numerator);
    console.log(this.denominatorDelta);

    this.masonResult = {
      numerator: this.numerator,
      denominator: this.denominatorDelta,
      toString() {
        this.numerator.toString() + " + " + this.denominator.toString();
      },
    };
  }
}
