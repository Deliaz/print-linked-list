/**
 * Helper class  for singly Linked List
 */
class LinkedList {
	constructor(value) {
		this.value = value;
		this.next = null;
	}

	append(value) {
		const newNode = new LinkedList(value);
		let end = this;

		while (end.next) {
			end = end.next;
		}

		end.next = newNode;
	}
}

module.exports = LinkedList;