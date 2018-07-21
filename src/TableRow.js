import React from 'react';

const TableRow = props => {
  const arr = props.rows.slice(1);
  return (
    <React.Fragment>
      {
        arr.map((item, index) =>
          <tr key={index}>
            <td>{item.title}</td>
            <td>{item.amount}</td>
            <td>{(item.amount * props.rate).toFixed(2)}</td>
            <td>
              <button onClick={() => props.remove(index)}>Delete Row</button>
            </td>
          </tr>
        )
      }
    </React.Fragment>
  );
}

export default TableRow;
