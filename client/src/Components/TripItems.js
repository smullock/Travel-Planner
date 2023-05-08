import React from 'react'
import { GET_ITEMS} from '../utils/queries';

function tripItems() {

  // const { loading, error, data } = useQuery(GET_ITEMS);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :</p>;

  return (
    <div>
      {/* {data.items.map((item) => (
        <div key={item._id}>
          <h2>{item.city}</h2>
          <p>Hotel: {item.hotel}</p>
          <ul>
            {item.budgets.map((budget) => (
              <li key={budget.category}>
                {budget.category}: ${budget.amount}
              </li>
            ))}
          </ul>
          <p>Total Budget: ${item.totalBudget}</p>
        </div>
      ))} */}
    </div>
  );
}

export default tripItems