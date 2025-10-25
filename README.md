# skillswap-project
🧠 SkillSwap – A Skill Sharing Platform
📋 Overview

SkillSwap is a simple yet powerful web app that allows users to connect with others to exchange skills.
A user can create a profile describing what skill they offer and what skill they want to learn, and the app helps them find matching users based on those interests.

The project is built using HTML, CSS, and JavaScript, and leverages localStorage to persist data — meaning user profiles and saved matches remain even after refreshing the page.

🚀 Features

👤 Create and save profiles

Users can enter their details, offered skill, and desired skill.

Input validation ensures clean and safe data (regex validation on every field).

🔍 Find Matches

Matches are found using a custom matching algorithm:

Finds users where your offered skill = their wanted skill, and your wanted skill = their offered skill.

💾 Save Profiles for Later

You can save interesting profiles to review them later.

🔎 Search & Filter

Real-time search lets users filter profiles by name or skills.

🧩 Data Persistence

Uses localStorage to store profiles and saved users, simulating backend functionality.

✅ Input Validations

Name, email, skills, and location fields are validated using regex and character limits.

Prevents invalid inputs (numbers in name, invalid emails, symbols in skills, etc.).

🧮 Matching Algorithm

Defined in utils.js:

// Match if user's skillWant is in another user's skillOffer AND vice versa
export function findMatchesForUser(userProfile, allProfiles) {
  return allProfiles.filter(profile => {
    if (profile.name === userProfile.name) return false;
    return (
      userProfile.skillWant.toLowerCase().includes(profile.skillOffer.toLowerCase()) &&
      profile.skillWant.toLowerCase().includes(userProfile.skillOffer.toLowerCase())
    );
  });
}

🧱 Tech Stack
Technology	Purpose
HTML5	Structure of the web app
CSS3	Styling and layout
JavaScript (ES6)	Logic, interactivity, data management
localStorage API	Storing profiles and saved matches
Regex	Form input validation
🛠️ Folder Structure
SkillSwap/
│
├── index.html              # Home page with form & recommendations
├── matches.html            # Match results page
├── main.js                 # Handles form, profiles, UI rendering
├── utils.js                # Async utilities & matching logic
├── styles.css              # Styling for all pages
├── README.md               # Project documentation
└── assets/ (optional)      # Images, icons, etc.

🧩 Validation Rules
Field	Validation	Example
Name	Only letters and spaces, max 50 chars	John Doe
Email	Must follow standard email format	john@example.com
Skill Offer	Letters, commas, spaces only (max 100)	JavaScript, HTML, CSS
Skill Want	Same as skill offer	React, Node.js
Location	Letters and spaces only (max 50)	New York

All validations use Regular Expressions (Regex) to ensure data cleanliness and security.

💡 Example User Flow

User opens index.html

Fills in their name, offered skill, wanted skill, location, and email

On submit:

Data is validated

Stored in localStorage

Success message and “Find Matches” button appear

User clicks Find Matches, goes to matches.html

Matching profiles are displayed

User can save or remove profiles for later viewing

🔐 Data Storage Keys
{
  PROFILES: 'skillSwap_profiles',
  MATCHES: 'skillSwap_matches',
  SAVED: 'skillSwap_savedProfiles'
}


These keys are used to store and retrieve data from localStorage.
