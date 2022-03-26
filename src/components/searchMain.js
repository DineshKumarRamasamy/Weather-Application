import React,{useState,useEffect} from 'react';
import "./style.css";
import WeatherDetails from "./WeatherDetails.js"

function SearchMain() {
    const[searchTerm,setSearchTerm]=useState('mumbai');
    const[tempInfo,setTempInfo]=useState({});
    const getWeatherInfo=async ()=>{
        try{
            let url=`http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=f840f08444c59ce09a2fbb87f9bff214`;

            let res= await fetch(url);
            let data = await res.json();
            console.log(data)
            const { temp, humidity, pressure } = data.main;
            const { main: weatherType } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

           const myNewWeatherInfo = {
           temp,
           humidity,
           pressure,
           weatherType,
           name,
           speed,
           country,
           sunset,
           };

           setTempInfo(myNewWeatherInfo);

        }catch(error){
            console.log(error);
        }
    };
    useEffect(()=>{
    getWeatherInfo();
    },[])
  return (
    <div>
    <div className='wrap'>
      <div className='search'>
          <input type='text' placeholder='Search City..' id='search' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value )}/> 
     <button className='searchButton' onClick={getWeatherInfo}> 
     Search
     </button>
     </div>
    </div>
    <WeatherDetails {...tempInfo}/>
    </div>
  )
}

export default SearchMain
