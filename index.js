'use strict';

function LinkedList() {
    var _list;

    if (!(this instanceof LinkedList)) {
        return new LinkedList();
    }
    _list = new WeakMap();

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
            },
            /**
             * Set map for nodes
             * @param list
             */
            set: function (list) {

                if (!(list instanceof WeakMap)) {
                    list = new WeakMap(list);
                }
                _list = list;
            }
        }
    });
}

LinkedList.prototype = Object.create(null, {
    constructor: {
        value: LinkedList
    },
    get: {
        /**
         * Returns the value associated to the key, or undefined if there is none
         * @param key
         * @returns {*}
         */
        value: function (key) {
            return key !== null ? this.list.get(key) : undefined;
        }
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

            if (this.isEmpty()) {
                this.head = {
                    prev: null,
                    next: null
                };
            } else {
                this.head = this.head.prev = {
                    prev: null,
                    next: this.head
                };
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
            return this.remove(this.head);
        }
    },
    remove: {
        /**
         * Remove node from the list
         * @returns {*}
         */
        value: function (node) {
            var data;

            if (!this.isEmpty()) {
                if (node.prev !== null) {
                    node.prev.next = node.next;
                }

                if (node.next !== null) {
                    node.next.prev = node.prev;
                }

                if (node === this.head) {
                    this.head = node.next !== null ? node.next : {
                        prev: null,
                        next: null
                    };
                }
                data = this.list.get(node);
                this.list.delete(node);
            }

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

            if (this.head !== node) {
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
                fn.call(this, this.list.get(current), current, this);
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
    insertBefore: {
        /**
         * Insert new node before specific one
         * @param node
         * @param data
         * @returns {LinkedList}
         */
        value: function (node, data) {

            if (node === this.head) {
                return this.unshift(data);
            }
            node.prev = node.prev.next = {
                prev: node.prev,
                next: node
            };
            this.list.set(node.prev, data);

            return this;
        }
    },
    insertAfter: {
        /**
         * Insert new node after specific one
         * @param node
         * @param data
         * @returns {LinkedList}
         */
        value: function (node, data) {
            var newNode = {
                prev: node,
                next: node.next
            };

            if (node.next !== null) {
                node.next.prev = newNode;
            }
            node.next = newNode;
            this.list.set(node.next, data);

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