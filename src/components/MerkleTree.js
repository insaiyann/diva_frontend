import React,{ useState, useEffect} from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import styled  from 'styled-components';
// import { createHash } from 'crypto';

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid red;
`;
const initMerkelArray = (identityObject) => {
    const temp = [];
    for (let key in identityObject) {
        temp.push(identityObject[key]);
    }
    let nearestPowerOf2 = 1;
    while (nearestPowerOf2 < temp.length) nearestPowerOf2 <<= 1;
    let lastElement = temp[temp.length - 1];
    for (let i = temp.length; i < nearestPowerOf2; i++) {
        temp.push(lastElement);
    }
    return temp;
}
const hashString = (str) => {
    return str;
    // return createHash('sha256').update(str).digest('hex').toString();
}

const constructMerkleArray = (merkleArray) => {
    let temp = merkleArray;
    let currLevelLen = 0, startIndex = 0;
    let len = temp.length;
    
    // not needed because all these fields are already encrypted
    // merkelArray = merkelArray.map(item => { return hashString(item) });
    
    while (true) {        
        len = temp.length;
        currLevelLen = len - startIndex;

        // we have found root hash
        if (currLevelLen === 1) break;
        
        for (let i = startIndex; i < len; i += 2) {
            const concatString = temp[i] + temp[i + 1];
            const resultHash = hashString(concatString);
            temp.push(resultHash);
        }
        startIndex = len;
    }
    return temp.reverse();
}

const personalIdentity = {
    "firstname": "p1",
    "lastname": "p2",
    "aadhar": "p3",
    "gender": "p4"
};

const RecursiveMerkle = (props) => {
    if (props.i === 0) {
        return (<Tree
            lineWidth={'2px'}
            lineColor={'green'}
            lineBorderRadius={'10px'}
            label={<StyledNode>{props.merkleArray[props.i]}</StyledNode>}
        >
            {props.merkleArray.length > 0 && (<RecursiveMerkle merkleArray={props.merkleArray} i={1} />)}
            {props.merkleArray.length > 0 && (<RecursiveMerkle merkleArray={props.merkleArray} i={2} />)}
        </Tree>)
    } else {
        return (
            <>
                {props.merkleArray && (props.merkleArray.length > 0) && ((2 * props.i) + 2 < props.merkleArray.length) && (
                    <TreeNode label={<StyledNode>{props.merkleArray[props.i]}</StyledNode>}>
                        <RecursiveMerkle merkleArray={props.merkleArray} i={2 * props.i + 2} />
                        <RecursiveMerkle merkleArray={props.merkleArray} i={2 * props.i + 1} />
                    </TreeNode>
                )}
                {props.merkleArray && (props.merkleArray.length > 0) && !((2 * props.i) + 2 < props.merkleArray.length) && (
                    <TreeNode label={<StyledNode>{props.merkleArray[props.i]}</StyledNode>} />
                )}
            </>
        );
    }
}

const CompleteMerkleTree = () => {
    const [merkleArray, setMerkleArray] = useState([]);
    useEffect(() => { 
        let ok = initMerkelArray(personalIdentity);
        let temp = constructMerkleArray(ok);
        setMerkleArray(temp);
        console.log("MerkleArray:", temp);
    }, []);
    
    return (
        <>
            {merkleArray.length > 0 && (<RecursiveMerkle merkleArray={merkleArray} i={0} />)}
        </>
    );
}

export default CompleteMerkleTree;