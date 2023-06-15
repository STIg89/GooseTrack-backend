const Task = require('../models/task');
const emailSender = require('./emailSender');
const schedule = require('node-schedule');
const { TIME_BEFOR_TASK } = process.env;

const reminderTask = async item => {
  if (!TIME_BEFOR_TASK) {
    TIME_BEFOR_TASK.D = 0;
    TIME_BEFOR_TASK.H = 0;
    TIME_BEFOR_TASK.M = 5;
  }
  console.log('remainder');
  let time = item.start.split(':');
  let hour = parseInt(time[0]);
  let min = time[1];

  const timer = new Date(item.date);
  timer.setHours(hour, min);

  //timer.setDate(time.getDate - TIME_BEFOR_TASK.D);
  //timer.setHours(timer.getHours - TIME_BEFOR_TASK.H);
  timer.setMinutes(timer.getMinutes() - 2);

  let job = null;
  if (item.remindSet == false) {
    job = schedule.scheduleJob(timer, async () => {
      const task = await Task.findOneAndUpdate(
        { _id: item._id, category: 'to-do' },
        { remindSet: true },
        { new: true }
      ).populate('owner', 'name email');

      if (!task || !task.owner) {
        console.log('off');
        return;
      }
      const letter = `
            <h1>Hello dear ${task.owner.name}</h1>
            <p>you have task to do: ${task.title}</p>
            <p>start at: ${task.start}</p>
            <p>end at: ${task.end}</p>
        `;
      console.log(letter);
      await emailSender(task.owner.email, 'Goose Remainder', letter);
    });
    return job;
  }
};

module.exports = { reminderTask };
