const LinkedList = require('./LinkedList.class');
const printLinkedList = require('../index');

const list = new LinkedList('A');
list.append('B');
list.append('C');
list.append('D');
list.append('E');
list.next.next.next.next = list.next.next;

printLinkedList(list, {colors: false});