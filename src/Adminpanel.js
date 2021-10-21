import React from "react";
import axios from "axios";
import classes from "./style.module.css"
export default class adminPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    async componentDidMount() {
        let response = await axios.get("http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D")
        this.setState({ users: response.data });
    }
    handleChange = (e) => {
        console.log(e.target.value)
        let filterData = this.state.users.filter(item => {
            return item.firstName.toLowerCase().includes(e.target.value.toLowerCase())
        })
        this.setState({ users: filterData })
    }
    handleClick = (e) => {
        var parent = e.target.parentNode
        let userid = parent.querySelectorAll("td")[0].innerText;
        console.log(userid);
        let clickedData = this.state.users.filter(item => {
            if (item.id === userid) {
                return item
            }
        });
        this.setState({ users: clickedData, activeRow: userid })
    }

    render() {
        console.log(this.state.clickedData);
        return (
            <div>
                <div className={classes.adminPanelData}>
                    <div className={classes.userDataTable}>
                        <div id="table-headers">
                            <input className={classes.inputData} type="text" onChange={this.handleChange} />
                            <br />
                            <br />
                            <table className={classes.table}>
                                <thead className={classes.head}>
                                    <tr >
                                        <th className={classes.column1}>Id</th>
                                        <th className={classes.column2}>FirstName</th>
                                        <th className={classes.column3}>LastName</th>
                                        <th className={classes.column4}>Email</th>
                                        <th className={classes.column5}>Phone</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div id="table-data">
                            <table className={classes.table}>
                                <tbody>
                                    {this.state.users.map(item => {
                                        return (
                                            <tr className={classes.dataRow} onClick={this.handleClick}>
                                                <td className={classes.column1}>{item.id}</td>
                                                <td className={classes.column2}>{item.firstName}</td>
                                                <td className={classes.column3}>{item.lastName}</td>
                                                <td className={classes.column4}>{item.email}</td>
                                                <td className={classes.column5}>{item.phone}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={classes.userDetails}>
                        <h1>Details</h1>
                        <p>Click on a table item to get detailed information</p>
                        {this.state.users.map(item => {
                            return (
                                <div id="info-content">
                                    <div><b>User selected:</b>{item.firstName} {item.lastName}</div>
                                    <div>
                                        <b>Description: </b>
                                        <textarea cols="50" rows="5" readonly>{item.description}
                                        </textarea>
                                    </div>
                                    <div><b>Address:</b>{item.address.streetAddress}</div>
                                    <div><b>City:</b> {item.address.city}</div>
                                    <div><b>State:</b> {item.address.state}</div>
                                    <div><b>Zip:</b> {item.address.zip}</div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

