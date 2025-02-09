import Navbar from "./Navbar";
import ReactDOM from 'react-dom/client';
import React, { useState } from 'react';
import './createDao.css';

function DAOOptionForm() {
    const [insuranceType, setInsuranceType] = useState(['']);
    const [insurancePrices, setInsurancePrices] = useState(['']);
    const [daoName, setDaoName] = useState('');
    const [daoDescription, setDaoDescription] = useState('');
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
        const newInsuranceType = [...insuranceType];
        const newInsurancePrices = [...insurancePrices];
        newInsuranceType.splice(index, 1);
        newInsurancePrices.splice(index, 1);
        setInsuranceType(newInsuranceType);
        setInsurancePrices(newInsurancePrices);
    };

    const handleInsurancePriceChange = (index, event) => {
        const newInsurancePrices = [...insurancePrices];
        newInsurancePrices[index] = event.target.value;
        setInsurancePrices(newInsurancePrices);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const insurancePolicies = insuranceType.map((type, index) => ({
            [`policy${index + 1}`]: [type, insurancePrices[index]]
        }));
        const formData = {
            daoName,
            daoDescription,
            joiningFee,
            subscriptionInterval,
            insurancePolicies,
        };
        console.log('Form Data Submitted: ', JSON.stringify(formData, null, 2));
        // You can add your form submission logic here, e.g., send data to a server
    };

    return (
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
                <label> DAO Group Description 
                    <textarea 
                        value={daoDescription} 
                        onChange={(e) => setDaoDescription(e.target.value)}
                    ></textarea> 
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
                            placeholder="new insurance policy" 
                        />
                        <input 
                            type="number" 
                            value={insurancePrices[index]}
                            onChange={(event) => handleInsurancePriceChange(index, event)} 
                            placeholder="policy price" 
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
            <Navbar />
            <DaoMenuOptions />
        </div>
    );
}

export default CreateDao;