import React, { useState } from 'react';


export default function Filter(props){

    let [year,setYear] = useState(null);

    const handleSubmit = e =>{
        e.preventDefault();

       props.onSubmit(year);

    }


    return(
        <>
        <form onSubmit={handleSubmit} className='form'>
            <p>Release Year:</p>
            <select name='year'onChange={ e =>{setYear(e.target.value)}}>
                Release Year:
                <option value={null}>All</option>
                <option value={2010}>2010</option>
                <option value={2011}>2011</option>
                <option value={2012}>2012</option>
                <option value={2013}>2013</option>
                <option value={2014}>2014</option>
                <option value={2015}>2015</option>
                <option value={2016}>2016</option>
                <option value={2017}>2017</option>
                <option value={2018}>2018</option>
                <option value={2019}>2019</option>
                <option value={2020}>2020</option>
                <option value={2021}>2021</option>
                <option value={2022}>2022</option>
            </select >
            <button type='submit' name='button' className='form-btn'>Filter</button>
        </form>
        </>
    )
}