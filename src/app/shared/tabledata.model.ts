export class TableRow {
  public data: string[] = [];
}

export class TableData {

  headers: string[] = [];
  rows: TableRow[] = [];

  constructor() { }

  public addRow(): TableRow {
    const result = new TableRow();
    this.rows.push(result);
    return result;
  }

  public addCell(row: TableRow, header: string, value: string) {
    let headerIndex = this.headers.findIndex(item => item === header);
    if (headerIndex === -1) {
      // Add the item to the table.
      this.headers.push(header);

      // Add empty entries.
      this.rows.forEach(rowItem => rowItem.data.push(''));

      headerIndex = this.headers.length - 1;
    }

    const rowIndex = this.rows.findIndex(item => item === row);
    if (rowIndex === -1) {
      console.warn('Cannot add cell. TableRow must be added to Table in advance.');
      return;
    }

    this.rows[rowIndex].data[headerIndex] = value;
  }

  public dump() {
    console.log('----');
    console.log(this.headers);
    console.log(this.rows);
  }
}
