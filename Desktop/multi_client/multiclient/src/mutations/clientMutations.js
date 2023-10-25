import { gql } from "@apollo/client";

const ADD_CLIENT = gql`
mutation addProduct($name: String!, $price: String!, $description: String!, $imageUrl: String!) {
    addProduct(name: $name, price: $price, description: $description, imageUrl: $imageUrl) {
        name
        price
        description
        imageUrl
    }
}
`;


const DELETE_PRODUCT = gql`
mutation deleteProduct($id: ID!) {
  deleteProduct(id: $id) {
    id
  }
}
`;



export {ADD_CLIENT ,DELETE_PRODUCT};

