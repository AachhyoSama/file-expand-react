import { useState } from "react";
import Folder from "./components/Folder";
import explorer from "./data/folderData";
import useTraverseTree from "./hooks/useTraverseTree";

const App = () => {
    const [explorerData, setExplorerData] = useState(explorer);

    // get the hook here
    const { insertNode, deleteNode, editNode } = useTraverseTree();

    const handleInsertNode = (folderId, item, isFolder) => {
        const updatedTree = insertNode(explorerData, folderId, item, isFolder);

        setExplorerData(updatedTree);
    };

    const handleDeleteNode = (folderId) => {
        const updatedTree = deleteNode(explorerData, folderId);

        setExplorerData(updatedTree);
    };

    const handleEditNode = (folderId, newName) => {
        const updatedTree = editNode(explorerData, folderId, newName);

        setExplorerData(updatedTree);
    };

    return (
        <Folder
            explorer={explorerData}
            handleInsertNode={handleInsertNode}
            handleDeleteNode={handleDeleteNode}
            handleEditNode={handleEditNode}
        />
    );
};

export default App;
