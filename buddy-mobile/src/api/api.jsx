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


// ------------ SIGNUP/SIGNIN ---------------- //
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

// ------------ HOME SCREEN ---------------- //
export async function getBuddyUpdates() {
  try {
    const response = await apiRequest('buddy_updates', 'GET');
    return response;
  } catch (error) {
    console.error('Error fetching buddy updates:', error);
    throw error;
  }
}


// ------------ EVENTS ---------------- //
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



// ------------ EVENT RSVP ---------------- //
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

// ------------ BUDDIES ---------------- //
// Fetch logged-in user's buddies (mutual buddies)
export async function getBuddies(userId) {
  console.log("id: ", userId);
  const response = await apiRequest(`buddies?or=(user1_id.eq.${userId},user2_id.eq.${userId})`);
  return response;
}

// Fetch buddy requests (one-way, i.e. incoming requests)
export async function getBuddyRequests(userId) {
  const response = await apiRequest(`buddies?user2_id=eq.${userId}`);
  return response;
}

// Fetch users with the same cultural background
export async function getSameCulturalBackgroundUsers(background) {
  console.log("background: ", background);
  const response = await apiRequest(`deco_users?background=eq.${background}`);
  console.log("response: ", response);
  return response;
}

// Fetch users who share the same language
export async function getSameLanguageUsers(languages) {
  console.log("languages: ", languages);
  const languageQuery = languages
    .map((lang) => `languages.ilike.%25${lang}%25`) // Adjust to handle ilike for each language
    .join('&'); // Join each language with '&' for proper filtering
  console.log ("language query: ", languageQuery);
  const response = await apiRequest(`deco_users?${languageQuery}`);
  console.log("lang response: ", response);
  return response;
}

// Fetch all users from the database
export async function getAllUsers() {
  const response = await apiRequest('deco_users');
  return response;
}

// ------------ USERS ---------------- //
export async function getUserProfile(userId) {
  const response = await apiRequest(`deco_users?id=eq.${userId}`);
  return response.length > 0 ? response[0] : null; // Return the first result if found
}

export const checkIfUsersAreBuddies = async (user1_id, user2_id) => {
  try {
    const response = await apiRequest(
      `/buddies?or=(user1_id.eq.${user1_id},user1_id.eq.${user2_id})&or=(user2_id.eq.${user1_id},user2_id.eq.${user2_id})`,
      "GET"
    );
    return response.length > 0; // If the response array has a length, the users are buddies
  } catch (error) {
    console.error("Error checking buddy status:", error);
    return false;
  }
};

export const toggleBuddyRequest = async (user1_id, user2_id, isBuddy) => {
  try {
    if (isBuddy) {
      // If the users are buddies, remove the buddy relationship
      await apiRequest(
        `/buddies?or=(user1_id.eq.${user1_id},user1_id.eq.${user2_id})&or=(user2_id.eq.${user1_id},user2_id.eq.${user2_id})`,
        "DELETE"
      );
    } else {
      // If the users are not buddies, add a new buddy request
      await apiRequest(`/buddies`, "POST", {
        user1_id: user1_id,
        user2_id: user2_id,
      });
    }
    return true;
  } catch (error) {
    console.error("Error toggling buddy request:", error);
    return false;
  }
};

// ------------ FORUM ---------------- //
// Fetch all forum posts along with their associated categories and comment counts
export async function fetchAllForumPosts() {
  try {
    const response = await apiRequest(
      `forum_posts_with_categories_and_comments`
    );
    return response; // Return all forum posts from the view
  } catch (error) {
    console.error("Error fetching forum posts:", error);
    return [];
  }
}

// Fetch all categories to connect with each forum post card
export const fetchAllCategories = async () => {
  try {
    const response = await apiRequest('forum_post_categories');
    return response; // Return the array of categories
  } catch (error) {
    console.error('Error fetching forum categories:', error);
    throw error; // Handle the error
  }
};


// Fetch unique categories from the forum_post_categories table
export const fetchDistinctCategories = async () => {
  try {
    const response = await apiRequest('forum_post_categories?select=category_name');
    return response; // Return the array of categories
  } catch (error) {
    console.error('Error fetching forum categories:', error);
    throw error; // Handle the error
  }
};

export async function fetchForumPost(forumId) {
  try {
    const response = await apiRequest(
      `forum_posts_with_categories_and_comments?id=eq.${forumId}`
    );
    console.log("forum post: ", response[0]);
    return response[0]; // Return the first forum post (assuming it's unique by ID)
  } catch (error) {
    console.error("Error fetching forum post:", error);
    return null;
  }
}

export async function fetchReplies(forumId) {
  try {
    const response = await apiRequest(
      `forum_comments_with_user?post_id=eq.${forumId}`
    );
    console.log("comments response: ", response);
    return response; // Return all replies with user details for the forum post
  } catch (error) {
    console.error("Error fetching forum replies:", error);
    return [];
  }
}

export async function postForumComment(postId, userId, commentText) {
  try {
    // Use the apiRequest function to send a POST request
    const response = await apiRequest('forum_comments', 'POST', {
      post_id: postId,       // Correctly pass the post ID
      user_id: userId,       // Correctly pass the user ID
      comment_text: commentText,  // Correctly pass the comment text
    });

    return response; // Return the result of the POST request
  } catch (error) {
    console.error('Error posting forum comment:', error);
    throw error;
  }
}

// ------------ EVENTS ---------------- //
// Fetch event categories from the backend
export const getEventCategories = async () => {
  try {
    const response = await apiRequest('event_categories', 'GET'); // Adjust the endpoint based on your API structure
    return response;
  } catch (error) {
    console.error('Error fetching event categories:', error);
    throw error;
  }
};

export const fetchDistinctEventCategories = async () => {
  try {
    const response = await apiRequest('event_categories?select=category_name');
    return response; // Return the array of categories
  } catch (error) {
    console.error('Error fetching event categories:', error);
    throw error; // Handle the error
  }
};

export const getEventsByDate = async (date) => {
  try {
    const response = await apiRequest(`events?start_date=eq.${date}`, "GET"); // Modify the query based on your backend structure
    return response;
  } catch (error) {
    console.error("Error fetching events by date:", error);
    throw error;
  }
};