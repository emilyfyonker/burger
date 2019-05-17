var connection = require("../config/connection");

//function definitions

//this function creates an empty array, fills it with a loop of question marks, then returns it to a string
function createQmarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

//this function returns the SQL to a readable query
function translateSql(obj) {
    var arr = [];
    for (var key in obj) {
        var value = obj[key];
        if (Object.hasOwnProperty.call(obj, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value)
        }
    }
    return arr.toString();
}

var orm = {
    selectAll: function (table, cb) {
        var dbQuery = "SELECT * FROM " + table + ";";
console.log(dbQuery);
        connection.query(dbQuery, function (err, res) {
            console.log("orm selectAll")
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
    insertOne: function (table, cols, vals, cb) {
        var dbQuery =
            "INSERT INTO " +
            table +
            " (" +
            cols.toString() +
            ") " +
            "VALUES (" +
            createQmarks(vals.length) +
            ") ";
        console.log(dbQuery);
        connection.query(dbQuery, vals, function (err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
updateOne: function (table, objColVals, condition, cb) {
        var dbQuery =
            "UPDATE " +
            table + " SET " +
            translateSql(objColVals) +
            " WHERE " +
            condition;

        console.log(dbQuery);
        connection.query(dbQuery, function (err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
deleteOne: function (table, condition, cb) {
        var dbQuery = "DELELTE FROM " + table + " WHERE " + condition;

        console.log(dbQuery);
        connection.query(dbQuery, vals, function (err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    }
};

module.exports = orm;