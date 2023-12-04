import "./topBox.scss"
import cristiano from "./assets/278931269_360124899498969_9006978846103417088_n.jpg"
import leomessi from "./assets/397982323_1068531357902078_6086157178992916321_n.jpg"
import selena from "./assets/367980133_252043217728414_4166703995571461365_n.jpg"
import kylie from "./assets/403780951_294771343532374_1741709838571017453_n.jpg"
import rock from "./assets/11850309_1674349799447611_206178162_a.jpg"
import kim from "./assets/314397231_636674618202803_1672434101401302981_n.jpg"

export const topFollowers = [
  {
    id: 1,
    img: cristiano,
    username: "Cristiano Ronaldo",
    email: "",
    amount: "612.4M",
  },
  {
    id: 2,
    img: leomessi,
    username: "Leo Messi",
    email: "",
    amount: "493M",
  },
  {
    id: 3,
    img: selena,
    username: "Selena Gomez",
    email: "",
    amount: "429.7M",
  },
  {
    id: 4,
    img: kylie,
    username: "Kylie Jenner",
    email: "",
    amount: "399M",
  },
  {
    id: 5,
    img: rock,
    username: "The Rock",
    email: "",
    amount: "393M",
  },
  {
    id: 6,
    img: kim,
    username: "Kim K",
    email: "",
    amount: "363.8M",
  },
];

function TopBox() {
  console.log(topFollowers[0].img)
  return (
    <div className="topBox">
        <h1>Top Followers</h1>
        <div className="list">
            {topFollowers.map((users)=>(
                <div className="listItem">
                    <div className="user">
                    <img src={users.img} alt="" />
                    <div className="userTexts">
                <span className="username">{users.username}</span>
                <span className="email">{users.email}</span>
              </div>
                    </div>
                    <span className="amount">{users.amount}</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TopBox