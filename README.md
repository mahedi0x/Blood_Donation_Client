# 🩸 BloodBridge - Connecting Life, One Drop at a Time

**BloodBridge** is a high-end, full-stack web application designed to bridge the gap between blood donors and those in urgent need. Featuring a premium user interface with modern "Glassmorphism" aesthetics, the platform streamlines the life-saving process through real-time searching, verified donor profiles, and a robust administrative dashboard.

---

## 🔗 Project Links
* **Live Deployment:** [Insert Live Link Here](https://your-live-link.vercel.app)
* **Client Repository:** [GitHub Client](https://github.com/your-username/bloodbridge-client)
* **Server Repository:** [GitHub Server](https://github.com/your-username/bloodbridge-server)

---

## 🚀 Key Features

### 👤 User & Donor Experience
* **Dynamic Banner:** Real-time statistics with countdown animations showing active donors and funding.
* **Advanced Search:** Filter donors by Blood Group, District, and Upazila with an interactive "Blood Drop" loading state.
* **Premium Profile:** Glassmorphism-style profile cards to manage medical info and donor status.
* **Contact System:** One-click contact modal to access donor phone numbers directly.
* **Donation Requests:** Users can create, edit, and track the status of urgent blood requests.

### 🛡️ Administrative Controls
* **User Management:** Admins can block/unblock users and manage roles (Admin, Volunteer, Donor).
* **Request Oversight:** Full control over donation request lifecycles (Pending → In-Progress → Done/Cancelled).
* **Growth Analytics:** Monthly growth charts visualizing donor registration and funding trends using Recharts.

---

## 🛠️ Tech Stack & Packages

### Frontend
* **React.js**: Library for building the UI.
* **Tailwind CSS**: Utility-first CSS framework for custom, modern styling.
* **DaisyUI**: Component library for accessible and responsive elements.
* **Lucide React**: For premium, consistent iconography.

### State Management & Utilities
* **@tanstack/react-query**: For efficient data fetching, caching, and synchronization.
* **React Hook Form**: For performant form handling and validation.
* **Axios**: For handling secure API communication with JWT interceptors.
* **React CountUp**: For smooth numerical animations.
* **Recharts**: For professional data visualization.

### Backend & Security
* **Node.js & Express**: Powering the RESTful API.
* **MongoDB**: NoSQL database for flexible data storage.
* **JWT (JSON Web Token)**: For secure authentication and role-based access control.
* **SweetAlert2 & React-Toastify**: For beautiful, non-blocking user feedback.

---

## ⚙️ Installation & Setup

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/your-username/bloodbridge-client.git](https://github.com/your-username/bloodbridge-client.git)
    cd bloodbridge-client
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file in the root and add your configuration:
    ```env
    VITE_apiKey=YOUR_FIREBASE_KEY
    VITE_apiUrl=http://localhost:5000
    ```

4.  **Start Development Server:**
    ```bash
    npm run dev
    ```

---

## 📸 Screenshots & Previews





---

## 🤝 Contributing
Contributions make the community better! 
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

**Made with ❤️ for humanity by [Your Name]**