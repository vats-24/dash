import axios from "axios"
import Stats from "../models/Stats.js";

export const igStats = async (req,res,next) =>{
  const {username} = req.params
  console.log(username)

  const options = {
    method: 'GET',
    url: 'https://instagram-statistics-api.p.rapidapi.com/community',
    params: {
      url: `https://www.instagram.com/${username}/`
    },
    headers: {
      'X-RapidAPI-Key': '8ca72e9b34msh4fba916bf5b12d2p119279jsn3580df321f37',  //can use proccess.env.RAPID
      'X-RapidAPI-Host': 'instagram-statistics-api.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    res.status(200).json(response.data) //res.data.data.usersCount

    /*
    tried to store the information like this in the database later got the retrospective api which aleready stores the historical information so fetched using that
    try {
      const newData = new Stats({
        usersCount: res.data.data.usersCount,
        avgLikes: res.data.data.avgLikes,
        avgComments: res.data.data.avgComments,
        avgVideoLikes: res.data.data.avgVideoLikes,
        qualityScore: res.data.data.qualityScore
      })
      await newData.save()
      res.status(200).json("Stats has been fetched")
    } catch (error) {
      
    }

    after this used logic for setTimeout() - the api will be called automatically after certain hours and data could be saved to the database
    as I am using rapidAPI and it has limited number of API calls so I'm using retroIG to take those value and not using api call after certain times to get the data
    

    setTimeout(igStats,1000 * 60 * 60 * 24)  --- for saving it into database for every 24 hours andplot the graph

    we can use cronjob for this for scheduling
    */

  } catch (error) {
    console.error(error);
    next(error)
  }
}



/* retroIg api gave me all the historical data*/ 
export const retroIg = async(req,res,next)=>{
  try {
    const today = new Date();

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 5);

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(today);
    console.log("Hemmmllo")
    console.log("Hi",req.params.instID)
 
    const options = {
      method: 'GET', 
      url: 'https://instagram-statistics-api.p.rapidapi.com/statistics/retrospective',
      params: {
        cid: `INST:${req.params.instID}`,
        from: formattedStartDate,
        to: formattedEndDate,
      },
      headers: {
        'X-RapidAPI-Key': '8ca72e9b34msh4fba916bf5b12d2p119279jsn3580df321f37', //can use proccess.env.RAPID
        'X-RapidAPI-Host': 'instagram-statistics-api.p.rapidapi.com'
      }
    }
    const response = await axios.request(options);
    console.log(response)
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


function formatDate(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); 
  const yyyy = date.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}


