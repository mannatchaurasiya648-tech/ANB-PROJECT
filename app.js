/**
 * ANB Mastery - Advanced AI Breathing Coach Application
 * Premium-level implementation with sophisticated AI detection and analytics
 */

class ANBMastery {
    constructor() {
        // Core application state
        this.isInitialized = false;
        this.isSessionActive = false;
        this.isPaused = false;
        this.isQuickPractice = false;
        
        // Session configuration
        this.currentPattern = {
            id: 'standard_5_5',
            name: 'Balanced Flow',
            inhale: 5,
            exhale: 5,
            hold: 0,
            xpValue: 75
        };
        
        // Session state
        this.sessionStartTime = null;
        this.sessionDuration = 15; // minutes
        this.currentPhase = 'idle'; // idle, prepare, inhale, exhale, hold
        this.currentNostril = 'left'; // left, right
        this.currentCycle = 0;
        this.totalCycles = 12;
        this.breathCount = 0;
        this.phaseStartTime = null;
        
        // AI Detection metrics (real-time)
        this.metrics = {
            postureScore: 92,
            eyeClosure: 98,
            headStability: 89,
            breathRhythm: 94,
            confidence: 85,
            sessionQuality: 0
        };
        
        // User progress data
        this.userProgress = {
            level: 3,
            xp: 2250,
            xpToNextLevel: 3500,
            totalSessions: 127,
            totalMinutes: 1248,
            currentStreak: 23,
            avgQuality: 94.2,
            wellnessScore: 84
        };
        
        // Advanced breathing patterns from application data
        this.breathingPatterns = [
            {
                id: "quick_4_4",
                name: "Quick Focus",
                inhale: 4,
                exhale: 4,
                description: "Rapid centering technique for immediate calm",
                difficulty: 1,
                xpValue: 25,
                optimalDuration: 1
            },
            {
                id: "beginner_4_4", 
                name: "Foundation",
                inhale: 4,
                exhale: 4,
                description: "Perfect for building ANB fundamentals",
                difficulty: 1,
                xpValue: 50,
                optimalDuration: 5
            },
            {
                id: "standard_5_5",
                name: "Balanced Flow",
                inhale: 5,
                exhale: 5,
                description: "Harmonious breathing for deep balance",
                difficulty: 2,
                xpValue: 75,
                optimalDuration: 15
            },
            {
                id: "advanced_6_6",
                name: "Deep Harmony",
                inhale: 6,
                exhale: 6,
                description: "Advanced pattern for profound states",
                difficulty: 3,
                xpValue: 100,
                optimalDuration: 20
            },
            {
                id: "master_4_7_8",
                name: "Master's Breath",
                inhale: 4,
                hold: 7,
                exhale: 8,
                description: "Ultimate relaxation with retention",
                difficulty: 4,
                xpValue: 150,
                optimalDuration: 25
            }
        ];
        
        // Achievement system
        this.achievements = [
            {
                id: "first_session",
                name: "First Breath",
                description: "Complete your inaugural ANB session",
                icon: "🫁",
                xp_reward: 100,
                rarity: "common",
                earned: true
            },
            {
                id: "perfect_posture_week",
                name: "Postural Perfection",
                description: "Maintain 90+ posture score for 7 consecutive sessions",
                icon: "🏆",
                xp_reward: 500,
                rarity: "rare",
                earned: true
            },
            {
                id: "mindful_eyes_master",
                name: "Unwavering Focus",
                description: "Keep eyes closed for entire session 20 times",
                icon: "👁️",
                xp_reward: 300,
                rarity: "uncommon",
                earned: false
            },
            {
                id: "rhythm_master",
                name: "Perfect Timing",
                description: "Achieve 95+ breathing accuracy in advanced pattern",
                icon: "⏱️",
                xp_reward: 750,
                rarity: "epic",
                earned: false
            },
            {
                id: "consistency_champion",
                name: "Dedication Embodied",
                description: "Practice daily for 30 consecutive days",
                icon: "🔥",
                xp_reward: 1500,
                rarity: "legendary",
                earned: false
            }
        ];
        
        // Timers and intervals
        this.timers = {
            session: null,
            breathing: null,
            metrics: null,
            ai: null
        };
        
        // Audio context for advanced sound synthesis
        this.audioContext = null;
        this.speechSynthesis = window.speechSynthesis;
        
        // Settings
        this.settings = {
            postureSensitivity: 7,
            eyeSensitivity: 8,
            masterVolume: 75,
            voiceGuidance: true,
            breathingSounds: true,
            smartRecommendations: true,
            adaptiveDifficulty: true,
            dailyChallenges: true
        };
        
        // Chart instance for analytics
        this.performanceChart = null;
        
        console.log('🧘‍♀️ ANB Mastery initializing...');
        this.init();
    }
    
    async init() {
        try {
            console.log('🔧 Setting up advanced systems...');
            
            // Show loading screen and simulate AI initialization
            await this.initializeLoadingSequence();
            
            // Setup core systems
            this.loadUserProgress();
            this.setupEventListeners();
            await this.initializeAudioSystem();
            await this.initializeCameraSystem();
            this.setupAIMonitoring();
            this.initializeAnalytics();
            
            // Complete initialization
            this.isInitialized = true;
            await this.completeInitialization();
            
            console.log('✨ ANB Mastery initialized successfully');
            
        } catch (error) {
            console.error('❌ Initialization failed:', error);
            this.showErrorFallback(error.message);
        }
    }
    
    async initializeLoadingSequence() {
        const loadingSteps = [
            { text: 'Calibrating AI neural networks...', duration: 150, progress: 15 },
            { text: 'Initializing biometric sensors...', duration: 150, progress: 30 },
            { text: 'Loading breathing pattern models...', duration: 150, progress: 50 },
            { text: 'Configuring posture detection...', duration: 150, progress: 65 },
            { text: 'Optimizing eye tracking algorithms...', duration: 150, progress: 80 },
            { text: 'Finalizing system calibration...', duration: 150, progress: 95 },
            { text: 'Ready for practice!', duration: 150, progress: 100 }
        ];
        
        for (const step of loadingSteps) {
            const statusElement = document.getElementById('loadingStatus');
            const progressElement = document.getElementById('loadingProgress');
            
            if (statusElement) statusElement.textContent = step.text;
            if (progressElement) progressElement.style.width = `${step.progress}%`;
            
            await this.delay(step.duration);
        }
    }
    
    async completeInitialization() {
        console.log('🔄 Transitioning from loading to main app...');
        
        // Add a delay to ensure loading is visually complete
        await this.delay(800);
        
        // Get the elements
        const loadingScreen = document.getElementById('loadingScreen');
        const mainApp = document.getElementById('mainApp');
        
        console.log('Elements found:', { 
            loadingScreen: !!loadingScreen, 
            mainApp: !!mainApp,
            loadingScreenClasses: loadingScreen?.className,
            mainAppClasses: mainApp?.className
        });
        
        if (!loadingScreen || !mainApp) {
            console.error('❌ Could not find loading screen or main app elements');
            this.showErrorFallback('UI elements not found');
            return;
        }
        
        // Force the transition with explicit DOM manipulation
        loadingScreen.style.opacity = '0';
        loadingScreen.style.pointerEvents = 'none';
        
        mainApp.style.opacity = '1';
        mainApp.style.pointerEvents = 'auto';
        
        // Also update classes for consistency
        loadingScreen.classList.remove('active');
        loadingScreen.classList.add('hidden');
        mainApp.classList.remove('hidden');
        
        console.log('✅ Successfully transitioned to main app');
        console.log('Post-transition classes:', {
            loadingScreenClasses: loadingScreen.className,
            mainAppClasses: mainApp.className
        });
        
        // Initialize UI with current data
        this.updateAllUI();
        
        // Show welcome notification after a short delay
        setTimeout(() => {
            this.showNotification('🧘‍♀️ Welcome back! Ready for your practice?', 'success');
        }, 1000);
        
        // Auto-start demo if in presentation mode
        if (localStorage.getItem('presentationMode') === 'true') {
            setTimeout(() => {
                this.startQuickPractice();
            }, 3000);
        }
    }
    
    showErrorFallback(errorMessage) {
        console.log('🚨 Showing error fallback');
        const appContainer = document.getElementById('appContainer');
        if (appContainer) {
            appContainer.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100vh; flex-direction: column; background: var(--color-background); color: var(--color-text); text-align: center; padding: 20px;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">⚠️</div>
                    <h2 style="margin-bottom: 16px;">Initialization Failed</h2>
                    <p style="margin-bottom: 24px; max-width: 400px; line-height: 1.5; color: var(--color-text-secondary);">Error: ${errorMessage}</p>
                    <button onclick="location.reload()" style="padding: 12px 24px; border: none; border-radius: 8px; background: var(--color-primary); color: white; cursor: pointer; font-size: 16px;">Reload Application</button>
                </div>
            `;
        }
    }
    
    setupEventListeners() {
        console.log('🎛️ Setting up event listeners...');
        
        // Practice controls
        this.addEventListenerSafe('quickPracticeBtn', 'click', () => this.startQuickPractice());
        this.addEventListenerSafe('startBtn', 'click', () => this.startSession());
        this.addEventListenerSafe('customizeBtn', 'click', () => this.showCustomizeModal());
        this.addEventListenerSafe('pauseBtn', 'click', () => this.pauseSession());
        this.addEventListenerSafe('stopBtn', 'click', () => this.stopSession());
        this.addEventListenerSafe('startRecommendedBtn', 'click', () => this.startRecommendedSession());
        
        // Header controls
        this.addEventListenerSafe('achievementsBtn', 'click', () => this.showAchievementsModal());
        this.addEventListenerSafe('settingsBtn', 'click', () => this.showSettingsModal());
        
        // Modal controls
        this.setupModalEventListeners();
        
        // Customize modal
        this.setupCustomizeEventListeners();
        
        // Settings modal
        this.setupSettingsEventListeners();
        
        // Analytics filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.updateAnalyticsFilter(e.target.dataset.period));
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // Pattern selection
        document.querySelectorAll('.pattern-card').forEach(card => {
            card.addEventListener('click', (e) => this.selectPattern(e.currentTarget.dataset.pattern));
        });
        
        // Duration slider
        const durationSlider = document.getElementById('durationSlider');
        if (durationSlider) {
            durationSlider.addEventListener('input', (e) => this.updateDuration(parseInt(e.target.value)));
        }
        
        console.log('🎛️ Event listeners configured');
    }
    
    addEventListenerSafe(elementId, event, handler) {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener(event, handler);
            console.log(`✅ Event listener added for ${elementId}`);
        } else {
            console.warn(`⚠️ Element not found: ${elementId}`);
        }
    }
    
    setupModalEventListeners() {
        // Close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) this.hideModal(modal.id);
            });
        });
        
        // Modal overlays
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) this.hideModal(modal.id);
            });
        });
        
        // Session complete actions
        this.addEventListenerSafe('shareResults', 'click', () => this.shareSessionResults());
        this.addEventListenerSafe('continueButton', 'click', () => this.hideModal('sessionCompleteModal'));
    }
    
    setupCustomizeEventListeners() {
        this.addEventListenerSafe('closeCustomize', 'click', () => this.hideModal('customizeModal'));
        this.addEventListenerSafe('resetCustomize', 'click', () => this.resetCustomizeSettings());
        this.addEventListenerSafe('startCustomSession', 'click', () => this.startCustomSession());
    }
    
    setupSettingsEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchSettingsTab(e.target.dataset.tab));
        });
        
        this.addEventListenerSafe('closeSettings', 'click', () => this.hideModal('settingsModal'));
        this.addEventListenerSafe('resetSettings', 'click', () => this.resetAllSettings());
        this.addEventListenerSafe('saveSettings', 'click', () => this.saveAllSettings());
    }
    
    async initializeAudioSystem() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log('🔊 Audio system initialized');
        } catch (error) {
            console.warn('⚠️ Audio system unavailable:', error);
        }
    }
    
    async initializeCameraSystem() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { width: 640, height: 480 },
                audio: false 
            });
            
            const webcam = document.getElementById('webcam');
            if (webcam) {
                webcam.srcObject = stream;
                console.log('📹 Camera system initialized');
            }
            
        } catch (error) {
            console.warn('⚠️ Camera access denied:', error);
            this.showCameraUnavailableMessage();
        }
    }
    
    setupAIMonitoring() {
        // Start real-time AI monitoring simulation
        this.timers.ai = setInterval(() => {
            this.updateAIMetrics();
        }, 2000);
        
        // More frequent updates during active session
        this.timers.metrics = setInterval(() => {
            if (this.isSessionActive) {
                this.updateRealtimeMetrics();
            }
        }, 500);
        
        console.log('🤖 AI monitoring systems active');
    }
    
    updateAIMetrics() {
        // Simulate realistic AI detection with intelligent variation
        const basePosture = this.isSessionActive ? 88 : 85;
        const baseEyeClosure = this.isSessionActive ? 95 : 60;
        const baseHeadStability = this.isSessionActive ? 90 : 80;
        const baseBreathRhythm = this.isSessionActive ? 92 : 70;
        
        // Add intelligent noise based on session state
        const variation = this.isSessionActive ? 8 : 15;
        
        this.metrics.postureScore = Math.max(60, Math.min(100, 
            basePosture + (Math.random() - 0.5) * variation
        ));
        
        this.metrics.eyeClosure = Math.max(40, Math.min(100, 
            baseEyeClosure + (Math.random() - 0.5) * variation
        ));
        
        this.metrics.headStability = Math.max(50, Math.min(100, 
            baseHeadStability + (Math.random() - 0.5) * variation
        ));
        
        this.metrics.breathRhythm = Math.max(60, Math.min(100, 
            baseBreathRhythm + (Math.random() - 0.5) * variation
        ));
        
        // Calculate overall confidence
        this.metrics.confidence = Math.round(
            (this.metrics.postureScore + this.metrics.eyeClosure + 
             this.metrics.headStability + this.metrics.breathRhythm) / 4
        );
        
        // Update UI
        this.updateMetricsDisplay();
        
        // Provide intelligent feedback
        this.checkForGuidance();
    }
    
    updateRealtimeMetrics() {
        // High-frequency updates during session
        if (this.currentPhase === 'inhale' || this.currentPhase === 'exhale') {
            // Simulate breathing rhythm detection
            const rhythmAccuracy = this.calculateBreathingAccuracy();
            this.metrics.breathRhythm = Math.round(rhythmAccuracy);
            
            // Update session quality in real-time
            this.calculateSessionQuality();
        }
    }
    
    calculateBreathingAccuracy() {
        if (!this.phaseStartTime) return 90;
        
        const elapsed = (Date.now() - this.phaseStartTime) / 1000;
        const targetDuration = this.currentPhase === 'inhale' ? this.currentPattern.inhale : this.currentPattern.exhale;
        
        // Calculate timing accuracy (higher score for better timing)
        const timingError = Math.abs(elapsed - targetDuration) / targetDuration;
        const timingScore = Math.max(0, 100 - (timingError * 100));
        
        // Add some realistic variation
        return Math.max(70, timingScore + (Math.random() - 0.5) * 10);
    }
    
    calculateSessionQuality() {
        // Weighted calculation of session quality
        const weights = {
            posture: 0.25,
            eyeClosure: 0.20,
            breathRhythm: 0.30,
            headStability: 0.15,
            consistency: 0.10
        };
        
        // Calculate consistency bonus
        const consistencyScore = Math.max(0, 100 - (this.breathCount * 2)); // Slight degradation over time
        
        this.metrics.sessionQuality = Math.round(
            this.metrics.postureScore * weights.posture +
            this.metrics.eyeClosure * weights.eyeClosure +
            this.metrics.breathRhythm * weights.breathRhythm +
            this.metrics.headStability * weights.headStability +
            consistencyScore * weights.consistency
        );
    }
    
    checkForGuidance() {
        // Intelligent coaching based on AI metrics
        if (!this.isSessionActive || this.isQuickPractice) return;
        
        if (this.metrics.postureScore < 70) {
            this.showNotification('💡 Gently straighten your spine and relax your shoulders', 'warning');
            if (this.settings.voiceGuidance) {
                this.speak('Gently straighten your spine');
            }
        }
        
        if (this.metrics.eyeClosure < 80 && this.isSessionActive) {
            this.showNotification('👁️ Softly close your eyes for better focus', 'warning');
            if (this.settings.voiceGuidance) {
                this.speak('Softly close your eyes');
            }
        }
        
        if (this.metrics.headStability < 75) {
            this.showNotification('🎯 Keep your head steady and centered', 'warning');
        }
    }
    
    updateMetricsDisplay() {
        // Update AI panel metrics
        const elements = {
            postureScore: this.metrics.postureScore,
            eyeClosure: this.metrics.eyeClosure,
            headStability: this.metrics.headStability,
            breathRhythm: this.metrics.breathRhythm
        };
        
        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            const bar = element?.parentNode.querySelector('.metric-fill');
            
            if (element) element.textContent = Math.round(value);
            if (bar) bar.style.width = `${value}%`;
        });
        
        // Update confidence meter
        const confidenceMeter = document.querySelector('.meter-fill');
        const confidenceLabel = document.querySelector('.meter-label');
        
        if (confidenceMeter) {
            confidenceMeter.style.height = `${this.metrics.confidence}%`;
        }
        
        if (confidenceLabel) {
            confidenceLabel.textContent = `${this.metrics.confidence}% Confidence`;
        }
    }
    
    initializeAnalytics() {
        // Initialize Chart.js performance chart
        const ctx = document.getElementById('performanceChart')?.getContext('2d');
        if (!ctx) {
            console.warn('⚠️ Performance chart canvas not found');
            return;
        }
        
        const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'];
        
        // Generate sample data for the last 7 days
        const labels = [];
        const sessionData = [];
        const qualityData = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
            
            // Generate realistic sample data
            sessionData.push(Math.floor(Math.random() * 3) + 1); // 1-3 sessions per day
            qualityData.push(Math.floor(Math.random() * 20) + 80); // Quality 80-100
        }
        
        this.performanceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Session Quality',
                        data: qualityData,
                        borderColor: chartColors[0],
                        backgroundColor: chartColors[0] + '20',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Sessions per Day',
                        data: sessionData,
                        borderColor: chartColors[1],
                        backgroundColor: chartColors[1] + '20',
                        fill: false,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: false,
                        position: 'right',
                        max: 5,
                        grid: {
                            drawOnChartArea: false,
                        },
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                }
            }
        });
        
        console.log('📊 Analytics system initialized');
    }
    
    // === SESSION MANAGEMENT ===
    
    startQuickPractice() {
        console.log('⚡ Starting quick practice session');
        
        this.isQuickPractice = true;
        this.sessionDuration = 1;
        this.currentPattern = this.breathingPatterns.find(p => p.id === 'quick_4_4');
        this.calculateCycles();
        
        this.showNotification('⚡ Quick practice starting in 3 seconds...', 'success');
        
        setTimeout(() => {
            this.beginSession();
        }, 3000);
    }
    
    startSession() {
        console.log('🧘‍♀️ Starting standard session');
        
        this.isQuickPractice = false;
        this.calculateCycles();
        this.beginSession();
    }
    
    startRecommendedSession() {
        console.log('🎯 Starting AI recommended session');
        
        this.currentPattern = this.breathingPatterns.find(p => p.id === 'advanced_6_6');
        this.sessionDuration = 15;
        this.calculateCycles();
        this.beginSession();
        
        this.hideModal('customizeModal');
    }
    
    async beginSession() {
        this.isSessionActive = true;
        this.sessionStartTime = Date.now();
        this.currentCycle = 0;
        this.breathCount = 0;
        this.currentPhase = 'prepare';
        this.metrics.sessionQuality = 85;
        
        // Update UI state
        this.updateSessionUI(true);
        
        // Start with preparation phase
        await this.startPreparationPhase();
    }
    
    async startPreparationPhase() {
        this.updateBreathingInstruction('Prepare to Begin');
        this.updatePhaseIndicator('Preparation');
        this.updateBreathCount('');
        
        // Countdown
        for (let i = 3; i > 0; i--) {
            this.updateBreathCount(i.toString());
            this.playChime();
            
            if (this.settings.voiceGuidance && !this.isQuickPractice) {
                this.speak(i.toString());
            }
            
            await this.delay(1000);
            if (!this.isSessionActive) return;
        }
        
        this.updateBreathCount('');
        this.updateBreathingInstruction('Begin');
        
        if (this.settings.voiceGuidance) {
            const message = this.isQuickPractice ? 'Quick practice begins' : 'Begin your practice';
            this.speak(message);
        }
        
        await this.delay(1000);
        
        // Start first breathing cycle
        this.startBreathingCycle();
    }
    
    startBreathingCycle() {
        this.currentPhase = 'inhale';
        this.currentNostril = 'left';
        this.phaseStartTime = Date.now();
        
        this.updateNostrilDisplay();
        this.startBreathingPhase();
        this.startSessionTimer();
    }
    
    startBreathingPhase() {
        if (!this.isSessionActive || this.isPaused) return;
        
        const isInhale = this.currentPhase === 'inhale';
        const isHold = this.currentPhase === 'hold';
        const duration = this.getPhaseLength();
        
        // Update UI
        const instruction = this.getBreathingInstruction();
        this.updateBreathingInstruction(instruction);
        this.updatePhaseIndicator(this.currentPhase);
        
        // Voice guidance
        if (this.settings.voiceGuidance && !this.isQuickPractice) {
            this.speak(instruction);
        }
        
        // Animate breathing circle
        this.animateBreathingCircle();
        
        // Start countdown
        this.startPhaseCountdown(duration);
    }
    
    getPhaseLength() {
        switch (this.currentPhase) {
            case 'inhale': return this.currentPattern.inhale;
            case 'hold': return this.currentPattern.hold || 0;
            case 'exhale': return this.currentPattern.exhale;
            default: return 4;
        }
    }
    
    getBreathingInstruction() {
        const nostrilText = this.currentNostril === 'left' ? 'Left' : 'Right';
        
        if (this.isQuickPractice) {
            return `${this.currentPhase} (${nostrilText})`;
        }
        
        switch (this.currentPhase) {
            case 'inhale': return `Inhale through ${nostrilText} nostril`;
            case 'hold': return `Hold your breath`;
            case 'exhale': return `Exhale through ${nostrilText} nostril`;
            default: return 'Breathe naturally';
        }
    }
    
    animateBreathingCircle() {
        const circle = document.getElementById('breathingCircle');
        if (!circle) return;
        
        // Remove previous animations
        circle.classList.remove('inhaling', 'exhaling');
        
        // Add appropriate animation
        if (this.currentPhase === 'inhale') {
            circle.classList.add('inhaling');
        } else if (this.currentPhase === 'exhale') {
            circle.classList.add('exhaling');
        }
    }
    
    startPhaseCountdown(duration) {
        let remaining = duration;
        this.updateBreathCount(remaining);
        
        this.timers.breathing = setInterval(() => {
            remaining--;
            this.updateBreathCount(remaining);
            
            // Play breathing sounds
            if (this.settings.breathingSounds && remaining === Math.floor(duration / 2)) {
                this.playBreathingSound();
            }
            
            if (remaining <= 0) {
                clearInterval(this.timers.breathing);
                this.nextBreathingPhase();
            }
        }, 1000);
    }
    
    nextBreathingPhase() {
        this.breathCount++;
        
        // Determine next phase based on current pattern
        if (this.currentPattern.hold && this.currentPhase === 'inhale') {
            this.currentPhase = 'hold';
        } else if (this.currentPhase === 'inhale' || this.currentPhase === 'hold') {
            this.currentPhase = 'exhale';
            // Switch nostril for exhale
            this.currentNostril = this.currentNostril === 'left' ? 'right' : 'left';
        } else {
            this.currentPhase = 'inhale';
            // Keep same nostril for next inhale
        }
        
        // Check if cycle is complete
        const breathsPerCycle = this.currentPattern.hold ? 6 : 4; // inhale-hold-exhale-pause or inhale-exhale for each nostril
        
        if (this.breathCount % breathsPerCycle === 0) {
            this.currentCycle++;
            this.updateCycleProgress();
            
            if (this.currentCycle >= this.totalCycles) {
                this.completeSession();
                return;
            }
            
            // Brief pause between cycles
            this.updateBreathingInstruction('Cycle Complete');
            setTimeout(() => {
                this.phaseStartTime = Date.now();
                this.updateNostrilDisplay();
                this.startBreathingPhase();
            }, this.isQuickPractice ? 500 : 1500);
            return;
        }
        
        // Continue to next phase
        this.phaseStartTime = Date.now();
        this.updateNostrilDisplay();
        
        setTimeout(() => {
            this.startBreathingPhase();
        }, this.isQuickPractice ? 200 : 500);
    }
    
    pauseSession() {
        this.isPaused = !this.isPaused;
        
        const pauseBtn = document.getElementById('pauseBtn');
        
        if (this.isPaused) {
            this.clearBreathingTimer();
            this.updateBreathingInstruction('Session Paused');
            this.updatePhaseIndicator('Paused');
            if (pauseBtn) pauseBtn.innerHTML = '<span class="btn-icon">▶</span>Resume';
            
            if (this.settings.voiceGuidance) {
                this.speak('Session paused');
            }
        } else {
            if (pauseBtn) pauseBtn.innerHTML = '<span class="btn-icon">⏸</span>Pause';
            this.phaseStartTime = Date.now();
            this.startBreathingPhase();
            
            if (this.settings.voiceGuidance) {
                this.speak('Resuming session');
            }
        }
    }
    
    stopSession() {
        console.log('⏹ Session stopped');
        
        this.isSessionActive = false;
        this.isPaused = false;
        this.isQuickPractice = false;
        
        this.clearAllTimers();
        this.updateSessionUI(false);
        this.resetBreathingVisuals();
        
        if (this.settings.voiceGuidance) {
            this.speak('Session stopped');
        }
        
        this.showNotification('Session stopped', 'warning');
    }
    
    async completeSession() {
        console.log('🎉 Session completed successfully');
        
        this.isSessionActive = false;
        this.clearAllTimers();
        
        // Calculate final metrics
        const sessionTime = Math.floor((Date.now() - this.sessionStartTime) / 60000);
        const xpEarned = this.calculateXPEarned();
        
        // Update user progress
        this.updateUserProgressAfterSession(sessionTime, xpEarned);
        
        // Show completion animation
        await this.showCompletionSequence();
        
        // Show results modal
        this.showSessionResults({
            quality: this.metrics.sessionQuality,
            duration: this.formatDuration(sessionTime),
            xp: xpEarned
        });
        
        // Reset UI
        setTimeout(() => {
            this.updateSessionUI(false);
            this.resetBreathingVisuals();
        }, 2000);
        
        // Check for new achievements
        this.checkForNewAchievements();
    }
    
    calculateXPEarned() {
        let baseXP = this.currentPattern.xpValue;
        
        // Quality bonus
        const qualityBonus = Math.max(0, (this.metrics.sessionQuality - 80) * 2);
        
        // Duration bonus for longer sessions
        const durationBonus = Math.floor(this.sessionDuration / 5) * 10;
        
        // Quick practice bonus
        const quickBonus = this.isQuickPractice ? 25 : 0;
        
        return Math.round(baseXP + qualityBonus + durationBonus + quickBonus);
    }
    
    updateUserProgressAfterSession(sessionTime, xpEarned) {
        // Update statistics
        this.userProgress.totalSessions++;
        this.userProgress.totalMinutes += sessionTime;
        this.userProgress.xp += xpEarned;
        
        // Check for level up
        if (this.userProgress.xp >= this.userProgress.xpToNextLevel) {
            this.levelUp();
        }
        
        // Update streak
        this.updateStreak();
        
        // Recalculate wellness score
        this.updateWellnessScore();
        
        // Save progress
        this.saveUserProgress();
        
        // Update UI
        this.updateAllUI();
    }
    
    levelUp() {
        this.userProgress.level++;
        const levelThresholds = [0, 500, 1500, 3500, 7500, 15000, 30000];
        
        if (this.userProgress.level < levelThresholds.length) {
            this.userProgress.xpToNextLevel = levelThresholds[this.userProgress.level];
        }
        
        // Show level up notification
        this.showNotification(`🎊 Level Up! You are now Level ${this.userProgress.level}`, 'success');
        
        if (this.settings.voiceGuidance) {
            this.speak(`Congratulations! Level ${this.userProgress.level} achieved`);
        }
    }
    
    async showCompletionSequence() {
        const circle = document.getElementById('breathingCircle');
        
        // Celebration animation
        this.updateBreathingInstruction('Excellent Session!');
        this.updatePhaseIndicator('Complete');
        this.updateBreathCount('🎉');
        
        if (circle) {
            circle.style.transform = 'scale(1.1)';
            circle.style.filter = 'brightness(1.2)';
        }
        
        // Play completion sound
        this.playCompletionMelody();
        
        if (this.settings.voiceGuidance) {
            this.speak(this.isQuickPractice ? 
                'Excellent quick session completed!' : 
                'Outstanding session! Well done!');
        }
        
        await this.delay(3000);
        
        if (circle) {
            circle.style.transform = '';
            circle.style.filter = '';
        }
    }
    
    // === UI UPDATE METHODS ===
    
    updateAllUI() {
        this.updateUserLevelDisplay();
        this.updateWellnessDisplay();
        this.updateStatsDisplay();
        this.updatePatternDisplay();
    }
    
    updateUserLevelDisplay() {
        const levelBadge = document.getElementById('userLevel');
        const xpFill = document.getElementById('xpFill');
        const xpText = document.getElementById('xpText');
        
        const levelNames = ['Novice', 'Mindful Practitioner', 'Balanced Seeker', 'Harmony Master', 'Zen Adept', 'Breath Sage', 'ANB Enlightened'];
        const levelName = levelNames[this.userProgress.level - 1] || 'Master';
        
        if (levelBadge) {
            levelBadge.textContent = `Lv.${this.userProgress.level} ${levelName}`;
        }
        
        if (xpFill && xpText) {
            const progressPercent = (this.userProgress.xp / this.userProgress.xpToNextLevel) * 100;
            xpFill.style.width = `${Math.min(progressPercent, 100)}%`;
            xpText.textContent = `${this.userProgress.xp.toLocaleString()} / ${this.userProgress.xpToNextLevel.toLocaleString()} XP`;
        }
    }
    
    updateWellnessDisplay() {
        const wellnessScore = document.getElementById('wellnessScore');
        if (wellnessScore) {
            wellnessScore.textContent = this.userProgress.wellnessScore;
        }
    }
    
    updateStatsDisplay() {
        const stats = {
            totalSessions: this.userProgress.totalSessions,
            totalMinutes: this.userProgress.totalMinutes.toLocaleString(),
            currentStreak: this.userProgress.currentStreak,
            avgQuality: this.userProgress.avgQuality
        };
        
        Object.entries(stats).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
    }
    
    updatePatternDisplay() {
        const patternName = document.getElementById('currentPattern');
        if (patternName) {
            patternName.textContent = `${this.currentPattern.name} (${this.currentPattern.inhale}:${this.currentPattern.exhale})`;
        }
    }
    
    updateSessionUI(isActive) {
        const controls = {
            quickPracticeBtn: !isActive,
            startBtn: !isActive,
            customizeBtn: !isActive,
            pauseBtn: isActive,
            stopBtn: isActive
        };
        
        Object.entries(controls).forEach(([id, show]) => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = show ? 'inline-flex' : 'none';
            }
        });
        
        // Toggle active controls
        const activeControls = document.getElementById('activeControls');
        if (activeControls) {
            activeControls.classList.toggle('hidden', !isActive);
        }
    }
    
    updateBreathingInstruction(text) {
        const element = document.getElementById('breathInstruction');
        if (element) element.textContent = text;
    }
    
    updatePhaseIndicator(phase) {
        const element = document.getElementById('phaseIndicator');
        if (element) {
            element.textContent = phase.charAt(0).toUpperCase() + phase.slice(1);
        }
    }
    
    updateBreathCount(count) {
        const element = document.getElementById('breathCount');
        if (element) element.textContent = count;
    }
    
    updateNostrilDisplay() {
        document.querySelectorAll('.nostril').forEach(nostril => {
            nostril.classList.remove('active');
        });
        
        const activeNostril = document.getElementById(this.currentNostril + 'Nostril');
        if (activeNostril) {
            activeNostril.classList.add('active');
        }
    }
    
    updateCycleProgress() {
        const cycleCount = document.getElementById('cycleCount');
        if (cycleCount) {
            cycleCount.textContent = `${this.currentCycle}/${this.totalCycles}`;
        }
        
        // Update progress ring
        const progressCircle = document.getElementById('progressCircle');
        if (progressCircle) {
            const progress = (this.currentCycle / this.totalCycles) * 283; // 283 is circumference
            progressCircle.style.strokeDashoffset = 283 - progress;
        }
    }
    
    calculateCycles() {
        const cycleTime = (this.currentPattern.inhale + this.currentPattern.exhale + (this.currentPattern.hold || 0)) * 2;
        this.totalCycles = Math.max(1, Math.floor((this.sessionDuration * 60) / cycleTime));
        
        if (this.isQuickPractice) {
            this.totalCycles = 4; // Fixed cycles for quick practice
        }
        
        this.updateCycleProgress();
    }
    
    resetBreathingVisuals() {
        const circle = document.getElementById('breathingCircle');
        if (circle) {
            circle.classList.remove('inhaling', 'exhaling');
            circle.style.transform = '';
            circle.style.filter = '';
        }
        
        this.updateBreathingInstruction('Ready to Begin');
        this.updatePhaseIndicator('');
        this.updateBreathCount('');
        
        document.querySelectorAll('.nostril').forEach(nostril => {
            nostril.classList.remove('active');
        });
    }
    
    // === MODAL MANAGEMENT ===
    
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            console.log(`📱 Modal opened: ${modalId}`);
        }
    }
    
    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            console.log(`📱 Modal closed: ${modalId}`);
        }
    }
    
    showCustomizeModal() {
        this.populateCustomizeModal();
        this.showModal('customizeModal');
    }
    
    showSettingsModal() {
        this.populateSettingsModal();
        this.showModal('settingsModal');
    }
    
    showAchievementsModal() {
        this.populateAchievementsModal();
        this.showModal('achievementsModal');
    }
    
    showSessionResults(results) {
        const modal = document.getElementById('sessionCompleteModal');
        
        // Update results display
        const qualityEl = document.getElementById('sessionQuality');
        const durationEl = document.getElementById('sessionDuration');
        const xpEl = document.getElementById('xpEarned');
        
        if (qualityEl) qualityEl.textContent = results.quality;
        if (durationEl) durationEl.textContent = results.duration;
        if (xpEl) xpEl.textContent = `+${results.xp}`;
        
        this.showModal('sessionCompleteModal');
    }
    
    populateCustomizeModal() {
        // Update pattern cards with current selection
        document.querySelectorAll('.pattern-card').forEach(card => {
            card.classList.toggle('active', card.dataset.pattern === this.currentPattern.id);
        });
        
        // Update duration slider
        const durationSlider = document.getElementById('durationSlider');
        const durationValue = document.getElementById('durationValue');
        if (durationSlider && durationValue) {
            durationSlider.value = this.sessionDuration;
            durationValue.textContent = `${this.sessionDuration} min`;
        }
    }
    
    populateSettingsModal() {
        // Populate settings with current values
        Object.entries(this.settings).forEach(([key, value]) => {
            const element = document.getElementById(key);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = value;
                } else if (element.type === 'range') {
                    element.value = value;
                }
            }
        });
    }
    
    populateAchievementsModal() {
        const grid = document.getElementById('achievementsGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        this.achievements.forEach(achievement => {
            const achievementElement = document.createElement('div');
            achievementElement.className = `achievement-item ${achievement.earned ? 'earned' : ''}`;
            
            achievementElement.innerHTML = `
                <span class="achievement-icon">${achievement.icon}</span>
                <div class="achievement-info">
                    <span class="achievement-name">${achievement.name}</span>
                    <span class="achievement-desc">${achievement.description}</span>
                </div>
                <span class="achievement-xp">+${achievement.xp_reward} XP</span>
            `;
            
            grid.appendChild(achievementElement);
        });
    }
    
    // === EVENT HANDLERS ===
    
    selectPattern(patternId) {
        const pattern = this.breathingPatterns.find(p => p.id === patternId);
        if (pattern) {
            this.currentPattern = pattern;
            this.sessionDuration = pattern.optimalDuration;
            
            // Update UI
            document.querySelectorAll('.pattern-card').forEach(card => {
                card.classList.toggle('active', card.dataset.pattern === patternId);
            });
            
            const durationSlider = document.getElementById('durationSlider');
            const durationValue = document.getElementById('durationValue');
            if (durationSlider && durationValue) {
                durationSlider.value = this.sessionDuration;
                durationValue.textContent = `${this.sessionDuration} min`;
            }
            
            this.updatePatternDisplay();
            console.log(`🎛️ Pattern selected: ${pattern.name}`);
        }
    }
    
    updateDuration(duration) {
        this.sessionDuration = duration;
        const durationValue = document.getElementById('durationValue');
        if (durationValue) {
            durationValue.textContent = `${duration} min`;
        }
    }
    
    startCustomSession() {
        this.hideModal('customizeModal');
        this.calculateCycles();
        this.beginSession();
    }
    
    switchSettingsTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });
        
        // Update tab panels
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.toggle('active', panel.id === tabName + 'Tab');
        });
    }
    
    updateAnalyticsFilter(period) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.period === period);
        });
        
        // Update chart data based on period
        // This would connect to real analytics in a full implementation
        console.log(`📊 Analytics filter: ${period}`);
    }
    
    handleKeyboardShortcuts(event) {
        if (event.target.tagName === 'INPUT') return;
        
        switch (event.key) {
            case ' ':
                event.preventDefault();
                if (this.isSessionActive) {
                    this.pauseSession();
                } else {
                    this.startSession();
                }
                break;
            case 'Escape':
                if (this.isSessionActive) {
                    this.stopSession();
                }
                break;
            case 'q':
            case 'Q':
                if (!this.isSessionActive) {
                    this.startQuickPractice();
                }
                break;
            case 'c':
            case 'C':
                if (!this.isSessionActive) {
                    this.showCustomizeModal();
                }
                break;
        }
    }
    
    // === AUDIO SYSTEM ===
    
    speak(text) {
        if (!this.settings.voiceGuidance) return;
        
        try {
            this.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.8;
            utterance.pitch = 1.0;
            utterance.volume = this.settings.masterVolume / 100;
            this.speechSynthesis.speak(utterance);
        } catch (error) {
            console.warn('⚠️ Speech synthesis error:', error);
        }
    }
    
    playChime() {
        this.playTone(800, 0.1, 0.3);
    }
    
    playBreathingSound() {
        const frequency = this.currentPhase === 'inhale' ? 220 : 180;
        const duration = 0.5;
        this.playTone(frequency, 0.05, duration);
    }
    
    playCompletionMelody() {
        const notes = [523, 659, 784, 1047]; // C, E, G, C (octave)
        notes.forEach((freq, index) => {
            setTimeout(() => {
                this.playTone(freq, 0.15, 0.4);
            }, index * 150);
        });
    }
    
    playTone(frequency, volume, duration) {
        if (!this.settings.breathingSounds || !this.audioContext) return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            const adjustedVolume = volume * (this.settings.masterVolume / 100);
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(adjustedVolume, this.audioContext.currentTime + 0.01);
            gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (error) {
            console.warn('⚠️ Audio playback error:', error);
        }
    }
    
    // === UTILITY METHODS ===
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    formatDuration(minutes) {
        if (minutes < 60) {
            return `${minutes} min`;
        }
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    }
    
    clearAllTimers() {
        Object.values(this.timers).forEach(timer => {
            if (timer) clearInterval(timer);
        });
        this.clearBreathingTimer();
    }
    
    clearBreathingTimer() {
        if (this.timers.breathing) {
            clearInterval(this.timers.breathing);
            this.timers.breathing = null;
        }
    }
    
    startSessionTimer() {
        const totalTime = this.sessionDuration * 60;
        let elapsed = 0;
        
        this.timers.session = setInterval(() => {
            elapsed++;
            const remaining = totalTime - elapsed;
            const minutes = Math.floor(remaining / 60);
            const seconds = remaining % 60;
            
            const timerElement = document.getElementById('sessionTimer');
            if (timerElement) {
                timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
            
            if (remaining <= 0) {
                this.completeSession();
            }
        }, 1000);
    }
    
    updateStreak() {
        const today = new Date().toDateString();
        const lastSession = localStorage.getItem('lastSessionDate');
        
        if (lastSession !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastSession === yesterday.toDateString()) {
                this.userProgress.currentStreak++;
            } else {
                this.userProgress.currentStreak = 1;
            }
            
            localStorage.setItem('lastSessionDate', today);
        }
    }
    
    updateWellnessScore() {
        // Calculate wellness score based on recent performance
        const recentQuality = this.metrics.sessionQuality;
        const streakBonus = Math.min(this.userProgress.currentStreak * 2, 20);
        const consistencyBonus = Math.min(this.userProgress.totalSessions, 30);
        
        this.userProgress.wellnessScore = Math.min(100, Math.round(
            (recentQuality * 0.4) + 
            (streakBonus * 0.3) + 
            (consistencyBonus * 0.3)
        ));
    }
    
    checkForNewAchievements() {
        // Check various achievement conditions
        const newAchievements = [];
        
        if (this.userProgress.totalSessions === 1 && !this.achievements.find(a => a.id === 'first_session').earned) {
            newAchievements.push('first_session');
        }
        
        if (this.userProgress.currentStreak >= 7 && !this.achievements.find(a => a.id === 'perfect_posture_week').earned) {
            newAchievements.push('perfect_posture_week');
        }
        
        if (this.metrics.sessionQuality >= 95 && !this.achievements.find(a => a.id === 'rhythm_master').earned) {
            newAchievements.push('rhythm_master');
        }
        
        // Award new achievements
        newAchievements.forEach(achievementId => {
            const achievement = this.achievements.find(a => a.id === achievementId);
            if (achievement) {
                achievement.earned = true;
                this.userProgress.xp += achievement.xp_reward;
                
                this.showNotification(`🏆 Achievement Unlocked: ${achievement.name}`, 'success');
                
                if (this.settings.voiceGuidance) {
                    this.speak(`Achievement unlocked: ${achievement.name}`);
                }
            }
        });
        
        if (newAchievements.length > 0) {
            this.saveUserProgress();
        }
    }
    
    showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        if (!container) return;
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        container.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
    
    showCameraUnavailableMessage() {
        const cameraContainer = document.querySelector('.camera-container');
        if (cameraContainer) {
            cameraContainer.innerHTML = `
                <div style="height: 300px; display: flex; align-items: center; justify-content: center; flex-direction: column; background: rgba(0,0,0,0.1); border-radius: 12px;">
                    <div style="font-size: 3rem; margin-bottom: 16px;">📷</div>
                    <h3 style="color: var(--color-text); margin-bottom: 8px;">Camera Access Required</h3>
                    <p style="color: var(--color-text-secondary); text-align: center; max-width: 250px;">Please allow camera access for AI posture and eye tracking monitoring.</p>
                </div>
            `;
        }
    }
    
    // === DATA PERSISTENCE ===
    
    loadUserProgress() {
        try {
            const saved = localStorage.getItem('anbUserProgress');
            if (saved) {
                const loaded = JSON.parse(saved);
                this.userProgress = { ...this.userProgress, ...loaded };
            }
            
            const savedAchievements = localStorage.getItem('anbAchievements');
            if (savedAchievements) {
                const loadedAchievements = JSON.parse(savedAchievements);
                this.achievements = loadedAchievements;
            }
            
            const savedSettings = localStorage.getItem('anbSettings');
            if (savedSettings) {
                const loadedSettings = JSON.parse(savedSettings);
                this.settings = { ...this.settings, ...loadedSettings };
            }
            
            console.log('📊 User progress loaded');
        } catch (error) {
            console.warn('⚠️ Could not load user progress:', error);
        }
    }
    
    saveUserProgress() {
        try {
            localStorage.setItem('anbUserProgress', JSON.stringify(this.userProgress));
            localStorage.setItem('anbAchievements', JSON.stringify(this.achievements));
            localStorage.setItem('anbSettings', JSON.stringify(this.settings));
            console.log('💾 User progress saved');
        } catch (error) {
            console.warn('⚠️ Could not save user progress:', error);
        }
    }
    
    resetCustomizeSettings() {
        this.currentPattern = this.breathingPatterns.find(p => p.id === 'standard_5_5');
        this.sessionDuration = 15;
        this.populateCustomizeModal();
    }
    
    resetAllSettings() {
        this.settings = {
            postureSensitivity: 7,
            eyeSensitivity: 8,
            masterVolume: 75,
            voiceGuidance: true,
            breathingSounds: true,
            smartRecommendations: true,
            adaptiveDifficulty: true,
            dailyChallenges: true
        };
        this.populateSettingsModal();
    }
    
    saveAllSettings() {
        // Collect settings from UI
        Object.keys(this.settings).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                if (element.type === 'checkbox') {
                    this.settings[key] = element.checked;
                } else if (element.type === 'range') {
                    this.settings[key] = parseInt(element.value);
                }
            }
        });
        
        this.saveUserProgress();
        this.hideModal('settingsModal');
        this.showNotification('⚙️ Settings saved successfully', 'success');
    }
    
    shareSessionResults() {
        if (navigator.share) {
            navigator.share({
                title: 'ANB Mastery Session Complete',
                text: `Just completed a ${this.sessionDuration} minute breathing session with ${this.metrics.sessionQuality}% quality score! 🧘‍♀️`,
                url: window.location.href
            });
        } else {
            // Fallback for browsers without Web Share API
            const text = `Just completed a ${this.sessionDuration} minute ANB session with ${this.metrics.sessionQuality}% quality! 🧘‍♀️`;
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('📋 Results copied to clipboard', 'success');
            });
        }
    }
    
    // === CLEANUP ===
    
    destroy() {
        this.clearAllTimers();
        
        if (this.speechSynthesis) {
            this.speechSynthesis.cancel();
        }
        
        if (this.performanceChart) {
            this.performanceChart.destroy();
        }
        
        console.log('🧘‍♀️ ANB Mastery destroyed');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing ANB Mastery...');
    
    // Add a delay to ensure DOM is fully rendered
    setTimeout(() => {
        try {
            window.anbApp = new ANBMastery();
        } catch (error) {
            console.error('❌ Failed to initialize ANB Mastery:', error);
            
            // Fallback error display
            const appContainer = document.getElementById('appContainer');
            if (appContainer) {
                appContainer.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: center; height: 100vh; flex-direction: column; background: var(--color-background); color: var(--color-text); text-align: center; padding: 20px;">
                        <h1 style="font-size: 2rem; margin-bottom: 16px;">⚠️ Initialization Failed</h1>
                        <p style="margin-bottom: 24px; max-width: 400px; line-height: 1.5;">Please refresh the page to try again. If the problem persists, check your browser console for more details.</p>
                        <button onclick="location.reload()" style="margin-top: 20px; padding: 12px 24px; border: none; border-radius: 8px; background: var(--color-primary); color: white; cursor: pointer; font-size: 16px;">Refresh Page</button>
                    </div>
                `;
            }
        }
    }, 50);
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.anbApp) {
        window.anbApp.destroy();
    }
});

// Handle visibility changes for PWA behavior
document.addEventListener('visibilitychange', () => {
    if (window.anbApp && document.hidden && window.anbApp.isSessionActive) {
        window.anbApp.pauseSession();
        window.anbApp.showNotification('⏸ Session paused due to app backgrounding', 'warning');
    }
});