import { Router } from 'express';
import candidateRoutes from './candidate.routes';

const router = Router();

// Mount candidate routes
router.use('/candidates', candidateRoutes);

export default router;
