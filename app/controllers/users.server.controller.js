const User = require('mongoose').model('User');
const passport = require('passport')

function getErrorMessage(err) {
  let message = '';

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) {
        message = err.errors[errName].message;
      };
    };
  };
};

exports.renderSignin = function (req, res, next) {
  if (!req.user) {
    res.render('signin', {
      title: 'Sign-in Form',
      messages: req.flash('error')// || req.flash('info')
    });
  } else {
    return res.redirect('/');
  }
};

exports.renderSignup = function (req, res, next) {
  if (!req.user) {
    res.render('signup', {
      title: 'Sign-up Form',
      messages: req.flash('error')
    });
  } else {
    return res.redirect('/');
  }
}

exports.signup = function (req, res, next) {
  if (!req.user) {
    const user = new User(req.body);
    user.provider = 'local';

    user.save((err) => {
      if (err) {
        const message = getErrorMessage(err);

        req.flash('error', message);
        return res.redirect('/signup');
      }
      req.login(user, (err) => {
        if (err) return next(err);
        return res.redirect('/');
      });
    });
  } else {
    return res.redirect('/');
  }
};

exports.signout = function (req, res) {
  req.logout();
  res.redirect('/');
};


// exports.create = function create(req, res, next) {
//   const user = new User(req.body);

//   user.save(err => {
//     if (err) {
//       return next(err);
//     }
//     return res.status(200).json(user);
//   });
// };

// exports.list = function list(req, res, next) {
//   User.find({}, (err, users) => {
//     if (err) {
//       return next(err);
//     }
//     return res.status(200).json(users);
//   });
// };

// exports.read = function read(req, res) {
//   res.json(req.user);
// };

// exports.userByID = function userByID(req, res, next, id) {
//   User.findOne(
//     {
//       _id: id
//     },
//     (err, user) => {
//       if (err) {
//         return next(err);
//       }
//       req.user = user;
//       return next();
//     }
//   );
// };

// exports.update = function update(req, res, next) {
//   User.findByIdAndUpdate(
//     req.user.id,
//     req.body,
//     {
//       new: true
//     },
//     (err, user) => {
//       if (err) {
//         return next(err);
//       }
//       return res.status(200).json(user);
//     }
//   );
// };

// exports.remove = function remove(req, res, next) {
//   req.user.remove(err => {
//     if (err) {
//       return next(err);
//     }
//     return res.status(200).json(req.user);
//   });
// };
