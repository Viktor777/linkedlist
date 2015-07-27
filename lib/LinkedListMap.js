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