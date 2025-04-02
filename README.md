# Deploying a Docker Image to AWS ECS with Load Balancing

## Overview

This guide explains how to:

- Push a Docker image to **Amazon Elastic Container Registry (ECR)**.
- Create an **Amazon ECS Cluster**.
- Define a **Task Definition** and attach the Docker image.
- Create an **ECS Service** with a Load Balancer and Target Group.

---

## Prerequisites

1. **AWS CLI** installed & configured (`aws configure`).
2. **Docker** installed.
3. An **AWS Account** with permissions for ECS, ECR, and EC2.

---

## Step 1: Create an ECR Repository

1. Open AWS CLI and run the following command to create an **ECR repository**:
   ```sh
   aws ecr create-repository --repository-name todo-app
   ```
2. Authenticate Docker to AWS ECR:
   ```sh
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <aws-account-id>.dkr.ecr.us-east-1.amazonaws.com
   ```

---

## Step 2: Build and Push the Docker Image to ECR

1. Build the Docker image with the correct platform:
   ```sh
   docker build --platform=linux/amd64 -t <aws-account-id>.dkr.ecr.us-east-1.amazonaws.com/todo-app:latest .
   ```
2. Push the image to ECR:
   ```sh
   docker push <aws-account-id>.dkr.ecr.us-east-1.amazonaws.com/todo-app:latest
   ```

---

## Step 3: Create an ECS Cluster

1. Go to **AWS Console** → **ECS**.
2. Click **Create Cluster**.
3. Choose **Fargate (serverless) or EC2 (managed instances)**.
4. Configure cluster name (e.g., `my-ecs-cluster`).
5. Click **Create**.

---

## Step 4: Create a Task Definition

1. Go to **AWS ECS** → **Task Definitions** → **Create new task definition**.
2. Select **Fargate** (if using Fargate) or **EC2**.
3. Add **Container Definitions**:
   - **Image URI**: `<aws-account-id>.dkr.ecr.us-east-1.amazonaws.com/todo-app:latest`
   - **Port Mappings**: `3000` (or your app's port)
4. Set up task **memory and CPU**.
5. Click **Create Task Definition**.

---

## Step 5: Create an ECS Service

1. Go to **AWS ECS** → **Clusters** → Select your Cluster.
2. Click **Create Service**.
3. Select **Fargate** or **EC2**.
4. Choose your **Task Definition**.
5. Set **Desired Tasks = 3** (for 3 running containers).
6. Click **Next**.

---

## Step 6: Attach a Load Balancer

1. In **Service Creation**, choose **Application Load Balancer**.
2. Click **Create a new Load Balancer**.
3. Add a **Listener on port 80**.
4. Create a **Target Group**:
   - Set **Target Type = IP** (for Fargate) or **Instance** (for EC2).
   - Attach the ECS service.
5. Click **Create Service**.

---

## Step 7: Verify Deployment

1. Go to **AWS ECS** → **Clusters** → **Tasks**.
2. Check if tasks are running (`RUNNING` status).
3. Go to **EC2** → **Load Balancer**.
4. Copy the **DNS Name** and open it in a browser to see your app and check for /host, you can 3 differnet host machine everytime you hit the page.

---

## Cleanup (Optional)

To delete everything:

```sh
aws ecs delete-service --cluster my-ecs-cluster --service my-service --force
aws ecs delete-cluster --cluster my-ecs-cluster
aws ecr delete-repository --repository-name todo-app --force
```

---

## Conclusion

You have successfully deployed a Dockerized application to AWS ECS with ECR, Task Definitions, and Load Balancing. 🚀
