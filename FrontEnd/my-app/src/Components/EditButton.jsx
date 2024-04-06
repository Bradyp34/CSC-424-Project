import React from 'react';

function EditButton() {
 const handleClick = () => {
    const userInput = window.prompt('Please enter your input:');
    console.log(userInput);
 };

 return (
    <div>
      {/*<button onClick={handleClick}>Edit</button>*/}
    </div>
 );
}

export default EditButton;
