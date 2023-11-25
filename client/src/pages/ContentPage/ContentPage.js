import React, { useState } from "react";
import ContentCard from "../../components/ContentCard/ContentCard";


const ContentPage = () => {
  const [content] = useState([
    {
      cid: 1,
      category: "Nutrition",
      author: "A",
      url: "https://www.health.harvard.edu/topics/nutrition"
    },
    {
      cid: 2,
      category: "Exercise",
      author: "B",
      url: "https://www.health.harvard.edu/topics/exercise-and-fitness"
    },
    {
      cid: 3,
      category: "Nutrition",
      author: "C",
      url: "https://www.helpguide.org/articles/healthy-eating/healthy-eating.htm"
    },
    {
      cid: 4,
      category: "Exercise",
      author: "D",
      url: "https://www.helpguide.org/articles/healthy-living/the-mental-health-benefits-of-exercise.htm"
    },
    {
      cid: 5,
      category: "Nutrition",
      author: "E",
      url: "https://www.nytimes.com/spotlight/well-nutrition"
    }
  ]);


return (
    <div>
      <div className="mt-8 text-3xl font-bold underline text-center">
        CONTENT PAGE
      </div>


      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap", 
          justifyContent: "center",
          width: "100%"
        }}
      >

      {content.map((item) => (
        <div
          key={item.cid} 
          style={{
            margin: "10px", // Adjust the margin between the cards
            width: "calc(33.33% - 20px)", // Set the width to fit 3 cards in a row with margins
            maxWidth: "500px", // Set a maximum width for each card if needed
          }}
        >
          <ContentCard {...item} />
        </div>
      ))}
        </div>
      </div>
      );
};

export default ContentPage;
