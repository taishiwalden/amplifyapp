# AWS Amplify app Demo

---

### Goal: Build a Full-Stack React Application

Create a simple web application using AWS Amplify

The app we will be building will be a Notes app that will allow users to create, delete, and list notes. This example will give you a good idea how to build many popular types of CRUD+L (create, read, update, delete, and list) applications.

![aws-amplify-sign-in](https://user-images.githubusercontent.com/75241036/153519176-933f6a76-4cb1-413e-b038-74c49f371abc.gif)

***

#### build and host a React application on AWS

The first module explains how to navigate the AWS Amplify interface

###### Key Concepts:

-   Hosting: Build and host a React application on the AWS Global content delivery network (CDN)
-   Authentication: Add auth to your app to enable sign-in and sign-out
-   Database and Storage: Add a GraphQL API, database, and storage solution


***
#### Initialize Local App
Installed the Amplify CLI and initialize the Amplify project using the CLI (Command Line Interface).

1. Install and configure the Amplify CLI
2. Initialize the Amplify app

###### Key Concepts:
- Amplify CLI – The Amplify CLI allows you to create, manage, and remove AWS services directly from your terminal.


***
#### Add Authentication
Authenticated a user with the Amplify CLI and libraries, leveraging Amazon Cognito, a managed user identity service. Learned how to use the Amplify UI component library to scaffold out an entire user authentication flow, allowing users to sign up, sign in, and reset their password.

<img width="640" alt="Screen Shot 2022-02-06 at 10 16 24 PM 1" src="https://user-images.githubusercontent.com/75241036/152734649-d35d4cef-3e9f-4d04-a2d0-18099eebff4e.png">

***
#### Add API and Database
Added an API to the "notes app" using the Amplify CLI and libraries. The API we created is a GraphQL API that leverages AWS AppSync (a managed GraphQL service) which is backed by Amazon DynamoDB (a NoSQL database).

1. Create and deploy a GraphQL API
2. Write front-end code to interact with the API


***
#### Add Storage
Used the Amplify CLI and libraries to create a storage service leveraging Amazon S3. Updated the GraphQL schema to associate an image with each note. Finally, updated the React app to enable image uploading, fetching, and rendering.

###### Key Concept:
- Storage service: Storing and querying for files like images and videos is a common requirement for most applications. 
