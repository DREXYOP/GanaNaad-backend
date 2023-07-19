

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SchoolSeat API</title>
    <style>
        body {
            background-color: #282a36;
            color: #f8f8f2;
            font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
        }
        a {
            color: #8be9fd;
            text-decoration: none;
        }

        a:hover {
            border-bottom: #6272a4 solid 1px;
        }
        .delete {
            color: #ff5555;
        }
        .post {
            color: #50fa7b;
        }
    </style>
</head>


<h1>Useful routes</h1>
    <p>
        | URL | Method | Info |</br>
        <a href="/v1"><a> </br>
        <a href="/v1/news/get">| /v1 | GET | Base api route. |<a></br>
        <a href="/v1/news/post">| /v1/news/post | POST | Upload a feed to the database. |</a></br>
        <a href="api/messages">| /api/messages/id| GET | Shows a message. |</a></br>
        <a  href="/v1/news/get/:id">| /v1/news/get/:id | GET | get a specific feed based on id |</a></br>
        <a href="/v1/news/delete">| /v1/news/delete| DELETE | Delete a feed from the server. |</a></br></br>
    </p>


