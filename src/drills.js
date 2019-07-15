require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})


function searchByProduceName(searchTerm) {
    knexInstance
        .select('id','name', 'price', 'date_added', 'checked','category')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result);
        })
    }
searchByProduceName('tofu');

function paginate(pageNumber){
    const productsPerPage = 6;
    const offset = productsPerPage * (pageNumber -1);
    knexInstance
        .select('id','name', 'price', 'date_added', 'checked','category')
        .from('shopping_list')
        .limit(productsPerPage)
        .offset(offset)
        .then(results => {
            console.log(results);
        })
}

paginate(1);

function searchByTime(daysAgo) {
    knexInstance
        .select('id','name', 'price', 'date_added', 'checked','category')
        .from('shopping_list')
        .where('date_added', '>', knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
        .then(result => {
            console.log(result);
        })
}

searchByTime(7)

function categoryCost() {
    knexInstance
    .select('category')
    .sum('price as total')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
        console.log('COST PER CATEGORY')
        console.log(result)
    })

}

categoryCost();