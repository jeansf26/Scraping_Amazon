# Amazon Scraper Project

This project is a simple **Amazon product scraper** with a **Bun + Express backend** and a **Vite-powered frontend**.  
The backend fetches Amazon search results and extracts product details, while the frontend provides a user-friendly interface to display them.

## 🚀 Technologies Used

**Frontend**
- [Vite](https://vitejs.dev/)
- HTML5, CSS3, JavaScript
  
**Backend (API)**: 
- [Bun](https://bun.sh/) as the runtime and package manager.  
- [Express](https://expressjs.com/)
- Axios
- JSDOM
- Other dependencies as needed

---

## 📂 Project Structure

- **`api/`** → Backend source code
  - **`index.js/`** → Main file
  - **`scrape.js/`** → File with the main function to get the elements

- **`frontend/`** → Frontend source code
  - **`src/`** → style and JS
  - **`index.html`** → Main file

- **`README.md`** → Project documentation

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```  
### 2️⃣ Backend setup (Bun)
```bash
cd backend
bun install
```
Run the backend:
```bash
bun run index.js
```
### 3️⃣ Frontend setup (Vite)
```bash
cd ../frontend
npm install
```
Run the frontend in development mode:
```bash
npm run dev
```

## ⚡ Usage
- Open the frontend in your browser (http://localhost:5173).
- Enter a search keyword in the input field.
- Click the Search button.
- The results (product title, rating, number of reviews, image) will be displayed.



