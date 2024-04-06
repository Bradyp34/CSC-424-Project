import React from 'react';
import { useNavigate } from 'react-router-dom';

function EditButton({ productId }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/editProduct/${productId}`); // Corrected usage
    };

    return (
        <div>
            <button onClick={handleClick}>Edit</button>
        </div>
    );
}

export default EditButton;
