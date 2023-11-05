import GoalCard from "../../components/GoalCard/GoalCard";

const HomePage = () => {
  const DATA = [{
    gid: 1,
    category: "sdfd",
    weight: "sdf",
    date: "112312"
  },{
    gid: 2,
    category: "sdfd",
    weight: "sdf",
    date: "112312"
  },
  {
    gid: 3,
    category: "sdfd",
    weight: "sdf",
    date: "112312"
  }]

  const foo = (data) => {
    return <GoalCard />
  }

  return (
    <>
      <div className="mt-8 text-3xl font-bold underline text-center">HOME PAGE</div>

      <GoalCard title = "Category: "/>
      <GoalCard title = "card2"/>
      {DATA.map(item => <GoalCard key={item.gid} />)}
    </>
  );
};

export default HomePage;
