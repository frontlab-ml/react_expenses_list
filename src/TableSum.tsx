import * as React from 'react';
import { RowType } from 'Types';

interface PropsType {
  rate: number,
  rows: Array<RowType>
}

const TableSum = (props: PropsType) => {
  const arrAmount = props.rows;
  const getSum = (total: number, num: number) => total + num;

  const result = arrAmount
    .map(item => item.amount)
    .reduce(getSum, 0);

  const sum = () => (result * props.rate).toFixed(2);

  return (
    <React.Fragment>
      <strong>Sum: {result.toFixed(2)} PLN</strong> ({sum} EUR)
    </React.Fragment>
  )
}

export default TableSum;
