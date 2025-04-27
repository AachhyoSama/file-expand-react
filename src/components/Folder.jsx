import { useState } from "react";

function Folder({ explorer }) {
    const [expand, setExpand] = useState(false);

    if (explorer.isFolder) {
        return (
            <div>
                <div className="folder" onClick={() => setExpand(!expand)}>
                    <span>🗂️ {explorer.name}</span>
                </div>

                <div
                    style={{
                        marginLeft: 25,
                        display: expand ? "block" : "none",
                    }}
                >
                    {explorer.items.map((item) => (
                        <Folder explorer={item} key={item.id} />
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
}

export default Folder;
