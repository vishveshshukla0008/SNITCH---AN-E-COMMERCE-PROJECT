let arr = [3, 4, 5, 6, 1, 2, 3, 0, 2, 1];


function divide(arr, start, end) {
    // Base case :
    if (start >= end) return;

    //work 
    let mid = Math.floor((start + end) / 2);

    //recursive call
    divide(arr, start, mid); // left side of recursion tree
    divide(arr, mid + 1, end); // right side of recursion tree
    merge(arr, start, end, mid);
}

function merge(arr, start, end, mid) {
    let temp = new Array(end - start + 1);
    let i = start, j = mid + 1, k = 0;

    while (i <= mid && j <= end) {
        if (arr[i] < arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }

    while (i <= mid) {
        temp[k++] = arr[i++];
    }
    while (j <= end) {
        temp[k++] = arr[j++];
    }


    i = start, k = 0;
    while (k < temp.length) {
        arr[i++] = temp[k++]
    }
}
divide(arr, 0, arr.length - 1)

console.log(arr)