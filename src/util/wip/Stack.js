export default class Stack {
    constructor(map) {
        //TODO Build a class that can either take a multidimensional array or a function that will dictate the Track z-indexing, if the Mixer requires dynamic Track indexing
        //? Fundamentally, this is meant to accommodate things suchs as a [ Left Hand, Body, Right Hand ] Stack that will need to prioritize Tracks depending on the Camera angle (e.g. Subject facing)

        //  fn(track, i) => z-index
        //  Multidimensional Array of Z-Indexes per Track index: [ [ 0, 1, 2 ], [ 2, 1, 0 ], [ 0, 1, 2 ], etc... ]
    }
}