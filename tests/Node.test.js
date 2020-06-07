import Node from "./../Node";

let node = new Node({
    bob: "cat",
    fish: 19,
    dog: {
        asdf: [ 1,2,3,4,5 ],
        fasdf: 24
    },
    cat: {
        a: 4,
        b: {
            c: "D",
            e: "F"
        }
    }
});

console.log(node.state);
console.log(node.flatten());
let flat = node.flatten();
console.log(node.unflatten(flat));