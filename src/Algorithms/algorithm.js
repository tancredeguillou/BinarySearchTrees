export function buildMaxHeap(array) {
    const animations = [];
    for (let i = (Math.floor(array.length / 2)); i >= 0; i--) {
        maxHeapify(array, i, animations);
    }
    return animations;
}

function maxHeapify(array, i, animations) {
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    let largest = 0;
    if (l < array.length) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([l, i, 0]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([l, i, 1]);
        if (array[l] > array[i]) {
            largest = l;
        } else {
            largest = i;
        }
    } else {
        largest = i;
    }
    if (r < array.length) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([r, i, 0]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([r, i, 1]);
        if (array[r] > array[largest]) {
            largest = r;
        }
    }
    if (largest !== i) {
        // We overwrite the value at index largest in the array with the
        // value at index i in the array.
        animations.push([i, largest, 2]);
        // We overwrite the value at index largest in the array with the
        // value at index i in the array.
        animations.push([i, largest, 3]);
        const temp = array[i];
        array[i] = array[largest];
        array[largest] = temp;
        // We overwrite the value at index i in the array with the
        // value at index largest in the array.
        //animations.push([largest, array[i], 1]);
        maxHeapify(array, largest, animations);
    }
}


export function buildBinSearchTree(array) {
    array.sort((a, b) => a - b);
    const animations = [];
    animations.push([0, bst(array, animations, 0, array.length - 1, 0, 0)]);
    return animations;
}

function bst(sortedArray, animations, start, end, level, index) {
    const mid = Math.floor((start + end) / 2);
    // can this node have children ?
    if (Math.pow(2, level+1) < sortedArray.length) {
        // this is the left child of the mid node
        animations.push([2 * index + 1, bst(sortedArray, animations, start, mid-1, level+1, 2*index+1)]);
        // this is the right child of the mid node
        animations.push([2 * index + 2, bst(sortedArray, animations, mid+1, end, level+1, 2*index+2)]);
    }
    return sortedArray[mid];
}


export function inorderTreeWalk(length) {
    const animations = [];
    itw(length, animations, 0, 0);
    return animations;
}

function itw(length, animations, level, index) {
    // can this node have children ?
    if (Math.pow(2, level) < length) {
        itw(length, animations, level + 1, 2 * index + 1);
        animations.push(index);
        itw(length, animations, level + 1, 2 * index + 2);
    }
}

export function postorderTreeWalk(length) {
    const animations = [];
    potw(length, animations, 0, 0);
    return animations;
}

function potw(length, animations, level, index) {
    // can this node have children ?
    if (Math.pow(2, level) < length) {
        potw(length, animations, level + 1, 2 * index + 1);
        potw(length, animations, level + 1, 2 * index + 2);
        animations.push(index);
    }
}

export function preorderTreeWalk(length) {
    const animations = [];
    ptw(length, animations, 0, 0);
    return animations;
}

function ptw(length, animations, level, index) {
    // can this node have children ?
    if (Math.pow(2, level) < length) {
        animations.push(index);
        itw(length, animations, level + 1, 2 * index + 1);
        itw(length, animations, level + 1, 2 * index + 2);
    }
}