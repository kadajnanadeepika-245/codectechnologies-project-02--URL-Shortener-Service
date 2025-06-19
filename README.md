# 🔗 URL Shortener Service

A lightweight, scalable, and analytics-enabled **URL Shortener Service** built with **Spring Boot** and **MySQL**. This application allows users to shorten long URLs, track visits, and analyze click statistics via RESTful APIs.

## 🚀 Features

- ✅ Shorten long URLs to a unique, compact format.
- 📊 Track number of visits and timestamps.
- 🌍 Redirect users from short URLs to original links.
- 📈 Analytics Dashboard (API-based) for URL performance.
- 🔐 Optionally secure and expire shortened URLs.

---

## 🛠️ Tech Stack

| Technology     | Description                |
|----------------|----------------------------|
| Java           | Language for core backend logic |
| Spring Boot    | Backend framework (REST APIs, DI, MVC) |
| MySQL          | Persistent storage (URL mappings, click tracking) |
| Hibernate (JPA)| ORM to map Java objects to DB |
| REST API       | Interface for clients & users |

---

## 📦 Project Structure

url-shortener/
│
├── src/main/java/
│ └── com.urlshortener/
│ ├── controller/ # API Endpoints
│ ├── service/ # Business logic
│ ├── repository/ # JPA interfaces
│ ├── model/ # Entities
│ └── UrlShortenerApplication.java
│
├── src/main/resources/
│ └── application.properties
│
├── pom.xml # Maven dependencies
└── README.md


---

## ⚙️ How It Works

1. **POST /api/shorten**
   - Input: `{ "originalUrl": "https://example.com" }`
   - Output: `{ "shortUrl": "http://localhost:8080/xyz123" }`

2. **GET /xyz123**
   - Redirects to the original URL.
   - Click count and timestamp recorded.

3. **GET /api/analytics/xyz123**
   - Returns analytics for the given short URL:
     ```json
     {
       "originalUrl": "https://example.com",
       "clicks": 42,
       "createdAt": "2025-06-19",
       "lastAccessed": "2025-06-19T10:21:00"
     }
     ```

---

## 🧪 Setup & Run

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
2. Configure MySQL
Update your application.properties:
spring.datasource.url=jdbc:mysql://localhost:3306/url_shortener_db
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update

