import React, { Component } from 'react';
import './Title.css'; // Updated path: now in the same directory (common)

const Title = (props) => {
    return ( <>

       <h3 className='breadcrumbs'> {props.title}</h3>
    
    
    </> );
}
 
export default Title ;