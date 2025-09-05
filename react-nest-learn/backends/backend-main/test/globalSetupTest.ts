import {ensureDockerContainerRunning} from './TestDatabaseUtil'
import {testEnvLoader} from './utils/TestEnvLoader'

testEnvLoader.loadTestEnvironment()
module.exports = async (): Promise<void> => {
  console.log('\n🚀 GLOBAL SETUP START')

  // First, ensure Docker container is running
  console.log('🐳 Checking Docker container status...')
  const containerRunning = await ensureDockerContainerRunning()
  if (!containerRunning) {
    throw new Error('❌ Failed to start MySQL Docker container')
  }

  console.log('✅ GLOBAL SETUP END')
}
