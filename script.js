document.addEventListener('DOMContentLoaded', () => {
    const resources = [
        {
            id: 1,
            name: 'Visual Studio Code',
            description: 'A powerful and lightweight code editor with built-in debugging, Git control, and a vast extension library.',
            category: 'Developer Utilities',
            language: 'Various',
            tags: ['Editor', 'IDE', 'Development'],
            link: 'https://code.visualstudio.com/',
            trending: true
        },
        {
            id: 2,
            name: 'Figma',
            description: 'A collaborative interface design tool for creating, testing, and shipping better designs from start to finish.',
            category: 'UI/UX Inspiration',
            language: 'N/A',
            tags: ['UI', 'UX', 'Design'],
            link: 'https://www.figma.com/',
            trending: true
        },
        {
            id: 3,
            name: 'Postman',
            description: 'An API platform for building and using APIs. Postman simplifies each step of the API lifecycle and streamlines collaboration.',
            category: 'Developer Utilities',
            language: 'Various',
            tags: ['API', 'Backend', 'Testing'],
            link: 'https://www.postman.com/',
            trending: true
        },
        {
            id: 5,
            name: 'CSS-Tricks',
            description: 'A comprehensive resource for CSS, offering tutorials, guides, and articles on all things Cascading Style Sheets.',
            category: 'CSS Tools',
            language: 'CSS',
            tags: ['CSS', 'Frontend', 'Tutorial'],
            link: 'https://css-tricks.com/'
        },
        {
            id: 4,
            name: 'CodePen',
            description: 'A social development environment for front-end designers and developers. Build and deploy a website, show off your work, and test out new ideas.',
            category: 'Coding Tutorials',
            language: 'HTML/CSS/JS',
            tags: ['Frontend', 'CSS', 'JavaScript'],
            link: 'https://codepen.io/',
            trending: true
        },
        {
            id: 6,
            name: 'freeCodeCamp',
            description: 'A non-profit organization that consists of an interactive learning web platform, an online community forum, and thousands of articles.',
            category: 'Coding Tutorials',
            language: 'Various',
            tags: ['JavaScript', 'Python', 'Backend'],
            link: 'https://www.freecodecamp.org/'
        },
        {
            id: 7,
            name: 'MDN Web Docs',
            description: 'The ultimate resource for developers, maintained by Mozilla and its contributors, providing detailed documentation for web standards.',
            category: 'Developer Utilities',
            language: 'HTML/CSS/JS',
            tags: ['Documentation', 'Frontend', 'API'],
            link: 'https://developer.mozilla.org/'
        },
        {
            id: 8,
            name: 'Can I use...',
            description: 'Provides up-to-date browser support tables for support of front-end web technologies on desktop and mobile web browsers.',
            category: 'CSS Tools',
            language: 'CSS',
            tags: ['Compatibility', 'Frontend', 'CSS'],
            link: 'https://caniuse.com/'
        },
        {
            id: 9,
            name: 'JavaScript Info',
            description: 'A modern JavaScript tutorial, from the basics to advanced topics with simple, but detailed explanations.',
            category: 'JavaScript Tools',
            language: 'JavaScript',
            tags: ['JavaScript', 'Tutorial', 'Frontend'],
            codeSnippet: `
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}`,
            link: 'https://javascript.info/'
        },
        {
            id: 10,
            name: 'GitHub Copilot',
            description: 'An AI pair programmer that offers autocomplete-style suggestions as you code.',
            category: 'Developer Utilities',
            language: 'Various',
            tags: ['AI', 'Editor', 'Development'],
            link: 'https://github.com/features/copilot'
        },
        {
            id: 11,
            name: 'Stack Overflow',
            description: 'A public platform building the definitive collection of coding questions & answers. A community-based space to find and contribute answers to technical challenges.',
            category: 'Developer Utilities',
            language: 'Various',
            tags: ['Q&A', 'Community', 'Development'],
            link: 'https://stackoverflow.com/'
        },
        {
            id: 12,
            name: 'Dev.to',
            description: 'A constructive and inclusive social network for software developers. With you every step of your journey.',
            category: 'Coding Tutorials',
            language: 'Various',
            tags: ['Community', 'Blog', 'JavaScript', 'WebDev'],
            link: 'https://dev.to/'
        },
        {
            id: 13,
            name: 'Smashing Magazine',
            description: 'An online magazine for professional web designers and developers, with a focus on design, UX, front-end and back-end development.',
            category: 'UI/UX Inspiration',
            language: 'Various',
            tags: ['Design', 'UX', 'Frontend', 'Articles'],
            link: 'https://www.smashingmagazine.com/'
        },
        {
            id: 14,
            name: 'Awwwards',
            description: 'The awards that recognize the talent and effort of the best web designers, developers, and agencies in the world.',
            category: 'UI/UX Inspiration',
            language: 'N/A',
            tags: ['Inspiration', 'UI', 'UX', 'Design'],
            link: 'https://www.awwwards.com/'
        },
        {
            id: 15,
            name: 'W3Schools',
            description: 'A web developer information website, with tutorials and references on web development languages such as HTML, CSS, JavaScript, PHP, SQL, and JQuery.',
            category: 'Coding Tutorials',
            language: 'Various',
            tags: ['HTML', 'CSS', 'JavaScript', 'Tutorial'],
            link: 'https://www.w3schools.com/'
        }
    ];

    const resourceCardsContainer = document.getElementById('resource-cards');
    const favoriteCardsContainer = document.getElementById('favorite-cards');
    const trendingContainer = document.querySelector('.trending-container');
    const tutorialCardsContainer = document.getElementById('tutorial-cards');
    const categoryFiltersContainer = document.querySelector('.category-filters');
    const searchBar = document.getElementById('search-bar');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Intersection Observer for scroll animations
    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    // Observe the footer for scroll animation
    const footer = document.querySelector('footer');
    if (footer) {
        cardObserver.observe(footer);
    }

    const createResourceCard = (resource) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.id = resource.id;

        const isFavorite = favorites.includes(resource.id);

        card.innerHTML = `
            <div class="card-header">
                <h3>${resource.name}</h3>
                <button class="bookmark-btn ${isFavorite ? 'bookmarked' : ''}" aria-label="Bookmark">
                    <i class="fas fa-bookmark"></i>
                </button>
            </div>
            <p>${resource.description}</p>
            ${resource.codeSnippet ? `
            <div class="code-snippet">
                <button class="copy-btn">Copy</button>
                <pre><code>${escapeHtml(resource.codeSnippet)}</code></pre>
            </div>
            ` : ''}
            <div class="card-footer">
                <div class="tags">
                    ${resource.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="${resource.link}" class="visit-btn">Visit</a>
            </div>
        `;

        card.querySelector('.bookmark-btn').addEventListener('click', () => toggleFavorite(resource.id));
        if (resource.codeSnippet) {
            card.querySelector('.copy-btn').addEventListener('click', (e) => copyCode(e, resource.codeSnippet));
        }
        card.querySelectorAll('.tag').forEach(tagEl => {
            tagEl.addEventListener('click', () => filterByTag(tagEl.textContent));
        });

        // Observe the newly created card for scroll-in animation
        cardObserver.observe(card);

        return card;
    };

    const renderResources = (filter = '', category = 'All', tag = '') => {
        console.log('renderResources called with:', { filter, category, tag });
        resourceCardsContainer.innerHTML = '';
        let filteredResources = resources;

        if (category !== 'All') {
            filteredResources = filteredResources.filter(r => r.category === category);
        }
        if (tag) {
            filteredResources = filteredResources.filter(r => r.tags.includes(tag));
        }
        console.log('Resources after category/tag filter:', filteredResources);

        if (filter) {
            console.log('Applying filter:', filter);
            filteredResources = filteredResources.filter(r =>
                r.name.toLowerCase().includes(filter) ||
                r.description.toLowerCase().includes(filter) ||
                r.tags.some(t => t.toLowerCase().includes(filter))
            );
        }
        console.log('Resources after text filter:', filteredResources);

        filteredResources.forEach(resource => {
            console.log('Creating card for:', resource.name);
            resourceCardsContainer.appendChild(createResourceCard(resource));
        });
    };

    const renderFavorites = () => {
        favoriteCardsContainer.innerHTML = '';
        const favoriteResources = resources.filter(r => favorites.includes(r.id));

        if (favoriteResources.length === 0) {
            favoriteCardsContainer.innerHTML = '<p class="no-favorites">You have no favorite resources yet. Click the bookmark icon to add some!</p>';
        } else {
            favoriteResources.forEach(resource => {
                favoriteCardsContainer.appendChild(createResourceCard(resource));
            });
        }
    };

    const renderTrending = () => {
        const trendingResources = resources.filter(r => r.trending);
        trendingResources.forEach(resource => {
            trendingContainer.appendChild(createResourceCard(resource));
        });
    };

    const renderTutorials = () => {
        if (!tutorialCardsContainer) return;
        tutorialCardsContainer.innerHTML = '';
        const tutorialResources = resources.filter(r => r.category === 'Coding Tutorials');
        tutorialResources.forEach(resource => {
            tutorialCardsContainer.appendChild(createResourceCard(resource));
        });
    };

    const renderCategories = () => {
        const categories = ['All', ...new Set(resources.map(r => r.category))];
        categoryFiltersContainer.innerHTML = categories.map(cat =>
            `<button class="category-filter ${cat === 'All' ? 'active' : ''}" data-category="${cat}">${cat}</button>`
        ).join('');

        document.querySelectorAll('.category-filter').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.category-filter.active').classList.remove('active');
                btn.classList.add('active');
                renderResources(searchBar.value.toLowerCase(), btn.dataset.category);
            });
        });
    };

    const toggleFavorite = (id) => {
        if (favorites.includes(id)) {
            favorites = favorites.filter(favId => favId !== id);
        } else {
            favorites.push(id);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateBookmarkIcons(id);
        renderFavorites();
    };

    const updateBookmarkIcons = (id) => {
        document.querySelectorAll(`.card[data-id='${id}'] .bookmark-btn`).forEach(btn => {
            btn.classList.toggle('bookmarked', favorites.includes(id));
        });
    };

    const copyCode = (e, code) => {
        navigator.clipboard.writeText(code.trim()).then(() => {
            const btn = e.target;
            btn.textContent = 'Copied!';
            setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
        });
    };

    const filterByTag = (tag) => {
        searchBar.value = '';
        document.querySelector('.category-filter.active').classList.remove('active');
        document.querySelector('.category-filter[data-category="All"]').classList.add('active');
        renderResources('', 'All', tag);
    };

    const escapeHtml = (unsafe) => {
        return unsafe
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
    }

    searchBar.addEventListener('input', () => {
        console.log("input triggered");
        console.log('Search input detected');
        const activeCategory = document.querySelector('.category-filter.active').dataset.category;
        renderResources(searchBar.value.toLowerCase(), activeCategory);
        window.location.href = '#resources';
    });

    document.getElementById('back-to-top')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // responsive menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navElement = document.querySelector('nav');
    if (menuToggle && navElement) {
        menuToggle.addEventListener('click', () => {
            navElement.classList.toggle('open');
        });
        // close menu after selecting a link
        navElement.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navElement.classList.remove('open'));
        });
    }

    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Auto-hiding header on scroll
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > header.offsetHeight) {
            // Scrolling down
            header.classList.add('header-hidden');
        } else {
            // Scrolling up or at the top
            header.classList.remove('header-hidden');
        }
        lastScrollY = currentScrollY;
    });

    renderCategories();
    renderTrending();
    renderTutorials();
    renderResources();
    renderFavorites();
});
