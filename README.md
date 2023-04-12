<style>
.center {
  text-align: center;
}

h1 {
  padding-top: 20px;
}
</style>

<p class="center">
<img src='./src/static/smarter-logo-padded.png' width=100%>   
</p>
  
<p class="center">
[⚡ Getting Started]() |
[📚 Documentation]() |
[⌨️ Blog]() |
[💬 Twitter](https://twitter.com) |
[💼 LinkedIn](https://www.linkedin.com)
</p>

<p class="center">
<img src='./src/static/icons8-react-native-48.png' width=30px height=30px>
<img src='./src/static/typescript.png' width=30px height=30px>
<img src='./src/static/postgresql.png' width=32px height=32px>
<img src='./src/static/express.png' width=32px height=32px>
<img src='./src/static/sass.png' width=32px height=32px>
<img src='./src/static/redis.png' width=32px height=32px>
<img src='./src/static/react-flow.svg' width=32px height=32px>
</p>

<p>
SQL databases often contain a complex network of interconnected tables.  This can pose a challenge for developers when attempting to build or optimize queries that require traversing multiple relationships.

<strong>smartER </strong> is a query visualizing tool that works with your postgreSQL database to provide dynamically rendered ER diagrams. It is a web application written in TypeScript that reads a user's database schema in order to render ER diagrams based on a given query string. To parse through SQL schemas, it uses the <a href="https://www.npmjs.com/package/pgsql-ast-parser">pgsql-ast-parser </a> to produce a typed Abstract Syntax Tree, which is further parsed to build custom nodes with React Flow.

</p>

<h1> 🛠 Built With </h1>

- <a href="https://react.dev/learn"> React </a>
- <a href="https://www.typescriptlang.org/docs/handbook/jsx.html"> TypeScript </a>
- <a href="https://www.postgresql.org/docs/"> PostgreSQL </a>
- <a href="https://expressjs.com/en/api.html"> Express </a>
- <a href="https://sass-lang.com/documentation/"> Sass </a>
- <a href="https://redis.io/docs/"> Redis </a>
- <a href="https://reactflow.dev/docs/examples/overview/"> React Flow </a>

<h1> 📖 Table of Contents </h1>

<ul>
  <li>Getting started</li>
  <li>Usage Guidance</li>
  <li>How to contribute</li>
  <li>Contributers</li>
</ul>

<h1> Getting started </h1>

Our application is pretty simple to get up and running!

Install all dependencies:

```js
npm install
```

```js
npm start
```

Running start will direct you to your browser with smartER.

<h1> 📝 Usage Guidelines </h1>

On application load it will lead you to a login page. First time users will want to create an account to be redirected to the homepage.

<img src='./src/static/login.png' width=100%>

Navigate to the settings tab and input either your URI for your database or connect with valid credentials.
<img src='./src/static/settings.png' width=100%> <img src='./src/static/settings-uri.png' width=100%>

Ensure that your usernames, passwords, and ports are accurate in the smartER settings.
<img src='./src/static/settings-credentials.png' width=100%>
Once the database is connected, navigate to the query tab and begin typing in your queries. Use the buttons within the query input box to either <i>clear</i> or <i>save</i> our query to your history.
<br >
<br >
SmartER is designed to render both your ER Diagram and query results as you are typing.
<img src='./src/static/query-people-species.png' width=100%>

Navigate to the history tab to easily re-run past queries.
<img src='./src/static/history-2.png' width=100%>
<img src='./src/static/history-3.png' width=100%>

<h2> 📬 FEATURES: </h2>

In addition to being able to visualize a query, smartER aims to bring seemless visuals during user actions. smartER offers:

- Automatic rendering based on a valid query string
- In the ER Diagram, the primary and foreign keys are connected to one another with a dotted line
- Relevent columns from an executed query that contains SELECT statements are highlighted in yellow for visual accessibility
- Likewise, JOIN statements from an executed query appear with a bolded line connecting specified points
- Columns are easily rearranged by the user

<h1> How to contribute </h1>

<p> smartER is currently in alpha and we would love to hear your feedback, encouragement, advice, suggestions, or problems. If you would like to contribute, please contact us at ....</p>

<h1> Contributors </h1>

<p>Joyce Kwak</p><a  href='https://github.com/joyxek' target=“_blank”>@github </a><a  href='https://www.linkedin.com/in/leonardlew' target=“_blank”>@linkedin</a>

<p>
Melissa McLaughlin</p><a  href='https://github.com/melissamcl' target=“_blank”>@github </a><a  href='https://www.linkedin.com/in/melissamcl/' target=“_blank”>@linkedin</a>

<p>Nathan Ngo</p><a  href='https://github.com/n8ngo' target=“_blank”>@github </a><a  href='https://www.linkedin.com/in/nathan-qh-ngo/' target=“_blank”>@linkedin</a>

<p>Brian Vu</p><a  href='https://github.com/b-v-u' target=“_blank”>@github </a><a  href='https://www.linkedin.com/in/briandoanvu/' target=“_blank”>@linkedin</a>

<h3> ☕️ Supporters </h3>
