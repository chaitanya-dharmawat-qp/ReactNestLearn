import { Logger } from '@nestjs/common';
import { ensureDockerContainerRunning } from './TestDatabaseUtil';
import { testEnvLoader } from './utils/TestEnvLoader';

module.exports = async (): Promise<void> => {
  Logger.log('\n🚀 GLOBAL SETUP START');
  testEnvLoader.loadTestEnvironment();

  // First, ensure Docker container is running
  Logger.log('🐳 Checking Docker container status...');
  const containerRunning = await ensureDockerContainerRunning();
  if (!containerRunning) {
    throw new Error('❌ Failed to start MySQL Docker container');
  }

  Logger.log('✅ GLOBAL SETUP END');
};
