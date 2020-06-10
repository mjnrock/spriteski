import Node from "./../lib/Node";

let node = new Node({
    bob: "cat",
    fish: 19
});
let node2 = new Node();
// node.after = msg => console.log("NODE 1", msg);
// node2.after = msg => console.log("NODE 2", msg);
node2.track(node);

node2.addReducer((state, msg) => {
    console.log(111)
    return {
        ...state,
        dug: 5
    };
});
node2.addReducer("test", (state, msg) => {
    console.log(222)
    return {
        ...state,
        dug: 6
    };
});

node.send("test2", { cat: 1 });

console.log(node2.state)
// node.send("test2", { cat: 1 });

// console.log(node2.state)