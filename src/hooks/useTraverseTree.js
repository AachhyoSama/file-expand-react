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
        }

        return tree; // updated tree
    };

    return { insertNode };
};

export default useTraverseTree;
