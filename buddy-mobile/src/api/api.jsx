const API_URL = 'https://comp2140-f3bc926d.uqcloud.net/api/';
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCJ9.u_Tlz90goXHbi8Zn_zPvrZbugXL02U_6odPUwp1xSyQ';

/**
 * Helper function to handle API requests centrally.
 * @param {string} endpoint - API endpoint to hit.
 * @param {string} method - HTTP method, defaults to 'GET'.
 * @param {Object|null} body - Optional body for POST/PUT requests.
 * @returns {Promise<Object>} - Returns the parsed response or throws an error.
 */
const apiRequest = async (endpoint, method = 'GET', body = null) => {
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${JWT_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    console.log(`Sending ${method} request to ${API_URL}${endpoint} with body:`, body); // Log request details
    const response = await fetch(`${API_URL}${endpoint}`, options);
    const responseBody = await response.text();

    if (!response.ok) {
      console.error(`Error response from ${method} request to ${endpoint}:`, responseBody); // Log error response body
      throw new Error(`Error API Call Failed: ${response.status}: ${response.statusText}`);
    }

    return responseBody ? JSON.parse(responseBody) : {}; // Parse JSON if present
  } catch (error) {
    console.error(`Error in ${method} request to ${endpoint}:`, error); // Log full error object
    // Throw the error upwards for handling in calling function
    throw error;
  }
};

export const postUserToDecoUsers = async (userData) => {
  console.log("User Data: ", userData); // Log the user data being sent
  try {
    const response = await apiRequest('deco_users', 'POST', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      background: userData.background,
      languages: userData.languages,
      interests: userData.interests,
    });
    console.log('User successfully signed up:', response); // Log the response
    return response;
  } catch (error) {
    console.error('Failed to sign up user:', error); // Log the error
    throw error; // Propagate error upwards
  }
};
