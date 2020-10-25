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