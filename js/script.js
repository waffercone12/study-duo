/* Study Duo - Journey to 2027 JavaScript Logic */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initCountdowns();
    initScrollTop();
    initQuotes();

    // Conditionally initialize page-specific scripts
    if (document.getElementById('resources-page')) {
        initResourcesPage();
    }
    if (document.getElementById('tracker-page')) {
        initTrackerPage();
    }
    if (document.getElementById('roadmap-page')) {
        initRoadmapPage();
    }
});

/* ==========================================
   THEME MANAGER
   ========================================== */
function initTheme() {
    const themeToggleBnt = document.getElementById('theme-toggle');
    if (!themeToggleBnt) return;

    // Set default theme from localStorage or system theme (default dark)
    const savedTheme = localStorage.getItem('study-duo-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggleBnt.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('study-duo-theme', newTheme);
    });
}

/* ==========================================
   MOBILE NAVIGATION MENU
   ========================================== */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (!mobileMenuBtn || !navLinks) return;

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        // Change menu icon based on state
        if (navLinks.classList.contains('open')) {
            mobileMenuBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
        } else {
            mobileMenuBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      `;
        }
    });
}

/* ==========================================
   EXAM COUNTER DATES
   ========================================== */
function initCountdowns() {
    // Official standard test schedules
    const gateTargetDate = new Date('February 6, 2027 09:30:00').getTime();
    const ceedTargetDate = new Date('January 17, 2027 09:00:00').getTime();

    function updateCountdown(targetTime, containerIdPrefix) {
        const now = new Date().getTime();
        const distance = targetTime - now;

        const daysEl = document.getElementById(`${containerIdPrefix}-days`);
        const hoursEl = document.getElementById(`${containerIdPrefix}-hours`);
        const minsEl = document.getElementById(`${containerIdPrefix}-mins`);
        const secsEl = document.getElementById(`${containerIdPrefix}-secs`);

        if (distance < 0) {
            if (daysEl) daysEl.innerText = "00";
            if (hoursEl) hoursEl.innerText = "00";
            if (minsEl) minsEl.innerText = "00";
            if (secsEl) secsEl.innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
        if (minsEl) minsEl.innerText = String(minutes).padStart(2, '0');
        if (secsEl) secsEl.innerText = String(seconds).padStart(2, '0');
    }

    // Set up tick update every second
    function tick() {
        updateCountdown(gateTargetDate, 'gate');
        updateCountdown(ceedTargetDate, 'ceed');
    }

    tick();
    setInterval(tick, 1000);
}

/* ==========================================
   SCROLL TO TOP BUTTON
   ========================================== */
function initScrollTop() {
    const scrollBtn = document.getElementById('scroll-top');
    if (!scrollBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================
   DAILY MOTIVATIONAL QUOTES
   ========================================== */
function initQuotes() {
    const quoteTextEl = document.getElementById('quote-text');
    const quoteAuthorEl = document.getElementById('quote-author');

    if (!quoteTextEl || !quoteAuthorEl) return;

    const quotes = [
        { text: "Consistency is more important than intensity.", author: "Linear.app philosophy" },
        { text: "The path to IITM & IIScB is built with daily habits, not sudden wonders.", author: "Study Duo Mantra" },
        { text: "Success is the sum of small effort, repeated day-in and day-out.", author: "Robert Collier" },
        { text: "Data Science is about asking the right questions; Design is about finding the right form.", author: "GATE DA & CEED Duo" },
        { text: "Do not wait for inspiration. Start working, and inspiration will find you.", author: "Pablo Picasso" },
        { text: "Details are not the details. They make the design.", author: "Charles Eames" },
        { text: "The best way to predict the future is to create it.", author: "Abraham Lincoln" }
    ];

    // Pick fixed quote based on day of the year
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24));
    const selectedQuote = quotes[dayOfYear % quotes.length];

    quoteTextEl.innerText = `"${selectedQuote.text}"`;
    quoteAuthorEl.innerText = `— ${selectedQuote.author}`;
}

/* ==========================================
   RESOURCES FILTER AND SEARCH
   ========================================== */
function initResourcesPage() {
    const searchInput = document.getElementById('r-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const resourceCards = document.querySelectorAll('.resource-dl-card');

    if (!searchInput) return;

    let searchVal = '';
    let activeCategory = 'all';

    function filterResources() {
        resourceCards.forEach(card => {
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardDesc = card.querySelector('p').textContent.toLowerCase();
            const cardCategory = card.getAttribute('data-category'); // e.g. "gate", "ceed", "books", "github", "youtube", "websites"

            const matchesSearch = cardTitle.includes(searchVal) || cardDesc.includes(searchVal);
            const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', (e) => {
        searchVal = e.target.value.toLowerCase().trim();
        filterResources();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            activeCategory = btn.getAttribute('data-filter');
            filterResources();
        });
    });
}

/* ==========================================
   ROADMAP PAGE ANIMATION
   ========================================= */
function initRoadmapPage() {
    // Add animation class on load, mimicking AOS style
    const nodes = document.querySelectorAll('.timeline-node');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    nodes.forEach(node => {
        node.style.opacity = '0';
        node.style.transform = 'translateY(30px)';
        node.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease';
        observer.observe(node);
    });
}

/* ==========================================
   TRACKER PAGE & LOGIC
   ========================================== */
function initTrackerPage() {
    // State elements
    const goalInput = document.getElementById('goal-inp');
    const addGoalBtn = document.getElementById('add-goal-btn');
    const dailyGoalsList = document.getElementById('daily-goals-list');
    const weeklyGoalsList = document.getElementById('weekly-goals-list');

    const compGoalsCount = document.getElementById('comp-goals-count');
    const remGoalsCount = document.getElementById('rem-goals-count');
    const progressPercentEl = document.getElementById('progress-percent');
    const editProgressBar = document.getElementById('edit-progress-bar');

    const streakCountEl = document.getElementById('streak-count');
    const studyHoursEl = document.getElementById('study-hours-count');

    // Pomodoro element timers
    const pomoTimerDisplay = document.getElementById('pomo-display');
    const btnPomoStart = document.getElementById('pomo-start');
    const btnPomoReset = document.getElementById('pomo-reset');
    const pomoTabs = document.querySelectorAll('.pomo-tab');
    const pomoRing = document.querySelector('.pomo-progress-ring-circle');

    // Dynamic audio beep using Web Audio API
    function playSynthesizedBeep() {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = "sine";
            osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.6);
        } catch (e) {
            console.warn("Audio Context beep was blocked or failed", e);
        }
    }

    /* --- Goals Store --- */
    let goals = JSON.parse(localStorage.getItem('study-duo-goals')) || [
        { id: 1, text: "Read Hands-on ML Chapter 3", period: "daily", checked: false },
        { id: 2, text: "Sketch 5 perspectives", period: "daily", checked: false },
        { id: 3, text: "Solve 20 GATE Probability PYQs", period: "weekly", checked: false },
        { id: 4, text: "Study Design Drawing basics", period: "weekly", checked: false }
    ];

    let streak = parseInt(localStorage.getItem('study-duo-streak')) || 3;
    let studyHours = parseFloat(localStorage.getItem('study-duo-study-hours')) || 12.5;
    let lastActiveDate = localStorage.getItem('study-duo-last-active-date') || '';

    // Sync streak on load
    const today = new Date().toDateString();
    if (lastActiveDate !== today && lastActiveDate !== '') {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastActiveDate !== yesterday.toDateString()) {
            // Broke the streak
            streak = 0;
        }
    }

    function saveState() {
        localStorage.setItem('study-duo-goals', JSON.stringify(goals));
        localStorage.setItem('study-duo-streak', streak);
        localStorage.setItem('study-duo-study-hours', studyHours);
        localStorage.setItem('study-duo-last-active-date', lastActiveDate);
        updateDashboardUI();
    }

    function updateDashboardUI() {
        if (streakCountEl) streakCountEl.innerText = streak;
        if (studyHoursEl) studyHoursEl.innerText = studyHours.toFixed(1);

        // Clear list wrappers
        if (dailyGoalsList) dailyGoalsList.innerHTML = '';
        if (weeklyGoalsList) weeklyGoalsList.innerHTML = '';

        let completed = 0;
        let total = goals.length;

        goals.forEach(goal => {
            if (goal.checked) completed++;

            const itemEl = document.createElement('div');
            itemEl.className = `goal-item ${goal.checked ? 'completed' : ''}`;
            itemEl.innerHTML = `
        <div class="goal-item-left">
          <div class="goal-checkbox ${goal.checked ? 'checked' : ''} ${goal.period === 'weekly' ? 'goal-checkbox-pink' : ''}" data-id="${goal.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span class="goal-text">${escapeHtml(goal.text)}</span>
        </div>
        <button class="goal-delete-btn" data-id="${goal.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      `;

            if (goal.period === 'daily') {
                if (dailyGoalsList) dailyGoalsList.appendChild(itemEl);
            } else {
                if (weeklyGoalsList) weeklyGoalsList.appendChild(itemEl);
            }
        });

        // Percentages calc
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        if (compGoalsCount) compGoalsCount.innerText = completed;
        if (remGoalsCount) remGoalsCount.innerText = total - completed;
        if (progressPercentEl) progressPercentEl.innerText = percentage + '%';
        if (editProgressBar) {
            editProgressBar.style.width = percentage + '%';
        }

        // Register actions
        document.querySelectorAll('.goal-checkbox').forEach(box => {
            box.addEventListener('click', (e) => {
                const id = parseInt(box.getAttribute('data-id'));
                toggleGoal(id);
            });
        });

        document.querySelectorAll('.goal-delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(btn.getAttribute('data-id'));
                deleteGoal(id);
            });
        });

        // Update achievements
        updateAchievements(completed, total);

        // Update charts if present
        updateMetricsChart(completed, total - completed);
    }

    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }

    function addGoal(text, period) {
        if (!text.trim()) return;
        const newGoal = {
            id: Date.now(),
            text: text,
            period: period,
            checked: false
        };
        goals.push(newGoal);
        saveState();
    }

    function toggleGoal(id) {
        const goal = goals.find(g => g.id === id);
        if (goal) {
            const wasChecked = goal.checked;
            goal.checked = !goal.checked;

            // Update streak checks
            if (goal.checked && !wasChecked) {
                const todayStr = new Date().toDateString();
                if (lastActiveDate !== todayStr) {
                    if (lastActiveDate === new Date(Date.now() - 86400000).toDateString() || lastActiveDate === '') {
                        streak++;
                    } else {
                        streak = 1;
                    }
                    lastActiveDate = todayStr;
                }
            }

            saveState();

            // If completed all tasks, throw confetti
            const allCompleted = goals.length > 0 && goals.every(g => g.checked);
            if (allCompleted) {
                triggerConfettiEffect();
            }
        }
    }

    function deleteGoal(id) {
        goals = goals.filter(g => g.id !== id);
        saveState();
    }

    /* --- Actions handlers --- */
    if (addGoalBtn && goalInput) {
        addGoalBtn.addEventListener('click', () => {
            const activeTabEl = document.querySelector('.goal-tab.active');
            const period = activeTabEl ? activeTabEl.getAttribute('data-type') : 'daily';
            addGoal(goalInput.value, period);
            goalInput.value = '';
        });

        goalInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const activeTabEl = document.querySelector('.goal-tab.active');
                const period = activeTabEl ? activeTabEl.getAttribute('data-type') : 'daily';
                addGoal(goalInput.value, period);
                goalInput.value = '';
            }
        });
    }

    // Custom switch tabs between daily and weekly in tracker form
    const goalTypeTabs = document.querySelectorAll('.goal-tab');
    goalTypeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            goalTypeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    /* --- Achievements Handler --- */
    function updateAchievements(completed, total) {
        const badge1 = document.getElementById('badge-first');
        const badge2 = document.getElementById('badge-streak');
        const badge3 = document.getElementById('badge-pomo');
        const badge4 = document.getElementById('badge-all');

        if (completed > 0) {
            if (badge1) badge1.classList.add('unlocked');
        } else {
            if (badge1) badge1.classList.remove('unlocked');
        }

        if (streak >= 3) {
            if (badge2) badge2.classList.add('unlocked');
        } else {
            if (badge2) badge2.classList.remove('unlocked');
        }

        if (studyHours >= 15) {
            if (badge3) badge3.classList.add('unlocked');
        } else {
            if (badge3) badge3.classList.remove('unlocked');
        }

        if (total > 0 && completed === total) {
            if (badge4) badge4.classList.add('unlocked');
        } else {
            if (badge4) badge4.classList.remove('unlocked');
        }
    }

    /* --- Pomodoro Logic --- */
    let pomoMinutes = 25;
    let pomoSeconds = 0;
    let timerId = null;
    let totalDurationSeconds = 25 * 60;

    if (pomoRing) {
        const radius = pomoRing.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        pomoRing.style.strokeDasharray = `${circumference} ${circumference}`;
        pomoRing.style.strokeDashoffset = circumference;
    }

    function updatePomoTimerDisplay() {
        const progressText = `${String(pomoMinutes).padStart(2, '0')}:${String(pomoSeconds).padStart(2, '0')}`;
        if (pomoTimerDisplay) {
            pomoTimerDisplay.innerText = progressText;
        }

        if (pomoRing) {
            const radius = pomoRing.r.baseVal.value;
            const circumference = radius * 2 * Math.PI;
            const currentSeconds = pomoMinutes * 60 + pomoSeconds;
            const offset = circumference - (currentSeconds / totalDurationSeconds) * circumference;
            pomoRing.style.strokeDashoffset = offset;
        }
    }

    function startPomoTimer() {
        if (timerId !== null) {
            // Pause action
            clearInterval(timerId);
            timerId = null;
            btnPomoStart.innerText = 'Resume';
            btnPomoStart.classList.remove('btn-ctrl-primary');
            return;
        }

        btnPomoStart.innerText = 'Pause';
        btnPomoStart.classList.add('btn-ctrl-primary');

        timerId = setInterval(() => {
            if (pomoSeconds === 0) {
                if (pomoMinutes === 0) {
                    // Timer finished!
                    clearInterval(timerId);
                    timerId = null;
                    playSynthesizedBeep();
                    btnPomoStart.innerText = 'Start Work';
                    btnPomoStart.classList.add('btn-ctrl-primary');

                    // Log active hours
                    const elapsedHours = totalDurationSeconds / 3600;
                    studyHours += elapsedHours;
                    saveState();

                    triggerConfettiEffect();
                    resetPomoTimer();
                    return;
                } else {
                    pomoMinutes--;
                    pomoSeconds = 59;
                }
            } else {
                pomoSeconds--;
            }
            updatePomoTimerDisplay();
        }, 1000);
    }

    function resetPomoTimer() {
        if (timerId !== null) {
            clearInterval(timerId);
            timerId = null;
        }

        const activeTab = document.querySelector('.pomo-tab.active');
        const duration = activeTab ? parseInt(activeTab.getAttribute('data-duration')) : 25;

        pomoMinutes = duration;
        pomoSeconds = 0;
        totalDurationSeconds = duration * 60;

        btnPomoStart.innerText = 'Start';
        btnPomoStart.classList.remove('btn-ctrl-primary');
        updatePomoTimerDisplay();
    }

    if (btnPomoStart) {
        btnPomoStart.addEventListener('click', startPomoTimer);
    }

    if (btnPomoReset) {
        btnPomoReset.addEventListener('click', resetPomoTimer);
    }

    pomoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            pomoTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            resetPomoTimer();
        });
    });

    /* --- Chart.js dynamic wiring --- */
    let chartInstance = null;
    function updateMetricsChart(completed, remaining) {
        const chartCtxEl = document.getElementById('effort-chart');
        if (!chartCtxEl) return;

        if (typeof Chart === 'undefined') {
            // Attempt loading chart.js dynamically if not already in document
            return;
        }

        const colors = {
            blue: '#5C6CFF',
            pink: '#FF5FA2',
            dark: '#1e293b'
        };

        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

        if (chartInstance) {
            chartInstance.data.datasets[0].data = [completed, remaining];
            chartInstance.options.plugins.legend.labels.color = isDark ? '#ffffff' : '#000000';
            chartInstance.update();
        } else {
            chartInstance = new Chart(chartCtxEl, {
                type: 'doughnut',
                data: {
                    labels: ['Completed Tasks', 'Remaining Tasks'],
                    datasets: [{
                        data: [completed, remaining],
                        backgroundColor: [colors.blue, isDark ? '#1e293b' : '#cbd5e1'],
                        borderColor: isDark ? '#0f172a' : '#ffffff',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: isDark ? '#C6D0E1' : '#475569',
                                font: {
                                    family: 'Inter',
                                    size: 11
                                }
                            }
                        }
                    },
                    cutout: '75%'
                }
            });
        }
    }

    // Load state and trigger redraw
    resetPomoTimer();
    updateDashboardUI();

    // Re-draw chart on theme toggle changes
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            setTimeout(() => {
                let completed = goals.filter(g => g.checked).length;
                let remaining = goals.length - completed;
                updateMetricsChart(completed, remaining);
            }, 50);
        });
    }
}

/* ==========================================
   CONFETTI UTILITY BUNDLER
   ========================================== */
function triggerConfettiEffect() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#5C6CFF', '#FF5FA2', '#FFFFFF']
        });
    } else {
        // Dynamic import if not available globally
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
        script.onload = () => {
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 120,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#5C6CFF', '#FF5FA2', '#FFFFFF']
                });
            }
        };
        document.head.appendChild(script);
    }
}
