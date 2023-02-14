import React from 'react';
import { useState, useEffect } from 'react';
import Cards from './cards';
import Content from './modal';
import NavBar from './navbar';
import PageFoot from './pageFoot';

export default function Main(){

    let [state, setState] = useState('Inicio');
    let [pendiente,setPendiente] = useState(true);
    let [data,setData] = useState(null);
    let [error,setError] = useState(null);
    let [message,setMessage] = useState('');
    let [grilla,setGrilla] = useState([]);
    let [year,setYear] = useState(null);
    let [show,setShow] = useState(false);
    let [selected,setSelected] = useState({});

    /*TO CHOOSE MOVIES OR SERIES */
    const options = [
        {nombre:'Series',
        id:0},
        {nombre:'Movies',
        id:1}
    ];

    let link = 'https://raw.githubusercontent.com/StreamCo/react-coding-challenge/master/feed/sample.json';

    /*FETCH REQUEST*/
    useEffect(()=>{
        const getData = async (link)=>{
            try{
                let res = await fetch(link)
                let data = await res.json();
                let arr = Object.entries(data);
    
                if(!res.ok) throw{ err : false};
                    
                    setData(data);
                    setError(false)
                    setPendiente(false);
                    setGrilla(arr[1][1])  
            }catch(err){
                setMessage('Oops.. something went wrong!');
                setError(err);       
            }   
        }    
        getData(link);

          if(state != 'Inicio'){
        document.querySelector('.form').style.visibility = 'visible';
    }else{
        document.querySelector('.form').style.visibility = 'hidden';
    }
    },[state])

    /*RELEASE YEAR => 2010 FILTER */

    let series = grilla.filter( serie =>{ return serie.programType === 'series' & serie.releaseYear >= 2010});   
    let movies = grilla.filter( movie =>{ return movie.programType === 'movie' & movie.releaseYear >= 2010});

    /*YEAR FILTER */
    const handleYear = año =>{
        isNaN(año) ? setYear(false) : setYear(año);
    }

    let seriesFilt = series.filter( serie =>{ return serie.releaseYear == year});
    let moviesFilt = movies.filter( movie =>{ return movie.releaseYear == year});

    /*MODAL WINDOW HANDLER */
    const handleModal = (name, desc,img,año) =>{
        selected = {
            name,
            desc,
            img,
            año
        }
        setSelected(selected);
        setShow(true);
    }

    useEffect(()=>{
        let modal = document.querySelector(".modal");
        if(show){
            modal.style.opacity = "1";
            modal.style.pointerEvents = "all";
            document.querySelector(".main").style.pointerEvents = "none";
        }else{
            modal.style.opacity = "0";
            modal.style.pointerEvents = "none";
            document.querySelector(".main").style.pointerEvents = "all";
        }

    },[show])

    return(
        <>
        <NavBar home={()=>{setState('Inicio')}} option={state} year={handleYear}/>
        <div className='main'>
            {
            state === 'Inicio' ?
            options.map( option =>{
                return <Cards title={'Popular ' + option.nombre} key={option.id} handle={()=>{setState(option.nombre)}}/>
            }) : (pendiente & !error ? 'Loading...' : ( error ? message : 
                (state === 'Series' ? (year ? seriesFilt.map( serie =>{
                    return <Cards title={serie.title} key={serie.title} url={serie.images["Poster Art"].url} handle={()=>{handleModal(serie.title, serie.description, serie.images["Poster Art"].url, serie.releaseYear)}}/>
                }) :
            series.map( serie =>{
                return <Cards title={serie.title} key={serie.title} url={serie.images["Poster Art"].url} handle={()=>{handleModal(serie.title, serie.description, serie.images["Poster Art"].url, serie.releaseYear)}}/>
            })) : (state === 'Movies' ? (year ? moviesFilt.map( movie =>{
                return <Cards title={movie.title} key={movie.title} url={movie.images["Poster Art"].url} handle={()=>{handleModal(movie.title, movie.description, movie.images["Poster Art"].url, movie.releaseYear)}}/>
            }) : movies.map( movie =>{
                return <Cards title={movie.title} key={movie.title} url={movie.images["Poster Art"].url} handle={()=>{handleModal(movie.title, movie.description, movie.images["Poster Art"].url, movie.releaseYear)}}/>
            })) : 'Error' ))))}
        </div>
        <PageFoot home={()=>{setState('Inicio')}} />
        <Content closeModal={()=>{setShow(false)}} datos={selected}/>
        </>
    );

}

        


