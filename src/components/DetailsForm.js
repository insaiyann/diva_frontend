import React, { useState, useContext } from 'react';
import { IdentitiesContext } from '../context/IdentitiesContext';

const DetailsForm = () => {
    const { dispatch } = useContext(IdentitiesContext);
    const [name, setName] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [gender, setGender] = useState('');
    
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleAadharChange = (e) => {
        setAadhar(e.target.value);
    }
    const handleGenderChange = (e) => {
        setGender(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: 'ADD_IDENTITY',
            details: { name, aadhar, gender }
        });
        setAadhar('');
        setGender('');
        setName('');
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <br/>
            <input onChange={handleNameChange} type="text" value={name} placeholder="Enter your Name" />
            <br/>
            <label>Aadhar</label>
            <br/>
            <input onChange={handleAadharChange} type="text" value={aadhar} placeholder="Enter your Aadhar Number" />
            <br/>
            <label>Gender</label>
            <br/>
            <input onChange={handleGenderChange} type="text" value={gender} placeholder="Enter your Gender" />
            <br/>
            <button type="submit"> Save Details</button>          
            <br/>
        </form>
    )
}

export default DetailsForm;