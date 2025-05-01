import { useState } from "react";

const Folder = ({ handleInsertNode, explorer }) => {
    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: null,
    });

    const handleAddFolder = (e, isFolder) => {
        e.stopPropagation();
        setExpand(true);
        setShowInput({
            visible: true,
            isFolder,
        });
    };

    const onAddFolder = (e) => {
        // 13 is the code for "Enter" button on keyboard
        if (e.keyCode == 13 && e.target.value) {
            handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
            // close the input
            setShowInput({ ...showInput, visible: false });
        }
    };

    if (explorer.isFolder) {
        return (
            <div className="container">
                <div className="folder" onClick={() => setExpand(!expand)}>
                    <span>
                        {expand ? "-" : "+"} 🗂️ {explorer.name}
                    </span>
                    <div>
                        <button
                            className="folder-button"
                            onClick={(e) => handleAddFolder(e, true)}
                        >
                            + 🗂️
                        </button>
                        <button
                            className="folder-button"
                            onClick={(e) => handleAddFolder(e, false)}
                        >
                            + 📄
                        </button>
                    </div>
                </div>

                {/* this is the part to be expanded */}
                <div
                    style={{
                        marginLeft: 25,
                        display: expand ? "block" : "none",
                    }}
                >
                    {showInput.visible && (
                        <span>
                            {showInput.isFolder ? "🗂️" : "📄"}
                            <input
                                className="inputContainer"
                                type="text"
                                autoFocus
                                onBlur={() => {
                                    setShowInput({
                                        ...showInput,
                                        visible: false,
                                    });
                                }}
                                onKeyDown={onAddFolder}
                            />
                        </span>
                    )}
                    {explorer.items.map((item) => (
                        <Folder
                            handleInsertNode={handleInsertNode}
                            explorer={item}
                            key={item.id}
                        />
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <div className="file">
                <span>📄 {explorer.name}</span>
            </div>
        );
    }
};

export default Folder;
