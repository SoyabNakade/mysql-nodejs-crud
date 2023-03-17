let express = require("express");
let fs = require("fs");
let bodyparser = require("body-parser");
let mysql = require('mysql');
let app = express();

app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "college"
});

//this syntax must be req. for run your projet
app.get("/", (req, res) => {
    res.end("Wel-Come To API")
})
app.post("/students", (req, res) => {
    let body = req.body;  //this line collect to data
    // console.log(body);
    let sql = `INSERT INTO students(rollno,name,percentage) VALUES(${body.rollno},'${body.name.replace(/'/g, "''")}', ${body.percentage})`;
    con.connect((err) => {
        if (err) {
            res.end(JSON.stringify({ status: "failed", data: err }));
        }
        con.query(sql, (err, result) => {
            if (err) {
                res.end(JSON.stringify({ status: "failed", data: err }));
            }
            res.end(JSON.stringify({ status: "success", data: result }));
        })
    })

})
app.get("/students", (req, res) => {
    let body = req.body;  //this line collect to data
    // console.log(body);
    let sql = `SELECT * FROM students`
    con.connect((err) => {
        if (err) {
            res.end(JSON.stringify({ status: "failed", data: err }));
        }
        con.query(sql, (err, result) => {
            if (err) {
                res.end(JSON.stringify({ status: "failed", data: err }));
            }
            res.end(JSON.stringify({ status: "success", data: result }));
        })
    })

})
app.get("/students/:id", (req, res) => {
    let body = req.body;  //this line collect to data
    // console.log(body);
    let sql = `SELECT * FROM students WHERE rollno =${req.params.id}`;
    con.connect((err) => {
        if (err) {
            res.end(JSON.stringify({ status: "failed", data: err }));
        }
        con.query(sql, (err, result) => {
            if (err) {
                res.end(JSON.stringify({ status: "failed", data: err }));
            }
            res.end(JSON.stringify({ status: "success", data: result }));
        })
    })

})
app.delete("/students/:id", (req, res) => {
    let body = req.body;  //this line collect to data
    // console.log(body);
    let sql = `DELETE FROM students WHERE rollno =${req.params.id}`
    con.connect((err) => {
        if (err) {
            res.end(JSON.stringify({ status: "failed", data: err }));
        }
        con.query(sql, (err, result) => {
            if (err) {
                res.end(JSON.stringify({ status: "failed", data: err }));
            }
            res.end(JSON.stringify({ status: "success", data: result }));
        })
    })

})
app.put("/students/:id", (req, res) => {
    let body = req.body;  //this line collect to data
    // console.log(body);
    let sql = `UPDATE students SET rollno =${body.rollno}, name= '${body.name.replace(/'/g, "''")}', percentage=${body.percentage} WHERE rollno =${req.params.id}`;
    con.connect((err) => {
        if (err) {
            res.end(JSON.stringify({ status: "failed", data: err }));
        }
        con.query(sql, (err, result) => {
            if (err) {
                res.end(JSON.stringify({ status: "failed", data: err }));
            }
            res.end(JSON.stringify({ status: "success", data: result }));
        })
    })

})



app.listen(8081, () => {
    // console.log("API running");
})