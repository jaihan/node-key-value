# KeyValue Application

Build a Restful API for a simple application using Node.js, Express and MongoDB.

## Steps to Setup

1. Install dependencies

```bash
npm install
```

2. Run Server

```bash
node server.js
```


## Test developer example

Method: POST
> Endpoint: /object
> Body: JSON: {"mykey" : "value1"}
> Time: 6.00 pm
> Response: {"key":"mykey", "value":"value1", "timestamp": time } //Where time is timestamp of the post request (6.00pm).

Method: GET
> Endpoint: /object/mykey
> Response: {"value": "value1" }

Method: POST
> Endpoint: /object
> Body: JSON: {"mykey" : "value2"}
> Time: 6.05 pm
> Response: {"key":"mykey", "value":"value2", "timestamp": time } //Where time is timestamp of the new value (6.05pm).

Method: GET
> Endpoint: /object/mykey
> Response: {"value": "value2" }

Method: GET
> Endpoint: /object/mykey/timestamp=1440568980 [6.03pm] // notice that the time here is not exactly 6.00pm
> Response: {"value": "value1" } // still return value 1 , because value 2 was only added at 6.05pm
