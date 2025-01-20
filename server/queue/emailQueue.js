const Queue = require("bull");
const emailQueue = new Queue("email", "redis://127.0.0.1:6379");

emailQueue.process(async (job) => {
  const { name, email, message } = job.data;
  // Send email logic here
});

module.exports = emailQueue;
