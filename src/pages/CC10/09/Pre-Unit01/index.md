---
title: "Unit 0: Getting Started & JavaScript Fundamentals"
date: "2019-08-13"
tags:
  - CC10
  - WIP
---

## Learning Activities

### Development Environment

1. GOOGLE CHROME  
   **a. Opening Chrome Dev Tools**

   `command + option + I` to inspect on Chrome Dev Tools.  
   `command + shift + C` and then click an element.  
   Right-click an element and select `inspect`.

   **b. Viewing And Changing CSS**

   Get Started With Viewing And Changing CSS  
    <https://developers.google.com/web/tools/chrome-devtools/css/>

   **c. Viewing and Changing the DOM**

   **Hide a node**: `H` button on inspect window.  
   **Delete a node**: `delete` button on inspect window.  
   **Open the console drawer**: `Escape` button.
   **Access nodes in the Console**: Type `$0` and press the `Enter` key on the console drawer.

   **If you cannot right-click on Chrome Dev Tools, refresh your page and retry.**

2. VISUAL STUDIO CODE  
   **Install `code` command to MacOS**

   a. `command + shift + P` on VSCode.  
   b. Type `Shell Command: Install 'code' command in PATH command.` on command pallet.  
   c. Type `code` on Terminal.

   **Q1. How do you open up a file in VSCode from your command line?**

   Type `code` on Terminal.

   **Q2. What is the keyboard shortcut to split the editor?**

   **Q3. What is the keyboard shortcut to delete an entire line?**

   Type `command + shift + K` to delete an entire line.

   **Q4. What is the keyboard shortcut to move an entire line together? Entire lines?**

   Type `option + UP` or `option + DOWN`.

### GitHub Settings

Setting your Git username for every repository on your computer

```bash
$ git config --global user.name "Naoto Imamachi"
$ git config --global user.name
> Naoto Imamachi

$ git config --global user.email "naoto.imamachi@gmail.com"
$ git config --global user.email
> naoto.imamachi@gmail.com
```

```bash
# Setup Line Ending Preferences
$ git config --global core.autocrlf input
$ git config --global core.safecrlf true
```

Setting your username in Git  
<https://help.github.com/en/articles/setting-your-username-in-git>

### Git

**1. Check status**

```bash
$ git status
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   src/chrysalis.js

no changes added to commit (use "git add" and/or "git commit -a")
```

**2. To stage our changes first**

```bash
$ git add src/chrysalis.js
```

**3. Check status again**

```bash
$ git status
On branch master
Your branch is up to date with 'origin/master'.

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   src/chrysalis.js
```

**4. Commit my change**

```bash
$ git commit -m "My first commit"
[master 3f58af3] My first commit
 1 file changed, 2 insertions(+), 2 deletions(-)
```

**5. Check the line to GitHub**

```bash
$ git remote -v
origin  https://github.com/Imamachi-n/cc10-precourse.hatch.git (fetch)
origin  https://github.com/Imamachi-n/cc10-precourse.hatch.git (push)
```

**6. Push my change**

```bash
$ git push origin master
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 4 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (4/4), 346 bytes | 346.00 KiB/s, done.
Total 4 (delta 2), reused 0 (delta 0)
remote: Resolving deltas: 100% (2/2), completed with 2 local objects.
To https://github.com/Imamachi-n/cc10-precourse.hatch.git
   a11fd31..3f58af3  master -> master
```

## Memo

Array.prototype.includes()  
<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes>

Property accessors  
<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors>

```javascript
Array.prototype.sort.apply([[2, 1], [3, 2, 5]])

// Cannot execute that...
reverse1 = () => {
  return this.split("")
    .reverse()
    .join("")
}

// OK!!
function reverse2() {
  return this.split("")
    .reverse()
    .join("")
}

reverse2.apply("TEST!")

array = [2, 1, 3]
array.reverse()

test = ".sort()"
array = [2, 3, 1]
eval("[" + array.toString() + "]" + test)
//[(1, 2, 3)]
```
