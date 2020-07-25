import Dimension from "./util/Dimension";
import Grid from "./util/Grid";
import Cell from "./util/Cell";

const dim = new Dimension({
    cardinality: 4,
    size: [ 5, 2, 3, 4 ],
    seed: (i, depth) => depth.join("."),
});
const grid = new Grid(5, 4, {
    seed: (i, depth) => depth.join("."),
});

// dim.set(0, 0, "cat");
// dim.set(1, 0, "cat");
// dim.set(2, 1, "cat");
// dim.swap(2, 1, 2, 0);
// console.log(dim.cells);
// console.log(dim.range([ 0, 0, 0, 0 ], [ 2, 2, 3, 1 ]));
// console.log(dim.toData());
// console.log(dim.toMeta());

console.log(grid);
console.log(grid.cells[ 4 ]);
console.log(grid.col(4));
console.log(grid.row(3));
console.log(grid.cell(3, 2));