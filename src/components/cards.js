import React from 'react';

export default function Cards({title, handle, url}){

    
    return(
        <div className='card-container' onClick={handle}>
            <div className='space'>
                <img src={url} />
            </div>
                <div className='card-description'>
                    <p>{title}</p>
                </div>    
        </div>
    )
}