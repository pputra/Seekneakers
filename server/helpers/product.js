module.exports = {
  sortByQueryType: (queryType, products) => {
    switch (queryType) {
      case 'price_ascending':
        products.sort((prod1, prod2) => (
          prod1.price - prod2.price
        ));
        return;
      case 'price_descending':
        products.sort((prod1, prod2) => (
          prod2.price - prod1.price
        ));
        return;
      case 'name_ascending':
        products.sort((prod1, prod2) => (
          prod1.name.toLowerCase().localeCompare(prod2.name.toLowerCase())
        ));
        return;
      case 'name_descending':
        products.sort((prod1, prod2) => (
          prod2.name.toLowerCase().localeCompare(prod1.name.toLowerCase())
        ));
        return;
      case 'popularity':
        products.sort((prod1, prod2) => (
          prod2.purchased - prod1.purchased
        ));
        return;
      case 'rating':
        products.sort((prod1, prod2) => (
          module.exports.calculateRating(prod2) - module.exports.calculateRating(prod1)
        ));
      default:
        return;
    }
  },
  calculateRating: (product) => {
    let sum = 0;
    let count = 0;
  
    product.reviews.forEach(review => {
      sum += review.rating;
      count++;
    });

    return count === 0 ? 0 : sum/count;
  },
};