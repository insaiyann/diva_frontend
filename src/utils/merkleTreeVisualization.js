const { createHash } = require('crypto');

let a = ["1", "2", "3", "4", "5", "6", "7", "8"];

let b = [{ "name": "tushar", "lastname": "singhal" }, { "name": "himanshu", "lastname": "yadav" }, { "name": "kanishk", "lastname": "goel" }];

const constructArray = (json) => {
    let arr=[];
    for (let obj in json) {
        arr.push(json[obj].lastname);
    }
    let num = 1;
    while (num < arr.length) num <<= 1;
    for (let i = arr.length; i < num; i++) {
        arr.push(arr[i - 1]);
    }
    return arr;
}
let initialArr = constructArray(b);
console.log(initialArr);
const completeHashArray = (arr) => {
    let currLevelLen = 0, temp=0;
    while (1)
    {
        currLevelLen = arr.length - temp;
        if (currLevelLen === 1)
            break;
        const len = arr.length;
        for (let i = temp; i < len; i += 2)
        {
            const concatString = arr[i] + arr[i + 1];
            //const resultHash = createHash('sha256').update(concatString).digest('hex').toString();
            // arr=[...arr,resultHash];
            arr=[...arr,concatString];
        }
        temp = len;
    }
    return arr;
}

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

initialArr = completeHashArray(initialArr);
preorder(initialArr.reverse(), 0);
//console.log(a);