# ShopYourHome

This project is creating a modern furniture shop App with a MERN stack.
![Wireframe](https://i.ibb.co/xFCDrvL/Screenshot-2022-08-11-at-11-35-36-PM.png)


### Technical Used

The app was created using MongoDB, Express, React and NodeJs, aka MERN. Other libraries such as React-Router-Dom are used to navigate through the app. Tailwind CSS was used to design the app.

### User Stories and Wireframes

This project is about creating an app called "ShopYourHome". It is a modern furniture shop, which allows users to create an account and shop through the items. The categories of items includes Living , Dining, Kitchen, Bath and Bedroom. Users can browse through the products in different categories. If they want to buy a product, they can add to their cart. Upon completing the browsing, they can check out their cart and the order history can be tracked through the order page.

The different wireframes such as the products , cart and orders page are shown below.

#### Products

![Products](https://i.ibb.co/MNfd0f9/Screenshot-2022-08-11-at-11-43-05-PM.png)

#### Cart

![Cart](https://i.ibb.co/J5qsGjc/Screenshot-2022-08-11-at-11-43-25-PM.png)

#### Orders

![Order](https://i.ibb.co/5sjmpL6/Screenshot-2022-08-11-at-11-43-37-PM.png)



## Planning and Development Process

### Setting Up of Database

There are two collections to facilitate the retrieval of data from the database, furniture and users.

#### Furniture collection

The furniture database was set up with the furniture name, price , image, description and category. This collection allows the website to render the products , allowing users to buy the items. The category value allows the filtering of items to be rendered on different pages through Express. When users add to cart or buy the products, the furnitures are added to the users collection.
![furniture](https://i.ibb.co/Yk7dQkd/Screenshot-2022-08-12-at-12-02-58-AM.png)

#### Users collection

The users collection comprises of username, password, , name, address , furniture and orders. When users add products to their cart, the furniture are added to the user's furniture object. When users checkout, the products in furniture are transfered to the orders object and deleted from the furniture object. This data structure allows for users to store items in their cart and look through their order history. 
![user](https://i.ibb.co/fQnPVpr/Screenshot-2022-08-12-at-12-03-11-AM.png)


## Improvements in the future

The function below can be implemented in the future to further improve the website.

#### Editing of Products

Users can be checked whether they are admin of the wesbite. If they are admin of the websites, they can edit the product details so that the products on the website can be updated. 

#### Tally of orders

The total orders on the website for all the users can be tallied and admin of the website can check the revenue gain every month. 

#### Deleting of users

Admin of the website can also delete users account so that they cannot buy any products from the website. The reason could be some of the users did not pay for their products or creating nuisance to the shop. 

## Acknowledgments

I would like to thank Desmond for the guidance and encouragement for this whole course for all the help and encouragement given. It was definitely an enjoyable experience for this course. 

I would also like to thank Nyna for the homework and concept guidance, answering my questions whenever I have any doubts.

I would also like to thank Zhen Hao for the help in the project and clearing any doubts I have. 

And to all my SEI-37 classmates for all the help one way or another.

## References
