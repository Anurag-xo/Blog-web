const Queue = require("bull");
const emailQueue = new Queue("email", "redis://127.0.0.1:6379");

emailQueue.process(async (job) => {
  const { name, email, message } = job.data;
  try {
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error);
    throw error;
  }
});
