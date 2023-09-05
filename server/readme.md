# Hellroom Server

Welcome to the Hellroom server documentation. This server serves as the backend for the Hellroom client application and provides various API endpoints for authentication, user management, group-related operations, and presentation management.

## API Base URL

You can access the Hellroom API at the following base URL:
- **API URL**: https://hellroom-api.onrender.com

## Authentication

### Register

- **Endpoint**: `/api/auth/register`
- **Method**: `POST`
- **Description**: Register a new user account.
- **Request Body**:
  - `username` (string): The desired username for the new account.
  - `email` (string): The user's email address.
  - `password` (string): The user's chosen password.
- **Response**:
  - `status` (string): "success" if registration is successful, "error" otherwise.
  - `message` (string): A message indicating the result of the registration process.

### Login

- **Endpoint**: `/api/auth/login`
- **Method**: `POST`
- **Description**: Authenticate and log in a user.
- **Request Body**:
  - `email` (string): The user's email address.
  - `password` (string): The user's password.
- **Response**:
  - `status` (string): "success" if login is successful, "error" otherwise.
  - `message` (string): A message indicating the result of the login process.
  - `token` (string): A JSON Web Token (JWT) to be used for authenticated API requests.

## User

### Get User

- **Endpoint**: `/api/user`
- **Method**: `GET`
- **Description**: Retrieve the user's profile information.
- **Authentication**: Requires a valid JWT token in the request headers.
- **Response**:
  - `status` (string): "success" if the user profile is retrieved successfully, "error" otherwise.
  - `user` (object): An object containing user profile information.

### Update User

- **Endpoint**: `/api/user`
- **Method**: `PUT`
- **Description**: Update the user's profile information.
- **Authentication**: Requires a valid JWT token in the request headers.
- **Request Body**:
  - `username` (string, optional): The new username.
  - `email` (string, optional): The new email address.
  - `password` (string, optional): The new password.
- **Response**:
  - `status` (string): "success" if the user profile is updated successfully, "error" otherwise.
  - `message` (string): A message indicating the result of the update process.

## Groups

### Create Group

- **Endpoint**: `/api/groups`
- **Method**: `POST`
- **Description**: Create a new group.
- **Authentication**: Requires a valid JWT token in the request headers.
- **Request Body**:
  - `name` (string): The name of the new group.
  - `description` (string): A brief description of the group.
- **Response**:
  - `status` (string): "success" if the group is created successfully, "error" otherwise.
  - `group` (object): An object containing information about the newly created group.

### Get Group Details

- **Endpoint**: `/api/groups/:groupId`
- **Method**: `GET`
- **Description**: Retrieve details of a specific group.
- **Authentication**: Requires a valid JWT token in the request headers.
- **Parameters**:
  - `groupId` (string): The unique identifier of the group.
- **Response**:
  - `status` (string): "success" if the group details are retrieved successfully, "error" otherwise.
  - `group` (object): An object containing detailed information about the group.

### Update Group

- **Endpoint**: `/api/groups/:groupId`
- **Method**: `PUT`
- **Description**: Update the details of a specific group.
- **Authentication**: Requires a valid JWT token in the request headers.
- **Parameters**:
  - `groupId` (string): The unique identifier of the group.
- **Request Body**:
  - `name` (string, optional): The new name for the group.
  - `description` (string, optional): The updated description for the group.
- **Response**:
  - `status` (string): "success" if the group details are updated successfully, "error" otherwise.
  - `message` (string): A message indicating the result of the update process.

## Presentations

### Create Presentation

- **Endpoint**: `/api/presentations`
- **Method**: `POST`
- **Description**: Create a new presentation.
- **Authentication**: Requires a valid JWT token in the request headers.
- **Request Body**:
  - `title` (string): The title of the new presentation.
  - `description` (string): A brief description of the presentation.
- **Response**:
  - `status` (string): "success" if the presentation is created successfully, "error" otherwise.
  - `presentation` (object): An object containing information about the newly created presentation.

### Get Presentation Details

- **Endpoint**: `/api/presentations/:presentationId`
- **Method**: `GET`
- **Description**: Retrieve details of a specific presentation.
- **Authentication**: Requires a valid JWT token in the request headers.
- **Parameters**:
  - `presentationId` (string): The unique identifier of the presentation.
- **Response**:
  - `status` (string): "success" if the presentation details are retrieved successfully, "error" otherwise.
  - `presentation` (object): An object containing detailed information about the presentation.

### Update Presentation

- **Endpoint**: `/api/presentations/:presentationId`
- **Method**: `PUT`
- **Description**: Update the details of a specific presentation.
- **Authentication**: Requires a valid JWT token in the request headers.
- **Parameters**:
  - `presentationId` (string): The unique identifier of the presentation.
- **Request Body**:
  - `title` (string, optional): The new title for the presentation.
  - `description` (string, optional): The updated description for the presentation.
- **Response**:
  - `status` (string): "success" if the presentation details are updated successfully, "error" otherwise.
  - `message` (string): A message indicating the result of the update process.

This documentation provides detailed information about the API endpoints for authentication, user management, group operations, and presentation management in your Hellroom server. You can use this documentation as a reference for integrating the server with your Hellroom client application.
