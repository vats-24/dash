import { useEffect, useState } from "react";
import ChartBox from "../../components/chartBox/ChartBox";
import TopBox from "../../components/topBox/TopBox";
import "./dashboard.scss"
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


const Dashboard = () => {
    /*the menu items we can only navigate to instagram and reddit rest are for look purpose only and redirects to main page*/

    const navigate = useNavigate()

    // const location = useLocation()
    // const {username} = location.state

    //if(username === null) navigate("/")

    /*i've taken username from localstorage we can call useEffect to generate data for loggedin username but given search functionality to get access of data for famous people
    the histprical data with graphs is plotted whenever username is searched not included toaster for invalid usernames we can toast it*/
    const [searchText,setSearchText] = useState(localStorage.getItem("Username"))  
    const [id,setID] = useState("")
    const [followers,setFollowers] = useState("")
    const [interactions,setInteractions] = useState("")
    const [score,setScore] = useState("")
    const [likes,setLikes] = useState("")
    const [comments,setComments] = useState("")
    const [videoLikes,setVideoLikes] = useState("")
    const [loader,setLoader] = useState(false)
    const [newArray,setNewArray] = useState([]);

    const handleSearch = async (e)=>{
        e.preventDefault()
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/instagram-stats/username/${searchText}`,{
                withCredentials: true
            })
            const {data} = response.data 
            setFollowers(data.usersCount)
            setInteractions(data.avgInteractions)
            setScore(data.qualityScore) 
            setLikes(data.avgLikes)
            setComments(data.avgComments)
            setVideoLikes(data.avgVideoLikes)
            setID(data.groupID)
            setLoader(true)
            toast("Data Fetched Successfully")
        } catch (error) {
            console.log(error)
        }
    }

    const retroSearch = async () =>{
        try {
            console.log(id)
            const apiRes = await axios.get(`http://localhost:5000/api/v1/instagram-stats/retro/${id}`,{
                withCredentials: true
            }) 

            console.log(apiRes)

            const currentArray = apiRes.data.data.series.current
            setNewArray([...currentArray])
            console.log(newArray)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(loader){
            retroSearch()
        }
    },[loader])

    const formatDate = (dateString) => {
        const parts = dateString.split('.');
        return new Date(parts[2], parts[1] - 1, parts[0]);
      };
    
      const followersChartData = newArray.map((item) => ({
        date: formatDate(item.date),
        followers: item.usersCount
      }));
    
      const engagementRateChartData = newArray.map((item) => ({
        date: formatDate(item.date),
        engagementRate: item.er
      }));

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
        
            <div className="box box1">
                <TopBox/>
            </div>
            <div className="box box2">
                <ChartBox
                title="Total Followers"
                color= "#8884d8"
                number={followers}
                /> 
            </div>
            <div className="box box3">
                <ChartBox
                title="Average Interactions"
                number={interactions}
                />
            </div>
            <div className="box box4">
                <ChartBox
                title="Quality Score"
                number={score}
                />
            </div>
            <div className="box box5">
                <ChartBox
                title="Average Likes"
                number={likes}
                />
            </div>
            <div className="box box6">
                <ChartBox
                title="Average Comments"
                number={comments}
                />
            </div>
            <div className="box box7">
                <ChartBox
                title="Average Video Likes"
                number={videoLikes}
                />
            </div>
        </div>
        <h2>Historical Stats</h2>
<table>
  <tr>
    <th>Date</th>
    <th>Followers Count</th>
    <th>Engagement Rate</th>
  </tr>

  {loader && newArray.map((item)=>(
    <tr className="prev">
        <th>{item.date}</th>
        <th>{item.usersCount}</th>
        <th>{item.er}</th>
    </tr>

    

  ))
  }
</table>

    <div className="charts">
          <h3>Followers Chart</h3>
          <LineChart width={600} height={300} data={followersChartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="followers" stroke="#8884d8" />
          </LineChart>

          <h3>Engagement Rate Chart</h3>
          <LineChart width={600} height={300} data={engagementRateChartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="engagementRate" stroke="#82ca9d" />
          </LineChart>
        </div>


    </div>
    )
}

export default Dashboard;