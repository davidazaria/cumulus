/* exporting out my views from this controller file */

module.exports = {
  show404(err, req, res, next) {
    res.sendStatus(404);
  },
  show406(err, req, res, next) {
    res.sendStatus(406);
  },
  showUsers(req, res) {
    res.render('users/user-index', {
      users: res.locals.users,
    });
  },
  showOne(req, res) {
    res.render('users/user-single', {
      user: res.locals.user,
    });
  },
  showAddForm(req, res) {
    res.render('users/user-add');
  },
  showEditForm(req, res) {
    res.render('users/user-edit', {
      user: res.locals.user,
    });
  },
  handleCreate(req, res) {
    res.redirect('/');
  },
  handleUpdate(req, res) {
    res.redirect(`/users/${req.params.id}`);
  },
  handleDelete(req, res) {
    res.redirect('/users');
  },
  showResults(req, res) {
    res.render('results/results-index', {
      results: res.locals.words,
    });
  },
  showSearches(req, res) {
    res.render('searches/search-index', {
      searches: res.locals.searches,
    });
  },
  showOneSearch(req, res) {
    res.render('search/search-single', {
      user: res.locals.user,
    });
  },
  handleSearchCreate(req, res) {
    res.redirect('/');
  },
  handleSearchDelete(req, res) {
    res.redirect('/searches');
  },
};
