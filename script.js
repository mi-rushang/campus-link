/* 
  STEP 1: Initialize Icons
  We are using Lucide icons. This function tells the browser to replace 
  our <i data-lucide="..."> tags with actual SVG images.
*/
lucide.createIcons();

/* 
  STEP 2: Mock Data (Fake Database)
  Since we don't have a real database yet, we store our competition 
  data in a JavaScript array. Each item is an 'object' {} with properties.
*/
const competitions = [
    {
        id: 1,
        title: "HackPune 2026",
        college: "Pune Institute of Computer Technology (PICT)",
        domain: "AI/ML",
        prize: "₹50,000",
        deadline: "24h 30m",
        distance: "5 km",
        registered: 142
    },
    {
        id: 2,
        title: "Design-a-thon",
        college: "MIT World Peace University (MIT-WPU)",
        domain: "UI/UX",
        prize: "₹25,000",
        deadline: "3 Days",
        distance: "12 km",
        registered: 89
    },
    {
        id: 3,
        title: "Web3 Builders",
        college: "College of Engineering Pune (COEP)",
        domain: "Blockchain",
        prize: "₹1,00,000",
        deadline: "1 Week",
        distance: "2 km",
        registered: 300
    },
    {
        id: 4,
        title: "CyberSec Challenge",
        college: "Vishwakarma Institute of Technology (VIT Pune)",
        domain: "Cybersecurity",
        prize: "₹40,000",
        deadline: "48h 15m",
        distance: "8 km",
        registered: 210
    },
    {
        id: 5,
        title: "Code for Cause",
        college: "Cummins College of Engineering",
        domain: "Open Source",
        prize: "₹15,000",
        deadline: "5 Days",
        distance: "6 km",
        registered: 55
    },
    {
        id: 6,
        title: "RoboWars Arena",
        college: "Pimpri Chinchwad College of Engineering (PCCOE)",
        domain: "Robotics",
        prize: "₹75,000",
        deadline: "2 Weeks",
        distance: "18 km",
        registered: 420
    },
    {
        id: 7,
        title: "DataSci Hack",
        college: "Symbiosis Institute of Technology (SIT)",
        domain: "Data Science",
        prize: "₹60,000",
        deadline: "12h 05m",
        distance: "15 km",
        registered: 180
    }
];

const players = [
    { name: "Aarav Mehta", college: "PICT", skills: ["React", "Node.js", "MongoDB"], match: "95%", role: "Full Stack Dev" },
    { name: "Riya Sharma", college: "MIT-WPU", skills: ["Figma", "UI/UX", "Illustrator"], match: "92%", role: "UI Designer" },
    { name: "Vikram Singh", college: "COEP", skills: ["Python", "TensorFlow", "PyTorch"], match: "88%", role: "AI/ML Engineer" },
    { name: "Neha Patil", college: "VIT Pune", skills: ["Solidity", "Web3.js", "Smart Contracts"], match: "85%", role: "Blockchain Dev" },
    { name: "Kunal Deshmukh", college: "PCCOE", skills: ["Flutter", "Dart", "Firebase"], match: "80%", role: "Mobile App Dev" }
];

const leaderboardData = [
    { rank: 1, name: "Vikram Singh", college: "COEP", score: 4500, badges: ["AI Master", "Top 1%"] },
    { rank: 2, name: "Neha Patil", college: "VIT Pune", score: 4200, badges: ["Web3 Pro"] },
    { rank: 3, name: "Aarav Mehta", college: "PICT", score: 3850, badges: ["Speed Coder"] },
    { rank: 42, name: "Rushang Hajare", college: "Pune University", score: 1250, badges: ["Rising Star"] } // User's mock profile
];

/* 
  STEP 3: HTML Templates for Different Views
  These functions return the HTML structure as a string so we can inject 
  it into the page when a user clicks a tab.
*/

// --- STUDENT VIEW TEMPLATE ---
function getStudentHTML() {
    // We map through our array to create a card for each competition
    const cardsHTML = competitions.map(comp => `
        <div class="glass-panel">
            <div class="card-header">
                <span class="domain-tag">${comp.domain}</span>
                <i data-lucide="bookmark" class="icon-btn" style="color: var(--text-muted)"></i>
            </div>
            <h3 class="card-title">${comp.title}</h3>
            <div class="card-college">
                <i data-lucide="map-pin" style="width: 14px;"></i> ${comp.college} (${comp.distance})
            </div>
            
            <div class="card-stats">
                <div class="stat">
                    <span class="stat-label">Prize Pool</span>
                    <span class="stat-value" style="color: #10b981;">${comp.prize}</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Deadline</span>
                    <span class="stat-value" style="color: ${comp.deadline.includes('24h') ? '#ef4444' : 'var(--text-main)'};">${comp.deadline}</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Registered</span>
                    <span class="stat-value">${comp.registered}</span>
                </div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button class="primary-btn" style="flex: 1;" onclick="openRegisterModal('${comp.title}')">
                    One-Click Register
                </button>
                <button class="icon-btn" style="border: 1px solid var(--glass-border); border-radius: 8px; padding: 0 1rem; color: var(--text-main); transition: 0.3s;" onclick="openChatModal('${comp.title}')" title="Chat with Coordinator" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'">
                    <i data-lucide="message-circle"></i>
                </button>
            </div>
        </div>
    `).join(''); // join('') turns the array of strings into one big string

    // The full HTML for the Student Tab
    return `
        <div class="section-header">
            <div>
                <h1>Discovery</h1>
                <p>Find your next challenge in Pune.</p>
            </div>
            <button class="primary-btn" style="width: auto;" onclick="switchTab('team')">Find a Team (AI)</button>
        </div>

        <div class="filters-bar">
            <div class="search-box">
                <i data-lucide="search" style="color: var(--text-muted)"></i>
                <input type="text" id="search-input" placeholder="Search Hackathons, UI challenges..." oninput="filterCompetitions(this.value)">
            </div>
            <button class="filter-btn">
                <i data-lucide="filter"></i> Filters
            </button>
            <button class="filter-btn" onclick="openMapModal()">
                <i data-lucide="map"></i> Live Map
            </button>
        </div>

        <div class="filter-chips-container mb-4">
            <button class="filter-chip" onclick="applyQuickFilter('')">All</button>
            <button class="filter-chip" onclick="applyQuickFilter('AI/ML')">AI/ML</button>
            <button class="filter-chip" onclick="applyQuickFilter('UI/UX')">Design</button>
            <button class="filter-chip" onclick="applyQuickFilter('Blockchain')">Web3</button>
            <button class="filter-chip" onclick="applyQuickFilter('Cybersecurity')">Cybersecurity</button>
            <button class="filter-chip" onclick="applyQuickFilter('Open Source')">Open Source</button>
        </div>

        <div class="card-grid" id="competitions-grid">
            ${cardsHTML}
        </div>
    `;
}

// Function for ready-made filter buttons
function applyQuickFilter(query) {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = query; // Update the input box so the user knows what is filtering
    }
    filterCompetitions(query);
}

// Function to filter competitions dynamically
function filterCompetitions(query) {
    const grid = document.getElementById('competitions-grid');
    if (!grid) return;
    
    query = query.toLowerCase();
    const filteredComps = competitions.filter(comp => 
        comp.title.toLowerCase().includes(query) || 
        comp.domain.toLowerCase().includes(query) ||
        comp.college.toLowerCase().includes(query)
    );
    
    grid.innerHTML = filteredComps.map(comp => `
        <div class="glass-panel">
            <div class="card-header">
                <span class="domain-tag">${comp.domain}</span>
                <i data-lucide="bookmark" class="icon-btn" style="color: var(--text-muted)"></i>
            </div>
            <h3 class="card-title">${comp.title}</h3>
            <div class="card-college">
                <i data-lucide="map-pin" style="width: 14px;"></i> ${comp.college} (${comp.distance})
            </div>
            
            <div class="card-stats">
                <div class="stat">
                    <span class="stat-label">Prize Pool</span>
                    <span class="stat-value" style="color: #10b981;">${comp.prize}</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Deadline</span>
                    <span class="stat-value" style="color: ${comp.deadline.includes('24h') ? '#ef4444' : 'var(--text-main)'};">${comp.deadline}</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Registered</span>
                    <span class="stat-value">${comp.registered}</span>
                </div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button class="primary-btn" style="flex: 1;" onclick="openRegisterModal('${comp.title}')">
                    One-Click Register
                </button>
                <button class="icon-btn" style="border: 1px solid var(--glass-border); border-radius: 8px; padding: 0 1rem; color: var(--text-main); transition: 0.3s;" onclick="openChatModal('${comp.title}')" title="Chat with Coordinator" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'">
                    <i data-lucide="message-circle"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

// Helper to render players
function generatePlayersHTML(playersList) {
    if (playersList.length === 0) {
        return `<p style="color: var(--text-muted); padding: 1rem;">No matching teammates found. Try a different query!</p>`;
    }
    return playersList.map(player => `
        <div class="glass-panel" style="display: flex; gap: 1rem; align-items: center;">
            <div class="profile-pic" style="width: 60px; height: 60px; font-size: 1.2rem;">${player.name.charAt(0)}</div>
            <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h3 class="card-title" style="margin: 0;">${player.name}</h3>
                    <span class="domain-tag" style="background: rgba(16, 185, 129, 0.2); color: #10b981;">${player.match} Match</span>
                </div>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin: 0.3rem 0;">${player.role} • ${player.college}</p>
                <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                    ${player.skills.map(skill => `<span class="domain-tag" style="background: rgba(255,255,255,0.1); color: var(--text-main); font-size: 0.7rem; padding: 0.2rem 0.6rem;">${skill}</span>`).join('')}
                </div>
            </div>
            <button class="icon-btn" style="background: var(--accent-blue); padding: 0.8rem; border-radius: 50%; color: white;" onclick="alert('Team Request Sent to ${player.name}!')">
                <i data-lucide="user-plus"></i>
            </button>
        </div>
    `).join('');
}

// --- TEAM FINDER VIEW TEMPLATE ---
function getTeamFinderHTML() {
    return `
        <div class="section-header">
            <div>
                <h1>AI Team Finder</h1>
                <p>Find the perfect teammates for your next hackathon.</p>
            </div>
        </div>

        <div class="filters-bar">
            <div class="search-box">
                <i data-lucide="bot" style="color: var(--accent-purple)"></i>
                <input type="text" id="team-search-input" placeholder="e.g., 'Need a UI designer from PICT who knows Figma'" onkeyup="if(event.key === 'Enter') performMagicSearch()">
            </div>
            <button class="primary-btn" onclick="performMagicSearch()" style="width: auto; background: var(--accent-purple); color: white;">Magic Search</button>
        </div>

        <h3 class="mb-4">Top Matches for You</h3>
        <div class="card-grid" id="team-grid" style="grid-template-columns: 1fr;">
            ${generatePlayersHTML(players)}
        </div>
    `;
}

// Logic for Magic Search
function performMagicSearch() {
    const query = document.getElementById('team-search-input').value.toLowerCase();
    const grid = document.getElementById('team-grid');
    if (!grid) return;

    if (!query.trim()) {
        grid.innerHTML = generatePlayersHTML(players);
        lucide.createIcons();
        return;
    }

    // Simple matching algorithm: score players based on keyword matches
    const scoredPlayers = players.map(player => {
        let score = 0;
        // Check role
        if (query.includes(player.role.toLowerCase())) score += 3;
        // Check college
        if (query.includes(player.college.toLowerCase())) score += 2;
        // Check skills
        player.skills.forEach(skill => {
            if (query.includes(skill.toLowerCase())) score += 2;
        });

        return { ...player, score };
    });

    // Filter out players with 0 score if we want strict matching, or just sort them.
    // Let's filter out 0 scores to make it feel like "Magic"
    let filteredPlayers = scoredPlayers.filter(p => p.score > 0);
    
    // Sort by highest score first
    filteredPlayers.sort((a, b) => b.score - a.score);

    // Update their "Match %" dynamically for effect
    filteredPlayers = filteredPlayers.map((p, index) => {
        let dynamicMatch = 98 - (index * 5); // Just a fun mock calculation
        return { ...p, match: dynamicMatch + "%" };
    });

    grid.innerHTML = generatePlayersHTML(filteredPlayers);
    lucide.createIcons();
}

// --- PROFILE VIEW TEMPLATE ---
function getProfileHTML() {
    return `
        <div class="section-header">
            <div>
                <h1>Your Profile</h1>
                <p>Manage your skills, portfolio, and participation history.</p>
            </div>
            <button class="primary-btn" style="width: auto; background: transparent; border: 1px solid var(--glass-border); color: var(--text-main);">
                <i data-lucide="download" style="width: 16px; margin-right: 5px; display: inline-block; vertical-align: text-bottom;"></i> Export Portfolio PDF
            </button>
        </div>

        <div class="card-grid" style="grid-template-columns: 1fr 2fr;">
            <!-- Left Column: Identity -->
            <div class="glass-panel" style="text-align: center;">
                <div class="profile-pic" style="width: 100px; height: 100px; font-size: 2.5rem; margin: 0 auto 1rem auto;">RH</div>
                <h2 style="margin-bottom: 0.2rem;">Rushang Hajare</h2>
                <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Computer Engineering • Third Year</p>
                <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; padding: 1rem; border-radius: 12px; margin-bottom: 1.5rem;">
                    <div style="font-size: 2rem; font-weight: 800;">#42</div>
                    <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px;">Pune City Rank</div>
                </div>
                <div style="text-align: left;">
                    <h4 style="margin-bottom: 0.5rem; color: var(--text-muted);">My Skills</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        <span class="domain-tag">React</span>
                        <span class="domain-tag">Python</span>
                        <span class="domain-tag">Machine Learning</span>
                        <span class="domain-tag">Tailwind CSS</span>
                    </div>
                </div>
            </div>

            <!-- Right Column: History -->
            <div class="glass-panel">
                <h3 class="mb-4">Participation History</h3>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 1rem; border-bottom: 1px solid var(--glass-border);">
                        <div>
                            <h4 style="margin-bottom: 0.2rem;">Pune Tech Fiesta 2025</h4>
                            <p style="color: var(--text-muted); font-size: 0.85rem;">Won 1st Place • AI Track</p>
                        </div>
                        <span class="domain-tag" style="background: rgba(245, 158, 11, 0.2); color: #f59e0b;">Winner</span>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 1rem; border-bottom: 1px solid var(--glass-border);">
                        <div>
                            <h4 style="margin-bottom: 0.2rem;">Global UI Challenge</h4>
                            <p style="color: var(--text-muted); font-size: 0.85rem;">Participated • Top 10%</p>
                        </div>
                        <span class="domain-tag" style="background: rgba(59, 130, 246, 0.2); color: var(--accent-blue);">Participant</span>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h4 style="margin-bottom: 0.2rem;">HackPune 2026</h4>
                            <p style="color: var(--text-muted); font-size: 0.85rem;">Registered • Starts in 24h</p>
                        </div>
                        <span class="domain-tag" style="background: rgba(16, 185, 129, 0.2); color: #10b981;">Upcoming</span>
                    </div>

                </div>
            </div>
        </div>
    `;
}

// --- LEADERBOARD VIEW TEMPLATE ---
function getLeaderboardHTML() {
    const rowsHTML = leaderboardData.map(user => {
        let rankStyle = "color: var(--text-muted); font-size: 1.2rem; font-weight: bold;";
        if (user.rank === 1) rankStyle = "color: #fbbf24; font-size: 1.5rem; font-weight: 800; text-shadow: 0 0 10px rgba(251, 191, 36, 0.5);"; // Gold
        if (user.rank === 2) rankStyle = "color: #9ca3af; font-size: 1.3rem; font-weight: 800;"; // Silver
        if (user.rank === 3) rankStyle = "color: #b45309; font-size: 1.3rem; font-weight: 800;"; // Bronze
        
        // Highlight the user row
        const isUser = user.rank === 42;
        const rowBg = isUser ? "background: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.3);" : "background: rgba(255,255,255,0.02);";

        return `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; border-radius: 12px; margin-bottom: 0.8rem; border: 1px solid var(--glass-border); ${rowBg} transition: 0.3s;">
                <div style="display: flex; align-items: center; gap: 1.5rem; flex: 1;">
                    <div style="width: 40px; text-align: center; ${rankStyle}">
                        #${user.rank}
                    </div>
                    <div class="profile-pic" style="width: 50px; height: 50px; font-size: 1rem;">${user.name.charAt(0)}</div>
                    <div>
                        <h3 style="margin: 0; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
                            ${user.name} 
                            ${isUser ? '<span style="font-size: 0.7rem; background: #10b981; color: white; padding: 2px 6px; border-radius: 4px;">You</span>' : ''}
                        </h3>
                        <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">${user.college}</p>
                    </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="display: flex; gap: 0.4rem;">
                        ${user.badges.map(b => `<span class="domain-tag" style="background: rgba(139, 92, 246, 0.2); color: var(--accent-purple); font-size: 0.7rem;">${b}</span>`).join('')}
                    </div>
                    <div style="text-align: right; min-width: 80px;">
                        <h3 style="margin: 0; color: var(--accent-blue);">${user.score}</h3>
                        <p style="margin: 0; font-size: 0.75rem; color: var(--text-muted);">pts</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    return `
        <div class="section-header">
            <div>
                <h1>City Leaderboard</h1>
                <p>Top hackers in Pune based on competition wins and participation.</p>
            </div>
            <div style="background: var(--glass-bg); padding: 0.5rem 1rem; border-radius: 50px; border: 1px solid var(--glass-border); font-size: 0.9rem;">
                Your Rank: <strong style="color: #10b981;">#42</strong>
            </div>
        </div>

        <div class="glass-panel" style="padding: 2rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; padding: 0 1.5rem; color: var(--text-muted); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px;">
                <span style="flex: 1;">Rank & Hacker</span>
                <span style="text-align: right;">Total Score</span>
            </div>
            
            <div style="display: flex; flex-direction: column;">
                ${rowsHTML}
                
                <div style="text-align: center; color: var(--text-muted); padding: 1rem; border: 1px dashed var(--glass-border); border-radius: 12px; margin-top: 0.5rem;">
                    ... 38 hackers ahead of you ...
                </div>
            </div>
        </div>
    `;
}

// --- ORGANIZER VIEW TEMPLATE ---
function getOrganizerHTML() {
    return `
        <div class="section-header">
            <div>
                <h1>Organizer Dashboard</h1>
                <p>Manage your events and attendees.</p>
            </div>
            <button class="primary-btn" style="width: auto;">+ Post Competition</button>
        </div>

        <div class="card-grid" style="grid-template-columns: 1fr 1fr;">
            <div class="glass-panel">
                <h3 class="mb-4">Live Analytics</h3>
                <p style="color: var(--text-muted); margin-bottom: 1rem;">HackPune 2026 Traffic</p>
                <div style="height: 150px; background: rgba(255,255,255,0.02); border-radius: 8px; display:flex; align-items:flex-end; padding:10px; gap: 10px;">
                    <!-- Fake Bar Chart -->
                    <div style="flex:1; background: var(--accent-blue); height: 40%; border-radius: 4px;"></div>
                    <div style="flex:1; background: var(--accent-blue); height: 70%; border-radius: 4px;"></div>
                    <div style="flex:1; background: var(--accent-purple); height: 100%; border-radius: 4px;"></div>
                    <div style="flex:1; background: var(--accent-blue); height: 80%; border-radius: 4px;"></div>
                </div>
                <p style="text-align:center; margin-top:10px; font-weight:bold;">142 Registrations</p>
            </div>
            
            <div class="glass-panel">
                <h3 class="mb-4">Automated Certificates</h3>
                <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Generate verifiable certificates for participants instantly.</p>
                <div class="flex items-center gap-2 mb-4">
                    <i data-lucide="file-check" style="color: var(--accent-purple)"></i>
                    <span>Template: Winner_Standard.pdf</span>
                </div>
                <div class="flex items-center gap-2 mb-4">
                    <i data-lucide="file-check" style="color: var(--accent-blue)"></i>
                    <span>Template: Participant_Standard.pdf</span>
                </div>
                <button class="primary-btn" style="background: var(--accent-purple); color: white; margin-bottom: 0.5rem;">
                    Generate 142 Certificates
                </button>
                <button class="primary-btn" style="background: transparent; border: 1px solid var(--accent-purple); color: var(--text-main);">
                    Upload New Template
                </button>
            </div>

            <div class="glass-panel" style="grid-column: span 2;">
                <h3 class="mb-4">Recent Registrations (HackPune 2026)</h3>
                <table style="width: 100%; text-align: left; border-collapse: collapse;">
                    <thead>
                        <tr style="border-bottom: 1px solid var(--glass-border); color: var(--text-muted);">
                            <th style="padding: 10px;">Student Name</th>
                            <th style="padding: 10px;">College</th>
                            <th style="padding: 10px;">Skills</th>
                            <th style="padding: 10px;">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                            <td style="padding: 10px;">Rahul Sharma</td>
                            <td style="padding: 10px;">VIT Pune</td>
                            <td style="padding: 10px;"><span class="domain-tag">React</span></td>
                            <td style="padding: 10px; color: #10b981;">Confirmed</td>
                        </tr>
                        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                            <td style="padding: 10px;">Aditi Desai</td>
                            <td style="padding: 10px;">Cummins College</td>
                            <td style="padding: 10px;"><span class="domain-tag" style="background: rgba(139, 92, 246, 0.2); color: var(--accent-purple)">Python</span></td>
                            <td style="padding: 10px; color: #10b981;">Confirmed</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px;">Varun Patel</td>
                            <td style="padding: 10px;">PICT</td>
                            <td style="padding: 10px;"><span class="domain-tag">Figma</span></td>
                            <td style="padding: 10px; color: #ef4444;">Pending</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// --- SPONSOR VIEW TEMPLATE ---
function getSponsorHTML() {
    return `
        <div class="section-header">
            <div>
                <h1>Sponsor Portal</h1>
                <p>Connect with the brightest student developers.</p>
            </div>
            <button class="primary-btn" style="width: auto;">Update Company Profile</button>
        </div>

        <h3 class="mb-4">AI Recommended Competitions to Fund</h3>
        <div class="card-grid">
            <div class="glass-panel" style="border-color: var(--accent-purple);">
                <div class="card-header">
                    <span class="domain-tag" style="background: rgba(139, 92, 246, 0.2); color: var(--accent-purple)">98% Match</span>
                </div>
                <h3 class="card-title">HackPune 2026</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">
                    Matches your audience criteria (CS Students, AI focus). Hosted by PICT.
                    <br><br>Estimated reach: <strong>2000+ students</strong>
                </p>
                <button class="primary-btn" style="background: var(--accent-purple); color: white;">Sponsor for ₹50,000</button>
            </div>

            <div class="glass-panel" style="border-color: var(--accent-blue);">
                <div class="card-header">
                    <span class="domain-tag">85% Match</span>
                </div>
                <h3 class="card-title">Web3 Builders</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">
                    High overlap with your recent hiring trends. Hosted by COEP.
                    <br><br>Estimated reach: <strong>1500+ students</strong>
                </p>
                <button class="primary-btn" style="background: transparent; border: 1px solid var(--accent-blue); color: var(--text-main);">View Details</button>
            </div>
            
            <div class="glass-panel">
                <div class="card-header">
                    <span class="domain-tag" style="background: rgba(156, 163, 175, 0.2); color: var(--text-muted)">70% Match</span>
                </div>
                <h3 class="card-title">CyberSec Challenge</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">
                    Growing interest in this domain. Hosted by VIT Pune.
                    <br><br>Estimated reach: <strong>800+ students</strong>
                </p>
                <button class="primary-btn" style="background: transparent; border: 1px solid var(--text-muted); color: var(--text-main);">View Details</button>
            </div>
        </div>
    `;
}

/* 
  STEP 4: Tab Switching Logic
  This function gets called when a user clicks a button in the navbar.
*/
function switchTab(tabName) {
    // 1. Remove 'active' class from all buttons
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    // 2. Add 'active' class to the clicked button
    document.getElementById(`tab-${tabName}`).classList.add('active');

    // 3. Get the main content area
    const contentArea = document.getElementById('app-content');

    // 4. Inject the correct HTML based on the tab
    if (tabName === 'student') {
        contentArea.innerHTML = getStudentHTML();
    } else if (tabName === 'team') {
        contentArea.innerHTML = getTeamFinderHTML();
    } else if (tabName === 'leaderboard') {
        contentArea.innerHTML = getLeaderboardHTML();
    } else if (tabName === 'profile') {
        contentArea.innerHTML = getProfileHTML();
    } else if (tabName === 'organizer') {
        contentArea.innerHTML = getOrganizerHTML();
    } else if (tabName === 'sponsor') {
        contentArea.innerHTML = getSponsorHTML();
    }

    // 5. IMPORTANT: Re-initialize icons because we just added new HTML
    lucide.createIcons();
}

/* 
  STEP 5: Modal (Popup) Logic
*/
const modal = document.getElementById('registration-modal');
const modalTitle = document.getElementById('modal-title');

function openRegisterModal(competitionName) {
    modalTitle.innerText = `Register for ${competitionName}`;
    modal.classList.remove('hidden'); // Removes the hidden class to show it
}

function closeModal() {
    modal.classList.add('hidden'); // Adds the hidden class back
}

function confirmRegistration() {
    alert("Registration Successful! Confirmation sent to your email.");
    closeModal();
}

/* 
  STEP 5.5: CHAT MODAL LOGIC
*/
function openChatModal(compTitle) {
    document.getElementById('chat-comp-title').innerText = compTitle;
    document.getElementById('chat-modal').classList.remove('hidden');
    
    // Reset chat with a welcoming message specific to the competition
    document.getElementById('chat-messages').innerHTML = `
        <div class="chat-message received">
            Hi! I'm the coordinator for <strong>${compTitle}</strong>. How can I help you with your registration or doubts?
        </div>
    `;
    
    // Focus the input box slightly after the modal opens
    setTimeout(() => {
        document.getElementById('chat-input').focus();
    }, 100);
}

function closeChatModal() {
    document.getElementById('chat-modal').classList.add('hidden');
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;

    const chatBody = document.getElementById('chat-messages');
    
    // 1. Add user's message to the chat
    chatBody.innerHTML += `
        <div class="chat-message sent">
            ${msg}
        </div>
    `;
    input.value = ''; // Clear input field

    // Scroll to the bottom of the chat
    chatBody.scrollTop = chatBody.scrollHeight;

    // 2. Simulate AI/Coordinator replying after 1 second
    setTimeout(() => {
        chatBody.innerHTML += `
            <div class="chat-message received">
                Thanks for reaching out! A coordinator will review your question regarding "${msg}" and get back to you shortly. Let me know if you need anything else!
            </div>
        `;
        // Scroll to the bottom again
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}

/* 
  STEP 6: NOTIFICATIONS & MAP
*/
function toggleNotifications() {
    const dropdown = document.getElementById('notif-dropdown');
    dropdown.classList.toggle('hidden');
}

// Close notifications if clicked outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('notif-dropdown');
    const notifBtn = document.getElementById('notif-btn');
    if (dropdown && !dropdown.classList.contains('hidden')) {
        // If the click is NOT inside the dropdown AND NOT on the bell button
        if (!dropdown.contains(event.target) && !notifBtn.contains(event.target)) {
            dropdown.classList.add('hidden');
        }
    }
});

let leafletMap = null;

function openMapModal() {
    document.getElementById('map-modal').classList.remove('hidden');
    
    // We need to initialize the map only once, and after the modal is visible
    // so Leaflet can calculate the correct size.
    setTimeout(() => {
        if (!leafletMap) {
            // Initialize map centered on Pune
            leafletMap = L.map('leaflet-map').setView([18.5204, 73.8567], 12);
            
            // Add dark theme map tiles (for the vibe!)
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 20
            }).addTo(leafletMap);

            // Add College Markers
            const locations = [
                { name: "PICT", coords: [18.4575, 73.8508], popup: "HackPune 2026<br>AI/ML Domain" },
                { name: "COEP", coords: [18.5293, 73.8565], popup: "Web3 Builders<br>Blockchain" },
                { name: "MIT-WPU", coords: [18.5183, 73.8140], popup: "Design-a-thon<br>UI/UX" },
                { name: "VIT Pune", coords: [18.4636, 73.8682], popup: "CyberSec Challenge<br>Cybersecurity" },
                { name: "PCCOE", coords: [18.6517, 73.7614], popup: "RoboWars Arena<br>Robotics" }
            ];

            locations.forEach(loc => {
                // Create a glowing div icon
                const customIcon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style='background-color: var(--accent-purple); width: 14px; height: 14px; border-radius: 50%; box-shadow: 0 0 12px var(--accent-purple); border: 2px solid white;'></div>`,
                    iconSize: [14, 14],
                    iconAnchor: [7, 7]
                });
                L.marker(loc.coords, {icon: customIcon}).addTo(leafletMap)
                    .bindPopup(`<strong style="color: var(--accent-blue); font-size: 1.1rem;">${loc.name}</strong><br><span style="color: var(--text-muted);">${loc.popup}</span>`);
            });
        } else {
            // If already initialized, just tell it to recalculate its size in case the modal changed
            leafletMap.invalidateSize();
        }
    }, 100); // Small delay to ensure the modal transition finishes
}

function closeMapModal() {
    document.getElementById('map-modal').classList.add('hidden');
}

/* 
  STEP 6: ROLE-BASED ROUTING
*/

function loginAs(role) {
    const landingPage = document.getElementById('landing-page');
    const appContainer = document.getElementById('app-container');
    const dynamicNavLinks = document.getElementById('dynamic-nav-links');
    const userAvatar = document.getElementById('user-avatar');

    // Hide Landing Page, Show App
    landingPage.classList.add('hidden');
    appContainer.classList.remove('hidden');

    // Build the specific navigation bar based on the role
    if (role === 'student') {
        userAvatar.innerText = 'ST';
        dynamicNavLinks.innerHTML = `
            <button class="nav-btn active" id="tab-student" onclick="switchTab('student')">Discovery</button>
            <button class="nav-btn" id="tab-team" onclick="switchTab('team')">Team Finder</button>
            <button class="nav-btn" id="tab-leaderboard" onclick="switchTab('leaderboard')">Leaderboard</button>
            <button class="nav-btn" id="tab-profile" onclick="switchTab('profile')">Profile</button>
        `;
        switchTab('student'); // Load default tab
    } else if (role === 'organizer') {
        userAvatar.innerText = 'ORG';
        dynamicNavLinks.innerHTML = `
            <button class="nav-btn active" id="tab-organizer" onclick="switchTab('organizer')">Dashboard</button>
            <button class="nav-btn" onclick="alert('Post Competition Form coming soon!')">Post Competition</button>
        `;
        switchTab('organizer');
    } else if (role === 'sponsor') {
        userAvatar.innerText = 'SP';
        dynamicNavLinks.innerHTML = `
            <button class="nav-btn active" id="tab-sponsor" onclick="switchTab('sponsor')">Sponsor Portal</button>
        `;
        switchTab('sponsor');
    }
}

function logout() {
    const landingPage = document.getElementById('landing-page');
    const appContainer = document.getElementById('app-container');

    // Hide App, Show Landing Page
    appContainer.classList.add('hidden');
    landingPage.classList.remove('hidden');
}

// Note: The app automatically starts on the Landing Page because #app-container is hidden in HTML.
