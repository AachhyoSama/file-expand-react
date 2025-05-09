import { useState } from "react";

const Folder = ({
    handleInsertNode,
    handleDeleteNode,
    handleEditNode,
    explorer,
}) => {
    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: null,
    });
    const [editMode, setEditMode] = useState(false);
    const [editText, setEditText] = useState(explorer.name);

    const handleAddFolder = (e, isFolder) => {
        e.stopPropagation();
        setExpand(true);
        setShowInput({ visible: true, isFolder });
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        handleDeleteNode(explorer.id);
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        setEditMode(true);
    };

    const onAddFolder = (e) => {
        if (e.keyCode === 13 && e.target.value) {
            handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
            setShowInput({ visible: false, isFolder: null });
        }
    };

    const onEdit = (e) => {
        if (e.keyCode === 13 && e.target.value) {
            handleEditNode(explorer.id, e.target.value);
            setEditMode(false);
        }
    };

    if (explorer.isFolder) {
        return (
            <div className="container">
                <div className="folder" onClick={() => setExpand(!expand)}>
                    <span>
                        {expand ? "-" : "+"} 🗂️{" "}
                        {editMode ? (
                            <input
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onKeyDown={onEdit}
                                onClick={(e) => e.stopPropagation()}
                                autoFocus
                            />
                        ) : (
                            explorer.name
                        )}
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

                        <button
                            className="folder-button edit-button"
                            onClick={handleEdit}
                        >
                            ✍️
                        </button>
                        <button
                            className="folder-button delete-button"
                            onClick={handleDelete}
                        >
                            🗑️
                        </button>
                    </div>
                </div>
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
                                onBlur={() =>
                                    setShowInput({
                                        visible: false,
                                        isFolder: null,
                                    })
                                }
                                onKeyDown={onAddFolder}
                            />
                        </span>
                    )}
                    {explorer.items.map((item) => (
                        <Folder
                            key={item.id}
                            explorer={item}
                            handleInsertNode={handleInsertNode}
                            handleDeleteNode={handleDeleteNode}
                            handleEditNode={handleEditNode}
                        />
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <div className="file">
                <span>
                    📄{" "}
                    {editMode ? (
                        <input
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={onEdit}
                            onClick={(e) => e.stopPropagation()}
                            autoFocus
                        />
                    ) : (
                        explorer.name
                    )}
                </span>
                <div>
                    <button
                        className="folder-button edit-button"
                        onClick={handleEdit}
                    >
                        ✍️
                    </button>
                    <button
                        className="folder-button delete-button"
                        onClick={handleDelete}
                    >
                        🗑️
                    </button>
                </div>
            </div>
        );
    }
};

export default Folder;
