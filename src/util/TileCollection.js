export default class TileCollection {
    constructor(tiles = [], { tags = [] } = {}) {
        this.tiles = tiles;
        this.tags = tags;
    }

    get bounds() {
        const bounds = {
            width: {
                min: Number.MAX_SAFE_INTEGER,
                max: Number.MIN_SAFE_INTEGER,
            },
            height: {
                min: Number.MAX_SAFE_INTEGER,
                max: Number.MIN_SAFE_INTEGER,
            },
        };

        // eslint-disable-next-line
        for(let [ key, tile ] of Object.entries(this.tiles)) {
            const { x, y } = key.split(".").map(v => ~~v);

            bounds.width.min = Math.min(bounds.width.min, x);
            bounds.width.max = Math.max(bounds.width.max, x);
            bounds.height.min = Math.min(bounds.height.min, y);
            bounds.height.max = Math.max(bounds.height.max, y);
        }

        return bounds;
    }

    get size() {
        if(Array.isArray(this.tiles)) {
            return this.tiles.length;
        }

        return Object.keys(this.tiles).length;
    }

    get(x, y) {
        return this.tiles[ `${ x }.${ y }` ];
    }
    set(x, y, tile) {
        this.tiles[ `${ x }.${ y }` ] = tile;
    }
    has(x, y) {
        return !!this.get(x, y);
    }
    delete(x, y) {
        const had = this.has(x, y);

        delete this.tiles[ `${ x }.${ y }` ];

        return !!had;
    }

    addTag(...tags) {
        this.tags = [
            ...(this.tags || []),
            ...tags,
        ];
    }
    removeTag(...tags) {
        this.tags = tags.filter(tag => !this.tags.includes(tag));
    }

    setTags(...tags) {
        this.tags = tags;
    }

    addTileTag(x, y, ...tags) {
        const tile = this.get(x, y);

        if(tile) {
            tile.tags = [
                ...(tile.tags || []),
                ...tags,
            ];
        }

        return this;
    }
    removeTileTag(x, y, ...tags) {
        const tile = this.get(x, y);

        if(tile) {
            tile.tags = tags.filter(tag => !tags.includes(tag));
        }

        return this;
    }

    getTileTags(x, y) {
        const tile = this.get(x, y);

        if(tile) {
            return tile.tags;
        }

        return [];
    }
    setTileTags(x, y, ...tags) {
        const tile = this.get(x, y);

        if(tile) {
            tile.tags = tags;
        }

        return this;
    }
};