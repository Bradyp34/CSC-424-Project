import React from 'react';
import { useNavigate } from 'react-router-dom';

function EditButton({ productId }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/editPage`); // Corrected usage
    };

    return (
        <div>
            {<button onClick={handleClick}>Edit</button>}
        </div>
    );
}

export default EditButton;
