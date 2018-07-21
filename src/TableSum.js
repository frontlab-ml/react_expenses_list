import React from 'react';

const TableSum = props => {
  const arrAmount = props.rows;
  const getSum = (total, num) => total + num;
  const allItem = arrAmount.map(item => Number(item.amount));
  const result = allItem.reduce(getSum).toFixed(2);

  return (
    <React.Fragment>
      <strong>Sum: {result} PLN</strong> ({(result * props.rate).toFixed(2)} EUR)
    </React.Fragment>
  )
}

export default TableSum;
