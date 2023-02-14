import React, { useState, useEffect } from 'react';

import Filter from './filter';

export default function NavBar({home, option, year}){



    return(
        <>
        <nav className="navbar bg-body-tertiary">
            <a className="navbar-brand" onClick={home} >DEMO Streaming</a>
            <div className='btn-container'>
                <a className="log">Log in</a>
                <a className="start">Start your free trial</a>
            </div>                         
        </nav>
        <div className='subtitle-container'>
            <h2 className='subtitle'>Popular {option == 'Inicio' ? 'Titles' : option}</h2>
            <Filter onSubmit={year}/>
        </div>
        </>
    )
}