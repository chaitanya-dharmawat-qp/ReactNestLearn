import * as mysql from 'mysql2/promise';
import { execSync } from 'child_process';
import * as path from 'path';
import { Logger } from '@nestjs/common';

interface IDatabaseConnectionInfo {
  host: string;
  port: number;
  username: string;
  password: string;
  connectTimeout?: number; // Optional connection timeout
}

// Helper function to get required environment variable or throw error
const getRequiredEnvVar = (varName: string): string => {
  const value = process.env[varName];
  if (!value) {
    throw new Error(`Required environment variable ${varName} is not set`);
  }
  return value;
};

// Helper function to get required environment variable as number or throw error
const getRequiredEnvVarAsNumber = (varName: string): number => {
  const value = process.env[varName];
  if (!value) {
    throw new Error(`Required environment variable ${varName} is not set`);
  }
  const numValue = parseInt(value, 10);
  if (isNaN(numValue)) {
    throw new Error(
      `Environment variable ${varName} must be a valid number, got: ${value}`,
    );
  }
  return numValue;
};

const getConnectionHost = (): string => {
  return getRequiredEnvVar('DB_HOST');
};

const getConnectionPort = (): number => {
  return getRequiredEnvVarAsNumber('DB_PORT');
};

const getContainerName = (): string => {
  return 'mysql-todo-test';
};

const getRootConnectionInfo = (): IDatabaseConnectionInfo => {
  return {
    host: getConnectionHost(),
    port: getConnectionPort(),
    username: getRequiredEnvVar('DATABASE_ROOT_USERNAME'),
    password: getRequiredEnvVar('DATABASE_ROOT_PASSWORD'),
  };
};

export async function stopDockerContainer(): Promise<boolean> {
  try {
    const dockerComposePath = path.join(
      __dirname,
      '..',
      'docker-compose.test.yml',
    );
    Logger.log('🛑 Stopping MySQL test container...');

    execSync(`docker-compose -f ${dockerComposePath} down -v`, {
      encoding: 'utf8',
    });
    Logger.log('✅ MySQL test container stopped and volumes removed');
    return true;
  } catch (error) {
    console.error('❌ Error stopping Docker container:', error);
    return false;
  }
}

async function isDockerContainerRunning(
  containerName: string,
): Promise<boolean> {
  try {
    const result = execSync(
      `docker ps --filter "name=${containerName}" --format "{{.Names}}"`,
      { encoding: 'utf8' },
    );
    return result.trim().includes(containerName);
  } catch (error) {
    Logger.log('⚠️  Error checking Docker container status:', error);
    return false;
  }
}

async function startDockerContainer(): Promise<boolean> {
  try {
    const dockerComposePath = path.join(
      __dirname,
      '..',
      'docker-compose.test.yml',
    );
    Logger.log('🚀 Starting MySQL test container...');
    // Start the container using docker-compose
    // Wait for the container to be healthy
    
    let retries = 60; //60 retries=60s
    while (retries > 0) {
      try {
        execSync(
          `docker-compose -f ${dockerComposePath} up -d mysql-todo-test`,
          {
            encoding: 'utf8',
          },
        );
        await new Promise((resolve) => setTimeout(resolve, 5000));
        Logger.log('Waiting 5 seconds for container to be ready');
        // Try to connect to the database using root credentials
        const connection = await createConnection(getRootConnectionInfo());
        await connection.ping();
        await connection.end();
        Logger.log('✅ MySQL container is ready!');
        return true;
      } catch (error) {
        retries--;

        if (retries === 0) {
          Logger.error('Error Trying to Start Docker Container:' + error);
          return false;
        }
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 second
      }
    }

    return false;
  } catch (error) {
    console.error('❌ Error starting Docker container:', error);
    return false;
  }
}

async function createConnection(
  info: IDatabaseConnectionInfo,
): Promise<mysql.Connection> {
  const connectionInfo = info;
  Logger.log(
    `🔌 Trying to connect to MySQL at ${connectionInfo.host}:${connectionInfo.port} with user ${connectionInfo.username}...`,
  );
  try {
    return await mysql.createConnection({
      host: connectionInfo.host,
      port: connectionInfo.port,
      user: connectionInfo.username,
      password: connectionInfo.password,
      connectTimeout: connectionInfo.connectTimeout || 15000, 
      timezone: 'Z',
      multipleStatements: true,
    });
  } catch (error) {
    throw error;
  }
}

export const ensureDockerContainerRunning = async (): Promise<boolean> => {
  const containerName = getContainerName();

  const isRunning = await isDockerContainerRunning(containerName);
  if (isRunning) {
    Logger.log('✅ MySQL test container is already running');
    return true;
  }

  Logger.log('🚀 MySQL test container is not running, starting it...');
  return await startDockerContainer();
};
