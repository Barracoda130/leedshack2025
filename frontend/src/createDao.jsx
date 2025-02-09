import Navbar from "./Navbar";
import ReactDOM from 'react-dom/client';
import React, { useState } from 'react';
import './createDao.css';
import axiosAuth from './api/axios-auth';

function DAOOptionForm() {
    const [insuranceType, setInsuranceType] = useState(['']);
    const [insurancePrices, setInsurancePrices] = useState(['']);
    const [insuranceExcessPrices, setInsuranceExcessPrices] = useState(['']);
    const [daoName, setDaoName] = useState('');
    const [terminationPeriod, setTerminationPeriod] = useState('');
    const [joiningFee, setJoiningFee] = useState('');
    const [subscriptionInterval, setSubscriptionInterval] = useState('daily');

    const handleInsuranceTypeChange = (index, event) => {
        const newInsuranceType = [...insuranceType];
        newInsuranceType[index] = event.target.value;
        setInsuranceType(newInsuranceType);
    };

    const addInsuranceTypeFeild = () => {
        setInsuranceType([...insuranceType, '']);
        setInsurancePrices([...insurancePrices, '']);
    };

    const deleteInsuranceType = (index) => {
        const newInsuranceType = [...insuranceType];``
        const newInsurancePrices = [...insurancePrices];
        const newInsuranceExcessPrices = [...insuranceExcessPrices];
        newInsuranceType.splice(index, 1);
        newInsurancePrices.splice(index, 1);
        newInsuranceExcessPrices.splice(index, 1);
        setInsuranceType(newInsuranceType);
        setInsurancePrices(newInsurancePrices);
        setInsuranceExcessPrices(newInsuranceExcessPrices);
    };

    const handleInsurancePriceChange = (index, event) => {
        const newInsurancePrices = [...insurancePrices];
        newInsurancePrices[index] = event.target.value;
        setInsurancePrices(newInsurancePrices);
    };

    const handleInsuranceExcessChange = (index, event) => {
        const newInsuranceExcessPrices = [...insuranceExcessPrices];
        newInsuranceExcessPrices[index] = event.target.value;
        setInsuranceExcessPrices(newInsuranceExcessPrices);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const insurancePolicies = insuranceType.map((type, index) => ({
            'name': type, 'premium': insurancePrices[index], 'excess': insuranceExcessPrices[index]
        
        }));
        const formData = {
            'name': daoName,
            'termination_period': terminationPeriod,
            'joining_fee': joiningFee,
            'asdf': subscriptionInterval,
            'items': insurancePolicies,
        };
        console.log('Form Data Submitted: ', JSON.stringify(formData, null, 2));
        axiosAuth.post('/dao/create', formData);
    };

    return (
        //t
        <div id="flexContainer">
            <h1>Create New DAO Group</h1>

            <form className="dao-form" onSubmit={handleSubmit}>
                <label> Name of DAO Group 
                    <input 
                        type="text" 
                        value={daoName} 
                        onChange={(e) => setDaoName(e.target.value)} 
                    /> 
                </label>
                <label> Termination Period

                    <select 
                        value={terminationPeriod} 
                        onChange={(e) => setTerminationPeriod(e.target.value)}
                    >
                        <option value="Day">1 Day</option>
                        <option value="Week">1 Week</option>
                        <option value="BiWeek">2 Week</option>
                    </select>
                </label>
                <label> Joining Fee (£) 
                    <input 
                        type="number" 
                        min="0" 
                        step="0.01" 
                        value={joiningFee} 
                        onChange={(e) => setJoiningFee(e.target.value)}
                    /> 
                </label>
                <label> Subcription Fee Intervals 
                    <select 
                        value={subscriptionInterval} 
                        onChange={(e) => setSubscriptionInterval(e.target.value)}
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </label>
                <label> Add new insurance policy</label>
                {insuranceType.map((type, index) => (
                    <div className="policy-group" key={index}>
                        <input 
                            type="text" 
                            value={type} 
                            onChange={(event) => handleInsuranceTypeChange(index, event)} 
                            placeholder="policy/insurance type" 
                        />
                        <input 
                            type="number" 
                            value={insurancePrices[index]}
                            onChange={(event) => handleInsurancePriceChange(index, event)} 
                            placeholder="premium amount" 
                            min="0" 
                            step="0.01"
                        />
                        <input 
                            type="number" 
                            value={insuranceExcessPrices[index]}
                            onChange={(event) => handleInsuranceExcessChange(index, event)} 
                            placeholder="item excess" 
                            min="0" 
                            step="0.01"
                        />
                        <button type="button" onClick={() => deleteInsuranceType(index)}>Delete</button>
                    </div>
                ))}
                <button type="button" onClick={addInsuranceTypeFeild}>Add another insurance policy</button>

                <button type="submit">Create DAO</button>
            </form>
        </div>
    );
}

function DaoMenuOptions() {
    return (
        <>
        <div id="dao-menu">
            <DAOOptionForm />
        </div>
        </>
    )
}

const CreateDao = () => {
    return (
        <div>
            <DaoMenuOptions />
        </div>
    );
}

export default CreateDao;