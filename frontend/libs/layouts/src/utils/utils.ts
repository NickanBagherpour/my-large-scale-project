export function searchMenuItems(menu, query) {
  const result: any[] = [];
  const parentIds: any[] = [];

  if (!menu) return { result: null, parentIds: null };

  if (query.trim() === '') {
    parentIds.splice(0, parentIds.length);
  }

  for (const item of menu) {
    if (item.title.includes(query)) {
      result.push(item);
      parentIds.push(item.id.toString());
    } else if (item.children && item.children.length > 0) {
      const childResult = searchMenuItems(item.children, query).result;
      if (childResult && childResult.length > 0) {
        result.push({ ...item, children: childResult });
        parentIds.push(item.id.toString());
      }
    }
  }
  return { result, parentIds };
}

export function findActiveMenuItem(menuItems, currentUrl) {
  if (!menuItems) return null;

  for (let i = 0; i < menuItems.length; i++) {
    if (menuItems[i].v3_href && currentUrl && currentUrl.includes(menuItems[i].v3_href)) {
      return menuItems[i];
    } else if (menuItems[i].children) {
      const subMenuActiveItem = findActiveMenuItem(menuItems[i].children, currentUrl);
      if (subMenuActiveItem) {
        return subMenuActiveItem;
      }
    }
  }
  return null;
}

export function findActiveParentKeys(data, targetKey) {
  let parentChain: string[] = [];

  function recursiveSearchParentNode(nodes, chain) {
    for (const node of nodes) {
      const newChain = [...chain, node.id.toString()];
      if (node.id === targetKey) {
        parentChain = newChain;
        return true;
      }
      if (node.children && recursiveSearchParentNode(node.children, newChain)) {
        return true;
      }
    }
    return false;
  }
  recursiveSearchParentNode(data, []);
  return parentChain;
}
