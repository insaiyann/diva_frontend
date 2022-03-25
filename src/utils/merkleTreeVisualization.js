const { createHash } = require('crypto');

const initMerkelArray = (identityObject) => {
    let merkelArray = [];
    for (let key in identityObject) {
        merkelArray.push(identityObject[key]);
    }
    // merkelArray = ["tushar", "singhal", "12345678", "M"]
    let nearestPowerOf2 = 1;
    while (nearestPowerOf2 < merkelArray.length) nearestPowerOf2 <<= 1;
    let lastElement = merkelArray[merkelArray.length - 1];
    for (let i = merkelArray.length; i < nearestPowerOf2; i++) {
        merkelArray.push(lastElement);
    }
    return merkelArray;
}

const hashString = (str) => { return createHash('sha256').update(str).digest('hex').toString(); }

const constructMerkelArray = (merkelArray) => {
    let currLevelLen = 0, startIndex = 0;
    let len = merkelArray.length;
    
    // not needed because all these fields are already encrypted
    // merkelArray = merkelArray.map(item => { return hashString(item) });
    
    while (true) {        
        len = merkelArray.length;
        currLevelLen = len - startIndex;

        // we have found root hash
        if (currLevelLen === 1) break;
        
        for (let i = startIndex; i < len; i += 2) {
            const concatString = merkelArray[i] + merkelArray[i + 1];
            const resultHash = hashString(concatString);
            merkelArray = [...merkelArray, resultHash];
        }
        startIndex = len;
    }
    return merkelArray.reverse();
}

const preOrderTraversal = (arr, i) => {
    let dynamicHTML = "<TreeNode label={<div>" + arr[i] + "</div>}>",
        lChild = "",
        rChild = "";
    //left child
    if ((2 * i + 2) < arr.length) {
        lChild = preOrderTraversal(arr, 2 * i + 2);
    }
    //right child
    if ((2 * i + 1) < arr.length) {
        rChild = preOrderTraversal(arr, 2 * i + 1);
    }
    return dynamicHTML + lChild + rChild + "</TreeNode>";
}

const personalIdentity = {
    "firstname": "tushar",
    "lastname": "singhal",
    "aadhar": "12345678",
    "gender": "M"
};

const initialIdentityArray = initMerkelArray(personalIdentity);

console.log("Initial Array:", initialIdentityArray);

const fullMerkelArray = constructMerkelArray(initialIdentityArray);

console.log("Full Merkel Array: ", fullMerkelArray);

const dynamicTreeNodeHtml = preOrderTraversal(fullMerkelArray, 0);

console.log("Dynamic TreeNode HTML: ", dynamicTreeNodeHtml);