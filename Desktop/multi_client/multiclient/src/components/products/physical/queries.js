import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      price
      description
      imageUrl  # Include the imageUrl field in the query
    }
  }
`;






