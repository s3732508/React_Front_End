import React, { useEffect, useState } from 'react'
import './Orders.css'
import useAxios from 'axios-hooks'
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import searchsymbol from './download.png'
import loadingsymbol from './loadoing.gif'



function Orders() {
    const axios = require('axios');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [filtereddata, setFilteredData] = useState([])
    const [data, setData] = useState([])
    const [temp_data, updateData] = useState(null);
    const [page_num, updatePage] = useState(1);
    const [totalamount, setTotalamount] = useState(0)
    const [searchtext, setSearchText] = useState('')
    const history = useHistory();


    useEffect(async () => {
        const result = await axios(
            'http://localhost:9000/',
        );
        var data = result.data
        setData(result.data);
        setFilteredData(result.data);
        updateData(data.slice(0, 5));
        console.log(data)

        setStartDate(new Date(lastorder(data) * 1000))
        setEndDate(new Date(latestorder(data) * 1000))


        /*   document.title = `You clicked ${count} times`;*/
    }, []);

    let header = (
        <tr>
            <th className="box1"> Order_name </th>
            <th className="box1"> Customer_Company </th>
            <th className="box1"> Customer_Name </th>

            <th className="boxsort" onClick={() => setFilteredData(linearsort())}>
                Order Date
                
            </th>
            <th className="box1"> Delivered_Amount </th>
            <th className="box1"> Total_Amount </th>
        </tr>
    )

    let body = temp_data == null ? (<img className="big" src={loadingsymbol} />) : (temp_data == [] ? <p>None Found</p> : (temp_data.map(
        tuple =>
            <tr key={tuple.Order_name}>
                <td>
                    <p
                    > {tuple.Order_name}</p>
                </td>
                <td>
                    <p
                    > {tuple.Customer_Company}</p>
                </td>
                <td>
                    <p
                    > {tuple.Customer_Name}</p>
                </td>
                <td>
                    <p
                    > {dateconverter(tuple.Order_Date)}</p>
                </td>
                <td>
                    <p
                    > {tuple.Delivered_Amount}</p>
                </td>
                <td>
                    <p
                    > {tuple.Total_Amount}</p>
                </td>
            </tr>
    )))

    let viewamount = (

        <h3 className="col-sm-6 col-xl-6 clr m-0">
            Total Amount {CalculateTotalAmount()}

        </h3>)



    var array = ["..", "..", "..", ".."];
    let size = filtereddata.length % 5 == 0 ? filtereddata.length / 5 : (filtereddata.length / 5) + 1
    for (var i = page_num > 1 ? page_num - 1 : 1; i <= size || i == 1; i++) {

        array[i - 1] = i

    }

    let pagenumber = (
        array.map(
            (tuple) =>
                asd(tuple, page_num)


        )

    )



    function asd(number, num) {
        if (number == num || number == "..") {

            return (<p className="col-sm-1 col-xl-1 clr m-0 box1 selected">{number} </p>)
        }

        else {
            return (<button onClick={() => { updateData(filtereddata.slice((number - 1) * 5, number * 5)); updatePage(number); }} className="col-sm-1 col-xl-1 clr m-0 box1">{number} </button>)

        }

    }



    function dateconverter(date) {
        var d = new Date(date * 1000);
        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sep";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
        var n = month[d.getMonth()];

        var hours = d.getHours();

        var mid = 'am';
        if (hours == 0) {
            hours = 12;
        }
        else if (hours > 12) {
            hours = hours % 12;
            mid = 'pm';
        }
        return (n + " " + d.getDate() + ", " + hours + ":" + d.getMinutes() + " " + mid)
    }

    function latestorder(data1) {
        var i_data = data1
        for (var j = 0; j < i_data.length - 1; j++) {
            for (var i = 0; i < i_data.length - 1 - j; i++) {
                var is = i_data[i].Order_Date
                var iplus = i_data[i + 1].Order_Date

                if (is > iplus) {
                    i_data = swap(i, i + 1, i_data)
                }
            } break;
        }

        return i_data[i_data.length - 1].Order_Date
    }

    function lastorder(data1) {
        var i_data = data1
        for (var i = 0; i < i_data.length - 1; i++) {
            var index = i;

            for (var j = i + 1; j < i_data.length; j++) {
                var is = i_data[j].Order_Date
                var iplus = i_data[index].Order_Date

                if (is < iplus) {

                }

            } i_data = swap(index, i, i_data)
            break
        }

        return i_data[0].Order_Date
    }



    function linearsort() {
        var i_data = filtereddata
        for (var j = 0; j < i_data.length - 1; j++) {
            for (var i = 0; i < i_data.length - 1 - j; i++) {
                var is = i_data[i].Order_Date
                var iplus = i_data[i + 1].Order_Date

                if (is > iplus) {
                    i_data = swap(i, i + 1, i_data)
                }

            }
        }
        updateData(i_data.slice(0, 5))
        updatePage(1)
        return i_data
    }


    function swap(i, j, data) {
        var tmp = data[i]
        data[i] = data[j]
        data[j] = tmp
        return data
    }

    function setDatarange(start, end) {
        var i_data = []


        for (var i = 0; i < data.length; i++) {
            var unixtime = (data[i].Order_Date) * 1000
            if (unixtime >= start && unixtime <= end) {
                i_data.push(data[i])

                console.log(new Date(unixtime) + "unixtime")
            }


        }
        updateData(i_data.slice(0, 5))
        updatePage(1)
        setFilteredData(i_data)


    }


    function CalculateTotalAmount() {
        var amount = 0


        for (var i = 0; i < filtereddata.length; i++) {
            amount = amount + parseFloat(filtereddata[i].Total_Amount)

        }
        return (<p> {amount.toFixed(2)}</p>)
    }

    /**
 * Array.prototype.[method name] allows you to define/overwrite an objects method
 * needle is the item you are searching for
 * this is a special variable that refers to "this" instance of an Array.
 * returns true if needle is in the array, and false otherwise
 */
    Array.prototype.contains = function (value) {
        for (i in this) {
            if (this[i] == value) return true;
        }
        return false;
    }

    function SearchForText(string2) {
        //console.log(searchtext)

        var i_data = []
        for (var i = 0; i < data.length; i++) {
            if ((data[i].Order_name).search(string2) >= 0) {
                i_data.push(data[i])
            }
            else {
                for (var j = 0; j < data[i].Products.length; j++) {
                    var product = data[i].Products[j]
                    /* if (product.search(string2) >= 0) {
                         console.log(i_data.includes(data[i]))
                         i_data.push(data[j])
                     } */
                    if (product.search(string2) >= 0 && !(i_data.contains(data[i]))) {
                        i_data.push(data[i])

                    }

                }
            }

        }
        setFilteredData(i_data)
        updateData(i_data.slice(0, 5))
        updatePage(1)


    }


    return (

        <div className="grid-container">


            <h1 className="Orderpage" onClick={() => window.location.reload(false)}> Orders Page </h1>

            <div className="row">


                <h4 className="col-sm-1 col-xl-1 clr m-0 "></h4>
                <h4 className="col-sm-1 col-xl-1 clr m-0 ">Search</h4>
                <div className="col-sm-1 col-xl-1 clr m-0 ">

                    <img className="small" src={searchsymbol} />
                </div>
                <div className="col-sm-8 col-xl-8 clr m-0 ">

                    <input
                        type="text"
                        className="input"
                        id="addInput"
                        placeholder="  Order or Product Name"
                        value={searchtext}
                        onChange={(e) => { setSearchText(e.target.value); SearchForText(e.target.value) }}
                    />
                </div>
            </div>

            <div className="row">

                <h4 className="col-sm-2 col-xl-2 clr m-0 "></h4>
                <h4 className="col-sm-1 col-xl-1 clr m-0 "> FROM:</h4>
                <div className="col-sm-3 col-xl-3 clr m-0">
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => { setStartDate(date); setDatarange(date.getTime(), endDate.getTime()) }}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}

                    />
                </div>

                <h4 className="col-sm-1 col-xl-1 clr m-0 "> TO :</h4>
                <div className="col-sm-3 col-xl-3 clr m-0">
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => { setEndDate(date); setDatarange(startDate.getTime(), date.getTime()) }}
                        selectsEnd
                        startDate={startDate}
                        minDate={startDate}
                    />
                </div>
                <h4 className="col-sm-2 col-xl-2 clr m-0 "></h4>


            </div>

            <div className="row">

                <h4 className="col-sm-3 col-xl-3 clr m-0 "></h4>
                {viewamount}
                <h4 className="col-sm-3 col-xl-3 clr m-0 "></h4>
            </div>
            <div className="row">

                <h4 className="col-sm-1 col-xl-2 clr m-0 box"></h4>

                <div className="col-sm-10 col-xl-8 clr m-0 box">

                    <table>

                        {header}

                        <tbody>
                            {body}
                        </tbody>

                    </table>
                </div>
                <h4 className="col-sm-1 col-xl-2 clr m-0 box"></h4>

            </div>





            <div className="row">

                <h4 className="col-sm-3 col-xl-3 clr m-0 "></h4>

                <button onClick={() => {
                    if (page_num - 1 >= 1) {
                        updateData(filtereddata.slice((page_num - 2) * 5, (page_num - 1) * 5)); updatePage(page_num - 1);
                    }
                }
                } className="col-sm-1 col-xl-1 clr m-0 box1"> Prev </button>

                {pagenumber}

                <button onClick={() => {
                    if (page_num + 1 <= data.length / 5) {
                        updateData(filtereddata.slice((page_num) * 5, (page_num + 1) * 5)); updatePage(page_num + 1);
                    }
                }
                } className="col-sm-1 col-xl-1 clr m-0 box1"> Next </button>

                <h4 className="col-sm-3 col-xl-3 clr m-0 "></h4>

            </div>
        </div>

    );
}

export default Orders;