import { useEffect, useState } from "react";
import ChartBox from "../../components/chartBox/ChartBox";
import axios from "axios";





const Reddit = () => {


    const [searchText,setSearchText] = useState("learnprogramming")  
    const [followers,setFollowers] = useState("")
    const [interactions,setInteractions] = useState("")
    const [score,setScore] = useState("")


    const handleSearch = async (e)=>{
        e.preventDefault()
        try {
            const response = await axios.get(`https://www.reddit.com/r/${searchText}/about.json`)

            const {data} = response.data 
            console.log(data.subscribers)
            
            setFollowers(data.subscribers)
            setInteractions(data.accounts_active)
            setScore(data.qualityScore) 
            setLoader(true)

        } catch (error) {
            console.log(error)
        }
    }
    /*there is one more api call for about.json which give json response for all th posts 
    tried for applying cron jobs but didn't make it so used setTimeout

    setTimeout(handleSearch,1000 * 60 * 60 * 24)  --- for 24 hours will automatically get saved into database

    A graph can be plotted below when we can get data from database
    
    */


    return (
        <div>
        <div className="topnav">
        <input 
        type="text" 
        placeholder="Search.." 
        value={searchText}
        onChange={(e)=> setSearchText(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
    </div>
        <div className="home">
        
            <div className="box box2">
                <ChartBox
                title="Total Subscribers"
                color= "#8884d8"
                number={followers}
                /> 
            </div>
            <div className="box box3">
                <ChartBox
                title="Live Users"
                number={interactions}
                />
            </div>

        </div>
    </div>
    )
}

export default Reddit;