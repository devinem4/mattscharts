import "./App.css";
import { genHospStays } from "./mock-data/genHospStays";
import { LineOverTimeChart } from "./components/LineOverTimeChart";
import { BaseChart } from "./components/BaseChart";

function App() {
  const data = genHospStays(22);
  console.log(data);
  return (
    <div className="App">
      <h3>Welcome to the app</h3>
      <LineOverTimeChart data={data} getX={(d) => d.id} getY={(d) => d.los} />
      <BaseChart>
        <circle cx="50" cy="75" r="30" fill="white" />
        <circle cx="55" cy="80" r="25" fill="pink" />
        <circle cx="60" cy="85" r="20" fill="hotpink" />
      </BaseChart>
    </div>
  );
}

export default App;
