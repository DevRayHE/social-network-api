const { connect, connection } = require ('mongoose');


// Define connection String with database name, for Node
const connectionString = 
  process.env.MONGODB_URI || 'mongodb://localhost:27017/socialNetworkDB';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;