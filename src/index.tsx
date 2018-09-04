import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TableRow from './TableRow';
import TableSum from './TableSum';

import './index.scss';
import './Table.scss';
import { RowType } from 'Types';

interface PropsType {

}

interface StateType {
  conversionRate: number,
  rows: Array<RowType>,
  inputTitle: string,
  inputAmount: number,
}

class Expenses extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      conversionRate: 4.382,
      inputTitle: "",
      inputAmount: 0,
      rows: []
    };
  }

  handleInputTitle = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      inputTitle: e.currentTarget.value
    });
  }

  handleInputAmount = (e: React.FormEvent<HTMLInputElement>) => {
    const value = this.convertToNum(e.currentTarget.value);
    if (value !== null) {
      this.setState({
        inputAmount: value,
      });
    }
  }

  handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const { rows, inputTitle, inputAmount } = this.state;
    const newRowItem = {
      title: inputTitle,
      amount: inputAmount
    };
    const newRows = rows.concat([newRowItem]);
    this.setState({
      rows: newRows,
      inputTitle: '',
      inputAmount: 0,
    });
  };

  convertToNum(val: string): number | null {
    const value = parseFloat(val);
    if (isNaN(value)) {
      return null;
    }
    return value;
  }

  handleRateChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = this.convertToNum(e.currentTarget.value);

    if (value !== null) {
      this.setState({
        conversionRate: value
      });
    }
  }

  handleDeleteRow = (rowId: number) => {
    const arr = this.state.rows.filter(
      (_value, index) => rowId !== index
    );

    this.setState({
      rows: arr
    });
  };

  render() {
    return (
      <main className="main-wrapper">
        <header className="header-wrapper">
          <div className="header-title">
            <h1>List of expenses</h1>
            <div className="conversion-rate--wrapper">
              <span>1EUR = </span>
              <input
                onChange={this.handleRateChange}
                title={this.state.conversionRate.toString()}
                type="text"
                value={this.state.conversionRate} /> PLN
            </div>
          </div>

          <form onSubmit={this.handleSubmit} className="header-actions group">
            <div className="field">
              <label htmlFor="title-of-transaction">Title of transaction</label>
              <input
                id="title-of-transaction"
                minLength={5}
                name="title"
                onChange={this.handleInputTitle}
                required
                type="text"
                title="Please type minimum 5 characters."
                value={this.state.inputTitle} />
            </div>

            <div className="field">
              <label htmlFor="amount">Amount (in PLN)</label>
              <input
                id="amount"
                name="amount"
                onChange={this.handleInputAmount}
                required
                step="0.01"
                title="Please type numbers"
                type="number"
                value={this.state.inputAmount} />
            </div>

            <button className="btn-add">Add</button>
          </form>
        </header>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount (PLN)</th>
              <th>Amount (EUR)</th>
              <th>Options</th>
            </tr>
          </thead>

          <tfoot>
            <tr>
              <td colSpan={4}>
                <TableSum
                  rows={this.state.rows}
                  rate={this.state.conversionRate}
                />
              </td>
            </tr>
          </tfoot>

          <tbody>
            <TableRow
              rows={this.state.rows}
              rate={this.state.conversionRate}
              remove={this.handleDeleteRow}
            />
          </tbody>
        </table>
      </main>
    );
  }
}

ReactDOM.render(
  <Expenses />,
  document.getElementById('root')
);
