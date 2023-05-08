import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      _id
      name
    }
  }
`;

export const GET_ITEMS = gql`
  query GetItems {
    items {
      _id
      date
      city
      hotel
      details
      budgets {
        category
        amount
      }
    
      totalBudget
    }
  }
`;