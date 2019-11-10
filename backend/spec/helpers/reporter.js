const { SpecReporter } = require('jasmine-spec-reporter');
// const jasmine = require('jasmine');

jasmine.getEnv().clearReporters(); // remove default reporter logs
jasmine.getEnv().addReporter(
  new SpecReporter({
    // add jasmine-spec-reporter
    spec: {
      displayPending: true,
    },
  }),
);
