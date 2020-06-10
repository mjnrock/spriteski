export function freeze(obj) {
    var propNames = Object.getOwnPropertyNames(obj);

    for (let name of propNames) {
        let value = obj[ name ];

        if (value && typeof value === "object") {
            freeze(value);
        }
    }

    return Object.freeze(obj);
};

export function freezeCopy(obj) {
    return freeze(JSON.parse(JSON.stringify(obj)));
};