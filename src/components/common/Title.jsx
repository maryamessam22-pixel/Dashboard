import React, { Component } from 'react';
import './Title.css'; 

const Title = (props) => {
    return ( <>

       <h3 className='breadcrumbs'> {props.title}</h3>
    
    
    </> );
}
 
export default Title ;