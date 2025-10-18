// Helper function to simulate async saving
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Get form and recommendation container
const form = document.getElementById('profile-form');
const recommendationsGrid = document.getElementById('recommendations');
const searchInput = document.getElementById('search-filter');

let allProfiles = [];

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // 🚫 Prevent default form behavior

  const user = {
    name: form.name.value.trim(),
    skillOffer: form.skillOffer.value.trim(),
    skillWant: form.skillWant.value.trim(),
    location: form.location.value.trim(),
    email: form.email.value.trim() // ✅ capture email
  };

  // Simulate async save (can also use localStorage)
  await delay(500);
  allProfiles.push(user);
  localStorage.setItem('skillSwap_profiles', JSON.stringify(allProfiles));

  // Lock card visually (optional effect)
  document.querySelector('.card').classList.add('locked');

  // Show success + link to next page
  showSuccessMessage();
  renderRecommendations();
});

// On load: fetch existing profiles
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('skillSwap_profiles');
  allProfiles = saved ? JSON.parse(saved) : [];
  renderRecommendations();
});

// Show a message + "Find Matches" button
function showSuccessMessage() {
  const successMsg = document.createElement('div');
  successMsg.className = 'success-message';
  successMsg.innerHTML = `
    <p>✅ Profile saved successfully!</p>
    <a href="matches.html" class="find-matches-btn">🔍 Find Matches</a>
  `;
  form.parentElement.appendChild(successMsg);
}

// Render dynamic recommendations
function renderRecommendations() {
  recommendationsGrid.innerHTML = '';

  if (allProfiles.length === 0) {
    recommendationsGrid.innerHTML = '<p>No users yet.</p>';
    return;
  }

  const filtered = filterProfiles(searchInput.value);

  filtered.forEach(profile => {
    const card = document.createElement('div');
    card.className = 'user-card';
    card.innerHTML = `
      <h4>${profile.name}</h4>
      <p><strong>Offers:</strong> ${profile.skillOffer}</p>
      <p><strong>Wants:</strong> ${profile.skillWant}</p>
      <p><strong>City:</strong> ${profile.location}</p>
      <p><strong>Email:</strong> ${profile.email || 'N/A'}</p>
    `;
    recommendationsGrid.appendChild(card);
  });
}

// Search filter
searchInput.addEventListener('input', renderRecommendations);

function filterProfiles(query) {
  query = query.toLowerCase();
  return allProfiles.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.skillOffer.toLowerCase().includes(query) ||
    p.skillWant.toLowerCase().includes(query)
  );
}
