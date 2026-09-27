var http = require("http");
//TODO - Use Employee Module here
const employees = require('./Employee');
console.log("Lab 03 -  NodeJs");

//TODO - Fix any errors you found working with lab exercise

//Define Server Port
const port = process.env.PORT || 8081

//Create Web Server using CORE API
const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.writeHead(405, {'Content-Type': 'application/json'});
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`)
        return;
    } else {
        if (req.url === '/') {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(`<h1>Welcome to Lab Exercise 03</h1>`);
            return;
            //TODO - Display message "<h1>Welcome to Lab Exercise 03</h1>"
        }

        if (req.url === '/employee') {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(employees));
            return;
            //TODO - Display all details for employees in JSON format
        }

        if (req.url === '/employee/names') {
            const employeeNames = employees.map(employee => {
                return employee.firstName + " " + employee.lastName;
            });
            employeeNames.sort();

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(employeeNames));
            return;
            //TODO - Display only all employees {first name + lastname} in Ascending order in JSON Array
            //e.g. [ "Ash Lee", "Mac Mohan", "Pritesh Patel"]
        }

        if (req.url === '/employee/totalsalary') {
            const totalsalary = employees.reduce((total, employee) => {
                return total + employee.Salary;
            }, 0);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({total_salary: totalsalary}));
            return;

            //TODO - Display Sum of all employees salary in given JSON format 
            //e.g. { "total_salary" : 100 }  
    }
        res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(`{"error": "${http.STATUS_CODES[404]}"}`)
    }
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})