import ReactDOM from "react-dom";
import { Playground } from "./components/playground";

const App = () => {
  return <Playground />;
};

ReactDOM.render(<App />, document.querySelector("#root"));
