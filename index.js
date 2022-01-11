getWeather()
 async function getWeather(){
        
    try{
   let city = document.querySelector("#city").value || "delhi";
      let url =`//api.openweathermap.org/data/2.5/weather?q=${city}&cnt=7&appid=8197fa1033b893802e25eb4f61598f11&units=metric`;
     
    
      let res = await fetch(url);
      let data = await res.json();
      let lon = data.coord.lon;
      let lat =data.coord.lat;

      let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=Minute , hourly&appid=8197fa1033b893802e25eb4f61598f11&units=metric`;
    let res2 = await fetch(url2);
    let data2 = await res2.json();
     console.log(data2)
      weatherreport(data)
      show7Day(data2)
      console.log(data)
    }
   
    catch(err){
        console.log("not valide" + err)
    }
  
 function showmap(){
     let datamap = document.querySelector("#city").value;
     let map = document.querySelector("#gmap_canvas");
     map.src = `https://maps.google.com/maps?q=${datamap}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
 }
 showmap()
    
 }
// . Show min temp, max temp, wind, clounds, weathericon, sunset  ,temp_max: 10.05 . temp_min: 10.05,,weathericon: 1640828601 , sunset: 1640865813,deg: 0   speed: 1.03  description
 function weatherreport(data){
     document.querySelector("#data").innerHTML = "";
     let temp = document.createElement("p");
     temp.textContent = "min temp - "+ data.main.temp_min+"°C";
     let temp1 = document.createElement("p");
     temp1.textContent = "max temp - "+ data.main.temp_max+"°C";
     let windspeed = document.createElement("p");
     windspeed.textContent = "wind - "+ data.wind.speed +" Km/h";
     let country = document.createElement("p");
     country.textContent= "Country - "+ data.sys.country;
     let weathericon = document.createElement("img");
     let iconcode = data.weather[0].icon;
    weathericon.src  = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
    let tempdiv = document.createElement("div");
  tempdiv.setAttribute("id" , "temp")
  tempdiv.append(temp , temp1)
  let winddiv = document.createElement("div");
  winddiv.setAttribute("id" , "wind")
      winddiv.append(windspeed, country)
      let icoddiv = document.createElement("div")
      icoddiv.setAttribute("id" , "sevenday")
     let riseset = document.createElement("div");
     riseset.setAttribute("id" , "rise")
  let icons = document.createElement("div");
  icons.append(weathericon)
  icons.setAttribute("id" , "icon")
  let sunrise = data.sys.sunrise;
  let sunset = data.sys.sunset;
  let data1 = new Date(sunrise*1000);
  let data2 = new Date(sunset*1000);
  let time1 = `${data1.getHours()} : ${data1.getMinutes()} AM`;
  let time2= `${data2.getHours()} : ${data2.getMinutes()} PM`;
  let name1 = document.createElement("h2");
  name1.textContent = "Sunrise " +time1;
  let name2 = document.createElement("h2");
  name2.textContent ="Sunset " + time2;
  riseset.append(name1 , name2)
      icoddiv.append(riseset,icons)
     document.querySelector("#data").append(tempdiv, winddiv,icoddiv)       
 }

 function show7Day(data){
document.querySelector("#sevendaydata").innerHTML="";
          
          var sevenday= data.daily;
          console.log(sevenday);
          for( let i=0;i<sevenday.length-1;i++){
            var childDiv=document.createElement("div");
                childDiv.setAttribute("class","childDiv");
                var dayName=document.createElement("p");
                var date = new Date(sevenday[i].dt*1000);
                    var dayIndex= date.getDay();
                    if(dayIndex==0){
                        dayName.textContent="Sun";
                    }
                    else if(dayIndex==1){
                        dayName.textContent="Mon";
                    }
                    else if(dayIndex==2){
                        dayName.textContent="Tue";
                    }
                    else if(dayIndex==3){
                        dayName.textContent="Wed";
                    }
                    else if(dayIndex==4){
                        dayName.textContent="Thu";
                    }
                    else if(dayIndex==5){
                        dayName.textContent="Fri";
                    }
                    else if(dayIndex==6){
                        dayName.textContent="Sat";
                    }
                var cloudImg=document.createElement("img");
               cloudImg.src="http://openweathermap.org/img/wn/" + sevenday[i].weather[0].icon + "@2x.png"
                var maxtemp=document.createElement("h3");
                 maxtemp.setAttribute("class","maxTemp")
                  maxtemp.textContent=`${sevenday[i].temp.max}°C`;
                var mintemp=document.createElement("h3");
                mintemp.setAttribute("class","minTemp")
                mintemp.textContent=`${sevenday[i].temp.min}°C`;
               childDiv.append(dayName,cloudImg,maxtemp,mintemp);
               document.querySelector("#sevendaydata").append(childDiv);
          }
          
          
    }

