const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql2');
const path = require('path');
const sequelize = require('./config/db');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const fileUpload = require('express-fileupload');
const User = require('./models/usermodel')
const Startup = require('./models/startupmodel')
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const store = new SequelizeStore({
  db: sequelize,
});

// Set up session middleware
app.use( 
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/uploads', express.static(uploadDir));
app.use(fileUpload({
  createParentPath: true
}));

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.userType = req.session.userType || null;
  res.locals.user = req.session.user || null;
  next();
});
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

app.use(async (req, res, next) => {
  if (req.session && req.session.user) {
    try {
      const user = await User.findOne({ 
        where: { userid: req.session.user.userid },
        include: [{
          model: Startup,
          attributes: ['startupId']
        }]
      });

      if (user && user.Startup) {
        req.startupId = user.Startup.startupId;
      } else {
        req.startupId = null; // or handle the case where the startupId is not found
      }
    } catch (error) {
      console.error('Error fetching startup ID:', error);
      req.startupId = null;
    }
  }
  //console.log('Middleware set startupId:', req.startupId);
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next(); // No user session, proceed to the next middleware
  }

  // Find the user by ID using Sequelize
  User.findByPk(req.session.user.userid)
    .then(user => {
      if (!user) {
        return next(); // User not found, proceed to the next middleware
      }
      req.user = user; // Attach the user object to the request object
      next(); // Proceed to the next middleware
    })
    .catch(err => {
      next(new Error(err)); // Forward any errors to the error handling middleware
    });
});
const pagesRoutes = require('./routes/genralPages');
const authRoutes = require('./routes/userRoutes');
const investorRoutes = require('./routes/investorRoutes')
const startupRoutes = require('./routes/startupRoutes')
const adminRoutes = require('./routes/adminRoutes')
const advisorRoutes = require('./routes/advisorRoutes')
const errorController = require('./controllers/error')

app.use('/',pagesRoutes);
app.use(authRoutes);
app.use(investorRoutes);
app.use(startupRoutes);
app.use(adminRoutes);
app.use(advisorRoutes);
app.use(errorController.get404);

let rooms = [];
let roomIndex = 0;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1673Hana',
  database: 'egypt-investopedia'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL');
});



app.get('/dashboard-advisor', (req, res) => {
  const query = 'SELECT * FROM chat_request';
  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    //here
    res.render('dashboard-advisor', { rooms: results });
  });
});

app.get('/', (req, res, next) => {
  const query = 'SELECT * FROM chat_request';
  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    //here
    res.render('index', { rooms: results });
  });
});

app.get('/api/rooms', (req, res) => {
  const query = 'SELECT * FROM chat_request';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});
app.post('/send_highlight' , (req,res) => {
  const {room_id, user_id, textareaHighlight} = req.body
  
  console.log('Received data:', req.body);
  // if (typeof room_id === 'undefined' || typeof textareaHighlight === 'undefined') {
  //   res.status(400).json({ message: 'Bad Request: room_id and textareaHighlight are required' });
  //   return; // Ensure no further code execution after sending response
  // }
  let currentDate = new Date();  // This gives you the current date and time
  let date = currentDate.toISOString().split('T')[0];  // Extract the date part in 'YYYY-MM-DD' format
  let time = currentDate.toISOString().split('T')[1].slice(0, 8);  // Extract the time part in 'HH:mm:ss' format


  const query = 'INSERT INTO chat_highlights (date,time, highlightDescription,financialAdvisorId,userid) VALUES (?, ?, ?, ?,?)';
  db.query(query, [date,time, textareaHighlight,1,user_id,], (err, result) => {
    if (err) {
      console.error(`Error inserting highlight into database for room ${room_id}:`, err);
      res.status(500).json({ message: 'Failed to save chat highlight' });
      return; // Ensure no further code execution after sending response
    }
    console.log(`Highlight inserted into database for room ${room_id}`);
    res.status(201).json({ message: 'Chat Highlight Saved' });
  });
})

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New connection:', socket.id);

  function Connection(userOne, advisor, room) {
    this.userOne = userOne;
    this.advisor = advisor;
    this.room = room;
    
  }

  socket.on('joinRoom', ({ sender, receiver, role, message, room_id, userid }) => {
    console.log(`joinRoom event received - Room ID: ${room_id}, Sender: ${sender}, Role: ${role}, message: ${message}`);

    if (role === 'Advisor') {
      for (let i = 0; i < rooms.length; i++) {
        console.log(`this is i ${i}`)
        console.log(`rooms length ${rooms.length}`)
        if (rooms[i].room == room_id) {
          console.log(rooms[i].room)
          socket.join(rooms[i].room);
          rooms[i].advisor = socket.id;
          console.log(`Advisor joined room: ${room_id}`);
          const query = 'DELETE FROM chat_request WHERE roomid = ?';
          console.log(`rooms:${rooms}`);
          rooms.splice(i,1);
          console.log(`rooms:${rooms}`);
          db.query(query, [room_id], (err, result) => {
            if (err) {
              console.error(`Error deleting room ${room_id} from database:`, err);
              throw err;
            }
            console.log(`Room ${room_id} deleted from database`);
          });
          io.to(room_id).emit('advisorJoined', { room_id });
          break;
        }
      }
    } else {
      const newRoomId = roomIndex + 1;
      roomIndex++;
      rooms.push(new Connection(socket.id, '', newRoomId));
      socket.join(newRoomId);
      console.log(`User joined new room: ${newRoomId}`);
      const query = 'INSERT INTO chat_request (userid, roomid) VALUES (?, ?)';
      db.query(query, [userid, newRoomId], (err, result) => {
        if (err) {
          console.error(`Error inserting new room ${newRoomId} into database:`, err);
          throw err;
        }
        console.log(`New room ${newRoomId} inserted into database`);
      });
      room_id = newRoomId;
    }

    // Notify the user that they have joined the room
    socket.emit('roomJoined', { room_id });
    console.log(`User notified of room join: ${room_id}`);
  });
  socket.on('endChat', (data)=> {
    let { room_id } = data;
    console.log(room_id)
    room_id = Number(room_id);
        console.log(`Room ${room_id} deleted from database`);
        io.to(room_id).emit('roomClosed', { room_id });
        io.in(room_id).socketsLeave(room_id);
        console.log(`Room ${room_id} closed`);
  });


  socket.on('newMessage', (data) => {
    const { sender, receiver, message, room_id } = data;
    console.log(`newMessage event received - Room ID: ${room_id}, Sender: ${sender}, Message: ${message}`);
    
    // Emit the message to the room
    io.to(room_id).emit('newMessage', data);
    console.log(`Message emitted to room ${room_id}`);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


