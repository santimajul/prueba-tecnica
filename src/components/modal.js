import React from 'react';

export default function Content({datos,closeModal}) {


  return (
    <>
    <div className='back'>
    <div className='modal' id='modal'>
        <div className='titulo'><h1>{datos.name}</h1><h3>{datos.año}</h3></div>
        <div className='principal-container'>
            <div className='image'><img src={datos.img} /></div>
            <div className='description'><h3>{datos.desc}</h3></div>
        </div>
        <div className='leave-btn-container'><button className='leave-btn' onClick={closeModal}>Back</button></div>
    </div>
    </div>
    </>
  );
}
