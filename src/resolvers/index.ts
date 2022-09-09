const reviews = [
  {
    id: '1',
    productId: '1',
    content: 'The best blender',
    rating: 4.5
  }
]

export const resolvers = {
  Product: {
    reviews(product) {
      console.log(
        `resolving product reviews by product ${JSON.stringify(product)}`
      )
      return reviews.filter((review) => review.productId === product.id)
    }
  },
  Review: {
    product(review) {
      return {
        // Allow data fetch from product subgraph.
        // This will trigger __resolveReference resolver in Product type in products subgraph
        __typename: 'Product',
        id: review.productId
      }
    }
  },
  Query: {
    review: (_, { id }) => {
      return reviews.find((review) => review.id === id)
    },
    reviews: () => reviews
  }
}
