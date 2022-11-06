## List of features

we will implement the following features:

1. User login and register. As a game store, we need to provide a user login and register function. Users can register an account and login to the website. We will store the user information in the database.  This user table would also hold the information about games the user bought, how long they have played the game, and the review they left for the game.

2. Main Page for Browsing games: We will provide a main page that displays today's recommendated games information. Users can browse the games and click on the game to see more details.  It should randomly display 10 games out of the top 100 games with the highest rating and another 10 games thats similar to user recently played games.

3. Search Bar: We will also provide a search function for users to search for games. The search function will be implemented by using the LIKE operator in SQL. We will also provide a filter function for users to filter the games by tags, release date, and price. The filter function will be implemented by using the GroupBy and having operators in SQL.

4. Review: We will provide a review function for users to review the games. Users can leave a review for the game and rate the game. The review will be stored in the database. We will also provide a function for users to see the reviews of the game, users see other users' reviews and ratings.

5. Game Details: We will provide a game details page for users to see the details of the game. The game details page will display the game name, developer, publisher, release date, price, tags, and description. We will also provide a function for users to buy the game. If the user has bought the game, the user can see the game in the library. If the user has not bought the game, the user can see the buy button. If the user clicks the buy button, the user will be redirected to the payment page.

If time permits, we will also implement the following features:

1. Like / Dislike: We will provide a like / dislike function for users to like or dislike the game. The like / dislike information will be stored in the database and may be used for recommendation. If one user dislike a game, the game will not be recommended to the user.

2. Friends: We will provide a friends function for users to add friends. Users can see their friends' library and review. Users can also see their friends' recently played games.