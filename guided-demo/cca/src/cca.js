/**
 * Implemention of a CCA
 */

const MODULO = 8;

/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
	let a = new Array(height);
  
	for (let i = 0; i < height; i++) {
	  a[i] = new Array(width);
	}
  
	return a;
}
  
/**
 * CCA class
 */
class CCA {

  /**
   * Constructor
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.currentBufferIndex = 0;
    this.buffer = [
    Array2D(width, height),
    Array2D(width, height)
    ];

    this.clear();
  }

  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    return this.buffer[this.currentBufferIndex];
  }

  /**
   * Clear the cca grid of the current active buffer
   */
  clear() {
    for (let y = 0; y < this.height; y++){
      this.buffer[this.currentBufferIndex][y].fill(0);
    }
  }

  /**
   * Randomize the cca grid
   */
  randomize() {
    for (let y = 0; y < this.height; y++){
      for (let x = 0; x < this.width; x++) {
        const rand = Math.floor(Math.random() * MODULO);
        this.buffer[this.currentBufferIndex][y][x] = rand;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // Full the offscreen buffer with the next cca generation built
    // from the current buffer.

    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    let currentBuffer = this.buffer[this.currentBufferIndex];
    let backBuffer = this.buffer[backBufferIndex];

    // See if we have a neighbor to infect this one
    function hasInfectiousNeighbor(x,y) {
      const nextValue = (currentBuffer[y][x] + 1) % MODULO;

      // check the west neighbor of cell x,y
      if (x > 0) {
      if (currentBuffer[y][x - 1] === nextValue){
        return true;
      }
    }
      // north
    if ( y > 0) {
      if (currentBuffer[y-1][x] === nextValue) {
        return true;
      }
    }
    // east
    if ( x < this.width -1 ){
      if (currentBuffer[y][x+1] === nextValue) {
        return true;
      }
    }
    // south
    if ( y < this.height -1) {
      if (currentBuffer[y + 1][x] === nextValue){
        return true;
      }
    }
    // if we've made it this far we'rre not infected!
    return false;
  }
    //Loop through and decide the state of the next geneeation for each cell processed.

    for(let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (hasInfectiousNeighbor.call(this, x, y)){
        backBuffer[y][x] = (currentBuffer[y][x] + 1) % MODULO;
        }
        else {
          backBuffer[y][x] = currentBuffer[y][x];
        }
      }
    }
    this.currentBufferIndex = this.currentBufferIndex === 0? 1 : 0;
  }
}

export default CCA;