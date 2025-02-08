import Navbar from "./Navbar";
import ReactDOM from 'react-dom/client';
import React, { useState } from 'react';
import './createDao.css';


function DAOOptionForm() {
    const [insuranceType, setInsuranceType] = useState(['']);
    
    const handleInsuranceTypeChange = (index, event) => {
        const newInsuranceType = [...insuranceType];
        newInsuranceType[index] = event.target.value;
        setInsuranceType(newInsuranceType);
    };

    const addInsuranceTypeFeild = () => {
        setInsuranceType([...insuranceType, '']);
    };

    const deleteInsuranceType = (index) => {
        const newInsuranceType = [...insuranceType];
        newInsuranceType.splice(index, 1);
        setInsuranceType(newInsuranceType);
    };

    const [insurancePrices, setInsurancePrices] = useState(['']);

    const handleInsurancePriceChange = (index, event) => {
        const newInsurancePrices = [...insurancePrices];
        newInsurancePrices[index] = event.target.value;
        setInsurancePrices(newInsurancePrices);
    };

    return (
        <div id="flexContainer">
            <h1>Create New DAO Group</h1>

            <form className="dao-form">
                <label> Name of DAO Group <input type="text" /> </label>
                <label> DAO Group Description <textarea></textarea> </label>
                <label> Joining Fee (£) <input type="number" min="0" step="0.01"/> </label>
                <label> Subcription Fee Intervals 
                    <select>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </label>
                <label> Add new insurance policy</label>
                {insuranceType.map((type, index) => (
                    <div key={index}>
                        <label>Insurance Policy {index + 1}</label>
                        <input 
                            type="text" 
                            value={type} 
                            onChange={(event) => handleInsuranceTypeChange(index, event)} 
                            placeholder="new insurance policy" 
                        />
                        <label>Policy Price (£)</label>
                        <input 
                            type="number" 
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
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DAOOptionForm />);

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