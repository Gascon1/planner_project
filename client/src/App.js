import React, { Component } from "react";
import MaterialTable from "material-table";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "Name", field: "name" },
        {
          title: "Email",
          field: "email"
        },
        {
          title: "Group",
          field: "group"
        }
      ],
      data: [
        {
          name: "serge",
          email: "serge@serge.com",
          group: "losers"
        },
        {
          name: "mikel",
          email: "mikel@mikel.com",
          group: "winners"
        },
        {
          name: "serge",
          email: "serge@serge.com",
          group: "losers"
        },
        {
          name: "mikel",
          email: "mikel@mikel.com",
          group: "winners"
        },
        {
          name: "serge",
          email: "serge@serge.com",
          group: "losers"
        },
        {
          name: "mikel",
          email: "mikel@mikel.com",
          group: "winners"
        }
      ],
      selectedRow: null
    };
  }

  render() {
    return (
      <MaterialTable
        title="Assignment before getting the job"
        columns={this.state.columns}
        data={this.state.data}
        onRowClick={(evt, selectedRow) => this.setState({ selectedRow })}
        options={{
          grouping: true,
          rowStyle: rowData => ({
            backgroundColor:
              this.state.selectedRow &&
              this.state.selectedRow.tableData.id === rowData.tableData.id
                ? "#52a27e"
                : "#FFF"
          })
        }}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                this.setState(
                  prevState => ({
                    data: [...prevState.data, newData]
                  }),
                  resolve
                );
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                let clone = [];
                Object.assign(clone, this.state.data);
                console.log("clone1:", clone);
                const index = this.state.data.indexOf(oldData);
                clone[index] = newData;
                this.setState({ data: clone }, () => {
                  resolve();
                });
              }, 1000);
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  let clone = [];
                  Object.assign(clone, this.state.data);
                  console.log("clone1:", clone);
                  const index = this.state.data.indexOf(oldData);
                  clone.splice(index, 1);
                  console.log(clone);
                  this.setState(
                    prevState => ({ ...prevState, data: clone }),
                    resolve
                  );
                }
                resolve();
              }, 1000);
            })
        }}
      />
    );
  }
}
