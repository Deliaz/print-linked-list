# Print Linked List
Pretty print for singly linked lists with loop detection

```
A → B → C → D → E → [null]
```

### Install

    npm i print-linked-list

### Usage

I used that module when studying Linked Lists exercises.
By default it utilizes `console.log` with colored output to show a list structure (see available options below).

#### Basic usage:

```javascript
const list = new LinkedList('A');
list.append('B');
list.append('C');
list.append('D');
list.append('E');

printLinkedList(list);
```

Output:
```
A → B → C → D → E → [null]
```

#### It also has a loop detection. Example:

```javascript
const list = new LinkedList('A');
list.append('B');
list.append('C');
list.append('D');
list.next.next.next.next = list.next.next; // making a loop

printLinkedList(list, {colors: false});
```

Output will be:

```
A → B ⤇ C → D ⤇ [loop]
```
The double arrow point on loop entry node.

### Options:

 * `nextName` {String} Key name for next node prop. Default = "next"
 * `valueName` {String} Key name for value prop. Default = "value"
 * `output` {String} Result output method ("console" or "return"). Default = "console"
 * `colors` {Boolean} Use colors in console output. Default = true