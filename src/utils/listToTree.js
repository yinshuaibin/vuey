export default function listToTree (list) {
  if (!list) {
    return null
  }
  let temp = []
  let tree = {}
  for (let i in list) {
    temp[list[i].id] = list[i]
  }
  for (let i in temp) {
    if (temp[i].parentId) {
      if (!temp[temp[i].parentId].children) {
        temp[temp[i].parentId].children = []
      }
      temp[temp[i].parentId].children[temp[i].id] = temp[i]
    } else {
      tree[temp[i].id] = temp[i]
    }
  }
  return tree
}
