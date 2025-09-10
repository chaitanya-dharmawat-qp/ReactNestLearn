import { Logger } from '@nestjs/common';
import { execSync } from 'child_process';
import * as path from 'path';

module.exports = async (): Promise<void> => {
  const logger = new Logger(__filename)
  logger.log('🏁 GLOBAL TEARDOWN START');

  try {
    const dockerComposePath = path.join(
      __dirname,
      '..',
      'docker-compose.test.yml',
    );
    logger.log('🚀 Starting MySQL test container...');
    // Start the container using docker-compose
    execSync(`docker-compose -f ${dockerComposePath} down`, {
      encoding: 'utf8',
    });
    await new Promise(() => setTimeout(() => {}, 3000));
  } catch (error) {
    logger.error('❌ Error starting Docker container:', error);
    throw new Error('Failed to start MySQL Docker container');
  }

  logger.log('✅ GLOBAL TEARDOWN END');
};
