import React, {useState, useEffect} from "react";
import { serverFetch } from "../../utils/api";
import ProgressReportCard from "../../components/Progress/ProgressReportCard";

const ProgressPage = (progress) => {
    const onLoad = async () => {
        const dummyData = await serverFetch("GET", "progress-table");
        setData(dummyData);
        console.log(dummyData)
      };
    
      useEffect(() => {
        onLoad();
      }, []);
    
      const [data, setData] = useState([]);
    return (
        <div>
      {data.map(row => 
        <ProgressReportCard key={row[0]} satisfaction={row[1]} date={row[2]}/>)}
    </div>
    )
}

export default ProgressPage;