const EMPTY_OBJECT = '__empty__obj'
const EMPTY_ARRAY = '__empty__arr'

class Node {
  constructor() {
    this.children = []
    this.hash = 0
  }
}

const stringify = (thing) => (typeof thing) + '::' + thing
const hasher = (thing, prefix = '') => {
  const stringThing = prefix + stringify(thing)
  let hash = 0
  if (stringThing.length === 0) return hash
  for (let i = 0; i < stringThing.length; i++) {
      const char = stringThing.charCodeAt(i)
      hash = ((hash<<5)-hash)+char
      hash = hash & hash
  }
  return hash
}

const newNode = (thing, prefix) => {
  const node = new Node()
  node.hash = hasher(thing, prefix)
  return node
}

const createTree = (currNode, currentInput, prefix = '') => {
  const isObject = typeof currentInput === 'object'
  const isArray = Array.isArray(currentInput)
  const keys = Object.keys(currentInput)

  // we're at a weird value
  if (currentInput instanceof Date || currentInput instanceof RegExp) {
    return newNode(currentInput, prefix)
  }

  // if we're at a value
  if (!isObject && !isArray) {
    return newNode(currentInput, prefix)
  }
  
  // if we're at an iterable
  if (!keys.length) {
    return isArray ? newNode(EMPTY_ARRAY, prefix) : newNode(EMPTY_OBJECT, prefix)
  }
  for (var i = 0; i < keys.length; i++) {
    const key = keys[i]
    
    let prefix
    if (!isArray && isObject) { // if we're dealing with an object prefix the key
      prefix = key
    }

    const node = createTree(new Node(), currentInput[key], prefix)
    currNode.children.push(node)
  }
  
  // need to sort children first
  const childrenHashes = currNode.children.map(c => '' + c.hash)
  childrenHashes.sort()
  
  const childrenReducedHashes = childrenHashes.reduce((acc, childHash) => acc + childHash, '')
  currNode.hash = hasher(childrenReducedHashes)
  return currNode
}

const createFinalHash = (input) => {
  const tree = createTree(new Node(), input)
  return tree.hash
}

const compareUnsorted = (a, b) => {
  if (!(Array.isArray(a) && Array.isArray(b)) || a.length !== b.length) return false
  if (createFinalHash(a) !== createFinalHash(b)) return false
  return true
}

module.exports = compareUnsorted