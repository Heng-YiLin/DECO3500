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

export async function checkUserEmail(email) {
  try {
    const response = await apiRequest(`deco_users?email=eq.${email}`, 'GET');
    if (response.length > 0) {
      return response[0]; // Return the user object if email exists
    } else {
      return null; // Email not found
    }
  } catch (error) {
    console.error('Error checking email:', error);
    return null;
  }
}

export const getEvents = async () => {
  try {
    const response = await apiRequest('events', 'GET'); // Fetches all events
    console.log('Events fetched:', response); // Log the response for debugging
    return response;
  } catch (error) {
    console.error('Failed to fetch events:', error); // Log any error that occurs
    throw error; // Propagate error upwards
  }
};

export async function getEvent(eventId) {
  try {
    const response = await apiRequest(`events?id=eq.${eventId}`, 'GET');
    if (response.length > 0) {
      return response[0]; // Return the first event that matches the eventId
    } else {
      return null; // No event found
    }
  } catch (error) {
    console.error('Error fetching event data:', error);
    throw error;
  }
}


export async function getBuddyUpdates() {
  try {
    const response = await apiRequest('buddy_updates', 'GET');
    return response;
  } catch (error) {
    console.error('Error fetching buddy updates:', error);
    throw error;
  }
}

export const checkIfUserRSVPed = async (userId, eventId) => {
  try {
    const response = await apiRequest(`/events_attending?user_id=eq.${userId}&event_id=eq.${eventId}`, "GET");
    return response.length > 0; // If the response array has a length, the user has RSVP'd
  } catch (error) {
    console.error("Error checking RSVP status:", error);
    return false;
  }
};

// Function to toggle RSVP (add or remove based on the current state)
export const toggleRSVP = async (userId, eventId, isRSVPed) => {
  try {
    if (isRSVPed) {
      // If the user has RSVP'd, remove the RSVP
      await apiRequest(`/events_attending?user_id=eq.${userId}&event_id=eq.${eventId}`, "DELETE");
    } else {
      // If the user has not RSVP'd, add a new RSVP
      await apiRequest(`/events_attending`, "POST", {
        user_id: userId,
        event_id: eventId,
      });
    }
    return true;
  } catch (error) {
    console.error("Error toggling RSVP status:", error);
    return false;
  }
};