const test = require('ava')
const compare = require('../compareAsync')

test('arrays not equal', t => {
  return compare(a, c).then(result => t.false(result))
})

test('arrays equal', t => {
  return compare(a, b).then(result => t.true(result))
})

test('deeper arrays equal', t => {
  return compare(arr1, arr2).then(result => t.true(result))
})

test('deeper not equal because different orders', t => {
  return compare(arr1, arr3).then(result => t.false(result))
})

const a = [1, 2, 'test', { a: '1' }, ['five', 'six', { hi: 'world' }]]
const b = [1, 2, 'test', { a: '1' }, ['five', 'six', { hi: 'world' }]]
const c = [1, 2, { a: '1' }, 'test']
let arr1 = [
  1,
  2,
  3,
  'test',
  'test2',
  'test3',
  {
    a: 12,
    b: 13,
    c: 14,
    d: [ 71, 72, 73, { 'sonested': true } ]
  }
]

let arr2 = [
  1,
  2,
  3,
  'test',
  'test2',
  'test3',
  {
    a: 12,
    b: 13,
    c: 14,
    d: [ 71, 72, 73, { 'sonested': true } ]
  }
]

let arr3 = [
  3,
  1,
  2,
  'test2',
  'test3',
  'test',
  {
    a: 12,
    c: 14,
    b: 13,
    d: [ 71, 72, 73, { 'sonested': true } ]
  }
]
