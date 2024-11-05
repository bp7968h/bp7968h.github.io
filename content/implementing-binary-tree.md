+++
title = "Implementing Binary Tree in Rust"
date = "2022-11-05"
description = "Sample article showcasing basic Markdown syntax and formatting for HTML elements."
[taxonomies]
tags = ["rust", "data-structure", "tree"]
[extra]
cover.image = "implementing-binary-tree/cover-image.jpg"
cover.alt = "Image displaying tree"
+++

Tree is one of the fundamental data structure that we come across in programming paradigm. They are used extensively in areas like `databases`, `compilers`, `file systems` and many more areas, providing a hierarchical structure that enables fast data access, insertion and deletion. In this blog, we will go through the basics of tree, dive deeper into `binary tree` (most used type of tree) and ultimately implement one using `Rust`. I assume you’re familiar with some basic Rust syntax but I’ll explain key concepts and share helpful tips along the way.

## Tree in General
As I mentioned earlier, tree lets us represent data in hierarchical, meaning they are connected with each other. To visualize this, think of a real tree turned upside down, where the root starts at the top and branches out downwards as shown in the image below.

<a name="tree-data-structure-visualization"></a>
![Tree Data Structure Visualization](tree_visualization.png)

In tree data structure, `node` is a individual element that can hold data and can have connections to other nodes. Here in the [above image](#tree-data-structure-visualization), all the `elements numbered` are `nodes` of that particular tree. The `root/root node` is the topmost node, from which every other nodes descends. Each connections between nodes is called an `edge`. Nodes that don’t have any children are called `leaves/ leaf node`, and nodes with children are called `internal nodes` or sometimes also called `parent node`. Nodes that are descendant of another node are called `child node`. Also the `depth of the node` is the length of the path from the root to the node itself. The `level of a node` is how far the node is from the root (root is at `level 0` or some people also prefer to say that the root is at `level 1`). The `height of the tree` is the number of edges on the longest path from the root node to the leaf node. You can refer to below image to visualize these terminologies.

![Tree Data Structure Terminologies](tree_terminologies.png)

Also, a `subtree` in a tree refers to any node along with all of it's descendents. It represents a "mini-tree" that begins at a particular node and includes all nodes reachable from it in the hierarchical structure. For example; in the above image if we just focus on `node 3`, and take all of it's decendents  `node 6, 7 and 9`, we can see a small tree forming there starting from node numbered `3`.

## Introducing the Binary Tree
Now that we’ve covered the general concept of trees, let's focus on a specific type of tree known as the `binary tree`. A binary tree is a tree in which each node can have `at most two children`, often referred to as `left child/children` and `right child/children`.

### Types of Binary Trees
Before diving into the implementation, let’s look at different types of binary trees, each with unique characteristics:

1. `Full Binary Tree`: In a full binary tree, every node has either 0 or 2 children (no node has only one child).

![Full Binary Tree](full_binary_tree.png)

1. `Perfect Binary Tree`: This is a stricter version of full binary tree in which all interior nodes must have two children and all leaf nodes are at the same level.

