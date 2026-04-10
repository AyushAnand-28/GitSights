# GitSights

GitSights is a feature-rich, high-fidelity React application designed for discovering and searching GitHub profiles and their repositories. It focuses on providing a clean, responsive, and visually appealing user interface with a custom Sage & Warm Gray color palette.

## Key Features

*   **GitHub Profile Search:** Seamlessly search for GitHub users and view their profiles.
*   **Repository Dashboard:** Detailed view of a user's repositories with advanced sorting, filtering, and pagination.
*   **Custom UI Components:** High-fidelity, reusable components like `UserCard`, `RepoCard`, `SearchBar`, and custom dropdowns without sharp edges.
*   **Theming & State:** Robust global state management for theming (Light/Dark mode) and bookmarked repositories.
*   **Responsive Design:** Fully responsive layout, adapting to desktop, tablet, and mobile screens.
*   **Error Handling & Feedback:** Elegant loading states (Loaders), Empty States, and Error handling for a polished user experience.

## Technology Stack

*   **Frontend Framework:** React 19 + Vite
*   **Routing:** React Router v7
*   **Styling:** Pure CSS Modules (`.module.css`) for scoped, conflict-free styling. Custom CSS Variables for theming.
*   **API:** GitHub REST API

## Project Structure

*   **/src/components:** Reusable UI components (`UserCard`, `RepoCard`, `SearchBar`, `CustomSelect`, `Loader`, etc.)
*   **/src/pages:** Main application views (`Home`, `UserRepos`)
*   **/src/context:** Global state context (`ThemeContext`, `BookmarkContext`)
*   **/src/services:** API interaction logic (`githubService`)
*   **/src/hooks:** Custom React hooks (`useFetch`, `useDebounce`)
*   **/src/utils:** Helper functions (sorting, formatting, filtering)
*   **/src/assets:** Media files and static assets

## Setup and Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/yourusername/gitsights.git
    cd gitsights
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and add your GitHub Personal Access Token to increase the API rate limit:
    ```env
    VITE_GITHUB_TOKEN=your_github_token_here
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## Building for Production

To create a production-ready build, run:

```bash
npm run build
```

This will generate optimized static files in the `dist` directory, ready for deployment.

## License

This project is open-source and available under the [MIT License](LICENSE).
