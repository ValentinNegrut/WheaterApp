let cityInput='London';

const $name=document.querySelector('.name')
const $condition=document.querySelector('.condition')
const $time=document.querySelector('.time')
const $temp=document.querySelector('.temp')
const $date=document.querySelector('.date')

const $cloud=document.querySelector('.cloud')
const $humidity=document.querySelector('.humidity')
const $wind=document.querySelector('.wind')
const $feels_like=document.querySelector(".feels_like")

const form=document.getElementById('locationInput')
const search=document.querySelector('.search')
const btn=document.querySelector('.submit')
const icon=document.querySelector('.icon')
const cities=document.querySelectorAll('.city')

const app=document.querySelector('.app')

setTimeout(function(){
    document.querySelector('.panel').classList.add('show');
  }, 300);

cities.forEach((city) => {
    city.addEventListener('click', (e)=>{

        cityInput=e.target.innerHTML;
        
        fetchWeatherData();

        app.style.opacity="0";
    });
});


form.addEventListener('submit',(e)=>{

    
    if(search.value.lenght==0){
    alert('Please type in a city name')
    }else{
        cityInput=search.value;

        fetchWeatherData();

        search.value="";
        app.style.opacity="0";
    }
    e.preventDefault();
})

function dayOftheWeek(month, day, year){
    const weekday=[
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturdary",
    ];
    return weekday[new Date(`${month}/${day}/${year}`).getDay()];
};

function fetchWeatherData(){
    fetch(`https://api.weatherapi.com/v1/current.json?key=e7c9117906f041d580d125607231805&q=${cityInput}`)

    .then((response) => response.json())
    .then((data) => {
    console.log('Success:', data);
    $temp.innerHTML=data.current.temp_c+"&#176;"
    $condition.innerHTML=data.current.condition.text

    const date=data.location.localtime
    const year= parseInt(date.substr(0,4))
    const month= parseInt(date.substr(5,2))
    const day= parseInt(date.substr(8,2))
    const time=date.substr(11);

    $date.innerHTML=`${dayOftheWeek(month,day,year)} ${day}/${month}/${year}`
    $time.innerHTML=time;
    $name.innerHTML=data.location.name;

    const iconId=data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64".length);   
    icon.src="./icons/"+iconId;

    $cloud.innerHTML=data.current.cloud + "%";
    $wind.innerHTML=data.current.wind_kph +"km/h";
    $humidity.innerHTML=data.current.humidity + "%";
    $feels_like.innerHTML=data.current.feelslike_c+"&#176;"+"C";

    let timeOfDay="day"

    const code =data.current.condition.code

    if(data.current.is_day==0){
        timeOfDay="night";
    }

    if(code==1000)
    {
        app.style.backgroundImage=`url(./images/${timeOfDay}/clear.jpg)`;
        btn.style.background="#4372aa";
        if(timeOfDay=="night"){
            btn.style.background="#3e5167";
        }
    }
    else if(
        code==1003 ||
        code==1006 ||
        code==1009 ||
        code==1030 ||
        code==1069 ||
        code==1087 ||
        code==1135 ||
        code==1273 ||
        code==1276 ||
        code==1279 ||
        code==1282
    ){
        app.style.backgroundImage=`url(./images/${timeOfDay}/cloudy.jpg)`
        btn.style.background="#587489";
        
        if(timeOfDay=="night"){
            btn.style.background="#534b4a"
        }
    }
    else if(
    code==1063 ||
    code==1089 ||
    code==1072 ||
    code==1150 ||
    code==1153 ||
    code==1180 ||
    code==1183 ||
    code==1186 ||
    code==1189 ||
    code==1192 ||
    code==1195 ||
    code==1204 ||
    code==1207 ||
    code==1240 ||
    code==1243 ||
    code==1246 ||
    code==1249 ||
    code==1252
){
    app.style.backgroundImage=`url(./images/${timeOfDay}/rainy.jpg)`;
    btn.style.background="#1d4962";
    if(timeOfDay=='night'){
        btn.style.background="#185977"
    }
}
else{
    app.style.backgroundImage=`url(./images/${timeOfDay}/snowy.jpg)`;
    btn.style.background="#967c82";
    if(timeOfDay=="night"){
        btn.style.background="#3c3f56"
    }
    
}
app.style.opacity="1";
  })
  .catch(()=>{
    alert('City not found, please try again')
    app.style.opacity="1"
  })
}

fetchWeatherData();