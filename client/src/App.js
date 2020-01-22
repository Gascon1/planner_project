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
          name: "Hector Ramirez",
          email: "hector.ramirez@planned.com",
          group: "Human Resources"
        },
        {
          name: "Ivan Reitman",
          email: "ivan.reitman@planned.com",
          group: "Developer"
        },
        {
          name: "Robert Duhnman",
          email: "robert.duhnman@planned.com",
          group: "Marketing"
        },
        {
          name: "Emilie Roads",
          email: "emilie.roads@planned.com",
          group: "Developer"
        },
        {
          name: "Melissa Gilbert",
          email: "melissa.gilbert@planned.com",
          group: "Human Resources"
        },
        {
          name: "Ezra Miller",
          email: "ezra.miller@planned.com",
          group: "Marketing"
        }
      ],
      selectedRow: null
    };
  }

  render() {
    return (
      <MaterialTable
        title="Planned take home test"
        columns={this.state.columns}
        data={this.state.data}
        onRowClick={(evt, selectedRow) => this.setState({ selectedRow })}
        options={{
          exportButton: true,
          grouping: true,
          pageSize: 10,

          rowStyle: rowData => ({
            color:
              this.state.selectedRow &&
              this.state.selectedRow.tableData.id === rowData.tableData.id
                ? "#52a27e"
                : "#000",
            backgroundColor:
              this.state.selectedRow &&
              this.state.selectedRow.tableData.id === rowData.tableData.id
                ? "#EEE"
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
