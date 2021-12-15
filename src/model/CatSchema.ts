export type Cat = {
    _id: string,
    name: string,
};

export const CatSchema = {
    name: "Cat",
    properties: {
        _id: "string",
        name: "string",
    },
    primaryKey: "_id",
};