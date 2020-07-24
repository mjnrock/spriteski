# Realignment Synopsis
## Tessellator

`/src/util/tessellator`

None of these classes have `events`, nor are they intended to be used with such a construction.  Each class has workhorse functions and the over-arching goal of this collection is simply to create in-memory canvases of tiles and helper functions to access those tiles.  All manipulative work should happen outside of this module.  Important, core functions are `asynchronous` to facilitate larger workloads and must be handled accordingly (e.g. `tessellate` and `toTiles`);
|Class|Detail|
|---|---|
|`Tile`|This is meant to strictly be an in-memory object used by the `TileCanvas`.  Contains `.hash` of canvas contents which is to be used for persistence.|
|`TileCanvas`|Contains `.canvas` which has the entire image, and `.frame` which holds a separate, mutable sub-canvas via `.get(...)`|
|`Tessellator`|Contains an instance of `TileCanvas` at `.tileCanvas` and .`tile(...)` and `.tessellate(...)` functions to facilitate tessellation.  `.toTiles()` and `.tessellate(...)` are the workhorse functions of this class.  Also contains `.image` as a static reference to reset the working canvas, if needed, which can be invoked via `.redrawTiles()`|
|---|---|

## Sequencer 2.0

`/src/util/wip`

The contents facilitate mutable and "baked" versions of a sequence.  `Mixer` contains variable `Tracks`, which in turn contain variable `Frames`.  The `Stack` class is meant to allow for programmatic variability to the `z-index` of all tracks (e.g. changing the order dynamically based on camera position).
The `Composition` classes contains variable `Score` classes, which are "baked" versions of the `Mixer` class.  Upon instantiation of `Score`, the passed `Mixer` is baked.
|Class|Detail|
|---|---|
|`Frame`|A frame contains `.cells` that use a 2D coordinate plane, denoted by `.rows` and `.columns`.  The time duration is also held here, analogous to a musical note.  Helper functions exist to quickly modify durations and move contents between cells.  By default, all actions assume a one-to-one mapping between a `Frame` and `cell @ 0,0`.  The `@source` parameter should be a canvas or a canvas-decodable.|
|`Track`|A track holds multiple `.frames`, the `.fps`, and the desired `.tile[ width, height ]` of the frames.|
|`Mixer`|Contains variable tracks and, by default, maps the `.tracks` "index" (cf. `TwinMap`) to the `z-index` when baked.  Presently, it can instead use the "index" as weights, but I'm not yet convinced of keeping this model.  The point was to allow for random variation in a sequence, but it seems like this should really be completely controlled by a `Stack`, instead.|
|`Stack`|A work in progress, but is intended to programmatically alter a track's `z-index` based on the current index of the `Score`, such as in the case of camera rotations and the subsequent appropriate viewing angle (e.g. items and model in a [ Left, Body, Right ] configuration.)|
|`Score`|A baked `Mixer` that puts the "bounced" image in the first row, and then adds every `Track` as a subsequent row in its `.source`.|
|`Composition`|A work in progress, but is intended to be a "collection" of scores.  Currently, the intent is to allow for a weighted random pool or a selection function to pull scores from the collection.  This would be used, for example, in "IDLE" variations.|
|---|---|