export const displayProducts = (category: string, criterion: string) => {
    return ({
        category,
        type: criterion
    })
};

export type displayProductsAction = ReturnType<typeof displayProducts>;