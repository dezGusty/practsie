# Setting up hosting for firebase

## Prerequisites

firebase installed

```cmd
npm install -g firebase-tools
```

## Build

Build your application release

```cmd
ng build --prod
```

## Prepare Deploy

Open a command shell in your project directory.

Logout if needed

```cmd
firebase logout
```

Login with Google account

```cmd
firebase login
```

Init the project

```cmd
firebase init
```

Select hosting

Choose a default firebase project
E.g.
dist/practsie

Use single-page application rerouting to index.html

Don't worry if you make mistakes, you can call `init` again.
Sample output:

```cmd
c:\code\practsie>firebase init

     ######## #### ########  ######## ########     ###     ######  ########
     ##        ##  ##     ## ##       ##     ##  ##   ##  ##       ##
     ######    ##  ########  ######   ########  #########  ######  ######
     ##        ##  ##    ##  ##       ##     ## ##     ##       ## ##
     ##       #### ##     ## ######## ########  ##     ##  ######  ########

You're about to initialize a Firebase project in this directory:

  c:\code\practsie

Before we get started, keep in mind:

  * You are currently outside your home directory
  * You are initializing in an existing Firebase project directory

? Are you ready to proceed? Yes
? Which Firebase CLI features do you want to setup for this folder? Press Space to select features, then Enter to confi
rm your choices. Hosting: Configure and deploy Firebase Hosting sites

=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add,
but for now we'll just set up a default project.

i  .firebaserc already has a default project, skipping

=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.

? What do you want to use as your public directory? dist/practsie
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? File dist/practsie/index.html already exists. Overwrite? No
i  Skipping write of dist/practsie/index.html

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

+  Firebase initialization complete!
```

## Test it locally

```cmd
firebase serve --only hosting
```

## Deploy

```cmd
firebase deploy
```

Effect

```cmd
=== Deploying to 'practsie'...

i  deploying hosting
i  hosting[practsie]: beginning deploy...
i  hosting[practsie]: found 10 files in dist/practsie
+  hosting[practsie]: file upload complete
i  hosting[practsie]: finalizing version...
+  hosting[practsie]: version finalized
i  hosting[practsie]: releasing new version...
+  hosting[practsie]: release complete

+  Deploy complete!

Project Console: https://console.firebase.google.com/project/practsie/overview
Hosting URL: https://practsie.firebaseapp.com
```

Access it.

## Quick update

```cmd
ng build --prod
firebase deploy
```
