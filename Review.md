# Review Questions

## What is Node.js?
Node.js uses Javascript on the server.  It's an open source environment. uses async programming.

## What is Express?
Express is a web application framework that sits on top of the Node.js web server and is used to handle server-side/ back-end functionality.


## Mention two parts of Express that you learned about this week.
i learned how to use route handlers like http verbs for CRUD (GET/POST/UPDATE/DELETE) and middleware.


## What is Middleware?
Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle. The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.


## What is a Resource?
The fundamental concept in any RESTful API is the resource. A resource is an object with a type, associated data, relationships to other resources, and a set of methods that operate on it.


## What can the API return to help clients know if a request was successful?
status code to inform the user what is happening with their requests.


## How can we partition our application into sub-applications?
helpers data


## What is express.json() and why do we need it?
.json() method of the response object to clearly communicate to both the client making the request, but most importantly, to the next developer working with this code, that the we intend to send the data in JSON format.  it's a built-in middleware when we added support for parsing JSON content out of the request body.
