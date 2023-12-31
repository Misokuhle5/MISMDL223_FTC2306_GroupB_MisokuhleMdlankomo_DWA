import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';

// Factory function for creating book preview elements
function createBookPreview({ author, id, image, title }) {
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);

    element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `;

    return element;
}

function setThemeBasedOnColorScheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('night', '255, 255, 255', '10, 10, 20');
    } else {
      setTheme('day', '10, 10, 20', '255, 255, 255');
    }
}

function setTheme(theme, colorDark, colorLight) {
    document.querySelector('[data-settings-theme]').value = theme;
    document.documentElement.style.setProperty('--color-dark', colorDark);
    document.documentElement.style.setProperty('--color-light', colorLight);
}

// Call the function to set the theme initially
setThemeBasedOnColorScheme();

document.querySelector('[data-list-button]').innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;
document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 0;

document.querySelector('[data-list-button]').innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`;

document.querySelector('[data-search-cancel]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = false;
});

document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = false;
});

document.querySelector('[data-header-search]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = true;
    document.querySelector('[data-search-title]').focus();
});

document.querySelector('[data-header-settings]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = true;
});

document.querySelector('[data-list-close]').addEventListener('click', () => {
    document.querySelector('[data-list-active]').open = false;
});

document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }

    document.querySelector('[data-settings-overlay]').open = false;
});

document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = [];

    for (const book of books) {
        let genreMatch = filters.genre === 'any';

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true; }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book);
        }
    }

    page = 1;
    matches = result;

    if (result.length < 1) {
        document.querySelector('[data-list-message]').classList.add('list__message_show');
    } else {
        document.querySelector('[data-list-message]').classList.remove('list__message_show');
    }

    document.querySelector('[data-list-items]').innerHTML = '';
    const newItems = document.createDocumentFragment();

    for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
        const bookData = { author, id, image, title };
        const bookPreviewElement = createBookPreview(bookData);
        newItems.appendChild(bookPreviewElement);
    }

    document.querySelector('[data-list-items]').appendChild(newItems);
    document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1;

    document.querySelector('[data-list-button]').innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `;

    window.scrollTo({top: 0, behavior: 'smooth'});
    document.querySelector('[data-search-overlay]').open = false;
});

document.querySelector('[data-list-button]').addEventListener('click', () => {
    const fragment = document.createDocumentFragment();

    for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        const bookData = { author, id, image, title };
        const bookPreviewElement = createBookPreview(bookData);
        fragment.appendChild(bookPreviewElement);
    }

    document.querySelector('[data-list-items]').appendChild(fragment);
    page += 1;
});

function handleListItemClick(event) {
    const active = findActiveBook(event);

    if (active) {
        openDataListActive();
        updateDataListBlur(active.image);
        updateDataListImage(active.image);
        updateDataListTitle(active.title);
        updateDataListSubtitle(active.author, active.published);
        updateDataListDescription(active.description);
    }
}

function findActiveBook(event) {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
        if (active) break;

        if (node?.dataset?.preview) {
            let result = null;

            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook;
            }

            active = result;
        }
    }

    return active;
}

function openDataListActive() {
    const dataListActive = document.querySelector('[data-list-active]');
    dataListActive.open = true;
}

function updateDataListBlur(image) {
    const dataListBlur = document.querySelector('[data-list-blur]');
    dataListBlur.src = image;
}

function updateDataListImage(image) {
    const dataListImage = document.querySelector('[data-list-image]');
    dataListImage.src = image;
}

function updateDataListTitle(title) {
    const dataListTitle = document.querySelector('[data-list-title]');
    dataListTitle.innerText = title;
}

function updateDataListSubtitle(author, published) {
    const dataListSubtitle = document.querySelector('[data-list-subtitle]');
    dataListSubtitle.innerText = `${authors[author]} (${new Date(published).getFullYear()})`;
}

function updateDataListDescription(description) {
    const dataListDescription = document.querySelector('[data-list-description]');
    dataListDescription.innerText = description;
}

document.querySelector('[data-list-items]').addEventListener('click', handleListItemClick);
