import React from 'react';
import { useNavigate } from 'react-router-dom';

function EditButton({ productId }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/editPage`); // Corrected usage
    };

    return (
        <div>
            {
            
            <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Edit
            </button>
            
            }
        </div>
    );
}

export default EditButton;
