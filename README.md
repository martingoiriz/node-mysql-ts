
## Intro & Basic usage

This is a **NodeJS** server template wrote in **TypeScript** with a basic configuration of a MySQL Database. 

It uses **Express** and **Nodemailer**. It has two services of my own that are sqlGeneric.ts and mailer.ts to improve the SQL Queries (and their callback) and for send emails of a list, respectively.

With this code you will be able to:

 - Connect to a local or external MySQL DB (*database.ts*)
 - Make easy requests to your DB (*sqlGeneric.ts*)
 - Send newsletters to a list of subscriptors (*mailer.ts*)

Inside the project you will find several comments that will help you to understand the functionalities. It is the same code that I use to send my newsletters to my blog's subscriptors.

Remember to prepare the project with

```sh
$ npm i
```

Then do

```sh
$ npm start
```

This will start the server at port 3000 with nodemon for a better development. If you want to prepare the project for production jus do

```sh
$ tsc
```
The .js files wil be in dist folder

For detailed information you could visit [my blog.](http://martingoiriz.com.ar/blog)

If you have some problem, comment or suggestion, you can [contact me.](http://martingoiriz.com.ar/contacto)

## Author

**Martin Goiriz**
+  [github/martingoiriz](https://github.com/martingoiriz)

+  [twitter/martingoiriz](http://twitter.com/martingoiriz)

## License

Copyright © 2020 Martín Goiriz

Released under the MIT license.

***