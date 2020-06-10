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

node.dispatch("test2", { cat: 1 });

console.log(node2.flatten())


node2.watchState(node, true);
node.onState = console.log;
node2.onState = console.log;
node.state = { cat: 5 };
node2.state = { cat: 4 };