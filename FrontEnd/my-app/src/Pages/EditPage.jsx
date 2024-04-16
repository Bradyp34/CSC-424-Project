import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditItem from '../Components/EditItem';

function EditPage() {
    const { productName } = useParams();
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/ItemSearchPage');
    };

    return (
        <div className="edit-page-wrapper">
            <EditItem productName={productName} onSubmission={handleNavigation} />
        </div>
    );
}

export default EditPage;
