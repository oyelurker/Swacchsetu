# SwacchSetu - Organic Waste Management Platform

SwacchSetu is a comprehensive platform that connects households and businesses generating organic waste with local composters and farmers who can utilize it. The platform aims to create a sustainable circular economy by facilitating the recycling of organic waste into valuable compost.

## Features

- **User Registration and Authentication**: Secure user registration and login system with role-based access control (households, businesses, composters, farmers).
- **Waste Listing**: Households and businesses can list their organic waste with details like quantity, location, and preferred pickup time.
- **Compost Marketplace**: Composters and farmers can browse available waste listings and place orders.
- **Order Management**: Users can manage their orders and track the status of their waste/compost transactions.
- **Location Services**: Integrated geocoding for accurate location mapping and proximity-based matching.
- **Razorpay Integration**: Secure payment processing through Razorpay for transactions on the platform.

## Technologies Used

- **Frontend**: React with TypeScript, Vite, Tailwind CSS
- **Backend**: FastAPI (Python), MySQL database
- **Authentication**: JWT tokens with OAuth2 password flow
- **Geocoding**: OpenCage Geocoding API
- **Payments**: Razorpay API

## Deployment

For detailed deployment instructions using Railway (backend) and Netlify (frontend), please see [DEPLOYMENT.md](DEPLOYMENT.md).

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/SwacchSetu.git
   cd SwacchSetu
   ```

2. Set up the backend:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   - Copy the `.env.template` file to `.env`:
     ```bash
     cp .env.template .env
     ```
   - Edit the `.env` file and fill in your actual values for the API keys
   - For local development, you can use the default SQLite database URL

4. Initialize the database:
   ```bash
   python init_test_db.py
   ```

5. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```

6. Set up the frontend (in a new terminal):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Environment Variables

The `.env` file in the backend directory should contain the following variables:

```
DATABASE_URL=sqlite:///./swacchsetu.db
SECRET_KEY=your-secret-key
OPENCAGE_API_KEY=your-opencage-api-key
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
```

For local development, you can use the default values in the `.env.template` file. For production, replace the placeholder values with your actual API keys.

## Test Users

The `init_test_db.py` script creates the following test users:

1. Household user: household@example.com / test123
2. Business user: business@example.com / test123
3. Composter user: composter@example.com / test123
4. Buyer user: buyer@example.com / test123

## Project Structure

```
SwacchSetu/
├── backend/
│   ├── models.py
│   ├── schemas.py
│   ├── crud.py
│   ├── main.py
│   ├── auth.py
│   ├── database.py
│   └── services/
│       ├── geocoding.py
│       └── payment.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── contexts/
│   │   └── App.tsx
│   └── index.html
└── testing/
    ├── test_*.py
    └── test_*.js
```

## Testing

The project includes comprehensive tests for both backend and frontend functionality. Tests are organized in the `testing/` directory.

To run backend tests:
```bash
cd backend
python -m pytest ../testing/
```

To run frontend tests:
```bash
cd frontend
npm test
```

## Contributing

We welcome contributions to SwacchSetu! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Commit your changes
4. Push your branch to your fork
5. Create a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please open an issue on the GitHub repository.