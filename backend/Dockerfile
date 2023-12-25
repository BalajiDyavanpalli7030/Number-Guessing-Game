# # Use the official Python image
# FROM python:latest

# # Set the working directory
# WORKDIR /flask

# RUN pip install --upgrade pip
# # Copy requirements.txt
# COPY requirements.txt .

# # Install dependencies
# RUN pip install -r requirements.txt

# # Copy the rest of the app
# COPY . .

# # Expose a port (if your app uses one)
# EXPOSE 5000

# # Command to run your app
# CMD ["python", "app.py"]

# Use an official Python runtime as base image
FROM python:3.8

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Copy all local files to the container
COPY . .

# Expose a port
EXPOSE 5000

# Start the app
CMD ["python", "app.py"]
