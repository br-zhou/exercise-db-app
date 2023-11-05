import GoalCard from "../../components/GoalCard/GoalCard";

const HomePage = () => {
  const DATA = [{
    gid: 1,
    category: "w",
    weight: "23",
    date: "112312"
  },{
    gid: 2,
    category: "p",
    weight: "45",
    date: "12434"
  },
  {
    gid: 3,
    category: "w",
    weight: "64",
    date: "24324"
  }]

  const foo = (data) => {
    return <GoalCard />
  }

  return (
    <>
      <div className="mt-8 text-3xl font-bold underline text-center">HOME PAGE</div>
  
      {DATA.map(item => <GoalCard key={item.gid} {...item}/> )}
  
      <input type="checkbox" data-role="checkbox" data-caption="Indeterminate" data-indeterminate="true" />
  
      <input type="checkbox" data-role="checkbox" data-caption="Indeterminate" data-indeterminate="true" data-style="2" />

      
    </>
  );
  
};

export default HomePage;
