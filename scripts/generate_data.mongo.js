/* global db print */
// eslint no-restricted-globals: "off"
//  *   mongo mongodb+srv://ziziou:199206@cluster0-bsqiq.azure.mongodb.net/issuetracker scripts/generate_data.mongo.js
//

const owners = ['Ravan', 'Eddie', 'Pieta', 'Parvati', 'Victor'];
const statuses = ['New', 'Assigned', 'Fixed', 'Closed'];

const initialCount = db.issues.count();

for (let i = 0; i < 100; i += 1) {
  const randomCreatedDate = (new Date())
        - Math.floor(Math.random() * 60) * 1000 * 60 * 60 * 24;
  const created = new Date(randomCreatedDate);
  const randomDueDate = (new Date())
        - Math.floor(Math.random() * 60) * 1000 * 60 * 60 * 24;
  const due = new Date(randomDueDate);

  const owner = owners[Math.floor(Math.random() * 5)];
  const status = statuses[Math.floor(Math.random() * 4)];
  const effort = Math.ceil(Math.random() * 20);
  const title = `Lorem ipsum dolor sit amet, ${i}`;
  const id = initialCount + i + 1;

  const issue = {
    id, title, created, due, owner, status, effort,
  };

  db.issues.insertOne(issue);
}

const count = db.issues.count();
db.counters.update({ _id: 'issues' }, { $set: { current: count } });

// eslint-disable-next-line no-restricted-globals
print('New issue count:', count);
