import * as React from 'react';
import { RowType } from 'Types';

interface PropsType {
  rows: Array<RowType>,
  rate: number,
  remove: (index: number) => void,
}

const TableRow = (props: PropsType) => {
  const arr = props.rows;
  return (
    <React.Fragment>
      {
        arr.map((item, index) =>
          <tr key={index}>
            <td>{item.title}</td>
            <td>{item.amount}</td>
            <td>{(item.amount * props.rate).toFixed(2)}</td>
            <td>
              <button className="btn-delete" onClick={() => props.remove(index)}>Delete Row</button>
            </td>
          </tr>
        )
      }
    </React.Fragment>
  );
}

export default TableRow;
