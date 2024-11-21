+++
path = "blogs/lets-write-database-from-scratch"
title = "Lets Write Database from Scratch"
date = "2024-11-16"
description = "A lightweight, SQLite-like database in Rust with a focus on ACID compliance and core SQL functionalities. The primary goal is to learn the internals of database systems by building one from scratch."
[taxonomies]
tags = ["rust", "database"]
[extra]
cover.image = "cover/cover-image-db.webp"
cover.alt = "Database from Scratch in Rust"
+++

## Overview
Databases, we hear about them everywhere. They're crucial for efficiently storing, retrieving, and managing data. I've used databases a lot throughout my journey as a developer, but every now and then, I’d find myself wondering, `how the hell does this thing actually work?`

To be honest, until now, I just had that curiosity but still moved on. But last night, I had one of those moments where I thought, `Hey, I know a bit of Rust (not an expert, haha), so why not try building one?` This project will be a great excuse to dive deeper into Rust and, more importantly, to finally understand how databases work under the hood. Plus, let's be real, I can brag about it to my friends and maybe sneak it into my resume too 😉.

## The Implementation Plan
So here’s the deal: I have zero idea how databases work internally at the moment. I’ve browsed through some tutorials and blogs, and there’s a ton of great stuff out there. But this project isn’t about copying someone else's work—`it's about learning`. For this I will only refer to the [SQLite docs](https://www.sqlite.org/) and the [Rust standard library docs](https://doc.rust-lang.org/std/index.html).

Keep in mind, we are not trying to build a fully-fledged, production-ready database here. This will be a `toy database` for the sole purpose of `learning`. Below are the features I plan to implement:

- Create/Delete databases
- Create/Alter/Delete tables
- Select/Insert/Update/Delete data in the table
- Transaction support with Begin/Commit/Rollback
- Indexing and data persistence
- ACID compliance (Atomicity, Consistency, Isolation, Durability)
- Allowing access to the database over the network
- Maybe JOIN, WHERE (`not sure yet!`) 

Oh, and I just realized—I haven’t named the database yet. Let’s call it `bhu_db`. Simple, easy to remember, and it kind of has a nice ring to it haha. 

## Crawling the SQLite Docs
Alright, so before we get our hands dirty with code, We need to do some research. I decided that my primary source of reference will be the [SQLite docs](https://www.sqlite.org/). It’s a goldmine of information, and since SQLite is lightweight and easy to understand, it's perfect for our use case.

After looking for the right part finnaly got the document that I wanted; "[Architecture of SQLite](https://www.sqlite.org/arch.html)". Below is the image that I just screenshotted from there and this gives us a clear components that we need to build, but I will cut corners probably, I am not sure haha.

![SQLite Architecture](sqlite-architecture.webp)

Ok, got what we need, we will start from top to bottom that is from Interface and then go downwards into the core components.

## Coding Plan
The database will use a client-server architecture, but for time being we will use a simple `REPL (Read-Eval-Print Loop)` until we implement the networking protocol between the client and server. The image below describes the initial work plan, as well as the end goal as I continue building it.

![Initial Work Plan](initial-plan.webp)

In short, the REPL will serve as the interface between the user and the database(backend) for the time being. The user input will be tokenized, parsed, and processed, resulting in the final output.

![Final Work Plan](final-plan.webp)

As I keep building, the plan is to eventually allow users to connect to the database server using a client. The server will expose a TCP port and listen for user input through a simple protocol that I will implement. The rest of the architecture will remain the same as the initial plan, and finally, the user will receive the query results through network.

Ok, let's fire up the code editor and setup the project.

## Getting Started
Alright, before diving into the code, we need to set up a solid foundation. This will be our first step in building `bhu_db`. 

### Pre-requisites
Make sure you have Rust installed. You can install Rust by following the instructions from the [official Rust website](https://www.rust-lang.org/learn/get-started).

### Project Initialization
We'll use Cargo to initialize a `library` project (which does not contain a `main function` by default). This project will also include a couple of `binary` targets (each containing its own `main function`) within the same project.
```bash
cargo new bhu_db --lib
cd bhu_db
# You should see the following structure:
tree
.
├── Cargo.toml
└── src
    └── lib.rs
```
### Initial Files and Folder Setup
The core components like the `Tokenizer`, `Parser`, and `other database-related` code will be in the library (`lib.rs`). The `server`, `client`, and `REPL` components will be implemented as separate binaries. In Rust, we can achieve this by creating a bin folder inside the src directory. Here’s how to set it up:
```bash
mkdir -p src/bin/repl && touch src/bin/repl/main.rs
mkdir src/bin/client && touch src/bin/client/main.rs
mkdir src/bin/server && touch src/bin/server/main.rs

# The folder structure should look like this:
.
├── Cargo.toml
└── src
    ├── bin
    │   ├── client
    │   │   └── main.rs
    │   ├── repl
    │   │   └── main.rs
    │   └── server
    │       └── main.rs
    └── lib.rs
```
Now, with this setup, you can run each binary target using the command:
```bash
cargo run --bin <repl/client/server>
```
Alright, this concludes our initial file and folder setup. Now, it’s time to start coding!

## Simple REPL
A `REPL (Read-Eval-Print Loop)` is an interactive environment where user inputs are `read`, `evaluated`, and the results are `printed` back to the user. For our database, we need a simple loop that will run indefinitely, wait for user input, and take actions based on that input. For example, we'll exit the loop (break the loop) when the user types `exit`. Here’s how we can achieve that by editing the `src/bin/repl/main.rs` file:

```rust
use std::{io::{self, Write}, process};

const WELCOME_MSG: &str = r#"
.______****__****__***__****__******_______**.______***
|***_**\**|**|**|**|*|**|**|**|****|*******\*|***_**\**
|**|_)**|*|**|__|**|*|**|**|**|****|**.--.**||**|_)**|*
|***_**<**|***__***|*|**|**|**|****|**|**|**||***_**<**
|**|_)**|*|**|**|**|*|**`--'**|****|**'--'**||**|_)**|*
|______/**|__|**|__|**\______/*****|_______/*|______/**
*******************************************************

        Welcome to bhu_db!
        Type 'exit' to quit.
"#;

fn main() {
    println!("{}", WELCOME_MSG);
    
    let mut stdout = io::stdout();
    let stdin = io::stdin();

    loop {
        print!("bhu_db> ");
        stdout.flush().unwrap();

        let mut input = String::new();
        let _ = stdin.read_line(&mut input).unwrap();
        let input = input.trim();

        match input {
            "exit" => {
                println!("Exiting bhu_db...");
                process::exit(0);
            },
            _ => {
                println!("Unrecognized command: '{}'", input);
                continue;
            }
        }
    }
}
```
In the code above:
1. Handles to `stdout` and `stdin`:
   - We need a handle to `stdout` to print to the console and a handle to `stdin` to read user input. 
2. REPL Loop:
   - We enter an `infinite loop` where we continuously prompt the user with `"bhu_db> "`.
   - The `stdout.flush()` ensures that our prompt is displayed immediately.
3. Reading User Input:
   - The line `stdin.read_line(&mut input).unwrap();` reads a line from the user. 
   - `read_line` is a blocking call, meaning it will wait until the user presses `Enter`.
4. Processing the Input:
   - We trim the input to remove any leading or trailing whitespace.
   - If the user types `"exit"`, the program prints a message and exits using `process::exit(0)`.
   - For any other input, we print a message saying the command is unrecognized (just for now) and continue the loop.

We can test the REPL by running:

```bash
cargo run --bin repl

# The result should look like the below

.______****__****__***__****__******_______**.______***
|***_**\**|**|**|**|*|**|**|**|****|*******\*|***_**\**
|**|_)**|*|**|__|**|*|**|**|**|****|**.--.**||**|_)**|*
|***_**<**|***__***|*|**|**|**|****|**|**|**||***_**<**
|**|_)**|*|**|**|**|*|**`--'**|****|**'--'**||**|_)**|*
|______/**|__|**|__|**\______/*****|_______/*|______/**
*******************************************************

        Welcome to bhu_db!
        Type 'exit' to quit.

bhu_db> create database test;
Unrecognized command: 'create database test;'
bhu_db> exit
Exiting bhu_db...
```

This REPL will form the basis of our interaction with `bhu_db` for now, but as we continue, we'll extend it to handle more complex commands and eventually switch to a client-server model.

## Lexer
We can know this process with different names, that is `Tokenizer`, `Lexical Analysis` and others. However, the idea remains the same, we go through each and every character the user inputs and convert those to sequence of tokens which are meaningful units for further processing.

