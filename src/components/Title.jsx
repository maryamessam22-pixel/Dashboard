import React, { Component } from 'react';
import '../components/Title.css' ;
const Title = (props) => {
    return ( <>

       <h3 className='breadcrumbs'> {props.title}</h3>
    
    
    </> );
}
 
export default Title ;