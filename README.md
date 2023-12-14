# dailyblog
a daily blog fully interrated with a database-mongodb

# the composing function is hidden
in the link bar add a forward slash, compose while in the home route(/compose). to get to the compose page

### adding new projects with their own git history
```sh
git subtree add --prefix=apps/dailyblog https://github.com/valiantlynx/dailyblog.git master --squash
git subtree pull --prefix=apps/dailyblog https://github.com/valiantlynx/dailyblog.git master --squash
git subtree push --prefix=apps/dailyblog https://github.com/valiantlynx/dailyblog.git master

```

