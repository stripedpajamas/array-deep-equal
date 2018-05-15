const test = require('ava')
const compare = require('../')

test('arrays not equal', t => {
  t.false(compare(a, c))
})

test('arrays equal', t => {
  t.true(compare(a, b))
})

test('deeper arrays equal', t => {
  t.true(compare(arr1, arr2))
})

test('deeper not equal because different orders', t => {
  t.false(compare(arr1, arr3))
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
