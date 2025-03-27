# 🌌 Rick and Morty Universe Explorer

![App Preview](./public/RickandMorty_sc.png) 

🔗 **Live Demo**: [https://rickandmorty-eight-pearl.vercel.app/](https://rickandmorty-eight-pearl.vercel.app/)  
📦 **Source Code**: [https://github.com/artaperdibuka/Intern-Task](https://github.com/artaperdibuka/Intern-Task)

## ✨ Key Features
- **Advanced Filtering**: By status (Alive/Dead/Unknown) and species (Human/Alien)
- **Smart Search**: Instant results with debounce optimization
- **Multi-language**: Ready for localization
- **Performance**: Memoized components and efficient GraphQL queries

### 🔍 Advanced Character Browser
- **Infinite Scroll** or pagination mode toggle
- **Multi-criteria Filtering** (status: Alive/Dead/Unknown, species: Human/Alien)
- **Smart Sorting** by name or origin (ascending/descending)
- **Instant Search** with 300ms debounce for optimal performance
- **One-click Reset** for all filters and sorting

### 🌐 Global Ready
- **Multi-language Support** (English + easy to add others)
- **Fully Responsive** design for all device sizes
- **Accessibility** optimized interactive elements

### ⚡ Performance Optimized
- **Memoized components** with `useMemo`/`useCallback`
- **Efficient GraphQL queries** with Apollo Client
- **Type-safe** TypeScript implementation
- **SCSS Modules** for scoped styling

## 🛠 Tech Stack

| Category               | Technologies Used                     |
|------------------------|---------------------------------------|
| **Core Framework**     | React 19 + TypeScript                 |
| **Build Tool**         | Vite (with SWC)                       |
| **Styling**           | SCSS Modules                          |
| **State Management**   | Apollo Client (GraphQL)               |
| **Internationalization** | React Intl                        |
| **UI Components**      | React Icons                           |
| **Deployment**         | Vercel (with CI/CD)                   |

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher) or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/rick-and-morty-app.git

# Navigate to project directory
cd rick-and-morty-app

# Install dependencies
npm install

# Start development server
npm run dev

The output will be in the dist folder, ready for deployment.
npm run preview
Serves the built app locally, simulating a production environment.
Useful for testing the production build before deployment.

npm test
Runs tests in interactive watch mode (if test scripts are set up).

npm run lint
Checks the code for potential issues and formatting errors using ESLint.

npm run format
Formats the code using Prettier to maintain consistency.

📌 Additional Information
For more details, check out the official Vite documentation and React documentation.