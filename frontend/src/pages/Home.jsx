// import React from "react";
// import Hero from "../components/Hero";
// import AddTask from "../components/AddTask";
// import TaskList from "../components/TaskList";
// import { useAuthContext } from "../context/AuthContext";

// const Home = () => {
//   const { isLogin } = useAuthContext();
//   return (
//     <div className="h-lvh">
//       {isLogin ? (
//         <div className="flex flex-col md:flex-row items-center m-10">
//           <AddTask />
//           <TaskList />
//         </div>
//       ) : (
//         <div>
//           <Hero />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

import React from "react";
import Hero from "../components/Hero";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import { useAuthContext } from "../context/AuthContext";

const Home = () => {
  const { isLogin } = useAuthContext();
  return (
    <div className="min-h-screen bg-gray-50">
      {isLogin ? (
        <div className="flex flex-col lg:flex-row gap-6 items-start md:items-stretch m-4 md:m-10">
          <AddTask />
          <TaskList />
        </div>
      ) : (
        <Hero />
      )}
    </div>
  );
};

export default Home;
