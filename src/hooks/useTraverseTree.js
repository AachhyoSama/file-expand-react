const useTraverseTree = () => {
    const insertNode = (tree, folderId, item, isFolder) => {
        if (tree.id === folderId && tree.isFolder) {
            // unshift is opposite of push, it adds element in the front
            tree.items.unshift({
                id: new Date().getTime(),
                name: item,
                isFolder,
                items: [],
            });

            return tree; // updated tree
        }

        const updatedItems = tree.items.map((child) =>
            insertNode(child, folderId, item, isFolder)
        );

        return { ...tree, items: updatedItems };
    };

    const deleteNode = (tree, folderId) => {
        if (tree.id === folderId) {
            return null; // remove the node
        }

        const updatedItems = tree.items
            .map((child) => deleteNode(child, folderId))
            .filter((child) => child !== null); // filter out null values

        return { ...tree, items: updatedItems };
    };

    const editNode = (tree, folderId, newName) => {
        if (tree.id === folderId) {
            return { ...tree, name: newName }; // update the name
        }

        const updatedItems = tree.items.map((child) =>
            editNode(child, folderId, newName)
        );

        return { ...tree, items: updatedItems };
    };

    return { insertNode, deleteNode, editNode };
};

export default useTraverseTree;
