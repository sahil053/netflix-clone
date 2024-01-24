import "./home.css";
import Featuredinfo from "./../../components/featuredinfo/Featuredinfo";
import Chart from "../../components/chart/Chart";
import { userData } from "./../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";

export default function Home() {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("/users/stats", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTdkYWU2ZjExY2M4Y2E4Yjg4Y2U0NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNTQ5OTg4MywiZXhwIjoxNzA1OTMxODgzfQ.5ORjd9t-S-KWAsB1WFZMzUwkQajguzY-nnHRWf5kbIo",
          },
        });
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });

        const updatedStats = statsList.map((item) => ({
          name: MONTHS[item._id - 1],
          "New User": item.total,
        }));

        setUserStats(updatedStats);
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [MONTHS]);

  console.log(userStats);
  return (
    <div className="home">
      <Featuredinfo />
      <Chart data={userStats} title="User Analytics" grid datakey="New User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
