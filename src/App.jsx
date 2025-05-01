import { useState } from "react";
import Folder from "./components/Folder";
import explorer from "./data/folderData";
import useTraverseTree from "./hooks/useTraverseTree";

const App = () => {
    const [explorerData, setExplorerData] = useState(explorer);

    // get the hook here
    const { insertNode } = useTraverseTree();

    const handleInsertNode = (folderId, item, isFolder) => {
        const updatedTree = insertNode(explorerData, folderId, item, isFolder);

        setExplorerData(updatedTree);
    };

    return <Folder handleInsertNode={handleInsertNode} explorer={explorer} />;
};

export default App;
