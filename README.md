# Rate My Classes - Gettysburg College

A web application that allows Gettysburg College students to rate and review their classes, helping future students make informed decisions about their course selections.

## 🌐 Live Demo

The application is deployed and available at: [https://rate-my-classes-gb.fly.dev](https://rate-my-classes-gb.fly.dev)

## 🌟 Features

- Course ratings and reviews
- Department-wise course listings
- User authentication and authorization
- Admin panel for content management
- Automated course data scraping
- Responsive design for all devices

## 🏗️ Project Structure

The project consists of three main components:

### Frontend (`/frontend`)
- React-based single-page application
- Built with Vite for optimal performance
- Uses Ant Design for UI components
- Implements responsive design principles

### Backend (`/backend`)
- Node.js/Express REST API
- MongoDB database integration
- JWT-based authentication
- RESTful API endpoints
- CORS enabled for security

### Scraping Bot (`/requestBot`)
- Automated course data collection
- Selenium-based web scraping
- Data processing and formatting
- Scheduled updates

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Python 3.x (for scraping bot)
- Chrome/Chromium (for scraping bot)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/rate-my-classes-gb.git
cd rate-my-classes-gb
```

2. Set up the backend:
```bash
cd backend
npm install
# Create a .env file with your configuration
cp .env.example .env
# Edit .env with your settings
```

3. Set up the frontend:
```bash
cd frontend
npm install
```

4. Set up the scraping bot:
```bash
cd requestBot
pip install -r requirements.txt
```

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
PORT=3000                    # The port your backend server will run on
NODE_ENV=development         # Set to 'production' for production environment

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/rate-my-classes    # Your MongoDB connection string
                                                         # For local development, use localhost
                                                         # For production, use your MongoDB Atlas URI

# Security
SECRET=your_jwt_secret_here  # A long, random string for JWT token signing
                             # Generate one using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

ADMIN_SECRET_KEY=your_admin_key  # A secret key for creating admin users
                                # Generate one using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Optional: Email Configuration (if you implement email features)
EMAIL_HOST=smtp.gmail.com          # Email service provider (gmail, outlook, etc.)
EMAIL_USER=your_email        # Your email address
EMAIL_PASSWORD=your_password     # Your email password or app-specific password
```

Important notes:
- Never commit your `.env` file to version control
- Keep your secrets secure and rotate them periodically
- For production, use strong, randomly generated values for SECRET and ADMIN_SECRET_KEY
- The MONGODB_URI should be your actual MongoDB connection string
- For local development, you can use the default values shown above
- For production, make sure to use secure values and proper MongoDB connection strings

### Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Run the scraping bot (when needed):
```bash
cd requestBot
python classScrape.py
```

## 🛠️ Development

### Frontend Development
- Uses Vite for fast development
- Hot module replacement enabled
- ESLint for code quality
- SASS for styling

### Backend Development
- Express.js for API routing
- MongoDB with Mongoose for data modeling
- JWT for authentication
- Error handling middleware

### Scraping Bot Development
- Selenium for web automation
- BeautifulSoup for HTML parsing
- Configurable scraping intervals
- Error handling and logging

## 📦 Building for Production

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the backend:
```bash
cd backend
fly deploy
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Rate limiting
- Input validation
- XSS protection

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Authors

- Damian Vu

## 🙏 Acknowledgments

- Gettysburg College for course information