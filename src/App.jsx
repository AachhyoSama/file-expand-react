import { useState } from "react";
import Folder from "./components/Folder";
import explorer from "./data/folderData";

const App = () => {
    const [explorerData, setExplorerData] = useState(explorer);
    return <Folder explorer={explorer} />;
};

export default App;
