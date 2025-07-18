import { StartupService } from './services/startup.service';

export function AppInitializerFactory (startupService: StartupService) {
  return () => {
    startupService.showMessage();
  };
}
