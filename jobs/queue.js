var kue = require('kue');
var queue = kue.createQueue();

queue.process('script', function(job, done) {
    console.log('processing job ' + job.id);

    if (job.data.id && job.data.type) {
        return done(null, job.data.id + job.data.type);
    } else {
        return done(null, 'provide queryparams a and b');
    }

});

function email(address, done) {
  if(!isValidEmail(address)) {
    //done('invalid to address') is possible but discouraged
    return done(new Error('invalid to address'));
  }
  // email send stuff...
  done();
}

queue.process('email', function(job, done) {
  email(job.data.to, done);
});

//queue.create('email', {
//     title: 'welcome email for tj'
//   , to: 'tj@learnboost.com'
//   , template: 'welcome-email'
// }).priority('high').attempts(5).save();

module.exports = queue;