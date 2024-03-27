// Run this script to set up database with initial test data.
// Start the mongoDB service as a background process before running the script
// Pass URL of your mongoDB instance as third argument(e.g., mongodb://127.0.0.1:27017/fake_so)

// Command to start script:
// node init.js admin@gmail.com sudopassword mongodb://127.0.0.1:27017/fake_so

// Todos:
// Add more test data
// Create the respective user accounts for all the answers/questions/comments

let adminArgs = process.argv.slice(2, 4);

let User = require("./models/users");

let adminEmail = adminArgs[0];
let adminPassword = adminArgs[1];

let mongoArgs = process.argv.slice(4);

if (!mongoArgs[0].startsWith("mongodb")) {
    console.log("ERROR: You need to specify a valid mongodb URL as the first argument");
    return;
}

let Tag = require("./models/tags");
let Answer = require("./models/answers");
let Question = require("./models/questions");
let Comment = require("./models/comments");

let mongoose = require("mongoose");
let mongoDB = mongoArgs[0];
mongoose.connect(mongoDB);
// mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let tags = [];
let answers = [];
let comments = [];

function tagCreate(name) {
    let tag = new Tag({ name: name });
    return tag.save();
}

// assign each answer to a question
function answerCreate(text, ans_by, ans_date_time) {
    answerdetail = { text: text };
    if (ans_by != false) answerdetail.ans_by = ans_by;
    if (ans_date_time != false) answerdetail.ans_date_time = ans_date_time;

    let answer = new Answer(answerdetail);
    return answer.save();
}

function questionCreate(title, summary, text, tags, answers, asked_by, ask_date_time, views, comments, votes) {
    qstndetail = {
        title: title,
        summary: summary,
        text: text,
        asked_by: asked_by,
    };
    if (tags != false) qstndetail.tags = tags;
    if (answers != false) qstndetail.answers = answers;
    if (ask_date_time != false) qstndetail.ask_date_time = ask_date_time;
    if (views != false) qstndetail.views = views;
    if (comments != false) qstndetail.comments = comments;
    if (votes != false) qstndetail.votes = votes;

    let qstn = new Question(qstndetail);
    return qstn.save();
}

// assign each comment to a question and/or answer
function commentCreate(text, author, votes, time, question, answer) {
    commentdetail = { text: text, author: author, votes: votes };

    if (time != false) commentdetail.time = time;
    if (question != false) commentdetail.question = question;
    if (answer != false) commentdetail.answer = answer;

    let comment = new Comment(commentdetail);
    return comment.save();
}

function userCreate(
    email,
    username,
    passwordHash,
    createdAt,
    reputation,
    questions,
    answers,
    comments,
    isAdmin,
    upvotedQuestions,
    downvotedQuestions,
    upvotedAnswers,
    downvotedAnswers,
    upvotedComments,
    downvotedComments
) {
    userdetail = {
        email: email,
        username: username,
        passwordHash: passwordHash,
    };

    if (createdAt != false) userdetail.createdAt = createdAt;
    if (reputation != false) userdetail.reputation = reputation;
    if (questions != false) userdetail.questions = questions;
    if (answers != false) userdetail.answers = answers;
    if (comments != false) userdetail.comments = comments;
    if (isAdmin != false) userdetail.isAdmin = isAdmin;
    if (upvotedQuestions != false) userdetail.upvotedQuestions = upvotedQuestions;
    if (downvotedQuestions != false) userdetail.downvotedQuestions = downvotedQuestions;
    if (upvotedAnswers != false) userdetail.upvotedAnswers = upvotedAnswers;
    if (downvotedAnswers != false) userdetail.downvotedAnswers = downvotedAnswers;
    if (upvotedComments != false) userdetail.upvotedComments = upvotedComments;
    if (downvotedComments != false) userdetail.downvotedComments = downvotedComments;

    let user = new User(userdetail);
    return user.save();
}

const populate = async () => {
    await userCreate(
        adminEmail,
        "admin",
        adminPassword,
        false,
        1001,
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false
    );

    let t1 = await tagCreate("react");
    let t2 = await tagCreate("javascript");
    let t3 = await tagCreate("android-studio");
    let t4 = await tagCreate("shared-preferences");
    let t5 = await tagCreate("mern");
    let t6 = await tagCreate("component-rerender");
    let t7 = await tagCreate("C-programming");
    let t8 = await tagCreate("pointers");
    let t9 = await tagCreate("array-indexing");
    let t10 = await tagCreate("cse320");
    let t11 = await tagCreate("senioritis");

    let a1 = await answerCreate(
        "React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.",
        "hamkalo",
        false
    );
    let a2 = await answerCreate(
        "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.",
        "azad",
        false
    );

    let a3 = await answerCreate(
        "Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.",
        "abaya",
        false
    );
    let a4 = await answerCreate(
        "YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);",
        "alia",
        false
    );
    let a5 = await answerCreate(
        "I just found all the above examples just too confusing, so I wrote my own. ",
        "sana",
        false
    );

    let a6 = await answerCreate("try using google", "doItYourself21", false);
    let a7 = await answerCreate("have you tried going to class?", "keepingItReal", false);
    let a8 = await answerCreate("try looking into useEffect", "nicePerson", false);
    let a9 = await answerCreate("go to office hours", "anotherNicePerson", false);
    let a10 = await answerCreate("you can do it! just believe in yourself", "motivationalSpeaker", false);
    let a11 = await answerCreate(
        "convince someone else to give you there code, then change it a little",
        "cheaterGuy",
        false
    );
    let a12 = await answerCreate("just give up", "lazyGuy23", false);

    let a13 = await answerCreate("Look at the slides", "keepingItReal", false);
    let a14 = await answerCreate("dude it's so simple", "alsoKeepingItReal", false);
    let a15 = await answerCreate("look at the K&R book", "K&Rplug", false);

    let a16 = await answerCreate('for (int i = 0; i < 100; i++) { printf("%d", i); }', "tooNice", false);
    let a17 = await answerCreate("this is cheating, I'm reporting you", "academicallyHonestGuy", false);

    let c1 = await commentCreate("So many problems", "hamkalo", 4, false, false, false);
    let c2 = await commentCreate("we need answers now!!!", "azad", 2, false, false, false);
    let c3 = await commentCreate("this happens sometimes", "abaya", 1, false, false, false);
    let c4 = await commentCreate("youtube helps a lot", "alia", 1, false, false, false);
    let c5 = await commentCreate("I love programming", "sana", 0, false, false, false);
    let c6 = await commentCreate("I don't really like programming", "doItYourself21", 0, false, false, false);

    let c7 = await commentCreate("Try quora", "keepingItReal", 4, false, false, false);
    let c8 = await commentCreate("I like yahoo answers", "alsoKeepingItReal", 2, false, false, false);
    let c9 = await commentCreate(
        "I wish these kinds of problems were easier to understand",
        "nicePerson",
        1,
        false,
        false,
        false
    );
    let c10 = await commentCreate("try redux", "anotherNicePerson", 1, false, false, false);
    let c11 = await commentCreate("you should make a web3 application", "motivationalSpeaker", 0, false, false, false);
    let c12 = await commentCreate("react is overrated", "cheaterGuy", 0, false, false, false);
    let c13 = await commentCreate("spring boot for life", "lazyGuy23", 0, false, false, false);
    let c14 = await commentCreate("cheaters never prosper...", "academicallyHonestGuy", 0, false, false, false);

    let c15 = await commentCreate("I'm having the same problem", "tooNice", 4, false, false, false);
    let c16 = await commentCreate("This is a common issue", "alsoTooNice", 2, false, false, false);
    let c17 = await commentCreate("I am not surprised", "K&Rplug", 1, false, false, false);
    let c18 = await commentCreate("This comes up a lot", "randomPerson3", 1, false, false, false);

    let c19 = await commentCreate("Reddit has good resources", "tooNice", 4, false, false, false);
    let c20 = await commentCreate("Maybe try the real stackoverflow...", "alsoTooNice", 2, false, false, false);

    let c21 = await commentCreate("A comment about programming", "tooNice", 4, false, false, false);
    let c22 = await commentCreate("So many questions...", "alsoTooNice", 2, false, false, false);
    let c23 = await commentCreate("What's this about?", "randomPerson3", 1, false, false, false);

    await questionCreate(
        "Programmatically navigate using React router",
        "I am having issues programmatically navigating using React router",
        "the alert shows the proper index for the li clicked, and when I alert the variable within the last function I'm calling, moveToNextImage(stepClicked), the same value shows but the animation isn't happening. This works many other ways, but I'm trying to pass the index value of the list item clicked to use for the math to calculate.",
        [t1, t2],
        [a1, a2],
        "Joji John",
        false,
        28,
        [c1, c2, c3, c4, c5, c6],
        18
    );

    await questionCreate(
        "android studio save string shared preference, start activity and load the saved string",
        "having problems with android studio, mobile development",
        "I am using bottom navigation view but am using custom navigation, so my fragments are not recreated every time i switch to a different view. I just hide/show my fragments depending on the icon selected. The problem i am facing is that whenever a config change happens (dark/light theme), my app crashes. I have 2 fragments in this activity and the below code is what i am using to refrain them from being recreated.",
        [t3, t4, t2],
        [a3, a4, a5],
        "saltyPeter",
        false,
        121,
        [c7, c8, c9, c10, c11, c12, c13, c14],
        83
    );

    await questionCreate(
        "make a react component re-render when a value is changed",
        "difficulties making the page render properly",
        "I am working on a project for a class where I need to create a fake stack overflow website using the MERN stack. However, I am having trouble figuring out how to make a component re-render when a value is changed (for example, when a user upvotes a question). Can someone point me in the right direction?",
        [t1, t5, t6],
        [a6, a7, a8, a9, a10, a11, a12],
        "vesuvi777",
        false,
        734,
        [c15, c16, c17, c18],
        429
    );

    await questionCreate(
        "can't figure out how to index through an array using pointers",
        "C array indexing",
        "I am working on a C programming assignment that involves indexing through an array in C. The professor said we're not allowed to use brackets to index through the array. I have no idea how pointers work, and the assignment is due in two days.",
        [t7, t8, t9, t10],
        [a13, a14, a15],
        "stressedStudent99",
        false,
        1012,
        [c19, c20],
        983
    );

    await questionCreate(
        "how to write a program in C that will print out the first 100 prime numbers",
        "C programming exercise",
        "I am working on an assignment and I am lost, please give me the answer...",
        [t7, t11],
        [a16, a17],
        "lazyGuy23",
        false,
        94,
        [c21, c22, c23],
        -32
    );

    if (db) db.close();
    console.log("done");
};

populate().catch((err) => {
    console.log("ERROR: " + err);
    if (db) db.close();
});

console.log("processing ...");
