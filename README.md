# Photography Contest Backend API

This project is a backend API for handling CRUD operations in a photography contest application. The API is built using Node.js, Express, and Mongoose for MongoDB.

## Features

- **Create**: Add new users, contests, photos, votes, and admin.
- **Read**: Fetch user, contest, photo, vote, and admin details.
- **Update**: Modify existing user, contest, photo, vote, and admin information.
- **Delete**: Remove users, contests, photos, votes, and admin from the database.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (>= 14.0.0)
- MongoDB (>= 4.0)
- Git
- Postman (for testing the API)

## Getting Started

### Cloning the Repository

To get a local copy up and running, follow these simple steps:

1. Clone the repository

    ```sh
    git clone https://github.com/your-username/photography-contest-backend.git
    ```

2. Navigate to the project directory

    ```sh
    cd photography-contest-backend
    ```

### Installing Dependencies

Run the following command to install the required dependencies:

```sh
npm install
```

### Setting Up Environment Variables

Create a `.env` file in the root directory and add your MongoDB URI and server port:

```sh
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### Running the Application

Start the development server with the following command:

```sh
npm run dev
```

The server will start on `http://localhost:5000`.

## Directory Structure

- `models/`: Contains schema definitions for Admin, Contest, Photo, User, and Vote.
- `routes/`: Contains route files for Admin, Contest, Photo, User, and Vote.
- `apis/`: Contains API logic for Admin, Contest, Photo, User, and Vote.
- `utils/`: Contains utility files such as MongoDB connection setup.

## API Endpoints

### Common Endpoints for Admin, Contests, Photos, Users, and Votes

#### Create

- **URL**: `/{entity}/insert`
- **Method**: `POST`

#### Fetch

- **URL**: `/{entity}/fetch`
- **Method**: `GET`

#### Update

- **URL**: `/{entity}/update`
- **Method**: `PUT`

#### Delete

- **URL**: `/{entity}/delete`
- **Method**: `DELETE`

Replace `{entity}` with `admin`, `contest`, `photo`, `user`, or `vote` to perform the respective operations.

## Testing the API with Postman

1. Open Postman and create a new collection.
2. Add requests to the collection for each of the CRUD operations.
3. Set the request method and URL according to the API endpoints described above.
4. Send the requests and verify the responses.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [Atharva Narkhede](mailto:atharvan12345@gmail.com)

Project Frontend Link: [https://github.com/atharva-narkhede/Photography_Contest_ReactJS](https://github.com/your-username/photography-contest-backend)
