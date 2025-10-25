/**
 * Utility functions for arrays: sum, findDuplicates, count
 *
 * Functions:
 *  - sum(array): returns numeric sum of items (numbers or numeric strings)
 *  - findDuplicates(array): returns an array of values that appear more than once (unique values)
 *  - count(array): returns an object mapping each value to its occurrence count
 *
 * Notes:
 *  - These helpers treat array elements as primitives (numbers, strings, booleans).
 *  - For sum(), non-numeric values that cannot be converted to numbers will throw a TypeError.
 */

/**
 * Sum numeric values in an array.
 * @param {Array<number|string>} arr
 * @returns {number}
 */
function sum(arr) {
  if (!Array.isArray(arr)) throw new TypeError('sum expects an array');
  return arr.reduce((acc, v, i) => {
    const n = Number(v);
    if (Number.isNaN(n)) {
      throw new TypeError(`sum: element at index ${i} is not numeric: ${JSON.stringify(v)}`);
    }
    return acc + n;
  }, 0);
}

/**
 * Return an array of values that appear more than once in the input.
 * Each duplicate value appears only once in the returned array, in the order they
 * first appear as duplicates.
 * @param {Array<any>} arr
 * @returns {Array<any>}
 */
function findDuplicates(arr) {
  if (!Array.isArray(arr)) throw new TypeError('findDuplicates expects an array');
  const counts = new Map();
  const duplicates = new Set();
  for (const item of arr) {
    // Use Map with primitive keys; objects will be keyed by reference
    const prev = counts.get(item) || 0;
    counts.set(item, prev + 1);
    if (prev + 1 === 2) duplicates.add(item);
  }
  // preserve insertion order of duplicates as they first reached count 2
  const result = [];
  for (const item of arr) {
    if (duplicates.has(item)) {
      result.push(item);
      duplicates.delete(item); // ensure each duplicate included only once
    }
  }
  return result;
}

/**
 * Count occurrences of each value in the array and return an object map.
 * Keys are the stringified versions of the values (same as using object keys).
 * For primitive values this is straightforward; for objects, keys will be "[object Object]".
 * @param {Array<any>} arr
 * @returns {Object}
 */
function count(arr) {
  if (!Array.isArray(arr)) throw new TypeError('count expects an array');
  const map = Object.create(null);
  for (const item of arr) {
    const key = String(item);
    map[key] = (map[key] || 0) + 1;
  }
  return map;
}

// Export for Node.js / CommonJS
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { sum, findDuplicates, count };
}

// Also expose globally if running in browser (optional)
if (typeof window !== 'undefined') {
  window.arrayUtils = { sum, findDuplicates, count };
}
