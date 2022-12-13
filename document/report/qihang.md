# Databse project report

## Tech

Our project is based on the following tech stack:
1. React as the front-end framework. We also use React-Router to manage the routing of the website. We use vanilla CSS to style the website.
2. For data preprocessing, we use Python to process the data and store them in a MySQL database.
3. For the backend, we use Node.js to build the server and use Express to handle the routing of the server.
4. For the database, we use MySQL to store the data. We choose AWS RDS as the database service.

## Database

In this steam DB databse, we have three main entity: User, Game, and Review. The relationship between these three entities is shown in the following ER diagram: User has many reviews, and a review belongs to a user. Game has many reviews, and a review belongs to a game.
To optimize the performance of query, we also have a ownGmae table that stores game_id and user_id relationship.

We also have two weak entity: Game_Description and Game_Figure that are associated with Game. Game_Description stores the description of the game, and Game_Figure stores the figure of the game. We use the game_id as the foreign key to associate these two tables with Game. 

The databse is 3NF and also BCNF. Every attribute is dependent on the primary key ID. We have no transitive dependency in the databse and every key is a super key.

## Main page

Main page is the page user are directed to after log in. On the top it shows 10 random high rating games that the user may be interested in. Blow are two list of games, one show the top 10 games that has the highest rating, and the other shows the top 10 games that has the most review. The user can click on the game to jump into the game detail page. Also there are a search bar which provide user to search for games by name, and a filter bar which provide user to filter games by tags, release date, and price. 

## Techinal challenge

We have two main technical challenges in this project. The first one is in front end: our team use two different styles of React, one is class based and the other is functional(Hook) based. We need to combine these two styles together to make the project work. There are times that the component did not update when the state changes or fail to render the correct data. We need to debug the code to find whether the problem is in the front end or back end, or related to the SQL query.

The second one is in back end: we need to use the LIKE operator in SQL to implement the search function. We also need to use the GroupBy and having operators in SQL to implement the filter function.