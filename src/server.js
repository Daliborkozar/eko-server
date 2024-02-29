require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { handleError } = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const connectDB = require('./config/dbConn');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const compression = require('compression');

// setup logs
logger(app);

// headers

app.use((req, res, next) => {
  res.header('X-Powered-By', false);
  res.header('X-DNS-Prefetch-Control', 'off');
  res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.header('Content-Security-Policy', "default-src 'self' ");
  res.header('X-Frame-Options', 'SAMEORIGIN');
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('Referrer-Policy', 'same-origin');
  res.header('Permissions-Policy', '*');
  res.header('Access-Control-Allow-Origin', '*');

  next();
});

app.use(cors({}));

app.use(helmet());
app.use(compression());

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
// app.use(credentials);

// Cross Origin Resource Sharing
// app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
// app.use('/', require('./routes/root'));
app.get('/', (req, res) => {
  res.status(200).send(`Welcome to eko-vel server`);
});

app.use('/register', require('./routes/patient'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
//app.use('/admin', require('./routes/api/admins'))

// move auth to routes
// app.use(verifyJWT);
//app.use('/employees', require('./routes/api/employees'));
app.use('/users', require('./routes/users'));
app.use('/superadmin', require('./routes/superadmins'));
// app.use('/', require('./routes/superadmins')); ??

// app.all('*', (req, res) => {
//   res.status(404);
//   if (req.accepts('html')) {
//     res.sendFile(path.join(__dirname, 'views', '404.html'));
//   } else if (req.accepts('json')) {
//     res.json({ error: '404 Not Found' });
//   } else {
//     res.type('txt').send('404 Not Found');
//   }
// });

app.use(handleError);

const main = async () => {
  await connectDB();

  const PORT = process.env.PORT || 3500;

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

main();

// mongoose.connection.once('open', () => {
//   console.log('Connected to MongoDB');
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });
