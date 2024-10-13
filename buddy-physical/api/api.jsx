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

    // Log the entire response body for debugging purposes
    console.log(`Response from ${method} request to ${endpoint}:`, responseBody);

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

// API function to fetch all user locations from the deco_users table
export const fetchUserLocations = async () => {
    try {
      // Use the helper function to make an API request to the PostgREST endpoint for fetching all locations
      const response = await apiRequest('deco_users?select=location&location=not.is.null', 'GET');
      return response.map(user => user.location);
    } catch (error) {
      console.error('Failed to fetch user locations:', error);
      throw error;
    }
  };

  export async function getEvents() {
    try {
      const response = await apiRequest('events', 'GET');
      return response;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }