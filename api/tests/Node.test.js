import Node from "./../lib/Node";

let node = new Node({
    bob: "cat",
    fish: 19
});
let node2 = new Node();
node.next = msg => console.log("NODE 1", msg);
node2.next = msg => console.log("NODE 2", msg);

node.send("test", { cat: 1 });