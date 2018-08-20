const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-sinon'));
require('mocha-sinon');

const LinkedList = require('./LinkedList.class');
const printLinkedList = require('../index');

describe('Print Linked List', () => {
	beforeEach(function () {
		this.sinon.spy(console, 'log');
	});
	afterEach(function () {
		console.log.restore();
	});

	describe('Basic usage', () => {
		it('should print list in console with colors', () => {
			const list = new LinkedList(1);
			list.append(2);
			list.append(3);
			list.append(4);
			list.append(5);

			printLinkedList(list);
			expect(console.log).to.have.been.calledOnce;
			expect(console.log).to.have.been.calledWith('1[34m → [0m2[34m → [0m3[34m → [0m4[34m → [0m5[33m → [null][0m');
		});

		it('should print list in console without colors', () => {
			const list = new LinkedList(1);
			list.append(2);
			list.append(3);
			list.append(4);
			list.append(5);

			printLinkedList(list, {colors: false});

			expect(console.log).to.have.been.calledOnce;
			expect(console.log).to.have.been.calledWith('1 → 2 → 3 → 4 → 5 → [null]');
		});

		it('should return string with colors instead of using console', () => {
			const list = new LinkedList('A');
			list.append('B');
			list.append('C');
			list.append('D');

			const result = printLinkedList(list, {output: 'return'});
			expect(console.log).to.have.not.been.calledOnce;
			expect(result).to.include('\x1b[0m');
		});

		it('should return string without colors instead of using console', () => {
			const list = new LinkedList('A');
			list.append('B');
			list.append('C');
			list.append('D');

			const result = printLinkedList(list, {output: 'return', colors: false});
			expect(console.log).to.have.not.been.calledOnce;
			expect(result).not.to.include('\x1b[0m');
		});
	});

	describe('Loop detection', () => {
		it('should detect loop in a looped list and output to console', () => {
			const list = new LinkedList('A');
			list.append('B');
			list.append('C');
			list.append('D');
			list.append('E');

			list.next.next.next.next = list.next.next;

			printLinkedList(list, {colors: false});
			expect(console.log).to.have.been.calledOnce;
			expect(console.log).to.have.been.calledWith('A → B ⤇ C → D ⤇ [loop]');
		});

		it('should detect loop in a looped list and output to string', () => {
			const list = new LinkedList('A');
			list.append('B');
			list.append('C');
			list.append('D');
			list.append('E');

			list.next.next.next.next = list.next.next;

			const result = printLinkedList(list, {output: 'return', colors: false});
			expect(result).to.include('[loop]');
			expect(result).not.to.include('[null]');
		});

		it('should detect self-node loop', () => {
			const list = new LinkedList('A');

			list.next = list;

			const result = printLinkedList(list, {output: 'return', colors: false});
			expect(result).to.include('[loop]');
			expect(result).not.to.include('[null]');
		});

		it('should not detect loop in a normal list', () => {
			const list = new LinkedList('A');
			list.append('B');
			list.append('C');
			list.append('D');
			list.append('E');

			const result = printLinkedList(list, {output: 'return', colors: false});
			expect(result).not.to.include('[loop]');
			expect(result).to.include('[null]');
		});
	});
});

