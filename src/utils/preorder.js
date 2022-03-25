// import { createHash } from 'crypto';
const {createHash} = require('crypto');
const a = [12345678, 5678, 1234, 78, 56, 34, 12, 8, 7, 6, 5, 4, 3, 2, 1];

const preorder = (arr, i) => {
    //left child
    if (2 * i + 2 < arr.length) {
        preorder(arr, 2 * i + 2);
    }
    //right child
    if (2 * i + 1 < arr.length) {
        preorder(arr, 2 * i + 1);   
    }
    console.log(arr[i]);
    return;
}

function giveSha256(arr) {
    return createHash('sha256').update(arr).digest('hex');
}

// preorder(a, 0);
console.log(giveSha256("tushar"+"singhal"));
