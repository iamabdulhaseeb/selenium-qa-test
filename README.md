UI Automation Testing using Selenium WebDriver

This project contains end-to-end UI automation tests built using Selenium WebDriver. The tests cover real-world user flows such as search, navigation, login attempts, and product interaction across multiple websites.

Project Overview

This automation suite tests three different types of web applications:

* E-commerce platforms
* Booking platform
* General UI navigation flow

The goal is to simulate real user behavior and validate functional UI flows.

---

## 🌐 Websites Covered

* Daraz – E-commerce user flow testing
* Flipkart – Product search and navigation testing
* Airbnb – Search, listing, and UI interaction testing

---

## ⚙️ Tech Stack

* Node.js
* Selenium WebDriver
* ChromeDriver
* JavaScript (ES6)

---

## 📁 Project Structure

```
selenium-testing-assignment/
│
├── tests/
│   ├── darazFullTest.js
│   ├── flipkartFullTest.js
│   ├── airbnbFullTest.js
│
├── utils/
│   └── driver.js
│
├── package.json
└── README.md
```

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/selenium-testing-assignment.git
cd selenium-testing-assignment
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Install Selenium dependencies

```bash
npm install selenium-webdriver chromedriver
```

---

### 4. Ensure Chrome is installed

This project uses Google Chrome browser for automation.

---

## ▶️ How to Run Tests

Run each test individually:

### 🟡 Daraz Test

```bash
node tests/darazFullTest.js
```

### 🟠 Flipkart Test

```bash
node tests/flipkartFullTest.js
```

### 🔵 Airbnb Test

```bash
node tests/airbnbFullTest.js
```

---

## 🧪 Test Scenarios Covered

### ✔ Functional Testing

* Search functionality
* Product/listing navigation
* Add to cart (where applicable)
* Login page access
* Page navigation (back/forward)

### ✔ UI Interaction Testing

* Scrolling behavior
* Button clicks
* Tab switching
* Popup/modal handling

---

## ⚠️ Known Limitations

* Some websites have dynamic UI elements that may change over time
* Certain actions like login or OTP flows are not fully automated due to security restrictions
* Selectors may require updates if UI structure changes

---

## 📸 Screenshots

Add screenshots of:

* Test execution in terminal
* Browser automation running
* Successful test logs

---

## 🧠 Key Learnings

* Handling dynamic web elements using Selenium
* Working with multiple tabs and windows
* Managing real-world UI challenges like popups and modals
* Writing stable automation scripts using waits and fallback selectors

---

## 👨‍💻 Author

**Abdul Haseeb**
Software Engineering Student

