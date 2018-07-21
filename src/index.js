import React from 'react';
import ReactDOM from 'react-dom';
import TableRow from './TableRow';
import TableSum from './TableSum';

import './index.scss';
import './Header.scss';
import './Table.scss';

class Expenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversionRate: 4.382,
      rows: [{
        title: "",
        amount: "",
      }]
    };
    this.handleTitle = this.handleTitle.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRateChange = this.handleRateChange.bind(this);
    this.handleDeleteRow = this.handleDeleteRow.bind(this);
  }

  handleTitle(e) {
    this.setState({
      title: e.target.value
    });
  };

  handleAmount(e) {
    this.setState({
      amount: e.target.value
    })
  };

  handleRateChange(e) {
    const getNum = val => {
      if (isNaN(val)) {
        return ''
      }
      return val;
    }
    this.setState({
      conversionRate: getNum(e.target.value)
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      rows: [...this.state.rows, {
        title: this.state.title,
        amount: this.state.amount
      }]
    });
    this.refs.form.reset();
  };

  handleDeleteRow(rowId) {
    const arr = this.state.rows;
    // (bad) Instead of slice(1) -> remove empty object in array
    arr.splice(rowId + 1, 1);
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
              <input onChange={this.handleRateChange} value={this.state.conversionRate} type="text" /> PLN
            </div>
          </div>

          <form onSubmit={this.handleSubmit} className="header-actions group" ref="form">
            <div className="field">
              <label htmlFor="title-of-transaction">Title of transaction</label>
              <input
                id="title-of-transaction"
                minLength={5}
                onChange={this.handleTitle}
                name="titleOfTransaction"
                type="text"
                required
                value={this.state.rows.title}
                title="Please type minimum 5 characters." />
            </div>

            <div className="field">
              <label htmlFor="amount">Amount (in PLN)</label>
              <input
                id="amount"
                name="amount"
                onChange={this.handleAmount}
                step="0.01"
                required
                value={this.state.rows.amount}
                title="Please type numbers"
                type="number" />
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
                <TableSum rows={this.state.rows} rate={this.state.conversionRate} />
              </td>
            </tr>
          </tfoot>

          <tbody>
            <TableRow rows={this.state.rows} rate={this.state.conversionRate} remove={this.handleDeleteRow} />
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
