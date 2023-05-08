import { gql } from '@apollo/client';

export const ADD_ITEM = gql`
 mutation addItem($date: String!, $city: String!, $hotel: String!, $details: String!) {
  addItem(date: $date, city: $city, hotel: $hotel, details: $details ) {
    _id
    date
    city
    hotel
    details
  }
}
`;

export const ADD_BUDGET = gql`
  mutation addBudget($itemId: ID!, $category: ID!, $amount: Float!) {
    addBudget(itemId: $itemId, category: $category, amount: $amount) {
      _id
      category {
        _id
        name
      }
      amount
    }
  }
`;
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;



