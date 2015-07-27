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