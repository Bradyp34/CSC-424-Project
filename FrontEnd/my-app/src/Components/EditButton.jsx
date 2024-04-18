import React from 'react';
import { useNavigate } from 'react-router-dom';

function EditButton({ productId }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/EditPage`); // Corrected usage
    };

    return (
        <div>
            {
            
            <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-20 hover:bg-blue-700 rounded-md">
                Edit
            </button>
            
            }
        </div>
    );
}

export default EditButton;
