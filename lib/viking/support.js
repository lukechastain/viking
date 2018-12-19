// Viking.Support
// -------------
//
// Viking.Support is a collection of utility classes and standard library
// extensions that were found useful for the Viking framework. These
// additions reside in this package so they can be loaded as needed
// in Javascript projects outside of Viking.

import * as array from './support/array';
import * as boolean from './support/boolean';
import * as date from './support/date';
import * as number from './support/number';
import * as object from './support/object';
import * as string from './support/string';

// export function toParam(value: any)
export function toParam(value) {

    if (Array.isArray(value)) {
        return array.toParam(value);
    }

    if (typeof value === 'boolean') {
        return boolean.toParam(value);
    }

    if (value instanceof Date) {
        return date.toParam(value);
    }

    if (typeof value === 'number') {
        return number.toParam(value);
    }

    if (typeof value === 'string') {
        return string.toParam(value);
    }

    if (typeof value === 'object') {
        return object.toParam(value);
    }

    // TODO: throw error here
}

// export function toQuery(value: any, key: string)
export function toQuery(value, key) {

    if (value === null || value === undefined) {
        return;
    }

    if (Array.isArray(value)) {
        return array.toQuery(value, key);
    }

    if (typeof value === 'boolean') {
        return boolean.toQuery(value, key);
    }

    if (value instanceof Date) {
        return date.toQuery(value, key);
    }

    if (typeof value === 'number') {
        return number.toQuery(value, key);
    }

    if (typeof value === 'string') {
        return string.toQuery(value, key);
    }

    if (typeof value === 'object') {
        return object.toQuery(value, key);
    }
    
    // TODO: throw error here
}

export function each(value, callback) {
    if (value === null || value === undefined) {
        return;
    }
    
    if (Array.isArray(value)) {
        value.forEach(callback);
    } else {
        Object.keys(value).forEach((k) => {
            callback(k, value[k]);
        });
    }
}

function isFunction(object) {
    return !!(object && object.constructor && object.call && object.apply);
}

export function result(obj, key) {
    let value = obj[key];
    
    if (isFunction(value)) {
        return value.call(obj);
    } else {
        return value;
    }
}

let idCounter = 0;

export function uniqueId(prefix) {
    let id = ++idCounter;
    return prefix + id;
}

export function domReady(callback) {
    if (document.readyState !== 'loading') {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
}

export function isEqual(a, b) {
    if (a === b) {
      return true;
    }
    
    if (Array.isArray(a) && Array.isArray(b)) {
        return arrayIsEqual(a, b);
    }
    
    if (a === null || b === null || a === undefined || b === undefined) {
        return false;
    }
    
    if (typeof a !== 'object' || typeof b !== 'object') {
        return false;
    }
    
    let akeys = Object.keys(a);
    let bkeys = Object.keys(a);
    
    for (let i = 0; i < bkeys.length; i++) { 
        if (!akeys.includes(bkeys[i])) {
            return false;
        }
    }
    
    for (let i = 0; i < akeys.length; i++) { 
        if ( !isEqual(a[akeys[i]], b[akeys[i]]) ) {
            return false;
        }
    }

    return true;
}

function arrayIsEqual(a, b) {
    if (a.length != b.length) {
        return false;
    }
    
    for (let i = 0; i < a.length; i++) { 
        if (!isEqual(a[i], b[i])) {
            return false;
        }
    }
    
    return true;
}