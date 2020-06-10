import Node from "./../lib/Node";

let node = new Node({
    bob: "cat",
    fish: 19
});
let node2 = new Node();
node2.watchMessages(node);

node2.addReducer((state, msg) => {
    return {
        ...state,
        time: Date.now()
    };
});

node.send("test2", { cat: 1 });

console.log(node2.flatten())


node2.watchState(node);
node2.next = console.log;
node.state = { cat: 5 };