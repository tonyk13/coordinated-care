[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/9NDadFFr)

# Fake Stack Overflow
A replica of the popular Q&A platform for users to ask and answer technical questions  

**Features:**  
- Account Registraion, Login, Logout
- Forum posts, questions, answers, comments
- Searching by questions or tags
- User Profile
- Adminstrator account and privileges 
## Instructions to setup and run project
- To begin first clone/download the repository and enter the directory inside the console:  
```
cd path/to/projectfakeso-shoulda
```
- To start the application, run each set of commands in four different consoles inside the directory:  
## 1) Start mongod (Console 1)

```
mongod
```

## 2) Start server (Console 2)

```
cd server
npm install
node server.js --secret-key default_secret_key
```

## 3) Start client interface (Console 3)

```
cd client
npm install
npm start
```

## 4) Initializing Starting Data (Console 4)

```
cd server
node init.js admin@gmail.com sudopassword mongodb://127.0.0.1:27017/fake_so
```

# Adminstrator Account Details:

email: admin@gmail.com  
password: sudopassword

## Team Member 1 Contribution

**Vignesh Nair**

-   Home page (guest user)
-   Home page (registered user)
-   Searching
-   All tags
-   New question
-   User profile (registered user)
-   User profile (admin user)

## Team Member 2 Contribution

**Tony Kareeparampil**

-   Create account
-   Login
-   Logout of account
-   Answers (guest user)
-   Answers (registered user)
-   Comments (guest user)
-   Comments (registered user)
-   New answer
