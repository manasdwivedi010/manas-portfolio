/* ==========================================================================
   MANAS DWIVEDI PORTFOLIO - INTERACTIVE LOGIC & TERMINAL
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Navigation Highlights & ScrollSpy
    // ----------------------------------------------------
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ----------------------------------------------------
    // 2. Modals System (Resume & Projects Architecture)
    // ----------------------------------------------------
    const modalTriggers = document.querySelectorAll('.project-modal-trigger');
    const closeButtons = document.querySelectorAll('.modal-close');
    const modals = document.querySelectorAll('.modal');
    
    // Resume Modal specific trigger
    const resumeBtn = document.getElementById('resume-btn');
    const resumeModal = document.getElementById('resume-modal');
    const closeResumeModalBtn = document.getElementById('close-resume-modal');

    // Connect Modal specific trigger
    const connectBtn = document.getElementById('connect-btn');
    const contactModal = document.getElementById('contact-modal');

    if (resumeBtn && resumeModal) {
        resumeBtn.addEventListener('click', () => {
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (connectBtn && contactModal) {
        connectBtn.addEventListener('click', () => {
            contactModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeResumeModalBtn && resumeModal) {
        closeResumeModalBtn.addEventListener('click', () => {
            resumeModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Generic project details modals triggers
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const targetId = trigger.getAttribute('data-target');
            const targetModal = document.getElementById(targetId);
            if (targetModal) {
                targetModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Generic modal close
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modals.forEach(m => m.classList.remove('active'));
            document.body.style.overflow = 'auto';
        });
    });

    // Click outside modal to close
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // ----------------------------------------------------
    // 3. Interactive Terminal Emulator
    // ----------------------------------------------------
    const terminalToggleBtn = document.getElementById('terminal-toggle-btn');
    const terminalModal = document.getElementById('terminal-modal');
    const closeTerminalBtn = document.getElementById('close-terminal');
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');

    if (terminalToggleBtn && terminalModal) {
        terminalToggleBtn.addEventListener('click', () => {
            terminalModal.classList.add('active');
            if (terminalInput) terminalInput.focus();
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeTerminalBtn && terminalModal) {
        closeTerminalBtn.addEventListener('click', () => {
            terminalModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Handle terminal input commands
    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim().toLowerCase();
                terminalInput.value = '';
                
                if (command) {
                    processCommand(command);
                }
            }
        });
    }

    function appendLine(text, type = 'text') {
        if (!terminalOutput) return;
        const line = document.createElement('div');
        line.className = 'terminal-line';
        
        if (type === 'prompt') {
            line.innerHTML = `<span class="prompt">manas@portfolio:~$</span> ${text}`;
        } else if (type === 'error') {
            line.innerHTML = `<span style="color: #ff5f56;">Error: ${text}</span>`;
        } else if (type === 'success') {
            line.innerHTML = `<span style="color: #00e676;">${text}</span>`;
        } else {
            line.innerHTML = text;
        }
        
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function processCommand(cmd) {
        appendLine(cmd, 'prompt');
        
        switch (cmd) {
            case 'help':
                appendLine('Available system utilities:<br>' + 
                           '  <span class="cmd">about</span>     - Summary profile of Manas<br>' +
                           '  <span class="cmd">skills</span>    - List skills and technologies<br>' +
                           '  <span class="cmd">projects</span>  - Review developed systems<br>' +
                           '  <span class="cmd">education</span> - Educational institutions & degrees<br>' +
                           '  <span class="cmd">leetcode</span>  - LeetCode dynamic statistics<br>' +
                           '  <span class="cmd">contact</span>   - Get email and phone numbers<br>' +
                           '  <span class="cmd">clear</span>     - Purge terminal buffer<br>' +
                           '  <span class="cmd">exit</span>      - Close console interface');
                break;
            case 'about':
                appendLine('Manas Dwivedi is an MCA Student at Pranveer Singh Institute of Technology (PSIT), Kanpur. Highly analytical, motivated, and certified Cloud Developer seeking dynamic Software Engineering roles.');
                break;
            case 'skills':
                appendLine('Frontend: JavaScript, Bootstrap, HTML5, CSS3, React.js<br>' +
                           'Languages: Java, C, Python, SQL<br>' +
                           'Databases: Oracle, MySQL, MongoDB<br>' +
                           'Tools: Selenium, Cucumber, Jenkins, JMeter, Jira, Git');
                break;
            case 'projects':
                appendLine('1. FaceLogix (AI Face Recognition Attendance System)<br>' +
                           '2. Research Buddy (AI Research companion)<br>' +
                           '3. University Management System (Java Enterprise Software)<br>' +
                           '4. Netflix Clone (Frontend UI Replica)');
                break;
            case 'education':
                appendLine('- Master Of Computer Application (MCA) @ PSIT Kanpur (2025-2027)<br>' +
                           '- Bachelor of Computer Application (BCA) @ VSICS Kanpur (2022-2025)');
                break;
            case 'leetcode':
                appendLine('Total Solved: 200+ problems.<br>Core Topics: Data Structures, Search Algorithms, Dynamic Programming, Arrays, Trees.');
                break;
            case 'contact':
                appendLine('Email: <a href="mailto:dubeymanas618@gmail.com" style="color: var(--accent-cyan);">dubeymanas618@gmail.com</a><br>' +
                           'Phone: +91 8840394591<br>' +
                           'LinkedIn: <a href="https://linkedin.com/in/manas-dwivedi-a374b5247" target="_blank" style="color: var(--accent-cyan);">linkedin.com/in/manas-dwivedi-a374b5247</a>');
                break;
            case 'clear':
                if (terminalOutput) terminalOutput.innerHTML = '';
                break;
            case 'exit':
            case 'close':
                if (terminalModal) {
                    terminalModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                break;
            default:
                appendLine(`Command not found: '${cmd}'. Type 'help' for support.`, 'error');
        }
    }

    // ----------------------------------------------------
    // 4. Contact Form Handler (Simulated Network Dispatch)
    // ----------------------------------------------------

});
