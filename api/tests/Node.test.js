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
    if(msg.type === "test") {
        return {
            ...state,
            dug: 5
        };
    }
});

node.send("test", { cat: 1 });

console.log(node2.state)