const internalCompare = (value1, value2) => new Promise((resolve, reject) => {
  if (Array.isArray(value1)) {
    if (Array.isArray(value2)) {
      return compareAsync(value1, value2).then((result) => {
        if (result) {
          return resolve(result)
        } else {
          return reject(result)
        }
      })
    }
    // a man has an array, a girl does not
    return reject(false)
  }
  if (typeof value1 === 'object') {
    if (typeof value2 === 'object') {
      return compareAsync(value1, value2).then((result) => {
        if (result) {
          return resolve(result)
        } else {
          return reject(result)
        }
      })
    }
    // a man has an object, a girl does not
    return reject(false)
  }
  if (value1 !== value2) {
    // a man has values that a girl does not share
    return reject(false)
  }

  resolve(true)
})

const compareAsync = (arr1, arr2) => new Promise((resolve, reject) => {
  if (Array.isArray(arr1) && Array.isArray(arr2)) {
    if (arr1.length !== arr2.length) {
      // a man's array does not look like a girl's array
      return resolve(false)
    }
  }
  const promises = []
  const keys = Object.keys(arr1)
  for (let i = 0; i < keys.length; i++) {
    promises.push(internalCompare(arr1[keys[i]], arr2[keys[i]]))
  }

  return Promise.all(promises)
    .then(() => resolve(true))
    .catch(() => resolve(false))
})

module.exports = compareAsync
