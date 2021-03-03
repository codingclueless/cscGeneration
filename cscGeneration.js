module.exports = function sortCategoriesForInsert (inputJson) {
    let products = inputJson;
    const properJsonOutput = function (products, root) {
        let r = []; 
        let obj = {};

        products.forEach( i => {
            obj[i.id] = { products: i, children: obj[i.id] && obj[i.id].children };
            if (i.parent_id === root) {
                r.push(obj[i.id]);
            } else {
                obj[i.parent_id] = obj[i.parent_id] || {};
                obj[i.parent_id].children = obj[i.parent_id].children || [];
                obj[i.parent_id].children.push(obj[i.id]);
            }
        })

        return r;
    } (products, null)
    
    .reduce(function traverse(r, i) {
        return r.concat(i.products, (i.children || []).reduce(traverse, []));
    }, []);

    return properJsonOutput;
};
