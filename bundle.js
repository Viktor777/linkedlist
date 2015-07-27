(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var LinkedList = require('./lib/LinkedList'),
    LinkedListMap = require('./lib/LinkedListMap'),
    LinkedListWeakMap = require('./lib/LinkedListWeakMap'),
    l = new LinkedList(),
    lM = new LinkedListMap(),
    lWM = new LinkedListWeakMap();

lWM.unshift({
    test: 1
}).unshift([2, 3, 4])
    .unshift('5')
    .unshift(6);

console.log(lWM.shift(), lWM);

lWM.forEach(function (node) {
    console.log(node);
});
},{"./lib/LinkedList":2,"./lib/LinkedListMap":3,"./lib/LinkedListWeakMap":4}],2:[function(require,module,exports){
'use strict';

function LinkedList() {

    Object.defineProperties(this, {
        length: {
            value: 0,
            writable: true
        },
        head: {
            value: null,
            writable: true
        },
        tail: {
            value: null,
            writable: true
        }
    });

    if (arguments.length) {
        this.concat.apply(this, arguments);
    }
}

LinkedList.Node = function (data, prev, next) {
    this.data = data;
    this.prev = prev;

    if (prev) {
        prev.next = this;
    }
    this.next = next;

    if (next) {
        next.prev = this;
    }
};

LinkedList.Node.prototype = Object.create(null, {
    constructor: {
        value: LinkedList.Node
    }
});

/**
 * Check if variable is LinkedList.Node
 * @param arg
 * @returns {boolean}
 */
LinkedList.Node.isNode = function (arg) {
    return arg instanceof LinkedList.Node;
};

LinkedList.prototype = Object.create(null, {
    constructor: {
        value: LinkedList
    },
    push: {
        /**
         * Insert value of any type at the end of list
         * @param data
         * @returns {LinkedList}
         */
        value: function (data) {
            this.tail = new LinkedList.Node(data, this.tail, null);

            if (!this.length) {
                this.head = this.tail;
            }
            this.length++;

            return this;
        }
    },
    pop: {
        /**
         * Remove node from the end of list
         * @returns {*}
         */
        value: function () {
            var node;

            if (!this.length) {
                return undefined;
            }
            node = this.tail;
            this.length--;

            if (!this.length) {
                this.tail = this.head = null;
            } else {
                this.tail = node.prev;
                this.tail.next = null;
            }
            node.prev = node.next = null;

            return node.data;
        }
    },
    unshift: {
        /**
         * Insert value of any type at the start of list
         * @param data
         * @returns {LinkedList}
         */
        value: function (data) {
            this.head = new LinkedList.Node(data, null, this.head);

            if (!this.length) {
                this.tail = this.head;
            }
            this.length++;

            return this;
        }
    },
    shift: {
        /**
         * Remove node from the start of list
         * @returns {*}
         */
        value: function () {
            var node;

            if (!this.length) {
                return undefined;
            }
            node = this.head;
            this.length--;

            if (!this.length) {
                this.head = this.tail = null;
            } else {
                this.head = node.next;
                this.head.prev = null;
            }
            node.prev = node.next = null;

            return node.data;
        }
    },
    forEach: {
        /**
         * Loop through all nodes in the list
         * @param {function} fn
         * @returns {LinkedList}
         */
        value: function (fn) {
            var current;

            for (current = this.head; current; current = current.next) {
                fn.call(this, current, this);
            }

            return this;
        }
    },
    insertAfter: {
        /**
         * Insert new node after specific one
         * @param {LinkedList.Node} node
         * @param                   data
         * @returns {LinkedList}
         */
        value: function (node, data) {

            if (!LinkedList.Node.isNode(node)) {
                throw new TypeError('node must be a LinkedList.Node');
            }

            if (node === this.tail) {
                this.push(data);
            } else {
                node.next = new LinkedList.Node(data, node, node.next);
                this.length++;
            }

            return this;
        }
    },
    insertBefore: {
        /**
         * Insert new node before specific one
         * @param {LinkedList.Node} node
         * @param                   data
         * @returns {LinkedList}
         */
        value: function (node, data) {

            if (!LinkedList.Node.isNode(node)) {
                throw new TypeError('node must be a LinkedList.Node');
            }

            if (node === this.head) {
                this.unshift(data);
            } else {
                node.prev = new LinkedList.Node(data, node.prev, node);
                this.length++;
            }

            return this;
        }
    },
    remove: {
        /**
         * Remove node from the list
         * @param {LinkedList.Node} node
         * @returns {*}
         */
        value: function (node) {

            if (!LinkedList.Node.isNode(node)) {
                throw new TypeError('node must be a LinkedList.Node');
            }

            if (node === this.head) {
                return this.shift();
            }

            if (node === this.tail) {
                return this.pop();
            }

            if (node.prev) {
                node.prev.next = node.next;
            }

            if (node.next) {
                node.next.prev = node.prev;
            }
            node.prev = node.next = null;
            this.length--;

            return node.data;
        }
    },
    append: {
        /**
         * Remove node from the list and insert it at the end
         * @param {LinkedList.Node} node
         * @returns {LinkedList}
         */
        value: function (node) {

            if (!LinkedList.Node.isNode(node)) {
                throw new TypeError('node must be a LinkedList.Node');
            }

            if (node !== this.tail) {
                this.push(this.remove(node));
            }

            return this;
        }
    },
    prepend: {
        /**
         * Remove node from the list and insert it at the start
         * @param {LinkedList.Node} node
         * @returns {LinkedList}
         */
        value: function (node) {

            if (!LinkedList.Node.isNode(node)) {
                throw new TypeError('node must be a LinkedList.Node');
            }

            if (node !== this.head) {
                this.unshift(this.remove(node));
            }

            return this;
        }
    },
    concat: {
        /**
         * Concat list with other data
         * @returns {LinkedList}
         */
        value: function () {
            var i, l;

            for (i = 0, l = arguments.length; i < l; i++) {
                if (LinkedList.isLinkedList(arguments[i])) {
                    if (this.isEmpty()) {
                        this.head = arguments[i].head;
                        this.tail = arguments[i].tail;
                        this.length = arguments[i].length;
                    } else {
                        this.tail.next = arguments[i].head;
                        this.tail.next.prev = this.tail;
                        this.tail = arguments[i].tail;
                        this.length += arguments[i].length;
                    }
                } else {
                    this.push(arguments[i]);
                }
            }

            return this;
        }
    },
    reverse: {
        /**
         * Reverse nodes query in the list
         * @returns {LinkedList}
         */
        value: function () {
            var current,
                next,
                prev = null;

            for (current = this.head; current; current = next) {
                current.prev = next = current.next;
                current.next = prev;
                prev = current;
            }
            this.tail = this.head;
            this.head = prev;

            return this;
        }
    },
    join: {
        /**
         * Join nodes in list to string
         * @param {string} separator
         * @returns {string}
         */
        value: function (separator) {
            var current,
                str = '';

            for (current = this.head; current; current = current.next) {
                str += current.data.toString() + separator;
            }

            return str.slice(0, -1);
        }
    },
    isEmpty: {
        /**
         * Check if list has any data
         * @returns {boolean}
         */
        value: function () {
            return this.head === null;
        }
    },
    toString: {
        /**
         * Convert list to string
         * @returns {string}
         */
        value: function () {
            return this.join(',');
        }
    },
    valueOf: {
        /**
         * Get list
         * @returns {LinkedList}
         */
        value: function () {
            return this;
        }
    }
});

if (typeof Symbol === 'function') {
    Object.defineProperty(LinkedList.prototype, Symbol.iterator, {
        /**
         * Iterator
         * @returns {{next: Function}}
         */
        value: function () {
            var current = this.head;

            return {
                next: function () {

                    if (current.next) {
                        current = current.next;

                        return {
                            value: current.prev,
                            done: false
                        };
                    }

                    return {
                        value: undefined,
                        done: true
                    };
                }
            };
        }
    });
}

/**
 * Check if variable is LinkedList
 * @param arg
 * @returns {boolean}
 */
LinkedList.isLinkedList = function (arg) {
    return arg instanceof LinkedList;
};

module.exports = LinkedList;
},{}],3:[function(require,module,exports){
'use strict';

function LinkedList() {
    var _list = new Map();

    Object.defineProperty(this, 'list', {
        /**
         * Return map of nodes
         * @returns {Map}
         */
        get: function () {
            return _list;
        }
    });
}

LinkedList.prototype = Object.create(null, {
    constructor: {
        value: LinkedList
    },
    head: {
        /**
         * Get head (start node) of the list
         * @returns {*}
         */
        get: function () {
            return this.list.get(null);
        }
    },
    clear: {
        /**
         * Clear list, remove all nodes
         * @returns {LinkedList}
         */
        value: function () {
            this.list.clear();

            return this;
        }
    },
    unshift: {
        /**
         * Insert value of any type at the start of list
         * @param data
         * @returns {LinkedList}
         */
        value: function (data) {
            var head = this.head;

            this.list.set(null, {
                data: data
            });
            this.list.set(this.head, head);

            return this;
        }
    },
    shift: {
        /**
         * Remove node from the start of list
         * @returns {*}
         */
        value: function () {
            var head = this.head;

            this.list.set(null, this.list.get(this.head));

            return head.data;
        }
    },
    forEach: {
        /**
         * Loop through all nodes in the list
         * @param fn
         * @returns {LinkedList}
         */
        value: function (fn) {
            var current;

            for (current = this.head; current; current = this.list.get(current)) {
                fn.call(this, current, this);
            }

            return this;
        }
    }
});

/**
 * Check if variable is LinkedList
 * @param arg
 * @returns {boolean}
 */
LinkedList.isLinkedList = function (arg) {
    return arg instanceof LinkedList;
};

module.exports = LinkedList;
},{}],4:[function(require,module,exports){
'use strict';

function LinkedList() {
    var _list = new WeakMap();

    Object.defineProperties(this, {
        head: {
            value: null,
            writable: true
        },
        list: {
            /**
             * Return map of nodes
             * @returns {WeakMap}
             */
            get: function () {
                return _list;
            }
        }
    });
}

LinkedList.prototype = Object.create(null, {
    constructor: {
        value: LinkedList
    },
    clear: {
        /**
         * Clear list, remove all nodes
         * @returns {LinkedList}
         */
        value: function () {
            this.head = null;
            this.list = new WeakMap();

            return this;
        }
    },
    unshift: {
        /**
         * Insert value of any type at the start of list
         * @param data
         * @returns {LinkedList}
         */
        value: function (data) {
            var head;

            if (!this.head) {
                this.head = {
                    prev: null,
                    next: null
                };
            } else {
                head = {
                    prev: null,
                    next: this.head
                };
                this.head.prev = head;
                this.head = head;
            }
            this.list.set(this.head, data);

            return this;
        }
    },
    shift: {
        /**
         * Remove node from the start of list
         * @returns {*}
         */
        value: function () {
            var data = this.list.get(this.head);

            if (this.list.delete(this.head)) {
                this.head = this.head.next;
            }

            return data;
        }
    },
    remove: {
        /**
         * Remove node from the list
         * @returns {*}
         */
        value: function (node) {
            var data = this.list.get(node);

            node.prev.next = node.next;
            node.next.prev = node.prev;
            this.list.delete(node);

            return data;
        }
    },
    prepend: {
        /**
         * Remove node from the list and insert it at the start
         * @param node
         * @returns {LinkedList}
         */
        value: function (node) {

            if (this.head === node) {
                this.unshift(this.remove(node));
            }

            return this;
        }
    },
    forEach: {
        /**
         * Loop through all nodes in the list
         * @param fn
         * @returns {LinkedList}
         */
        value: function (fn) {
            var current;

            for (current = this.head; current; current = current.next) {
                fn.call(this, this.list.get(current), this);
            }

            return this;
        }
    },
    reverse: {
        /**
         * Reverse nodes query in the list
         * @returns {LinkedList}
         */
        value: function () {
            var current,
                next,
                prev = null;

            for (current = this.head; current; current = next) {
                current.prev = next = current.next;
                current.next = prev;
                prev = current;
            }
            this.head = prev;

            return this;
        }
    },
    insetBefore: {
        value: function (node, data) {

        }
    },
    insetAfter: {
        value: function (node, data) {

        }
    },
    join: {
        /**
         * Join nodes in list to string
         * @param {string} separator
         * @returns {string}
         */
        value: function (separator) {
            var current,
                str = '',
                data;

            for (current = this.head; current; current = current.next) {
                data = this.list.get(current);

                if (typeof data === 'undefined' || data === null) {
                    data = '';
                }

                if (typeof data.toString === 'function') {
                    str += data.toString() + separator;
                }
            }

            return str.slice(0, -1);
        }
    },
    toString: {
        /**
         * Convert list to string
         * @returns {string}
         */
        value: function () {
            return this.join(',');
        }
    },
    valueOf: {
        /**
         * Get list
         * @returns {LinkedList}
         */
        value: function () {
            return this;
        }
    },
    isEmpty: {
        /**
         * Check if list has any data
         * @returns {boolean}
         */
        value: function () {
            return this.head === null;
        }
    }
});

if (typeof Symbol === 'function') {
    Object.defineProperty(LinkedList.prototype, Symbol.iterator, {
        /**
         * Iterator
         * @returns {{next: Function}}
         */
        value: function () {
            var current = this.head;

            return {
                next: function () {

                    if (current.next) {
                        current = current.next;

                        return {
                            value: this.list.get(current.prev),
                            done: false
                        };
                    }

                    return {
                        value: undefined,
                        done: true
                    };
                }.bind(this)
            };
        }
    });
}

/**
 * Check if variable is LinkedList
 * @param arg
 * @returns {boolean}
 */
LinkedList.isLinkedList = function (arg) {
    return arg instanceof LinkedList;
};

module.exports = LinkedList;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy92aWt0b3IvRG9jdW1lbnRzL0RldmVsb3BtZW50L0pTL0xpbmtlZExpc3Qvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3Zpa3Rvci9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvSlMvTGlua2VkTGlzdC9mYWtlX2EyZTM5YzVjLmpzIiwiL1VzZXJzL3Zpa3Rvci9Eb2N1bWVudHMvRGV2ZWxvcG1lbnQvSlMvTGlua2VkTGlzdC9saWIvTGlua2VkTGlzdC5qcyIsIi9Vc2Vycy92aWt0b3IvRG9jdW1lbnRzL0RldmVsb3BtZW50L0pTL0xpbmtlZExpc3QvbGliL0xpbmtlZExpc3RNYXAuanMiLCIvVXNlcnMvdmlrdG9yL0RvY3VtZW50cy9EZXZlbG9wbWVudC9KUy9MaW5rZWRMaXN0L2xpYi9MaW5rZWRMaXN0V2Vha01hcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDelpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBMaW5rZWRMaXN0ID0gcmVxdWlyZSgnLi9saWIvTGlua2VkTGlzdCcpLFxuICAgIExpbmtlZExpc3RNYXAgPSByZXF1aXJlKCcuL2xpYi9MaW5rZWRMaXN0TWFwJyksXG4gICAgTGlua2VkTGlzdFdlYWtNYXAgPSByZXF1aXJlKCcuL2xpYi9MaW5rZWRMaXN0V2Vha01hcCcpLFxuICAgIGwgPSBuZXcgTGlua2VkTGlzdCgpLFxuICAgIGxNID0gbmV3IExpbmtlZExpc3RNYXAoKSxcbiAgICBsV00gPSBuZXcgTGlua2VkTGlzdFdlYWtNYXAoKTtcblxubFdNLnVuc2hpZnQoe1xuICAgIHRlc3Q6IDFcbn0pLnVuc2hpZnQoWzIsIDMsIDRdKVxuICAgIC51bnNoaWZ0KCc1JylcbiAgICAudW5zaGlmdCg2KTtcblxuY29uc29sZS5sb2cobFdNLnNoaWZ0KCksIGxXTSk7XG5cbmxXTS5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgY29uc29sZS5sb2cobm9kZSk7XG59KTsiLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIExpbmtlZExpc3QoKSB7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgICAgIGxlbmd0aDoge1xuICAgICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBoZWFkOiB7XG4gICAgICAgICAgICB2YWx1ZTogbnVsbCxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHRhaWw6IHtcbiAgICAgICAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5jb25jYXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG59XG5cbkxpbmtlZExpc3QuTm9kZSA9IGZ1bmN0aW9uIChkYXRhLCBwcmV2LCBuZXh0KSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLnByZXYgPSBwcmV2O1xuXG4gICAgaWYgKHByZXYpIHtcbiAgICAgICAgcHJldi5uZXh0ID0gdGhpcztcbiAgICB9XG4gICAgdGhpcy5uZXh0ID0gbmV4dDtcblxuICAgIGlmIChuZXh0KSB7XG4gICAgICAgIG5leHQucHJldiA9IHRoaXM7XG4gICAgfVxufTtcblxuTGlua2VkTGlzdC5Ob2RlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUobnVsbCwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgIHZhbHVlOiBMaW5rZWRMaXN0Lk5vZGVcbiAgICB9XG59KTtcblxuLyoqXG4gKiBDaGVjayBpZiB2YXJpYWJsZSBpcyBMaW5rZWRMaXN0Lk5vZGVcbiAqIEBwYXJhbSBhcmdcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5MaW5rZWRMaXN0Lk5vZGUuaXNOb2RlID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiBhcmcgaW5zdGFuY2VvZiBMaW5rZWRMaXN0Lk5vZGU7XG59O1xuXG5MaW5rZWRMaXN0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUobnVsbCwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgIHZhbHVlOiBMaW5rZWRMaXN0XG4gICAgfSxcbiAgICBwdXNoOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnNlcnQgdmFsdWUgb2YgYW55IHR5cGUgYXQgdGhlIGVuZCBvZiBsaXN0XG4gICAgICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICAgICAqIEByZXR1cm5zIHtMaW5rZWRMaXN0fVxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnRhaWwgPSBuZXcgTGlua2VkTGlzdC5Ob2RlKGRhdGEsIHRoaXMudGFpbCwgbnVsbCk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWQgPSB0aGlzLnRhaWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCsrO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcG9wOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmUgbm9kZSBmcm9tIHRoZSBlbmQgb2YgbGlzdFxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbm9kZTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlID0gdGhpcy50YWlsO1xuICAgICAgICAgICAgdGhpcy5sZW5ndGgtLTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFpbCA9IHRoaXMuaGVhZCA9IG51bGw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudGFpbCA9IG5vZGUucHJldjtcbiAgICAgICAgICAgICAgICB0aGlzLnRhaWwubmV4dCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLnByZXYgPSBub2RlLm5leHQgPSBudWxsO1xuXG4gICAgICAgICAgICByZXR1cm4gbm9kZS5kYXRhO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB1bnNoaWZ0OiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnNlcnQgdmFsdWUgb2YgYW55IHR5cGUgYXQgdGhlIHN0YXJ0IG9mIGxpc3RcbiAgICAgICAgICogQHBhcmFtIGRhdGFcbiAgICAgICAgICogQHJldHVybnMge0xpbmtlZExpc3R9XG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZCA9IG5ldyBMaW5rZWRMaXN0Lk5vZGUoZGF0YSwgbnVsbCwgdGhpcy5oZWFkKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFpbCA9IHRoaXMuaGVhZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubGVuZ3RoKys7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBzaGlmdDoge1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlIG5vZGUgZnJvbSB0aGUgc3RhcnQgb2YgbGlzdFxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbm9kZTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlID0gdGhpcy5oZWFkO1xuICAgICAgICAgICAgdGhpcy5sZW5ndGgtLTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVhZCA9IHRoaXMudGFpbCA9IG51bGw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVhZCA9IG5vZGUubmV4dDtcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWQucHJldiA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLnByZXYgPSBub2RlLm5leHQgPSBudWxsO1xuXG4gICAgICAgICAgICByZXR1cm4gbm9kZS5kYXRhO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBmb3JFYWNoOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMb29wIHRocm91Z2ggYWxsIG5vZGVzIGluIHRoZSBsaXN0XG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gICAgICAgICAqIEByZXR1cm5zIHtMaW5rZWRMaXN0fVxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIChmbikge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnQ7XG5cbiAgICAgICAgICAgIGZvciAoY3VycmVudCA9IHRoaXMuaGVhZDsgY3VycmVudDsgY3VycmVudCA9IGN1cnJlbnQubmV4dCkge1xuICAgICAgICAgICAgICAgIGZuLmNhbGwodGhpcywgY3VycmVudCwgdGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBpbnNlcnRBZnRlcjoge1xuICAgICAgICAvKipcbiAgICAgICAgICogSW5zZXJ0IG5ldyBub2RlIGFmdGVyIHNwZWNpZmljIG9uZVxuICAgICAgICAgKiBAcGFyYW0ge0xpbmtlZExpc3QuTm9kZX0gbm9kZVxuICAgICAgICAgKiBAcGFyYW0gICAgICAgICAgICAgICAgICAgZGF0YVxuICAgICAgICAgKiBAcmV0dXJucyB7TGlua2VkTGlzdH1cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAobm9kZSwgZGF0YSkge1xuXG4gICAgICAgICAgICBpZiAoIUxpbmtlZExpc3QuTm9kZS5pc05vZGUobm9kZSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdub2RlIG11c3QgYmUgYSBMaW5rZWRMaXN0Lk5vZGUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5vZGUgPT09IHRoaXMudGFpbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHVzaChkYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZS5uZXh0ID0gbmV3IExpbmtlZExpc3QuTm9kZShkYXRhLCBub2RlLCBub2RlLm5leHQpO1xuICAgICAgICAgICAgICAgIHRoaXMubGVuZ3RoKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBpbnNlcnRCZWZvcmU6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluc2VydCBuZXcgbm9kZSBiZWZvcmUgc3BlY2lmaWMgb25lXG4gICAgICAgICAqIEBwYXJhbSB7TGlua2VkTGlzdC5Ob2RlfSBub2RlXG4gICAgICAgICAqIEBwYXJhbSAgICAgICAgICAgICAgICAgICBkYXRhXG4gICAgICAgICAqIEByZXR1cm5zIHtMaW5rZWRMaXN0fVxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIChub2RlLCBkYXRhKSB7XG5cbiAgICAgICAgICAgIGlmICghTGlua2VkTGlzdC5Ob2RlLmlzTm9kZShub2RlKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ25vZGUgbXVzdCBiZSBhIExpbmtlZExpc3QuTm9kZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobm9kZSA9PT0gdGhpcy5oZWFkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnNoaWZ0KGRhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlLnByZXYgPSBuZXcgTGlua2VkTGlzdC5Ob2RlKGRhdGEsIG5vZGUucHJldiwgbm9kZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5sZW5ndGgrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlbW92ZToge1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlIG5vZGUgZnJvbSB0aGUgbGlzdFxuICAgICAgICAgKiBAcGFyYW0ge0xpbmtlZExpc3QuTm9kZX0gbm9kZVxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAobm9kZSkge1xuXG4gICAgICAgICAgICBpZiAoIUxpbmtlZExpc3QuTm9kZS5pc05vZGUobm9kZSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdub2RlIG11c3QgYmUgYSBMaW5rZWRMaXN0Lk5vZGUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5vZGUgPT09IHRoaXMuaGVhZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNoaWZ0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChub2RlID09PSB0aGlzLnRhaWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wb3AoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5vZGUucHJldikge1xuICAgICAgICAgICAgICAgIG5vZGUucHJldi5uZXh0ID0gbm9kZS5uZXh0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobm9kZS5uZXh0KSB7XG4gICAgICAgICAgICAgICAgbm9kZS5uZXh0LnByZXYgPSBub2RlLnByZXY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLnByZXYgPSBub2RlLm5leHQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5sZW5ndGgtLTtcblxuICAgICAgICAgICAgcmV0dXJuIG5vZGUuZGF0YTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYXBwZW5kOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmUgbm9kZSBmcm9tIHRoZSBsaXN0IGFuZCBpbnNlcnQgaXQgYXQgdGhlIGVuZFxuICAgICAgICAgKiBAcGFyYW0ge0xpbmtlZExpc3QuTm9kZX0gbm9kZVxuICAgICAgICAgKiBAcmV0dXJucyB7TGlua2VkTGlzdH1cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAobm9kZSkge1xuXG4gICAgICAgICAgICBpZiAoIUxpbmtlZExpc3QuTm9kZS5pc05vZGUobm9kZSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdub2RlIG11c3QgYmUgYSBMaW5rZWRMaXN0Lk5vZGUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5vZGUgIT09IHRoaXMudGFpbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHVzaCh0aGlzLnJlbW92ZShub2RlKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBwcmVwZW5kOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmUgbm9kZSBmcm9tIHRoZSBsaXN0IGFuZCBpbnNlcnQgaXQgYXQgdGhlIHN0YXJ0XG4gICAgICAgICAqIEBwYXJhbSB7TGlua2VkTGlzdC5Ob2RlfSBub2RlXG4gICAgICAgICAqIEByZXR1cm5zIHtMaW5rZWRMaXN0fVxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIChub2RlKSB7XG5cbiAgICAgICAgICAgIGlmICghTGlua2VkTGlzdC5Ob2RlLmlzTm9kZShub2RlKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ25vZGUgbXVzdCBiZSBhIExpbmtlZExpc3QuTm9kZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobm9kZSAhPT0gdGhpcy5oZWFkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnNoaWZ0KHRoaXMucmVtb3ZlKG5vZGUpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNvbmNhdDoge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29uY2F0IGxpc3Qgd2l0aCBvdGhlciBkYXRhXG4gICAgICAgICAqIEByZXR1cm5zIHtMaW5rZWRMaXN0fVxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpLCBsO1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChMaW5rZWRMaXN0LmlzTGlua2VkTGlzdChhcmd1bWVudHNbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkID0gYXJndW1lbnRzW2ldLmhlYWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhaWwgPSBhcmd1bWVudHNbaV0udGFpbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gYXJndW1lbnRzW2ldLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFpbC5uZXh0ID0gYXJndW1lbnRzW2ldLmhlYWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhaWwubmV4dC5wcmV2ID0gdGhpcy50YWlsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YWlsID0gYXJndW1lbnRzW2ldLnRhaWw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxlbmd0aCArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmV2ZXJzZToge1xuICAgICAgICAvKipcbiAgICAgICAgICogUmV2ZXJzZSBub2RlcyBxdWVyeSBpbiB0aGUgbGlzdFxuICAgICAgICAgKiBAcmV0dXJucyB7TGlua2VkTGlzdH1cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudCxcbiAgICAgICAgICAgICAgICBuZXh0LFxuICAgICAgICAgICAgICAgIHByZXYgPSBudWxsO1xuXG4gICAgICAgICAgICBmb3IgKGN1cnJlbnQgPSB0aGlzLmhlYWQ7IGN1cnJlbnQ7IGN1cnJlbnQgPSBuZXh0KSB7XG4gICAgICAgICAgICAgICAgY3VycmVudC5wcmV2ID0gbmV4dCA9IGN1cnJlbnQubmV4dDtcbiAgICAgICAgICAgICAgICBjdXJyZW50Lm5leHQgPSBwcmV2O1xuICAgICAgICAgICAgICAgIHByZXYgPSBjdXJyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy50YWlsID0gdGhpcy5oZWFkO1xuICAgICAgICAgICAgdGhpcy5oZWFkID0gcHJldjtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGpvaW46IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEpvaW4gbm9kZXMgaW4gbGlzdCB0byBzdHJpbmdcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHNlcGFyYXRvclxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIChzZXBhcmF0b3IpIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50LFxuICAgICAgICAgICAgICAgIHN0ciA9ICcnO1xuXG4gICAgICAgICAgICBmb3IgKGN1cnJlbnQgPSB0aGlzLmhlYWQ7IGN1cnJlbnQ7IGN1cnJlbnQgPSBjdXJyZW50Lm5leHQpIHtcbiAgICAgICAgICAgICAgICBzdHIgKz0gY3VycmVudC5kYXRhLnRvU3RyaW5nKCkgKyBzZXBhcmF0b3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzdHIuc2xpY2UoMCwgLTEpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBpc0VtcHR5OiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayBpZiBsaXN0IGhhcyBhbnkgZGF0YVxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oZWFkID09PSBudWxsO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB0b1N0cmluZzoge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydCBsaXN0IHRvIHN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmpvaW4oJywnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdmFsdWVPZjoge1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGxpc3RcbiAgICAgICAgICogQHJldHVybnMge0xpbmtlZExpc3R9XG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTGlua2VkTGlzdC5wcm90b3R5cGUsIFN5bWJvbC5pdGVyYXRvciwge1xuICAgICAgICAvKipcbiAgICAgICAgICogSXRlcmF0b3JcbiAgICAgICAgICogQHJldHVybnMge3tuZXh0OiBGdW5jdGlvbn19XG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzLmhlYWQ7XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Lm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGN1cnJlbnQucHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb25lOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB2YXJpYWJsZSBpcyBMaW5rZWRMaXN0XG4gKiBAcGFyYW0gYXJnXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuTGlua2VkTGlzdC5pc0xpbmtlZExpc3QgPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIGFyZyBpbnN0YW5jZW9mIExpbmtlZExpc3Q7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpbmtlZExpc3Q7IiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBMaW5rZWRMaXN0KCkge1xuICAgIHZhciBfbGlzdCA9IG5ldyBNYXAoKTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbGlzdCcsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBtYXAgb2Ygbm9kZXNcbiAgICAgICAgICogQHJldHVybnMge01hcH1cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9saXN0O1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbkxpbmtlZExpc3QucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShudWxsLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgdmFsdWU6IExpbmtlZExpc3RcbiAgICB9LFxuICAgIGhlYWQ6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBoZWFkIChzdGFydCBub2RlKSBvZiB0aGUgbGlzdFxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGlzdC5nZXQobnVsbCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNsZWFyOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDbGVhciBsaXN0LCByZW1vdmUgYWxsIG5vZGVzXG4gICAgICAgICAqIEByZXR1cm5zIHtMaW5rZWRMaXN0fVxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdC5jbGVhcigpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdW5zaGlmdDoge1xuICAgICAgICAvKipcbiAgICAgICAgICogSW5zZXJ0IHZhbHVlIG9mIGFueSB0eXBlIGF0IHRoZSBzdGFydCBvZiBsaXN0XG4gICAgICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICAgICAqIEByZXR1cm5zIHtMaW5rZWRMaXN0fVxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICB2YXIgaGVhZCA9IHRoaXMuaGVhZDtcblxuICAgICAgICAgICAgdGhpcy5saXN0LnNldChudWxsLCB7XG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmxpc3Quc2V0KHRoaXMuaGVhZCwgaGVhZCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBzaGlmdDoge1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlIG5vZGUgZnJvbSB0aGUgc3RhcnQgb2YgbGlzdFxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaGVhZCA9IHRoaXMuaGVhZDtcblxuICAgICAgICAgICAgdGhpcy5saXN0LnNldChudWxsLCB0aGlzLmxpc3QuZ2V0KHRoaXMuaGVhZCkpO1xuXG4gICAgICAgICAgICByZXR1cm4gaGVhZC5kYXRhO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBmb3JFYWNoOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMb29wIHRocm91Z2ggYWxsIG5vZGVzIGluIHRoZSBsaXN0XG4gICAgICAgICAqIEBwYXJhbSBmblxuICAgICAgICAgKiBAcmV0dXJucyB7TGlua2VkTGlzdH1cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50O1xuXG4gICAgICAgICAgICBmb3IgKGN1cnJlbnQgPSB0aGlzLmhlYWQ7IGN1cnJlbnQ7IGN1cnJlbnQgPSB0aGlzLmxpc3QuZ2V0KGN1cnJlbnQpKSB7XG4gICAgICAgICAgICAgICAgZm4uY2FsbCh0aGlzLCBjdXJyZW50LCB0aGlzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuLyoqXG4gKiBDaGVjayBpZiB2YXJpYWJsZSBpcyBMaW5rZWRMaXN0XG4gKiBAcGFyYW0gYXJnXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuTGlua2VkTGlzdC5pc0xpbmtlZExpc3QgPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIGFyZyBpbnN0YW5jZW9mIExpbmtlZExpc3Q7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpbmtlZExpc3Q7IiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBMaW5rZWRMaXN0KCkge1xuICAgIHZhciBfbGlzdCA9IG5ldyBXZWFrTWFwKCk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgICAgIGhlYWQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgbGlzdDoge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZXR1cm4gbWFwIG9mIG5vZGVzXG4gICAgICAgICAgICAgKiBAcmV0dXJucyB7V2Vha01hcH1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9saXN0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbkxpbmtlZExpc3QucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShudWxsLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgdmFsdWU6IExpbmtlZExpc3RcbiAgICB9LFxuICAgIGNsZWFyOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDbGVhciBsaXN0LCByZW1vdmUgYWxsIG5vZGVzXG4gICAgICAgICAqIEByZXR1cm5zIHtMaW5rZWRMaXN0fVxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmxpc3QgPSBuZXcgV2Vha01hcCgpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdW5zaGlmdDoge1xuICAgICAgICAvKipcbiAgICAgICAgICogSW5zZXJ0IHZhbHVlIG9mIGFueSB0eXBlIGF0IHRoZSBzdGFydCBvZiBsaXN0XG4gICAgICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICAgICAqIEByZXR1cm5zIHtMaW5rZWRMaXN0fVxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICB2YXIgaGVhZDtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmhlYWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXY6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG5leHQ6IG51bGxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoZWFkID0ge1xuICAgICAgICAgICAgICAgICAgICBwcmV2OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBuZXh0OiB0aGlzLmhlYWRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuaGVhZC5wcmV2ID0gaGVhZDtcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWQgPSBoZWFkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5saXN0LnNldCh0aGlzLmhlYWQsIGRhdGEpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc2hpZnQ6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZSBub2RlIGZyb20gdGhlIHN0YXJ0IG9mIGxpc3RcbiAgICAgICAgICogQHJldHVybnMgeyp9XG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmxpc3QuZ2V0KHRoaXMuaGVhZCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3QuZGVsZXRlKHRoaXMuaGVhZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWQgPSB0aGlzLmhlYWQubmV4dDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlbW92ZToge1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlIG5vZGUgZnJvbSB0aGUgbGlzdFxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmxpc3QuZ2V0KG5vZGUpO1xuXG4gICAgICAgICAgICBub2RlLnByZXYubmV4dCA9IG5vZGUubmV4dDtcbiAgICAgICAgICAgIG5vZGUubmV4dC5wcmV2ID0gbm9kZS5wcmV2O1xuICAgICAgICAgICAgdGhpcy5saXN0LmRlbGV0ZShub2RlKTtcblxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHByZXBlbmQ6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZSBub2RlIGZyb20gdGhlIGxpc3QgYW5kIGluc2VydCBpdCBhdCB0aGUgc3RhcnRcbiAgICAgICAgICogQHBhcmFtIG5vZGVcbiAgICAgICAgICogQHJldHVybnMge0xpbmtlZExpc3R9XG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKG5vZGUpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaGVhZCA9PT0gbm9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudW5zaGlmdCh0aGlzLnJlbW92ZShub2RlKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBmb3JFYWNoOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMb29wIHRocm91Z2ggYWxsIG5vZGVzIGluIHRoZSBsaXN0XG4gICAgICAgICAqIEBwYXJhbSBmblxuICAgICAgICAgKiBAcmV0dXJucyB7TGlua2VkTGlzdH1cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50O1xuXG4gICAgICAgICAgICBmb3IgKGN1cnJlbnQgPSB0aGlzLmhlYWQ7IGN1cnJlbnQ7IGN1cnJlbnQgPSBjdXJyZW50Lm5leHQpIHtcbiAgICAgICAgICAgICAgICBmbi5jYWxsKHRoaXMsIHRoaXMubGlzdC5nZXQoY3VycmVudCksIHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmV2ZXJzZToge1xuICAgICAgICAvKipcbiAgICAgICAgICogUmV2ZXJzZSBub2RlcyBxdWVyeSBpbiB0aGUgbGlzdFxuICAgICAgICAgKiBAcmV0dXJucyB7TGlua2VkTGlzdH1cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudCxcbiAgICAgICAgICAgICAgICBuZXh0LFxuICAgICAgICAgICAgICAgIHByZXYgPSBudWxsO1xuXG4gICAgICAgICAgICBmb3IgKGN1cnJlbnQgPSB0aGlzLmhlYWQ7IGN1cnJlbnQ7IGN1cnJlbnQgPSBuZXh0KSB7XG4gICAgICAgICAgICAgICAgY3VycmVudC5wcmV2ID0gbmV4dCA9IGN1cnJlbnQubmV4dDtcbiAgICAgICAgICAgICAgICBjdXJyZW50Lm5leHQgPSBwcmV2O1xuICAgICAgICAgICAgICAgIHByZXYgPSBjdXJyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5oZWFkID0gcHJldjtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGluc2V0QmVmb3JlOiB7XG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAobm9kZSwgZGF0YSkge1xuXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGluc2V0QWZ0ZXI6IHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIChub2RlLCBkYXRhKSB7XG5cbiAgICAgICAgfVxuICAgIH0sXG4gICAgam9pbjoge1xuICAgICAgICAvKipcbiAgICAgICAgICogSm9pbiBub2RlcyBpbiBsaXN0IHRvIHN0cmluZ1xuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VwYXJhdG9yXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKHNlcGFyYXRvcikge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnQsXG4gICAgICAgICAgICAgICAgc3RyID0gJycsXG4gICAgICAgICAgICAgICAgZGF0YTtcblxuICAgICAgICAgICAgZm9yIChjdXJyZW50ID0gdGhpcy5oZWFkOyBjdXJyZW50OyBjdXJyZW50ID0gY3VycmVudC5uZXh0KSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMubGlzdC5nZXQoY3VycmVudCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICd1bmRlZmluZWQnIHx8IGRhdGEgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9ICcnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YS50b1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gZGF0YS50b1N0cmluZygpICsgc2VwYXJhdG9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHN0ci5zbGljZSgwLCAtMSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRvU3RyaW5nOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0IGxpc3QgdG8gc3RyaW5nXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuam9pbignLCcpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB2YWx1ZU9mOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgbGlzdFxuICAgICAgICAgKiBAcmV0dXJucyB7TGlua2VkTGlzdH1cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH0sXG4gICAgaXNFbXB0eToge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgaWYgbGlzdCBoYXMgYW55IGRhdGFcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVhZCA9PT0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5pZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShMaW5rZWRMaXN0LnByb3RvdHlwZSwgU3ltYm9sLml0ZXJhdG9yLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJdGVyYXRvclxuICAgICAgICAgKiBAcmV0dXJucyB7e25leHQ6IEZ1bmN0aW9ufX1cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudCA9IHRoaXMuaGVhZDtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQubmV4dDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5saXN0LmdldChjdXJyZW50LnByZXYpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbmU6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdmFyaWFibGUgaXMgTGlua2VkTGlzdFxuICogQHBhcmFtIGFyZ1xuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbkxpbmtlZExpc3QuaXNMaW5rZWRMaXN0ID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiBhcmcgaW5zdGFuY2VvZiBMaW5rZWRMaXN0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBMaW5rZWRMaXN0OyJdfQ==
