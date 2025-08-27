import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

const testLogin = async () => {
  try {
    // First, let's try to login with a known user
    console.log('Testing login with comprehensive_test1@example.com');
    const response = await api.post('/token', 
      new URLSearchParams({
        username: 'comprehensive_test1@example.com',
        password: 'comprehensive_password1',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    
    console.log('Login response:', response.data);
    
    // Extract the token
    const { access_token } = response.data;
    
    // Now let's try to access the /users/me endpoint
    console.log('Testing access to /users/me');
    const userResponse = await api.get('/users/me/', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    });
    
    console.log('User response:', userResponse.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
};

testLogin();