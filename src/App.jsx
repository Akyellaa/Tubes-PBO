import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import DashboardStats from "./component/DashboardStats";
import TaskManager from "./component/TaskManager.jsx";

function App(){
  return(
    <>
      <Header></Header>
      <DashboardStats />
      <TaskManager />
      <Footer></Footer>
    </>
  );
}

export default App;