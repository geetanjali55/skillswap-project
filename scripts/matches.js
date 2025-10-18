function parseSkills(skillString) {
  return skillString
    .toLowerCase()
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

const matchesContainer = document.getElementById('matches-list');
const oneSidedContainer = document.getElementById('one-sided-list');
const chatPreview = document.getElementById('chat-preview');
const chatUserName = document.getElementById('chat-user-name');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendChatBtn = document.getElementById('send-chat-btn');
const emailChatBtn = document.getElementById('email-chat-btn');
const closeChatBtn = document.getElementById('close-chat-btn');

const allProfiles = JSON.parse(localStorage.getItem('skillSwap_profiles')) || [];
const currentUser = allProfiles[allProfiles.length - 1];

if (!currentUser) {
  matchesContainer.innerHTML = `<p>No profile found. Please fill your skill journey first!</p>`;
  oneSidedContainer.innerHTML = `<p>No profile found. Please fill your skill journey first!</p>`;
} else {
  const currentUserOfferSkills = parseSkills(currentUser.skillOffer);
  const currentUserWantSkills = parseSkills(currentUser.skillWant);

  // Mutual matches (both want each other's skill)
  const matchedUsers = allProfiles.filter(profile => {
    if (profile.name === currentUser.name) return false;

    const profileOfferSkills = parseSkills(profile.skillOffer);
    const profileWantSkills = parseSkills(profile.skillWant);

    const wantsOffered = currentUserWantSkills.some(skill => profileOfferSkills.includes(skill));
    const offersWanted = currentUserOfferSkills.some(skill => profileWantSkills.includes(skill));

    return wantsOffered && offersWanted;
  });

  // One-sided matches where current user offers skill others want
  const oneSidedUsers = allProfiles.filter(profile => {
    if (profile.name === currentUser.name) return false;

    const profileOfferSkills = parseSkills(profile.skillOffer);
    const profileWantSkills = parseSkills(profile.skillWant);

    // Only one side matches: current user offers skill profile wants but profile does NOT offer skill current user wants
    const profileDoesNotOfferWhatUserWants = !profileOfferSkills.some(skill => currentUserWantSkills.includes(skill));
    const offersWanted = currentUserOfferSkills.some(skill => profileWantSkills.includes(skill));

    return offersWanted && profileDoesNotOfferWhatUserWants;
  });

  function renderAlert(container, message) {
    container.innerHTML = `<p>${message}</p>`;
  }

  // Render mutual matches
  if (matchedUsers.length === 0) {
    renderAlert(matchesContainer, "No mutual matches found right now.");
  } else {
    matchesContainer.innerHTML = '';
    matchedUsers.forEach(profile => {
      const card = createUserCard(profile);
      matchesContainer.appendChild(card);
    });
  }

  // Render one-sided matches
  if (oneSidedUsers.length === 0) {
    renderAlert(oneSidedContainer, "No one-sided interest matches found.");
  } else {
    oneSidedContainer.innerHTML = '';
    oneSidedUsers.forEach(profile => {
      const card = createUserCard(profile);
      oneSidedContainer.appendChild(card);
    });
  }
}

// Helper to create user card
function createUserCard(profile) {
  const card = document.createElement('div');
  card.className = 'user-card';
  card.innerHTML = `
    <h4>${profile.name}</h4>
    <p><strong>Offers:</strong> ${profile.skillOffer}</p>
    <p><strong>Wants:</strong> ${profile.skillWant}</p>
    <p><strong>City:</strong> ${profile.location}</p>
    <button class="chat-btn">💬 Chat</button>
  `;

  // Attach event listener for chat button
  card.querySelector('.chat-btn').addEventListener('click', () => openChat(profile));

  return card;
}

let activeChatProfile = null;

// Open chat preview UI
function openChat(profile) {
  activeChatProfile = profile;
  chatUserName.textContent = profile.name;
  chatMessages.innerHTML = `<p class="system">This is a simulated chat with ${profile.name}.</p>`;
  chatInput.value = '';
  chatPreview.classList.remove('hidden');
}

// Send chat message (simulate)
sendChatBtn.addEventListener('click', () => {
  const message = chatInput.value.trim();
  if (!message) return;

  addChatMessage(message, 'outgoing');
  chatInput.value = '';

  // Simulate reply with delay
  setTimeout(() => {
    addChatMessage(`Thanks for your message! Let's connect soon.`, 'incoming');
  }, 1500);
});

function addChatMessage(text, type) {
  const msg = document.createElement('div');
  msg.className = `message ${type}`;
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Close chat preview
closeChatBtn.addEventListener('click', () => {
  chatPreview.classList.add('hidden');
  activeChatProfile = null;
  chatMessages.innerHTML = '';
});

// Email button functionality
emailChatBtn.addEventListener('click', () => {
  if (!activeChatProfile) return;

  const recipientEmail = activeChatProfile.email || ''; // We'll talk about this below
  const currentUserEmail = currentUser.email || '';

  if (!recipientEmail) {
    alert("This user doesn't have an email listed.");
    return;
  }

  // Construct mailto link with recipient's email in "To" and sender's email in "From" (can't set From in mailto)
  // So, what we can do: put sender's email in body or subject or cc (cc/bcc)
  const subject = encodeURIComponent("SkillSwap: Let's connect!");
  const body = encodeURIComponent(`Hi ${activeChatProfile.name},\n\nI'd like to connect with you for a skill swap.\n\nMy email: ${currentUserEmail}\n\nBest regards,\n${currentUser.name}`);

  // mailto link with To, Subject, Body
  const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

  window.location.href = mailtoLink;
});
